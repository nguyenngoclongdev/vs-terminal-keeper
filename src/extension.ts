import { ExtensionContext, Uri, commands, env, window } from 'vscode';
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
import { TKTreeItem, TreeProvider } from './explorer/tree-provider';
import { extCommands } from './utils/constants';

export async function activate(context: ExtensionContext) {
    // Init configuration
    await Configuration.initialize();

    // Subscriptions commands
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
            const cwd = uri?.fsPath;
            await activeAsync(cwd);
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

    // Init tree data provider
    const treeProvider = new TreeProvider();
    window.registerTreeDataProvider('terminalKeeperActivityView', treeProvider);
    context.subscriptions.push(
        commands.registerCommand(extCommands.refresh, async () => treeProvider.refresh()),
        commands.registerCommand(extCommands.activeSessionActivity, async (sessionTreeItem: TKTreeItem) => {
            const { sessionId } = sessionTreeItem;
            await activeBySessionAsync(sessionId, true);
        }),
        commands.registerCommand(extCommands.activeTerminalActivity, async (sessionTreeItem: TKTreeItem) => {
            const { sessionId, terminalArrayIndex, label, contextValue } = sessionTreeItem;
            if (contextValue === 'terminal-array-context') {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, undefined);
            } else {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, label as string);
            }
        }),
        commands.registerCommand(extCommands.copyCommandActivity, async (sessionTreeItem: TKTreeItem) => {
            const { description } = sessionTreeItem;
            env.clipboard.writeText(`${description || ''}`);
        })
    );

    // Watch configuration file changed
    Configuration.watch(() => treeProvider.refresh());

    // Run on startup
    const { $schema = '', activateOnStartup = false, active } = await Configuration.load();
    if ($schema && !$schema.includes(configFileVersions.latest)) {
        await commands.executeCommand(extCommands.migrate);
    }
    if (activateOnStartup) {
        await activeBySessionAsync(active);
    }
}

export async function deactivate() {
    window.showInformationMessage('[Terminal Keeper] Goodbye.');
}
