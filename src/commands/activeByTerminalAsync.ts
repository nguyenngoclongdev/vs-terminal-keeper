import { TerminalApi, ThemeService } from '@vscode-utility/terminal-browserify';
import { window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { constants } from '../utils/constants';
import { findTerminal } from '../utils/find-terminal-in-config';
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
        const { createTerminal, getCwdPath } = TerminalApi.instance();
        const config = await Configuration.load();
        const { theme = 'default', noClear = false } = config;
        const themeService = new ThemeService(theme);

        // Set terminal cwd
        const terminals = Array.isArray(terminal) ? terminal : [terminal];
        for (let i = 0; i < terminals.length; i++) {
            const tm = terminals[i];
            const cwdPath = await getCwdPath(tm.cwd);
            if (cwdPath) {
                tm.cwdPath = cwdPath;
            }
        }

        // Create terminal
        if (Array.isArray(terminal)) {
            const terminals = terminal.filter((t) => !t.disabled);
            if (terminals.length <= 0) {
                window.showWarningMessage(constants.groupTerminalWillBeDisabled);
                return;
            }

            const parentTerminal = createTerminal(themeService, terminals[0], { kind: 'parent' }, noClear);
            for (let i = terminals.length - 1; i >= 1; i--) {
                createTerminal(themeService, terminals[i], { kind: 'children', parentTerminal }, noClear);
            }
        } else {
            if (terminal.disabled) {
                window.showWarningMessage(constants.terminalWillBeDisabled);
                return;
            }

            createTerminal(themeService, terminal, { kind: 'standalone' }, noClear);
        }
    } catch (error) {
        showErrorMessageWithDetail(constants.activeTerminalFailed, error);
    }
};
