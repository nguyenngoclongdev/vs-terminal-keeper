import { TerminalItem } from "@vscode-utility/terminal-browserify";

export const configFileVersions = {
    v1: '/v1/',
    v2: '/v2/',
    v3: '/v3/',
    v4: '/v4/',
    v5: '/v5/',
    v6: '/v6/',
    v7: '/v7/',
    v8: '/v8/',
    v9: '/v9/',
    latest: '/v10/'
};

export type SessionItem = TerminalItem | Array<TerminalItem>;
export interface SessionConfiguration {
    $schema?: string;
    active?: 'default' | string;
    activateOnStartup?: boolean;
    keepExistingTerminals?: boolean;
    noClear?: boolean;
    theme?: string;
    sessions?: {
        default: SessionItem[];
        [key: string]: SessionItem[];
    };
}

export type ExtensionConfiguration = Pick<
    SessionConfiguration,
    'activateOnStartup' | 'active' | 'keepExistingTerminals' | 'noClear' | 'theme'
>;
