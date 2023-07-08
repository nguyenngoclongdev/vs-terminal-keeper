<p align="center">
  <img src="images/logo.png" width="120" height="120" />
</p>

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/nguyenngoclong.terminal-keeper)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
[![Open VSX Installs](https://img.shields.io/open-vsx/dt/nguyenngoclong/terminal-keeper?color=%2396C41F&label=open-vsx)](https://open-vsx.org/extension/nguyenngoclong/terminal-keeper)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/nguyenngoclong.terminal-keeper?label=vs-marketplace)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/nguyenngoclong.terminal-keeper)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
[![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/nguyenngoclong.terminal-keeper)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

# Terminal Keeper

<p align="center">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-showcase.gif">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-showcase-reverse.gif">
</p>

This extension is designed to allows users to store and manage their terminal sessions. With Terminal Keeper, users can easily save and recall previous terminal sessions, create new sessions, and edit or delete existing ones. Terminal Keeper makes managing terminal sessions in VSCode simpler and more convenient than ever before.

The source code is not open source. You can report any bugs or feature requests here.

If you find this extension useful for your projects, please consider supporting me by [Buy Me a Coffee](https://ko-fi.com/D1D2LBPX9). It's a great way to help me maintain and improve this tool in the future. Your support is truly appreciated!

<a href='https://ko-fi.com/D1D2LBPX9' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee' />
</a>

# Installation

Get it from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper) or [Open VSX Registry](https://open-vsx.org/extension/nguyenngoclong/terminal-keeper).

# Features

-   Generate configuration templates automatically.
-   Automatically activate the last used terminal session when starting up.
-   Choose which terminal session to activate.
-   Remove unwanted terminal sessions.
-   Multiple built-in themes are available for terminal icons and colors.
-   ~~Save the current terminal session~~ (this feature is currently disabled due to limitations in the VSCode API. We are unable to detect certain features such as icons, colors, and split terminals. We may re-enable this feature if the VSCode API provides full support for these features.)

## Using the extension

![Activate the last used terminal session](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-default-session.gif)

1. Open the Command Palette with `Ctrl + Shift + P` on Windows or `Cmd + Shift + P` on macOS.
2. In the Command Palette, type `Terminal Keeper` and select the action you want to perform, such as "Activate Terminal Session", "Open Configuration" or "Remove Terminal Session".
    - If this is your first time using `Terminal Keeper`, you will be prompted with the question "Would you like to generate the configuration?" Select "Yes" to automatically generate the configuration and customize it for your use.
    - If the configuration already exists, Terminal Keeper will automatically activate the terminal session you choose.

### Built-in themes

<p align="center">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-theme.png">
</p>

Usually, the color and icon are chosen randomly based on the terminal name or group. However, if you don't want that, you can use the `Dice` theme to have a random color and icon each time you activate a terminal session.

### Generate configuration templates

![Generate configuration templates](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/generate-configuration.gif)

### Active on startup

![Active on startup](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-on-startup.gif)

### Automatically generate a terminal with distinct random colors and icons based on the name of the terminal

![Active on startup](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/auto-theme.gif)

### Choose which terminal session to activate

![Choose which terminal session to activate](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-session.gif)

### Remove unwanted terminal sessions

![Remove unwanted terminal sessions](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/remove-session.gif)

### Quick open configuration

![Quick open configuration](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/open-configuration.gif)

## Configuration

```ts
{
    // Used to determine which session to use.
    active: string,

    // Activated the session when Visual Studio Code starts up.
    activateOnStartup: boolean,

    // Keep existing terminals open when a session is executed.
    keepExistingTerminals: boolean,

    // The theme can either automatically select colors/icons or manually.
    theme: string,

    // List of terminal sessions, multiple terminal sessions can be defined, but a default session must always exist.
    sessions: {

        // The default session
        default: [
            // Define the Non Split Terminal
            {
                name: string,
                commands: Array<string>
                // For more options, you can refer to the Terminal Options section.
            },

            // Define the Split Terminal
            [
                {
                    name: string,
                    commands: Array<string>
                },
                {
                    name: string,
                    commands: Array<string>
                }
            ]
        ],

        // Your defined session
        custom: [
            {
                name: string,
                commands: Array<string>
            },
            [
                {
                    name: string,
                    commands: Array<string>
                },
                {
                    name: string,
                    commands: Array<string>
                }
            ]
        ]
    }
}
```

### Terminal Options

```ts
// A human-readable string which will be used to represent the terminal in the UI.
name: string,

// The command list.
commands: Array<string>,

// Automatically execute the specified commands.
autoExecuteCommands?: boolean,

// A path or Uri for the current working directory to be used for the terminal.
cwd?: string,

// The id of the color. The available colors are listed in https://code.visualstudio.com/docs/getstarted/theme-color-reference.
color?: string,

// The id of the icon. The available icons are listed in https://code.visualstudio.com/api/references/icons-in-labels#icon-listing.
icon?: string,

// Object with environment variables that will be added to the editor process.
env?: object,

// When enabled the terminal will run the process as normal but not be surfaced to the user until Terminal.show is called. The typical usage for this is when you need to run something that may need interactivity but only want to tell the user about it when interaction is needed. Note that the terminals will still be exposed to all extensions as normal.
hideFromUser?: boolean,

// Opt-out of the default terminal persistence on restart and reload. This will only take effect when terminal.integrated.enablePersistentSessions is enabled.
isTransient?: boolean,

// A message to write to the terminal on first launch, note that this is not sent to the process but, rather written directly to the terminal. This supports escape sequences such a setting text style.
message?: string,

// Args for the custom shell executable. A string can be used on Windows only which allows specifying shell args in command-line format.
shellArgs?: Array<string>,

// A path to a custom shell executable to be used in the terminal.
shellPath?: string,

// Whether the terminal process environment should be exactly as provided in TerminalOptions.env. When this is false (default), the environment will be based on the window's environment and also apply configured platform settings like terminal.integrated.env.windows on top. When this is true, the complete environment must be provided as nothing will be inherited from the process or any configuration.
strictEnv?: boolean
```

## Troubleshoot

If you see the error message `The terminal process failed to launch: A native exception occurred during launch (posix_spawnp failed.).` while running your vscode, it's important to know that this error is not caused by the `Terminal Keeper`, but rather by VSCode itself. Therefore, it's recommended that you don't submit an issue to `Terminal Keeper` regarding this error.

This error is usually caused by VSCode's inability to start a new terminal process. There could be various reasons why this error occurs, such as incorrect configuration or conflicts with other programs on your system.

If you encounter this error, you can try quitting all instances of VSCode and reopening it, or restarting your computer to see if the problem is resolved. If the problem persists, you can refer to the troubleshooting guide provided by VSCode or seek help from the VSCode community through forums or support pages.

You can find more information about this error and how to troubleshoot it at this link: https://code.visualstudio.com/docs/supporting/troubleshoot-terminal-launch

## Feedback

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#qna).

## LICENSE

This extension is licensed under the [MIT License](LICENSE)
