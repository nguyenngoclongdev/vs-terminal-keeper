import { QuickPickItem, window } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { SessionItem } from '../configuration/interface';
import { constants } from '../utils/constants';
import { findTerminalByName } from '../utils/find-terminal-in-config';
import { showErrorMessageWithDetail, showGenerateConfiguration } from '../utils/utils';
import { activeByTerminalAsync } from './activeByTerminalAsync';

export interface RunTerminalByNameArgs {
    name?: string;
    session?: string;
}

interface TerminalQuickPickItem extends QuickPickItem {
    terminalName: string | undefined;
    sessionId: string;
    index: number;
}

const getTerminalQuickPickItems = (sessions: { [key: string]: SessionItem[] }): TerminalQuickPickItem[] => {
    const items: TerminalQuickPickItem[] = [];

    for (const [sessionId, sessionItems] of Object.entries(sessions)) {
        if (!sessionItems || !Array.isArray(sessionItems)) {
            continue;
        }

        for (let index = 0; index < sessionItems.length; index++) {
            const item = sessionItems[index];
            const baseItem = { description: `Session: ${sessionId}`, sessionId, index };

            if (Array.isArray(item)) {
                // Terminal group
                items.push({
                    ...baseItem,
                    label: `$(split-horizontal) ${item.map((t) => t.name).join(', ')}`,
                    detail: 'Terminal group (split)',
                    terminalName: undefined
                });
            } else if (item.name) {
                // Single terminal
                const commandsPreview = Array.isArray(item.commands) ? item.commands.join('; ') : '';
                items.push({
                    ...baseItem,
                    label: `$(terminal) ${item.name}`,
                    detail: commandsPreview || '(no commands)',
                    terminalName: item.name
                });
            }
        }
    }

    return items;
};

export const runTerminalByNameAsync = async (args: RunTerminalByNameArgs): Promise<void> => {
    try {
        let { name, session } = args || {};

        // If no name provided, show QuickPick with available terminals
        if (!name) {
            const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
            if (!isDefinedSessionFile) {
                await showGenerateConfiguration();
                return;
            }

            const config = await Configuration.load();
            if (!config?.sessions) {
                window.showWarningMessage(constants.notExistAnySessions);
                return;
            }

            // If session provided, filter to only that session
            const sessionsToShow = session
                ? { [session]: config.sessions[session] }
                : config.sessions;

            const items = getTerminalQuickPickItems(sessionsToShow);
            if (items.length === 0) {
                window.showWarningMessage(constants.notExistAnySessions);
                return;
            }

            const selected = await window.showQuickPick(items, {
                title: constants.selectTerminalTitle,
                placeHolder: constants.selectTerminalPlaceHolder,
                canPickMany: false,
                ignoreFocusOut: true,
                matchOnDescription: true,
                matchOnDetail: true
            });

            if (!selected) {
                return; // User cancelled
            }

            // Use index directly from QuickPick selection - no search needed
            await activeByTerminalAsync(selected.sessionId, selected.index, selected.terminalName);
            return;
        }

        // Name provided via keybinding args - need to search for it
        const result = await findTerminalByName(name, session);

        if (!result) {
            const message = session
                ? constants.terminalNotFound.replace('{name}', name).replace('{session}', session)
                : constants.terminalNotFoundInAny.replace('{name}', name);
            window.showWarningMessage(message);
            return;
        }

        const terminalName = Array.isArray(result.terminal) ? undefined : name;
        await activeByTerminalAsync(result.sessionId, result.index, terminalName);
    } catch (error) {
        showErrorMessageWithDetail(constants.runTerminalByNameFailed, error);
    }
};
