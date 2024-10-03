import { TerminalApi, TerminalItem } from '@vscode-utility/terminal-browserify';
import { EOL } from 'os';
import {
    Event,
    EventEmitter,
    MarkdownString,
    ThemeColor,
    ThemeIcon,
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState
} from 'vscode';
import { Configuration } from '../configuration/configuration';
import { SessionItem } from '../configuration/interface';

export class TKTreeItem extends TreeItem {
    sessionId: string | undefined;
    terminalArrayIndex: number | undefined;
    children: TKTreeItem[] | undefined;

    constructor(label: string, children?: TKTreeItem[]) {
        super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Collapsed);
        this.children = children;
    }
}

export class TreeProvider implements TreeDataProvider<TKTreeItem> {
    private _onDidChangeTreeData: EventEmitter<TKTreeItem | undefined | void> = new EventEmitter<
        TKTreeItem | undefined | void
    >();
    readonly onDidChangeTreeData: Event<TKTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TKTreeItem): TKTreeItem {
        return element;
    }

    async getChildren(element?: TKTreeItem | undefined): Promise<TKTreeItem[] | undefined> {
        if (element === undefined) {
            return await this.getData();
        }
        return element.children;
    }

    getData = async () => {
        // Read the config
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            return [];
        }

        // Check the size of sessions
        const config = await Configuration.load();
        if (!config) {
            return [];
        }

        // Config display items
        const {
            active = 'default',
            activateOnStartup = false,
            keepExistingTerminals = false,
            noClear = false,
            theme = 'default',
            sessions = []
        } = config;

        // Get experimental config
        const killProcess = Configuration.getExperimentalConfig<boolean>('killProcess');
        const isWSLSupport = Configuration.getExperimentalConfig<boolean>('wslSupport');

        // Generate tree item.
        return [
            this.renderParentItem({
                label: 'Global Config',
                value: '',
                defaultValue: '',
                icon: { id: 'wrench' },
                userConfigs: Configuration.userConfigKeys,
                collapsibleState: TreeItemCollapsibleState.Expanded,
                children: [
                    this.renderParentItem({
                        label: 'active',
                        value: active,
                        defaultValue: 'default',
                        icon: { id: 'star-full' },
                        userConfigs: Configuration.userConfigKeys
                    }),
                    this.renderParentItem({
                        label: 'activateOnStartup',
                        value: activateOnStartup,
                        defaultValue: false,
                        icon: { id: 'github-action' },
                        userConfigs: Configuration.userConfigKeys
                    }),
                    this.renderParentItem({
                        label: 'keepExistingTerminals',
                        value: keepExistingTerminals,
                        defaultValue: false,
                        icon: { id: 'symbol-misc' },
                        userConfigs: Configuration.userConfigKeys
                    }),
                    this.renderParentItem({
                        label: 'noClear',
                        value: noClear,
                        defaultValue: false,
                        icon: { id: 'layers' },
                        userConfigs: Configuration.userConfigKeys
                    }),
                    this.renderParentItem({
                        label: 'theme',
                        value: theme,
                        defaultValue: 'default',
                        icon: { id: 'heart' },
                        userConfigs: Configuration.userConfigKeys
                    }),
                    this.renderParentItem({
                        label: 'killProcess',
                        value: killProcess,
                        defaultValue: false,
                        userConfigs: Configuration.userConfigKeys
                    }),
                    this.renderParentItem({
                        label: 'wslSupport',
                        value: isWSLSupport,
                        defaultValue: false,
                        userConfigs: Configuration.userConfigKeys
                    })
                ]
            }),
            this.renderParentItem({
                label: 'Sessions',
                value: sessions,
                defaultValue: { default: [] },
                icon: { id: 'symbol-misc' },
                userConfigs: Configuration.userConfigKeys,
                collapsibleState: TreeItemCollapsibleState.Expanded,
                children: Object.entries(sessions).map(([sessionName, session]) => {
                    return this.renderSessionItem({
                        label: sessionName,
                        value: session,
                        icon: { id: 'versions' },
                        children: session.map((terminalOrTerminalArray, index) => {
                            if (Array.isArray(terminalOrTerminalArray)) {
                                return this.renderTerminalArrayItem({
                                    terminals: terminalOrTerminalArray,
                                    sessionId: sessionName,
                                    terminalArrayIndex: index,
                                    children: terminalOrTerminalArray.map((t) =>
                                        this.renderTerminalItem({
                                            terminal: t,
                                            sessionId: sessionName,
                                            terminalArrayIndex: index
                                        })
                                    )
                                });
                            }
                            return this.renderTerminalItem({
                                terminal: terminalOrTerminalArray,
                                sessionId: sessionName,
                                terminalArrayIndex: index
                            });
                        })
                    });
                })
            })
        ];
    };

    private renderParentItem = (params: {
        label: string;
        value: boolean | string | { [key: string]: any } | undefined;
        defaultValue: boolean | string | { [key: string]: any } | undefined;
        userConfigs: string[];
        children?: TKTreeItem[];
        collapsibleState?: TreeItemCollapsibleState;
        icon?: { id: string; color?: string };
    }): TKTreeItem => {
        const { label, value, defaultValue, icon, collapsibleState, userConfigs, children } = params;
        const { id, color } = icon || {};
        const source = userConfigs.includes(label) ? 'settings.json' : 'sessions.json';
        const item = new TKTreeItem(label, children);
        item.description = `${value}`;
        item.tooltip = new MarkdownString(`### **${label}**: \`${value}\``)
            .appendCodeblock(`Default Value: ${defaultValue}`)
            .appendCodeblock(`Config Source: ${source}`);
        item.contextValue = 'overview-context';
        item.iconPath = new ThemeIcon(id || 'microscope', color);
        if (collapsibleState) {
            item.collapsibleState = collapsibleState;
        }
        return item;
    };

    private renderSessionItem = (params: {
        label: string;
        value: SessionItem[];
        children?: TKTreeItem[];
        icon?: { id: string; color?: string };
    }): TKTreeItem => {
        const { label, value, icon, children } = params;
        const { id, color } = icon || {};

        const terminalNames = value.map((s) => (Array.isArray(s) ? `[${s.map((v) => v.name).join(', ')}]` : s.name));
        const item = new TKTreeItem(label, children);
        (item.description = terminalNames.join(', ')),
            (item.tooltip = new MarkdownString(
                `### **${label}**${EOL}${terminalNames.map((t) => `- ${t}`).join(EOL)}`
            ));
        item.contextValue = 'session-context';
        if (id) {
            item.iconPath = new ThemeIcon(id, color);
        }
        item.sessionId = label;
        item.collapsibleState = TreeItemCollapsibleState.Collapsed;
        return item;
    };

    private renderTerminalArrayItem = (params: {
        terminals: TerminalItem[];
        children?: TKTreeItem[];
        sessionId: string;
        terminalArrayIndex: number;
    }): TKTreeItem => {
        const { terminals, children, sessionId, terminalArrayIndex } = params;

        const label = terminals.map((t) => t.name).join(', ');
        const item = new TKTreeItem(`[${label}]`, children);
        item.description = '';
        item.tooltip = new MarkdownString(`### **[${label}]**${EOL}`).appendMarkdown(
            terminals
                .map(
                    ({ name, commands, joinOperator }) =>
                        `- ${name}${EOL}\`\`\`sh${EOL}${commands?.join(
                            TerminalApi.instance().getJoinOperator(joinOperator)
                        )}${EOL}\`\`\`${EOL}`
                )
                .join(EOL)
        );
        item.contextValue = 'terminal-array-context';
        item.iconPath = new ThemeIcon('array');
        item.sessionId = sessionId;
        item.terminalArrayIndex = terminalArrayIndex;
        item.collapsibleState = TreeItemCollapsibleState.Collapsed;
        return item;
    };

    private renderTerminalItem = (params: {
        terminal: TerminalItem;
        sessionId: string;
        terminalArrayIndex: number;
    }): TKTreeItem => {
        const { terminal, sessionId, terminalArrayIndex } = params;
        const { name: terminalName = '(empty)', commands, icon, color, joinOperator } = terminal;
        const terminalCommands = commands?.join(TerminalApi.instance().getJoinOperator(joinOperator));

        const item = new TKTreeItem(terminalName);
        item.description = terminalCommands;
        item.tooltip = new MarkdownString(`### **${terminalName}**`).appendCodeblock(`${terminalCommands}`, 'sh');
        item.contextValue = 'terminal-context';
        item.iconPath = new ThemeIcon(icon || 'terminal', new ThemeColor(color || ''));
        item.sessionId = sessionId;
        item.terminalArrayIndex = terminalArrayIndex;
        return item;
    };
}
