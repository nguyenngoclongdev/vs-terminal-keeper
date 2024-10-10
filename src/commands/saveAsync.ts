import { TerminalApi } from '@vscode-utility/terminal-browserify';
import { QuickPickItem, window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { SessionConfiguration, SessionItem } from '../configuration/interface';
import { constants } from '../utils/constants';
import { getSessionQuickPickItems, showErrorMessageWithDetail, showTextDocument } from '../utils/utils';

const chooseSessionName = async (config: SessionConfiguration): Promise<string | undefined> => {
    // Get current session
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

export const saveAsync = async (): Promise<void> => {
    try {
        // Get session content
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            window.showWarningMessage(constants.notExistConfiguration);
            return;
        }

        const config = await Configuration.load();
        if (!config) {
            window.showWarningMessage(constants.notExistConfiguration);
            return;
        }

        // Select name of sessions to override or add new session
        let sessionName = await chooseSessionName(config);
        if (!sessionName) {
            return;
        }

        // Scan all current terminal
        const session: SessionItem[] = TerminalApi.instance().getCurrentTerminals();

        // Write new session configuration to file
        if (!config.sessions) {
            config.sessions = {
                default: []
            };
        }
        const newestSessions = { ...config.sessions, ...{ [sessionName]: session } };
        await Configuration.save({ sessions: newestSessions });

        // Show message
        window
            .showInformationMessage(constants.saveSessionSuccess, constants.viewConfigurationButton)
            .then((selection) => {
                if (selection === constants.viewConfigurationButton) {
                    // Open the terminal session configuration
                    showTextDocument(Configuration.sessionFilePath);
                }
            });
    } catch (error) {
        showErrorMessageWithDetail(constants.saveSessionFailed, error);
    }
};
