import { window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { constants } from '../utils/constants';
import { findTerminal } from '../utils/find-terminal-in-config';
import { TerminalApi, ThemeService } from '@vscode-utility/terminal-browserify';
import { showErrorMessageWithDetail } from '../utils/utils';

export const activeByTerminalAsync = async (
    sessionId: string | undefined,
    terminalArrayIndex: number | undefined,
    terminalItemName: string | undefined
): Promise<void> => {
    try {
        const terminal = await findTerminal(sessionId, terminalArrayIndex, terminalItemName);
        if (!terminal) {
            window.showWarningMessage(constants.selectTerminalToActive);
            return;
        }

        // Read the config
        const configInstance = Configuration.instance();
        const config = await configInstance.load();
        const { theme = 'default', noClear = false } = config;

        const { createTerminal, getCwdPath } = TerminalApi.instance();
        const terminals = Array.isArray(terminal) ? terminal : [terminal];
        for (let i = 0; i < terminals.length; i++) {
            const tm = terminals[i];

            // Kill previous terminal and create new terminal from session
            const cwdPath = await getCwdPath(tm.cwd);
            if (cwdPath) {
                tm.cwdPath = cwdPath;
            }

            const themeService = new ThemeService(theme);
            createTerminal(themeService, tm, { kind: 'standalone' }, noClear);
        }
    } catch (error) {
        showErrorMessageWithDetail(constants.activeSessionFailed, error);
    }
};
