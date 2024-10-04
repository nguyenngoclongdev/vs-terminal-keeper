import { ProgressLocation, window } from 'vscode';
import { constants } from '../utils/constants';
import { showErrorMessageWithDetail } from '../utils/utils';

export const abortAllAsync = async (): Promise<void> => {
    try {
        window.withProgress(
            {
                location: ProgressLocation.Window,
                title: 'Terminal Keeper',
                cancellable: false
            },
            async (progress) => {
                // If not keep existing terminals, to dispose all
                progress.report({ message: 'Abort all terminals...' });

                // Clear all existing terminal in parallel
                window.terminals.forEach(async (terminal) => {
                    terminal.sendText(`\u0003`, true);
                });

                // Return a value when the task completes
                return 'Abort all of the terminal completed!';
            }
        );
    } catch (error) {
        showErrorMessageWithDetail(constants.abortTerminalFailed, error);
    }
};
