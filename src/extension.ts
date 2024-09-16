import { ExtensionContext, Uri, commands, window } from 'vscode';
import { activeAsync } from './commands/activeAsync';
import { activeBySessionAsync } from './commands/activeBySessionAsync';
import { activeByTerminalAsync } from './commands/activeByTerminalAsync';
import { generateAsync } from './commands/generateAsync';
import { killAllAsync } from './commands/killAllAsync';
import { migrateAsync } from './commands/migrateAsync';
import { openAsync } from './commands/openAsync';
import { removeAsync } from './commands/removeAsync';
import { saveAsync } from './commands/saveAsync';
import { Configuration } from './configuration/configuration';
import { configFileVersions } from './configuration/interface';
import { CommandProvider } from './explorer/command-provider';
import { OverviewProvider } from './explorer/overview-provider';
import { SessionProvider, SessionTreeItem } from './explorer/session-provider';
import { extCommands } from './utils/constants';
import { getWorkspacePath } from './utils/get-workspace';

export async function activate(context: ExtensionContext) {
    context.subscriptions.push(
        // Generate the configuration
        commands.registerCommand(extCommands.generate, async (...args: any[]) => {
            await generateAsync();
        }),
        // Open terminal session
        commands.registerCommand(extCommands.open, async (...args: any[]) => {
            await openAsync();
        }),
        // Active terminal session
        commands.registerCommand(extCommands.active, async (...args: any[]) => {
            const uri = args?.[0] as Uri;
            const workspacePath = getWorkspacePath(uri);
            await activeAsync(workspacePath);
        }),
        // Save terminal session
        commands.registerCommand(extCommands.save, async (...args: any[]) => {
            await saveAsync();
        }),
        // Remove terminal session
        commands.registerCommand(extCommands.remove, async (...args: any[]) => {
            await removeAsync();
        }),
        // Migrate terminal session
        commands.registerCommand(extCommands.migrate, async (...args: any[]) => {
            await migrateAsync();
        }),
        // Kill all terminals
        commands.registerCommand(extCommands.killAll, async (...args: any[]) => {
            await killAllAsync();
        })
    );

    // Init all tree data provider
    const overviewProvider = new OverviewProvider();
    const sessionProvider = new SessionProvider();
    // const commandProvider = new CommandProvider();

    // Register tree data provider
    window.registerTreeDataProvider('terminalKeeperOverviewView', overviewProvider);
    window.registerTreeDataProvider('terminalKeeperSessionView', sessionProvider);
    // window.registerTreeDataProvider('terminalKeeperCommandView', commandProvider);

    // Init command for tree data provider
    context.subscriptions.push(
        commands.registerCommand(extCommands.refresh, async () => {
            overviewProvider.refresh();
            sessionProvider.refresh();
        }),
        // commands.registerCommand(
        //     extCommands.refreshCommandActivity,
        //     async (sessionId: string, terminalArrayIndex: number, terminalName: string) => {
        //         commandProvider.refresh(sessionId, terminalArrayIndex, terminalName);
        //     }
        // ),
        commands.registerCommand(extCommands.activeSessionActivity, async (sessionTreeItem: SessionTreeItem) => {
            const { sessionId } = sessionTreeItem;
            await activeBySessionAsync(sessionId, true);
        }),
        commands.registerCommand(extCommands.activeTerminalActivity, async (sessionTreeItem: SessionTreeItem) => {
            const { sessionId, terminalArrayIndex, label, contextValue } = sessionTreeItem;
            if (contextValue === 'terminal-array-context') {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, undefined);
            } else {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, label as string);
            }
        })
    );

    // Run on startup
    const configInstance = Configuration.instance();
    const { $schema = '', activateOnStartup = false, active } = await configInstance.load();
    if ($schema && !$schema.includes(configFileVersions.latest)) {
        await commands.executeCommand(extCommands.migrate);
    }
    if (activateOnStartup) {
        await activeBySessionAsync(active);
    }

    // Watch configuration file changed
    configInstance.watch(() => {
        overviewProvider.refresh();
        sessionProvider.refresh();
    });
}

export async function deactivate() {
    window.showInformationMessage('[Terminal Keeper] Goodbye.');
}
