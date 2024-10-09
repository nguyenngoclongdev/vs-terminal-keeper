import { TerminalItem } from '@vscode-utility/terminal-browserify';
import { glob } from 'glob';
import path from 'path';
import { QuickPickItem, window, workspace, WorkspaceFolder } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { configurationTemplate } from '../configuration/template';
import { constants } from '../utils/constants';
import { getSessionQuickPickItems, showErrorMessageWithDetail } from '../utils/utils';
import { extractAntCommands } from './modules/antParse';
import { extractGradleCommands } from './modules/gradleParse';
import { extractGruntCommands } from './modules/gruntParse';
import { extractGulpCommands } from './modules/gulpParse';
import { extractJsonScriptCommands } from './modules/jsonScriptParse';
import { extractMakeCommands } from './modules/makeParse';
import { extractPipenvCommands } from './modules/pipenvParse';

export type ImportFileType = 'npm' | 'composer' | 'make' | 'gradle' | 'pipenv' | 'ant' | 'grunt' | 'gulp';

const getFilenames = (fileType: ImportFileType): Array<string> | undefined => {
    switch (fileType) {
        case 'npm':
            return ['package.json'];
        case 'composer':
            return ['composer.json'];
        case 'make':
            return ['Makefile', 'makefile'];
        case 'gradle':
            return ['build.gradle', 'test.gradle'];
        case 'pipenv':
            return ['Pipfile', 'pipfile'];
        case 'ant':
            return ['build.xml'];
        case 'grunt':
            return ['GRUNTFILE.JS'];
        case 'gulp':
            return ['GULPFILE.js', 'GULPFILE.mjs', 'gulpfile.js', 'gulpfile.mjs'];
        default:
            return undefined;
    }
};

const getCommands = async (fileType: ImportFileType, filePath: string): Promise<Record<string, string> | undefined> => {
    switch (fileType) {
        case 'npm':
            return extractJsonScriptCommands(filePath);
        case 'composer':
            return extractJsonScriptCommands(filePath);
        case 'make':
            return extractMakeCommands(filePath);
        case 'gradle':
            return extractGradleCommands(filePath);
        case 'pipenv':
            return extractPipenvCommands(filePath);
        case 'ant':
            return extractAntCommands(filePath);
        case 'grunt':
            return extractGruntCommands(filePath);
        case 'gulp':
            return extractGulpCommands(filePath);
        default:
            return undefined;
    }
};

const getFilePaths = async (workspaceFolders: readonly WorkspaceFolder[], filenames: string[]): Promise<string[]> => {
    const filePaths: string[] = [];
    for (let i = 0; i < workspaceFolders.length; i++) {
        const wsFolder = workspaceFolders[i];
        for (let j = 0; j < filenames.length; j++) {
            const filename = filenames[j];
            const files = await glob(`**/${filename}`, {
                cwd: wsFolder.uri.fsPath,
                nodir: true,
                absolute: true,
                ignore: '**/node_modules/**'
            });
            filePaths.push(...files);
        }
    }
    return filePaths;
};

const chooseFilePath = async (filePaths: string[]): Promise<string | undefined> => {
    let selectedFilePath = filePaths[0];
    if (filePaths.length >= 1) {
        const options = filePaths.map((filePath): QuickPickItem => {
            const filename = path.basename(filePath);
            return { label: filename, detail: filePath.replace(filename, '') };
        });
        const quickPickItem = await window.showQuickPick(options, {
            title: constants.selectFileTitle,
            placeHolder: constants.selectFilePlaceHolder,
            canPickMany: false,
            ignoreFocusOut: true
        });
        return quickPickItem ? path.join(quickPickItem.detail || '', quickPickItem.label) : undefined;
    }
    return selectedFilePath;
};

const chooseSessionName = async (): Promise<string | undefined> => {
    // Get current session
    const config = await Configuration.load();
    if (!config.sessions) {
        config.sessions = { default: [] };
    }

    // Show choose session name box
    const sessionsWithDescription: QuickPickItem[] = getSessionQuickPickItems(config.sessions);
    sessionsWithDescription.forEach((sessionItem) => {
        sessionItem.detail = `Overwrites scripts to session ${sessionItem.label}`;
    });
    const addNewSession: QuickPickItem = {
        label: 'Add new session...',
        detail: 'Create new session, and save scripts to it.',
        alwaysShow: true
    };
    const quickPickItem = await window.showQuickPick([addNewSession].concat(sessionsWithDescription), {
        title: 'Select the session you want to override or add new session',
        placeHolder: 'Session name...',
        ignoreFocusOut: true
    });
    if (!quickPickItem) {
        return undefined;
    }

    // Show input box if select add new
    let sessionName = quickPickItem.label;
    if (sessionName === addNewSession.label) {
        const sessionNameInput = await window.showInputBox({
            title: 'Please enter the session name.',
            placeHolder: 'e.g. build, migrate, start, deploy',
            ignoreFocusOut: true,
            validateInput: (value: string) => {
                if (!value) {
                    return 'The session name cannot be null or empty.';
                }
                if (sessionsWithDescription.some((s) => s.label === value)) {
                    return 'The session name already exists.';
                }
                return ''; // input valid is OK
            }
        });
        return sessionNameInput ? sessionNameInput : undefined;
    }
    return sessionName;
};

export const importAsync = async (fileType: ImportFileType): Promise<void> => {
    try {
        const { workspaceFolders } = workspace;
        if (!workspaceFolders || workspaceFolders.length <= 0) {
            window.showWarningMessage(constants.openWorkspace);
            return;
        }

        // Get filename by fileType
        const filenames = getFilenames(fileType);
        if (!filenames || filenames.length <= 0) {
            window.showWarningMessage(constants.notSupportFileType.replace('{fileType}', fileType));
            return;
        }

        // Get all filepaths
        const filePaths = await getFilePaths(workspaceFolders, filenames);
        if (!filePaths || filePaths.length <= 0) {
            window.showWarningMessage(
                constants.notExistImportFile
                    .replace('{filename}', filenames.join(', '))
                    .replace('{workspace}', workspaceFolders.map((w) => w.uri.fsPath).join(', '))
            );
            return;
        }

        // Choose the file if more than one
        let selectedFilePath = await chooseFilePath(filePaths);
        if (!selectedFilePath) {
            return;
        }

        // Read the script of file
        const scripts = await getCommands(fileType, selectedFilePath);
        if (!scripts) {
            window.showWarningMessage(constants.notExistAnyCommands.replace('{filePath}', selectedFilePath));
            return;
        }

        // Parse to terminal item from scripts
        const terminalItems = Object.entries(scripts).map(([key, value]) => {
            const item: TerminalItem = {
                name: key,
                commands: [value]
            };
            return item;
        });

        // Select name of sessions to override or add new session
        let sessionName = await chooseSessionName();
        if (!sessionName) {
            return;
        }

        // Create new sessions.json if not exist, otherwise save to existing file
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            const content = configurationTemplate;
            content.sessions = { default: [] };
            await Configuration.save(content);
        }

        // Save scripts to sessions.json
        const config = await Configuration.load();
        if (!config.sessions) {
            config.sessions = { default: [] };
        }
        const previousTerminalItems = config.sessions[sessionName] || [];
        config.sessions[sessionName] = previousTerminalItems.concat(terminalItems);
        await Configuration.save(config);
    } catch (error) {
        showErrorMessageWithDetail(constants.importFileFailed.replace('{fileType}', fileType), error);
    }
};
