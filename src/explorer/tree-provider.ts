import { TerminalApi, TerminalItem, ThemeService } from '@vscode-utility/terminal-browserify';
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
import { extCommands } from '../utils/constants';

export class TKTreeItem extends TreeItem {
    sessionId: string | undefined;
    terminalArrayIndex: number | undefined;
    children: TKTreeItem[] | undefined;

    // Use to navigate to json
    source: 'settings.json' | 'sessions.json' | undefined;
    keywords: string[] | undefined;

    // These are already defined in TreeItem, but TS may need explicit redeclaration for assignment
    description?: string;
    tooltip?: string | MarkdownString;
    contextValue?: string;
    iconPath?: any;
    command?: any;

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
        const themeService = new ThemeService(theme);
        return [
            this.renderGroupItem({
                label: 'Global Configs',
                icon: { id: 'wrench' },
                collapsibleState: TreeItemCollapsibleState.Collapsed,
                children: [
                    this.renderConfigItem({
                        label: 'active',
                        value: active,
                        defaultValue: 'default'
                    }),
                    this.renderConfigItem({
                        label: 'activateOnStartup',
                        value: activateOnStartup,
                        defaultValue: false
                    }),
                    this.renderConfigItem({
                        label: 'keepExistingTerminals',
                        value: keepExistingTerminals,
                        defaultValue: false
                    }),
                    this.renderConfigItem({
                        label: 'noClear',
                        value: noClear,
                        defaultValue: false
                    }),
                    this.renderConfigItem({
                        label: 'theme',
                        value: theme,
                        defaultValue: 'default'
                    }),
                    this.renderConfigItem({
                        label: 'killProcess',
                        value: killProcess,
                        defaultValue: false,
                        icon: { id: 'microscope' }
                    }),
                    this.renderConfigItem({
                        label: 'wslSupport',
                        value: isWSLSupport,
                        defaultValue: false,
                        icon: { id: 'microscope' }
                    })
                ]
            }),
            this.renderGroupItem({
                label: 'Sessions',
                icon: { id: 'layers' },
                collapsibleState: TreeItemCollapsibleState.Expanded,
                children: Object.entries(sessions).map(([sessionName, session]) => {
                    return this.renderSessionItem({
                        label: sessionName,
                        value: session,
                        children: session.map((terminalOrTerminalArray, index) => {
                            if (Array.isArray(terminalOrTerminalArray)) {
                                const terminalGroupName = terminalOrTerminalArray?.[0].name;
                                return this.renderTerminalArrayItem({
                                    terminals: terminalOrTerminalArray,
                                    sessionId: sessionName,
                                    terminalArrayIndex: index,
                                    children: terminalOrTerminalArray.map((t) =>
                                        this.renderTerminalItem({
                                            terminal: t,
                                            theme: themeService,
                                            sessionId: sessionName,
                                            terminalArrayIndex: index,
                                            terminalGroupName
                                        })
                                    )
                                });
                            }
                            return this.renderTerminalItem({
                                terminal: terminalOrTerminalArray,
                                theme: themeService,
                                sessionId: sessionName,
                                terminalArrayIndex: index,
                                terminalGroupName: terminalOrTerminalArray.name
                            });
                        })
                    });
                })
            })
        ];
    };

    private renderGroupItem = (params: {
        label: string;
        children?: TKTreeItem[];
        collapsibleState?: TreeItemCollapsibleState;
        icon: { id: string; color?: string };
    }): TKTreeItem => {
        const { label, icon, collapsibleState, children } = params;
        const { id, color } = icon || {};
        const item = new TKTreeItem(label, children);
        item.contextValue = 'overview-context';
        item.iconPath = new ThemeIcon(id, color);
        if (collapsibleState) {
            item.collapsibleState = collapsibleState;
        }
        return item;
    };

    private renderConfigItem = (params: {
        label: string;
        value: boolean | string | { [key: string]: any } | undefined;
        defaultValue: boolean | string | { [key: string]: any } | undefined;
        children?: TKTreeItem[];
        icon?: { id: string; color?: string };
    }): TKTreeItem => {
        const { label, value, defaultValue, icon, children } = params;
        const { id, color } = icon || {};
        const source = Configuration.userConfigKeys.includes(label) ? 'settings.json' : 'sessions.json';
        const item = new TKTreeItem(label, children);
        item.description = `${value}`;
        item.tooltip = new MarkdownString(`### **${label}**: \`${value}\``)
            .appendCodeblock(`Default Value: ${defaultValue}`)
            .appendCodeblock(`Config Source: ${source}`);
        item.contextValue = 'overview-context';
        item.iconPath = new ThemeIcon(id || 'circle-filled', color);
        item.source = source;
        item.keywords =
            source === 'settings.json'
                ? [
                      `"${Configuration.wsConfigurationSpace}.${label}": ${value}`,
                      `"${Configuration.wsConfigurationSpace}.${label}": "${value}"`
                  ]
                : [`"${label}": ${value}`, `"${label}": "${value}"`];
        item.command = {
            title: 'Navigate to configuration',
            command: extCommands.navigateActivity,
            arguments: [item]
        };
        return item;
    };

    private renderSessionItem = (params: {
        label: string;
        value: SessionItem[];
        children?: TKTreeItem[];
    }): TKTreeItem => {
        const { label, value, children } = params;

        const hideCommandsInExplorerDescriptions =
            Configuration.getExperimentalConfig<boolean>('hideCommandsInExplorerDescriptions') ?? false;
        const terminalNames = value.map((s) => (Array.isArray(s) ? `[${s.map((v) => v.name).join(', ')}]` : s.name));
        const item = new TKTreeItem(label, children);
        if (!hideCommandsInExplorerDescriptions) {
            item.description = terminalNames.join(', ');
        }
        item.tooltip = new MarkdownString(`### **${label}**${EOL}${terminalNames.map((t) => `- ${t}`).join(EOL)}`);
        item.contextValue = 'session-context';
        item.iconPath = new ThemeIcon('versions');
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
        theme: ThemeService;
        sessionId: string;
        terminalArrayIndex: number;
        terminalGroupName?: string;
    }): TKTreeItem => {
        const { terminal, theme, sessionId, terminalArrayIndex, terminalGroupName } = params;
        const { name: terminalName = '(empty)', commands, joinOperator } = terminal;
        const icon = theme.getIcon(terminal.icon, terminalGroupName, terminalName);
        const color = theme.getColor(terminal.color, terminalGroupName, terminalName);
        const terminalCommands = commands?.join(TerminalApi.instance().getJoinOperator(joinOperator));
        const hideCommandsInExplorerDescriptions =
            Configuration.getExperimentalConfig<boolean>('hideCommandsInExplorerDescriptions') ?? false;

        const item = new TKTreeItem(terminalName);
        if (!hideCommandsInExplorerDescriptions) {
            item.description = terminalCommands;
        }
        item.tooltip = new MarkdownString(`### **${terminalName}**`).appendCodeblock(`${terminalCommands}`, 'sh');
        item.contextValue = 'terminal-context';
        item.iconPath = new ThemeIcon(icon?.id || 'terminal', color);
        item.sessionId = sessionId;
        item.terminalArrayIndex = terminalArrayIndex;
        item.source = 'sessions.json';
        item.keywords = [`"name": "${terminalName}"`];
        item.command = {
            title: 'Navigate to configuration',
            command: extCommands.navigateActivity,
            arguments: [item]
        };
        return item;
    };
}
