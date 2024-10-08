import { ExtensionContext, Uri, commands, env, window } from 'vscode';
import { abortAllAsync } from './commands/abortAllAsync';
import { activeAsync } from './commands/activeAsync';
import { activeBySessionAsync } from './commands/activeBySessionAsync';
import { activeByTerminalAsync } from './commands/activeByTerminalAsync';
import { clearAllAsync } from './commands/clearAllAsync';
import { generateAsync } from './commands/generateAsync';
import { importAsync } from './commands/importAsync';
import { killAllAsync } from './commands/killAllAsync';
import { migrateAsync } from './commands/migrateAsync';
import { openAsync } from './commands/openAsync';
import { removeAsync } from './commands/removeAsync';
import { saveAsync } from './commands/saveAsync';
import { Configuration } from './configuration/configuration';
import { configFileVersions } from './configuration/interface';
import { TKTreeItem, TreeProvider } from './explorer/tree-provider';
import { ACTIVITY_VIEW_ID, constants, extCommands, sysCommands } from './utils/constants';

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
        // Clear all terminals
        commands.registerCommand(extCommands.clearAll, async (...args: any[]) => {
            await clearAllAsync();
        }),
        // Abort all terminals
        commands.registerCommand(extCommands.abortAll, async (...args: any[]) => {
            await abortAllAsync();
        }),
        // Kill all terminals
        commands.registerCommand(extCommands.killAll, async (...args: any[]) => {
            await killAllAsync();
        })
    );

    // Init tree data provider
    const treeProvider = new TreeProvider();
    window.registerTreeDataProvider(ACTIVITY_VIEW_ID, treeProvider);
    context.subscriptions.push(
        commands.registerCommand(extCommands.refresh, async () => treeProvider.refresh()),
        commands.registerCommand(extCommands.activeSessionActivity, async (sessionTreeItem: TKTreeItem) => {
            const { sessionId } = sessionTreeItem;
            await activeBySessionAsync(sessionId, true);
        }),
        commands.registerCommand(extCommands.collapseAllActivity, async () => {
            await commands.executeCommand(sysCommands.activityCollapseAll);
        }),
        commands.registerCommand(extCommands.helpAndFeedbackActivity, async () => {
            await env.openExternal(Uri.parse(constants.helpAndFeedbackUrl));
        }),
        commands.registerCommand(extCommands.sendToNewTerminalActivity, async (sessionTreeItem: TKTreeItem) => {
            const { sessionId, terminalArrayIndex, label, contextValue } = sessionTreeItem;
            if (contextValue === 'terminal-array-context') {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, undefined);
            } else {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, label as string);
            }
        }),
        commands.registerCommand(extCommands.sendToCurrentTerminalActivity, async (sessionTreeItem: TKTreeItem) => {
            const { sessionId, terminalArrayIndex, label, description } = sessionTreeItem;
            const { activeTerminal } = window;
            if (activeTerminal) {
                activeTerminal.sendText(`${description || ''}`, false);
            } else {
                await activeByTerminalAsync(sessionId, terminalArrayIndex, label as string);
            }
        }),
        commands.registerCommand(extCommands.copyCommandActivity, async (sessionTreeItem: TKTreeItem) => {
            const { description } = sessionTreeItem;
            env.clipboard.writeText(`${description || ''}`);
        }),
        commands.registerCommand(extCommands.importFromNPMActivity, async () => {
            await importAsync('npm');
        }),
        commands.registerCommand(extCommands.importFromComposerActivity, async () => {
            await importAsync('composer');
        }),
        commands.registerCommand(extCommands.importFromMakeActivity, async () => {
            await importAsync('make');
        }),
        commands.registerCommand(extCommands.importFromGradleActivity, async () => {
            await importAsync('gradle');
        }),
        commands.registerCommand(extCommands.importFromPipenvActivity, async () => {
            await importAsync('pipenv');
        }),
        commands.registerCommand(extCommands.importFromAntActivity, async () => {
            await importAsync('ant');
        }),
        commands.registerCommand(extCommands.importFromGruntActivity, async () => {
            await importAsync('grunt');
        }),
        commands.registerCommand(extCommands.importFromGulpActivity, async () => {
            await importAsync('gulp');
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
