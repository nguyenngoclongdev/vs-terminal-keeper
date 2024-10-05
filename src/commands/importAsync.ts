import { fs } from '@vscode-utility/fs-browserify';
import { TerminalItem } from '@vscode-utility/terminal-browserify';
import path from 'path/posix';
import { QuickPickItem, window, workspace, WorkspaceFolder } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { configurationTemplate } from '../configuration/template';
import { constants } from '../utils/constants';
import { getSessionQuickPickItems, showErrorMessageWithDetail } from '../utils/utils';
import { extractMakefileCommands } from './modules/makefileParse';
import { extractPackageJsonCommands } from './modules/packageJsonParse';

const getFilePaths = async (workspaceFolders: readonly WorkspaceFolder[], filename: string): Promise<string[]> => {
    const filePaths = [];
    for (let i = 0; i < workspaceFolders?.length; i++) {
        const workspaceFolder = workspaceFolders[i];
        const filePath = path.join(workspaceFolder.uri.fsPath, filename);
        if (await fs.existAsync(filePath)) {
            filePaths.push(filePath);
        }
    }
    return filePaths;
};

const getFilename = (fileType: string): string | undefined => {
    switch (fileType) {
        case 'package.json':
            return 'package.json';
        case 'makefile':
            return 'Makefile';
        default:
            return undefined;
    }
};

export const getCommands = async (fileType: string, filePath: string): Promise<Record<string, string> | undefined> => {
    switch (fileType) {
        case 'package.json':
            return extractPackageJsonCommands(filePath);
        case 'makefile':
            return extractMakefileCommands(filePath);
        default:
            return undefined;
    }
};

export const importAsync = async (fileType: string): Promise<void> => {
    try {
        const { workspaceFolders } = workspace;
        if (!workspaceFolders || workspaceFolders.length <= 0) {
            console.log('🚀 ~ importAsync ~ workspaceFolders:', workspaceFolders);
            return; // TODO: warning
        }

        // Get filename by fileType
        const filename = getFilename(fileType);
        if (!filename) {
            console.log('🚀 ~ importAsync ~ filename:', filename);
            return; // TODO: warning
        }

        // Get all filepaths
        const filePaths = await getFilePaths(workspaceFolders, filename);
        if (!filePaths || filePaths.length <= 0) {
            console.log('🚀 ~ importAsync ~ filePaths:', filePaths);
            return; // TODO: warning
        }

        // Choose the file if more than one
        let selectedFilePath = filePaths[0];
        if (filePaths.length >= 1) {
            const options = filePaths.map((filePath) => ({ label: filePath, detail: `$(file)${filePath}` }));
            const quickPickItem = await window.showQuickPick(options, {
                title: constants.selectFileTitle,
                placeHolder: constants.selectFilePlaceHolder,
                canPickMany: false,
                ignoreFocusOut: true
            });
            if (!quickPickItem) {
                return;
            }

            // Set quick pick item as a selected file
            selectedFilePath = quickPickItem.label;
        }

        // Read the script of file
        const scripts = await getCommands(fileType, selectedFilePath);
        if (!scripts) {
            console.log('🚀 ~ importAsync ~ scripts:', fileType, selectedFilePath, scripts);
            return; // TODO: warning
        }

        // Select name of sessions to override or add new session
        const config = await Configuration.load();
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
            console.log('🚀 ~ importAsync ~ quickPickItem:', quickPickItem);
            return undefined;
        }
        let sessionName = quickPickItem.label;
        if (quickPickItem.label === addNewSession.label) {
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
            if (!sessionNameInput) {
                console.log('🚀 ~ importAsync ~ sessionNameInput:', sessionNameInput);
                return undefined;
            }
            sessionName = sessionNameInput;
        }

        // Create new sessions.json if not exist, otherwise save to existing file
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            const content = configurationTemplate;
            content.sessions = { default: [] };
            await Configuration.save(content);
        }

        // Save scripts to sessions.json
        const configSaved = await Configuration.load();
        if (!configSaved.sessions) {
            configSaved.sessions = { default: [] };
        }
        configSaved.sessions[sessionName] = Object.entries(scripts).map(([key, value]) => {
            const item: TerminalItem = {
                name: key,
                commands: [value]
            };
            return item;
        });
        await Configuration.save(configSaved);
    } catch (error) {
        showErrorMessageWithDetail(constants.activeSessionFailed, error);
    }
};
