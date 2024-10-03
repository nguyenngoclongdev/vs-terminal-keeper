import { commands, window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { configurationTemplate } from '../configuration/template';
import { constants, sysCommands } from '../utils/constants';
import { isWorkspaceOpened, showErrorMessageWithDetail, showTextDocument } from '../utils/utils';

export const generateAsync = async (): Promise<void> => {
    try {
        // Check workspace is opened
        if (!isWorkspaceOpened()) {
            window
                .showInformationMessage(
                    constants.openWorkspace,
                    constants.openFolderButton,
                    constants.openWorkspaceButton
                )
                .then(async (selection) => {
                    if (selection === constants.openFolderButton) {
                        await commands.executeCommand(sysCommands.openFolder);
                    }
                    if (selection === constants.openWorkspaceButton) {
                        await commands.executeCommand(sysCommands.openWorkspace);
                    }
                });
            return;
        }

        // Write configuration file
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (isDefinedSessionFile) {
            window.showWarningMessage(constants.configurationFileAlreadyExist);
            return;
        }

        // Generate configuration file
        await Configuration.save(configurationTemplate);

        // Show message
        window
            .showInformationMessage(constants.generateConfigurationSuccess, constants.viewConfigurationButton)
            .then((selection) => {
                if (selection === constants.viewConfigurationButton) {
                    // Open the terminal session configuration
                    showTextDocument(Configuration.sessionFilePath);
                }
            });

        // Open the terminal session configuration
        showTextDocument(Configuration.sessionFilePath);
    } catch (error) {
        showErrorMessageWithDetail(constants.generateConfigurationFailed, error);
    }
};
