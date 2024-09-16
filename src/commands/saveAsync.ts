import { QuickPickItem, window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { SessionItem } from '../configuration/interface';
import { constants } from '../utils/constants';
import { getSessionQuickPickItems, showErrorMessageWithDetail, showInputBox, showTextDocument } from '../utils/utils';
import { TerminalApi } from '@vscode-utility/terminal-browserify';

export const saveAsync = async (): Promise<void> => {
    try {
        // Get session content
        const configInstance = Configuration.instance();
        const isDefinedSessionFile = await configInstance.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            window.showWarningMessage(constants.notExistConfiguration);
            return;
        }
        
        const config = await configInstance.load();
        if (!config) {
            window.showWarningMessage(constants.notExistConfiguration);
            return;
        }

        // Check the size of sessions
        const { sessions } = config;
        const sessionsWithDescription: QuickPickItem[] = getSessionQuickPickItems(sessions);
        const sessionKeys = sessionsWithDescription.map((session) => session.label);

        // Show quick pick to allow override on existed session
        const quickPickSession = await window.showQuickPick(
            sessionsWithDescription.concat({ label: constants.newSession, alwaysShow: true }),
            {
                title: constants.selectSessionSaveTitle,
                placeHolder: constants.selectSessionSavePlaceHolder,
                canPickMany: false,
                ignoreFocusOut: true
            }
        );
        if (!quickPickSession) {
            return;
        }

        // Set selected session
        let selectedSession = quickPickSession.label;
        if (quickPickSession.label === constants.newSession && quickPickSession.alwaysShow) {
            // Show input box to enter the session name
            const inputBoxContent = await showInputBox({
                title: constants.enterSessionNameTitle,
                placeHolder: constants.enterSessionNamePlaceHolder,
                validateInput: (value) => {
                    if (!value) {
                        return constants.sessionNameNotEmpty;
                    }
                    if (sessionKeys.includes(value)) {
                        return constants.sessionNameIsDuplicated;
                    }
                    return ''; // input valid is OK
                }
            });
            if (!inputBoxContent) {
                return;
            }

            // Set input content as selected session
            selectedSession = inputBoxContent;
        }

        // Scan all current terminal
        const session: SessionItem[] = TerminalApi.instance().getCurrentTerminals();

        // Write new session configuration to file
        if (!config.sessions) {
            config.sessions = {
                default: []
            };
        }
        const newestSessions = { ...config.sessions, ...{ [selectedSession]: session } };
        await configInstance.save({ sessions: newestSessions });

        // Show message
        window
            .showInformationMessage(constants.saveSessionSuccess, constants.viewConfigurationButton)
            .then((selection) => {
                if (selection === constants.viewConfigurationButton) {
                    // Open the terminal session configuration
                    showTextDocument(configInstance.sessionFilePath);
                }
            });
    } catch (error) {
        showErrorMessageWithDetail(constants.saveSessionFailed, error);
    }
};
