import { commands, ProgressLocation, window } from 'vscode';
import { constants, sysCommands } from '../utils/constants';
import { showErrorMessageWithDetail } from '../utils/utils';

export const clearAllAsync = async (): Promise<void> => {
    try {
        window.withProgress(
            {
                location: ProgressLocation.Window,
                title: 'Terminal Keeper',
                cancellable: false
            },
            async (progress) => {
                // If not keep existing terminals, to dispose all
                progress.report({ message: 'Clear all terminals...' });

                // Clear all existing terminal in parallel
                window.terminals.forEach(async (terminal) => {
                    terminal.show();
                    await commands.executeCommand(sysCommands.terminalClear, terminal);
                });

                // Return a value when the task completes
                return 'Clear all of the terminal completed!';
            }
        );
    } catch (error) {
        showErrorMessageWithDetail(constants.clearTerminalFailed, error);
    }
};
