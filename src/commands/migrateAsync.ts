import { Configuration } from '../configuration/configuration';
import { configFileVersions, SessionConfiguration } from '../configuration/interface';
import { TerminalTheme } from '@vscode-utility/terminal-browserify';
import { constants } from '../utils/constants';
import { showErrorMessageWithDetail } from '../utils/utils';

export const migrateAsync = async (): Promise<void> => {
    try {
        // Write configuration file
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            return;
        }

        // Get content file
        const currentConfiguration = await Configuration.load();
        if (!currentConfiguration) {
            return;
        }

        const { $schema = '', theme = '', sessions = [] } = currentConfiguration;
        const migrateConfiguration: SessionConfiguration = {};

        // Check version file
        const fromV1 = $schema.includes(configFileVersions.v1);
        const fromV2 = $schema.includes(configFileVersions.v2);
        const fromV3 = $schema.includes(configFileVersions.v3);

        // Upgrade to latest schema version
        if (fromV1 || fromV2) {
            const latestSessions: any = {};
            Object.entries(sessions).forEach(([sessionName, sessionValues]) => {
                latestSessions[sessionName] = sessionValues.map((s: any) => s.split) || [];
            });
            migrateConfiguration.sessions = latestSessions;
        }

        // Upgrade to latest theme
        if (fromV1 || fromV2 || fromV3) {
            switch (theme) {
                case TerminalTheme.manual:
                    migrateConfiguration.theme = TerminalTheme.default;
                    break;
                case TerminalTheme.auto:
                    migrateConfiguration.theme = TerminalTheme.tribe;
                    break;
                default:
                    migrateConfiguration.theme = TerminalTheme.default;
                    break;
            }
        }

        // Upgrade to latest schema
        let latestSchema = $schema;
        Object.values(configFileVersions).forEach((version) => {
            latestSchema = latestSchema.replace(version, configFileVersions.latest);
        });
        migrateConfiguration.$schema = latestSchema;

        // Write new session configuration to file
        await Configuration.save(migrateConfiguration);
    } catch (error) {
        showErrorMessageWithDetail(constants.migrateConfigurationFailed, error);
    }
};
