import { ProgressLocation, window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { constants } from '../utils/constants';
import { updateStatusBar } from '../utils/show-status-bar';
import { TerminalApi, ThemeService } from '@vscode-utility/terminal-browserify';
import { showErrorMessageWithDetail, showGenerateConfiguration } from '../utils/utils';

export const activeBySessionAsync = async (
    activeSession: string | undefined,
    isSaveActiveSession?: boolean
): Promise<void> => {
    try {
        // Read the config
        const configInstance = Configuration.instance();
        const isDefinedSessionFile = await configInstance.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            await showGenerateConfiguration();
            return;
        }

        // Check the size of sessions
        const config = await configInstance.load();
        const { keepExistingTerminals = false, sessions, theme = 'default', noClear = false } = config;
        if (!sessions) {
            window.showWarningMessage(constants.notExistAnySessions);
            return;
        }

        // Show quick pick if sessions greater than 1
        if (!activeSession) {
            window.showWarningMessage(constants.selectSessionToActive.replace('{session}', `${activeSession}`));
            return;
        }

        // Check the split terminal in the session
        const selectedSession = sessions[activeSession];
        if (!selectedSession || selectedSession.length <= 0) {
            window.showWarningMessage(constants.notExistAnySpitTerminal.replace('{session}', activeSession));
            return;
        }

        // Kill previous terminal and create new terminal from session
        const { createTerminal, focusTerminal, getCwdPath, killAllTerminalAsync } = TerminalApi.instance();
        await window.withProgress(
            {
                location: ProgressLocation.Window,
                title: 'Terminal Keeper',
                cancellable: false
            },
            async (progress) => {
                // If not keep existing terminals, to dispose all
                if (!keepExistingTerminals) {
                    progress.report({ message: 'Killing previous terminals...' });

                    // Kill all existing terminal in parallel
                    const isKillProcess = configInstance.getExperimentalConfig<boolean>('killProcess');
                    await killAllTerminalAsync(isKillProcess);
                }

                // Validate data need use async function
                progress.report({ message: 'Validating the configuration file...' });
                const flatSelectedSession = selectedSession.flat();
                for (let i = 0; i < flatSelectedSession.length; i++) {
                    const sessionItem = flatSelectedSession[i];
                    progress.report({ message: `Checking that "${sessionItem.cwd}" exists...` });
                    const cwdPath = await getCwdPath(sessionItem.cwd);
                    if (cwdPath) {
                        sessionItem.cwdPath = cwdPath;
                    }
                }

                // Create terminal list
                const themeService = new ThemeService(theme);
                selectedSession.forEach((sessionItem) => {
                    if (Array.isArray(sessionItem)) {
                        progress.report({
                            message: `Initializing the terminal session for "${sessionItem[0].name}"...`
                        });
                        const parentTerminal = createTerminal(
                            themeService,
                            sessionItem[0],
                            { kind: 'parent' },
                            noClear
                        );
                        for (let i = sessionItem.length - 1; i >= 1; i--) {
                            progress.report({
                                message: `Initializing the terminal session for "${sessionItem[i].name}"...`
                            });
                            createTerminal(themeService, sessionItem[i], { kind: 'children', parentTerminal }, noClear);
                        }
                    } else {
                        progress.report({ message: `Initializing the terminal session for "${sessionItem.name}"...` });
                        createTerminal(themeService, sessionItem, { kind: 'standalone' }, noClear);
                    }
                });

                // Focus on specified terminal
                focusTerminal(flatSelectedSession);

                // Update status bar
                updateStatusBar(activeSession);

                // Save active terminal to configuration
                progress.report({ message: 'Waiting for the terminal session to render completely...' });
                if (isSaveActiveSession) {
                    await configInstance.save({ active: activeSession });
                }

                // Return a value when the task completes
                return 'Initialization of the terminal session completed!';
            }
        );
    } catch (error) {
        showErrorMessageWithDetail(constants.activeSessionFailed, error);
    }
};
