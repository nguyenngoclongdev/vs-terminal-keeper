import { Configuration } from '../configuration/configuration';
import { constants } from '../utils/constants';
import {
    showErrorMessageWithDetail,
    showGenerateConfiguration,
    showTextDocument
} from '../utils/utils';

export const openAsync = async (): Promise<void> => {
    try {
        // Write configuration file
        const configInstance = Configuration.instance();
        const isDefinedSessionFile = await configInstance.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            await showGenerateConfiguration();
            return;
        }

        // Open the terminal session configuration
        showTextDocument(configInstance.sessionFilePath);
    } catch (error) {
        showErrorMessageWithDetail(constants.openConfigurationFailed, error);
    }
};
