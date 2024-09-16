import { Event, EventEmitter, MarkdownString, ThemeIcon, TreeDataProvider, TreeItem } from 'vscode';
import { findTerminal } from '../utils/find-terminal-in-config';

export type CommandTreeItem = TreeItem;

export class CommandProvider implements TreeDataProvider<CommandTreeItem> {
    private selectedSessionId: string | undefined;
    private selectedTerminalArrayIndex: number | undefined;
    private selectedTerminalItemName: string | undefined;

    private _onDidChangeTreeData: EventEmitter<CommandTreeItem | undefined | void> = new EventEmitter<
        CommandTreeItem | undefined | void
    >();
    readonly onDidChangeTreeData: Event<CommandTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(sessionId: string, terminalArrayIndex: number, terminalItemName: string): void {
        this.selectedSessionId = sessionId;
        this.selectedTerminalArrayIndex = terminalArrayIndex;
        this.selectedTerminalItemName = terminalItemName;
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: CommandTreeItem): CommandTreeItem {
        return element;
    }

    async getChildren(): Promise<CommandTreeItem[]> {
        const terminal = await findTerminal(
            this.selectedSessionId,
            this.selectedTerminalArrayIndex,
            this.selectedTerminalItemName
        );
        if (!terminal) {
            return [];
        }

        // Generate child items if parent element is passed.
        const terminals = Array.isArray(terminal) ? terminal : [terminal];
        return terminals
            .filter((t) => t.commands && t.commands.length > 0)
            .map((t) => t.commands)
            .flat()
            .map((command) => this.renderCommandTreeItem(command));
    }

    private renderCommandTreeItem = (command: string | undefined): CommandTreeItem => {
        const tooltip = new MarkdownString().appendCodeblock(`${command}`, 'sh');
        return {
            label: command,
            description: command ? '' : '<empty>',
            tooltip: tooltip,
            contextValue: 'command-context',
            iconPath: new ThemeIcon('note')
        };
    };
}
