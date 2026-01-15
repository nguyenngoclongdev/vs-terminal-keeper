import { Configuration } from '../configuration/configuration';
import { TerminalItem } from '@vscode-utility/terminal-browserify';

export const findTerminal = async (
    sessionId: string | undefined,
    terminalArrayIndex: number | undefined,
    terminalItemName: string | undefined
): Promise<TerminalItem | TerminalItem[] | undefined> => {
    console.log('findTerminal', sessionId, terminalArrayIndex, terminalItemName);
    if (!sessionId || terminalArrayIndex === undefined) {
        return undefined;
    }

    // Read the config
    const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
    if (!isDefinedSessionFile) {
        return undefined;
    }

    // Check the size of sessions
    const config = await Configuration.load();
    if (!config || !config.sessions) {
        return undefined;
    }

    // Get session
    const session = config.sessions[sessionId];
    if (!session || session.length <= 0) {
        return undefined;
    }

    // Get session
    const sessionItem = session[terminalArrayIndex];
    if (!sessionItem) {
        return undefined;
    }

    // Return array if not exist
    if (!terminalItemName) {
        return sessionItem;
    }

    // Find terminal
    let foundTerminal = undefined;
    if (Array.isArray(sessionItem)) {
        const terminalInArray = sessionItem.find((item) => item.name === terminalItemName);
        if (terminalInArray) {
            foundTerminal = terminalInArray;
        }
    } else {
        if (sessionItem.name === terminalItemName) {
            foundTerminal = sessionItem;
        }
    }
    return foundTerminal;
};

export const findTerminalByName = async (
    terminalName: string,
    sessionId?: string
): Promise<{ terminal: TerminalItem | TerminalItem[]; sessionId: string; index: number } | undefined> => {
    // Check if session file exists
    const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
    if (!isDefinedSessionFile) {
        return undefined;
    }

    // Load the configuration
    const config = await Configuration.load();
    if (!config?.sessions) {
        return undefined;
    }

    // Determine which sessions to search
    const sessionsToSearch = sessionId
        ? { [sessionId]: config.sessions[sessionId] }
        : config.sessions;

    // Search for terminal by name
    for (const [sid, sessionItems] of Object.entries(sessionsToSearch)) {
        if (!sessionItems) {
            continue;
        }

        for (let index = 0; index < sessionItems.length; index++) {
            const item = sessionItems[index];

            if (Array.isArray(item)) {
                // Check if any terminal in group matches
                const found = item.find((t) => t.name === terminalName);
                if (found) {
                    return { terminal: item, sessionId: sid, index };
                }
            } else if (item.name === terminalName) {
                return { terminal: item, sessionId: sid, index };
            }
        }
    }
    return undefined;
};
