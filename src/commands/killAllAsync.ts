import { ProgressLocation, window } from 'vscode';
import { constants } from '../utils/constants';
import { killAllTerminal, showErrorMessageWithDetail } from '../utils/utils';

export const killAllAsync = async (): Promise<void> => {
    try {
        // Kill previous terminal and create new terminal from session
        window.withProgress(
            {
                location: ProgressLocation.Window,
                title: 'Terminal Keeper',
                cancellable: false
            },
            async (progress) => {
                // If not keep existing terminals, to dispose all
                progress.report({ message: 'Kill all terminals...' });

                // Kill all existing terminal in parallel
                if (window.terminals && window.terminals.length > 0) {
                    await killAllTerminal();
                }

                // Return a value when the task completes
                return 'Kill all of the terminal completed!';
            }
        );
    } catch (error) {
        showErrorMessageWithDetail(constants.killTerminalFailed, error);
    }
};
