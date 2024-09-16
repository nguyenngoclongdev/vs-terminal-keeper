/* eslint-disable @typescript-eslint/naming-convention */
import { TerminalTheme } from '@vscode-utility/terminal-browserify';
import { SessionConfiguration, configFileVersions } from './interface';

export const latestSchema = `https://cdn.statically.io/gh/nguyenngoclongdev/cdn/main/schema${configFileVersions.latest}terminal-keeper.json`;
export const configurationTemplate: SessionConfiguration = {
    $schema: latestSchema,
    theme: TerminalTheme.tribe,
    active: 'default',
    activateOnStartup: true,
    keepExistingTerminals: false,
    sessions: {
        default: [
            {
                name: 'hello',
                autoExecuteCommands: true,
                icon: 'person',
                color: 'terminal.ansiGreen',
                commands: ['echo hello']
            },
            [
                {
                    name: 'docker:ros',
                    commands: ['']
                },
                {
                    name: 'docker:k8s',
                    commands: ['']
                }
            ],
            [
                {
                    name: 'docker:nats',
                    commands: ['']
                },
                {
                    name: 'docker:fleet',
                    commands: ['']
                }
            ]
        ],
        'saved-session': [
            {
                name: 'connect',
                commands: ['']
            }
        ]
    }
};
