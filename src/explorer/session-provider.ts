import { EOL } from 'os';
import {
    Event,
    EventEmitter,
    MarkdownString,
    ThemeIcon,
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState
} from 'vscode';
import { Configuration } from '../configuration/configuration';
import { SessionItem } from '../configuration/interface';
import { TerminalApi, TerminalItem } from '@vscode-utility/terminal-browserify';

export type SessionTreeItem = TreeItem & {
    sessionId?: string;
    terminalArrayIndex?: number; //  index of array
};

export class SessionProvider implements TreeDataProvider<SessionTreeItem> {
    private _onDidChangeTreeData: EventEmitter<SessionTreeItem | undefined | void> = new EventEmitter<
        SessionTreeItem | undefined | void
    >();
    readonly onDidChangeTreeData: Event<SessionTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: SessionTreeItem): SessionTreeItem {
        return element;
    }

    async getChildren(parentTreeItem?: SessionTreeItem): Promise<SessionTreeItem[]> {
        // Read the config
        const configInstance = Configuration.instance();
        const isDefinedSessionFile = await configInstance.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            return [];
        }

        // Check the size of sessions
        const config = await configInstance.load();
        if (!config || !config.sessions) {
            return [];
        }

        // Generate parent items if no element is passed.
        if (!parentTreeItem) {
            return Object.entries(config.sessions).map(([label, value]) => this.renderSessionTreeItem(label, value));
        }

        // Generate child items if parent element is passed.
        const { sessionId, terminalArrayIndex } = parentTreeItem;
        if (!sessionId) {
            return [];
        }

        // For terminal array
        const terminals = config.sessions[sessionId];
        if (terminalArrayIndex === undefined) {
            return terminals.map((terminal, arrayIndex) => {
                if (Array.isArray(terminal)) {
                    return this.renderTerminalArrayTreeItem(parentTreeItem, terminal, arrayIndex);
                }
                return this.renderTerminalTreeItem(parentTreeItem, terminal, arrayIndex);
            });
        }

        // For terminal
        const terminalArray = terminals[terminalArrayIndex];
        if (!Array.isArray(terminalArray)) {
            return [];
        }
        return terminalArray.map((value) => this.renderTerminalTreeItem(parentTreeItem, value, terminalArrayIndex));
    }

    private renderSessionTreeItem = (label: string, sessions: SessionItem[]): SessionTreeItem => {
        const terminalNames = sessions.map((s) => (Array.isArray(s) ? `[${s.map((v) => v.name).join(', ')}]` : s.name));
        const tooltip = new MarkdownString(`### **${label}**${EOL}${terminalNames.map((t) => `- ${t}`).join(EOL)}`);
        return {
            label,
            description: terminalNames.join(', '),
            tooltip,
            contextValue: 'session-context',
            iconPath: new ThemeIcon('versions'),
            sessionId: label,
            collapsibleState: TreeItemCollapsibleState.Collapsed
        };
    };

    private renderTerminalArrayTreeItem = (
        parent: SessionTreeItem,
        terminals: TerminalItem[],
        terminalArrayIndex?: number
    ): SessionTreeItem => {
        const { sessionId } = parent;
        const label = terminals.map((t) => t.name).join(', ');
        const tooltip = new MarkdownString(`### **[${label}]**${EOL}`).appendMarkdown(
            terminals
                .map(
                    ({ name, commands, joinOperator }) =>
                        `- ${name}${EOL}\`\`\`sh${EOL}${commands?.join(
                            TerminalApi.instance().getJoinOperator(joinOperator)
                        )}${EOL}\`\`\`${EOL}`
                )
                .join(EOL)
        );
        return {
            label: `[${label}]`,
            description: '',
            tooltip,
            contextValue: 'terminal-array-context',
            iconPath: new ThemeIcon('array'),
            sessionId,
            terminalArrayIndex,
            collapsibleState: TreeItemCollapsibleState.Collapsed
        };
    };

    private renderTerminalTreeItem = (
        parent: SessionTreeItem,
        terminal: TerminalItem,
        terminalArrayIndex?: number
    ): SessionTreeItem => {
        const { sessionId } = parent;
        const { name: terminalName, commands, joinOperator } = terminal;
        const terminalCommands = commands?.join(TerminalApi.instance().getJoinOperator(joinOperator));
        const tooltip = new MarkdownString(`### **${terminalName}**`).appendCodeblock(`${terminalCommands}`, 'sh');
        return {
            label: terminalName,
            description: terminalCommands,
            tooltip,
            contextValue: 'terminal-context',
            iconPath: new ThemeIcon('terminal'),
            sessionId,
            terminalArrayIndex,
            // command: {
            //     title: `View the commands of the terminal '${terminalName}'`,
            //     command: extCommands.refreshCommandActivity,
            //     arguments: [sessionId, terminalArrayIndex, terminalName]
            // }
        };
    };
}
