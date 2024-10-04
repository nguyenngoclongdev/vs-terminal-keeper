export const extCommands = {
    generate: 'terminal-keeper.generate',
    open: 'terminal-keeper.open',
    active: 'terminal-keeper.active',
    save: 'terminal-keeper.save',
    remove: 'terminal-keeper.remove',
    migrate: 'terminal-keeper.migrate',
    clearAll: 'terminal-keeper.clear-all',
    killAll: 'terminal-keeper.kill-all',
    refresh: 'terminal-keeper.refresh-activity',
    activeSessionActivity: 'terminal-keeper.active-session-activity',
    sendToNewTerminalActivity: 'terminal-keeper.send-to-new-terminal-activity',
    sendToCurrentTerminalActivity: 'terminal-keeper.send-to-current-terminal-activity',
    copyCommandActivity: 'terminal-keeper.copy-command-activity',
    collapseAllActivity: 'terminal-keeper.collapse-all-activity',
    helpAndFeedbackActivity: 'terminal-keeper.help-and-feedback-activity'
};

export const sysCommands = {
    openFolder: 'workbench.action.files.openFolder',
    openWorkspace: 'workbench.action.openWorkspace',
    terminalTabFocus: 'workbench.action.terminal.focus'
};

export const constants = {
    // Common
    defaultSession: 'default',
    helpAndFeedbackUrl: 'https://github.com/nguyenngoclongdev/vs-terminal-keeper/issues',

    // Open the configuration file
    openConfigurationFailed: 'Failed to open the configuration file!',
    openWorkspace: 'Please make sure to open a workspace folder before using Terminal Keeper!',

    // Generate the configuration file
    generateConfigurationTitle: 'Would you like to generate the configuration?',
    generateConfigurationPlaceHolder: 'Choose `Yes` if you want to generate the configuration...',
    generateConfigurationSuccess: 'Generated the configuration successfully!',
    generateConfigurationFailed: 'Failed to generate the configuration!',

    // Active terminal session
    selectSessionActiveTitle: 'Select a session to activate',
    selectSessionActivePlaceHolder: 'Select session...',
    activeSessionFailed: 'Failed to activate the session.',
    activeTerminalFailed: 'Failed to activate the terminal.',
    killTerminalFailed: 'Failed to kill the terminals.',
    clearTerminalFailed: 'Failed to clear the terminals.',
    workingDirNotExist: 'The terminal "{terminal}" cannot find the current working directory "{cwd}".',

    // Valid configuration file
    selectSessionToActive: 'Please select a session to activate. The session "{session}" you choose is null or empty.',
    notExistAnySessions: 'There are no sessions in the configuration file.',
    notExistAnySpitTerminal: 'There are no split terminals for the session "{session}" in the configuration file.',
    selectTerminalToActive: 'Please select a terminal to activate.',
    configurationFileAlreadyExist: 'A configuration file already exists, cannot generate a new one.',

    // Remove the terminal session
    selectSessionRemoveTitle: 'Select a session to remove:',
    selectSessionRemovePlaceHolder: 'Select session...',
    notExistConfiguration: 'The configuration file does not exist.',
    couldNotRemoveDefaultSession: 'The default session cannot be removed.',
    removeSessionSuccess: 'The session was successfully removed!',
    removeSessionFailed: 'Failed to remove the session.',

    // Save the terminal session
    selectSessionSaveTitle: 'Select a session to override or create a new session:',
    selectSessionSavePlaceHolder: 'Select session...',
    enterSessionNameTitle: 'Please enter the session name.',
    enterSessionNamePlaceHolder: 'e.g. database, api',
    sessionNameNotEmpty: 'Session name cannot be null or empty.',
    sessionNameIsDuplicated: 'The session name already exists.',
    saveSessionSuccess: 'The session was successfully saved!',
    saveSessionFailed: 'Failed to save the session.',

    // Migrate the configuration file
    migrateConfigurationFailed: 'The attempt to upgrade to the most recent configuration file schema was unsuccessful!',

    // The components
    yesButton: 'Yes',
    noButton: 'No',
    newSession: 'Create a new session...',
    viewConfigurationButton: 'View Configuration',
    openWorkspaceButton: 'Open Workspace',
    openFolderButton: 'Open Folder',
    viewError: 'View Error'
};
