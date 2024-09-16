import { ProgressLocation, window } from 'vscode';
import { constants } from '../utils/constants';
import { TerminalApi } from '@vscode-utility/terminal-browserify';
import { showErrorMessageWithDetail } from '../utils/utils';

export const killAllAsync = async (): Promise<void> => {
    try {
        // Kill previous terminal and create new terminal from session
        const { killAllTerminalAsync } = TerminalApi.instance();
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
                await killAllTerminalAsync(true);

                // Return a value when the task completes
                return 'Kill all of the terminal completed!';
            }
        );
    } catch (error) {
        showErrorMessageWithDetail(constants.killTerminalFailed, error);
    }
};
