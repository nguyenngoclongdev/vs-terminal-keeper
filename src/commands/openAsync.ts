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
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            await showGenerateConfiguration();
            return;
        }

        // Open the terminal session configuration
        showTextDocument(Configuration.sessionFilePath);
    } catch (error) {
        showErrorMessageWithDetail(constants.openConfigurationFailed, error);
    }
};
