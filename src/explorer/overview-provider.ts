import { Event, EventEmitter, MarkdownString, ThemeIcon, TreeDataProvider, TreeItem } from 'vscode';
import { Configuration } from '../configuration/configuration';

export type OverviewTreeItem = TreeItem;

export class OverviewProvider implements TreeDataProvider<OverviewTreeItem> {
    private _onDidChangeTreeData: EventEmitter<OverviewTreeItem | undefined | void> = new EventEmitter<
        OverviewTreeItem | undefined | void
    >();
    readonly onDidChangeTreeData: Event<OverviewTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: OverviewTreeItem): OverviewTreeItem {
        return element;
    }

    async getChildren(): Promise<OverviewTreeItem[]> {
        // Read the config
        const configInstance = Configuration.instance();
        const isDefinedSessionFile = await configInstance.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            return [];
        }

        // Check the size of sessions
        const config = await configInstance.load();
        if (!config) {
            return [];
        }

        // Config display items
        const {
            active = 'default',
            activateOnStartup = false,
            keepExistingTerminals = false,
            noClear = false,
            theme = 'default'
        } = config;

        // Get experimental config
        const killProcess = configInstance.getExperimentalConfig<boolean>('killProcess');

        // Generate tree item.
        return Object.entries({
            active: ['default', active],
            activateOnStartup: [false, activateOnStartup],
            keepExistingTerminals: [false, keepExistingTerminals],
            noClear: [false, noClear],
            theme: ['default', theme],
            killProcess: [false, killProcess]
        }).map(([label, value]) => this.renderTreeItem(configInstance.userConfigKeys, label, value[1], value[0]));
    }

    private renderTreeItem = (
        userConfigs: string[],
        label: string,
        value: any,
        defaultValue?: any
    ): OverviewTreeItem => {
        const source = userConfigs.includes(label) ? 'settings.json' : 'sessions.json';
        const tooltip = new MarkdownString(`### **${label}**: \`${value}\``)
            .appendCodeblock(`Default Value: ${defaultValue}`)
            .appendCodeblock(`Config Source: ${source}`);
        const treeItem: OverviewTreeItem = {
            label,
            description: `${value}`,
            tooltip,
            contextValue: 'overview-context'
        };

        switch (label) {
            case '$schema': {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('home')
                };
            }
            case 'active': {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('star-full')
                };
            }
            case 'activateOnStartup': {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('github-action')
                };
            }
            case 'keepExistingTerminals': {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('versions')
                };
            }
            case 'noClear': {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('layers')
                };
            }
            case 'theme': {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('heart')
                };
            }
            default: {
                return {
                    ...treeItem,
                    iconPath: new ThemeIcon('microscope')
                };
            }
        }
    };
}
