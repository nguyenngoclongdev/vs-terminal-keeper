import { QuickPickItem, window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { SessionConfiguration } from '../configuration/interface';
import { constants } from '../utils/constants';
import { updateStatusBar } from '../utils/show-status-bar';
import { getSessionQuickPickItems, showErrorMessageWithDetail, showTextDocument } from '../utils/utils';

export const removeAsync = async (): Promise<void> => {
    try {
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

        // Check the size of sessions
        const { active, sessions } = config;
        if (!sessions) {
            window.showWarningMessage(constants.notExistAnySessions);
            return;
        }

        // Show quick pick if sessions greater than 1
        let selectedSession = active; // Default set selected action from configuration
        const sessionsWithDescription: QuickPickItem[] = getSessionQuickPickItems(sessions);
        const quickPickItem = await window.showQuickPick(sessionsWithDescription, {
            title: constants.selectSessionRemoveTitle,
            placeHolder: constants.selectSessionRemovePlaceHolder,
            canPickMany: false,
            ignoreFocusOut: true
        });
        if (!quickPickItem) {
            return;
        }

        // Set quick pick item as a selected session
        selectedSession = quickPickItem.label;

        // Check the selected session
        if (selectedSession === constants.defaultSession) {
            window.showWarningMessage(constants.couldNotRemoveDefaultSession);
            return;
        }

        // Remove the session and write to file
        const newestConfiguration: SessionConfiguration = {};
        newestConfiguration.sessions = sessions;
        if (newestConfiguration.sessions?.[selectedSession]) {
            delete newestConfiguration.sessions[selectedSession];
        }

        // Set new active
        if (active === selectedSession) {
            newestConfiguration.active = constants.defaultSession;

            // Update status bar
            updateStatusBar(newestConfiguration.active);
        }

        // Write new session configuration to file
        await Configuration.save(newestConfiguration);

        // Show message
        window
            .showInformationMessage(constants.removeSessionSuccess, constants.viewConfigurationButton)
            .then((selection) => {
                if (selection === constants.viewConfigurationButton) {
                    // Open the terminal session configuration
                    showTextDocument(Configuration.sessionFilePath);
                }
            });
    } catch (error) {
        showErrorMessageWithDetail(constants.removeSessionFailed, error);
    }
};
