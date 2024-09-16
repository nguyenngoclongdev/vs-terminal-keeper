import { StatusBarAlignment, StatusBarItem, window } from 'vscode';
import { extCommands } from './constants';

let statusItem: StatusBarItem;

export const showStatusBar = (activeSession: string): StatusBarItem => {
    if (!statusItem) {
        statusItem = window.createStatusBarItem(
            'terminal-keeper.status-bar',
            StatusBarAlignment.Right,
            Number.MAX_VALUE
        );
        statusItem.name = 'Terminal Keeper';
    }
    statusItem.text = `$(terminal) ${activeSession}`;
    statusItem.tooltip = `Current terminal session: ${activeSession}`;
    statusItem.command = {
        title: 'Active Terminal Session',
        command: extCommands.active
    };
    statusItem.show();
    return statusItem;
};

export const updateStatusBar = (activeSession: string): void => {
    if (!statusItem) {
        statusItem = showStatusBar(activeSession);
        return;
    }
    statusItem.text = `$(terminal) ${activeSession}`;
    statusItem.tooltip = `Current terminal session: ${activeSession}`;
};
