<p align="center">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/logo.png" width="120" height="120" />
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

Elevate your terminal experience! Effortlessly configuration, seamlessly restore your last session, and manage sessions with ease. Personalize your workspace with colorful themes and boost productivity by importing commands swiftly.

If you find this extension useful for your projects, please consider supporting me by [Github](https://github.com/sponsors/nguyenngoclongdev), [Patreon](https://patreon.com/nguyenngoclong), [KO-FI](https://ko-fi.com/nguyenngoclong) or [Paypal](https://paypal.me/longnguyenngoc). It's a great way to help me maintain and improve this tool in the future. Your support is truly appreciated!

[![Github](https://img.shields.io/badge/Github-F15689?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/nguyenngoclongdev)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/nguyenngoclong)
[![KO-FI](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/nguyenngoclong)
[![Paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/longnguyenngoc)

## Our Sponsors ❤️

<a href="https://dev.to/webia1"><img src="https://media2.dev.to/dynamic/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F394714%2F0cab7789-c023-4b2d-a22d-757f369e6fcd.JPG" width="50px" alt="webia1" /></a>
<a href="https://github.com/sponsors/nguyenngoclongdev"><img src="https://raw.githubusercontent.com/nguyenngoclongdev/vs-terminal-keeper/main/assets/sponsor.png" width="35px" alt="sponsor" /></a>

## Our Contributors 🤝

<a href="https://github.com/nguyenngoclongdev/vs-terminal-keeper/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nguyenngoclongdev/vs-terminal-keeper" />
</a>

# Installation

Get it from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper) or [Open VSX Registry](https://open-vsx.org/extension/nguyenngoclong/terminal-keeper).

# Features

-   **Easy Configuration**: Quickly create templates to simplify your terminal setup.
-   **Restore Last Session Automatically**: Start your day smoothly by bringing back your last terminal session when you open the app.
-   **Session Selection**: Choose which terminal session to open with just a few clicks, giving you control over your work.
-   **Session Removal**: Easily delete any terminal sessions you no longer need, keeping your workspace tidy.
-   **Session Saving (Coming Soon)**: Preserve your current terminal session along with its icon, color, and all terminal configurations. (Note: Due to current limitations in the VSCode API, we cannot retrieve the icon, color, or last command from the terminal just yet. We hope to implement this feature in the future if the API allows it!)
-   **Customizable Themes**: Personalize your terminal with a variety of colorful themes for icons and colors that brighten your workspace.
-   **✨ Simple Session Management**: Utilize the Terminal Keeper Activity for effortless session management.
-   **✨ Commands Importing**: Quickly import commands from files like package.json, pipenv, Makefile, grunt, gradle, gulp, ant, and more.

## Using the extension

![Activate the last used terminal session](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-default-session.gif)

1. Open the Command Palette using Ctrl + Shift + P (Windows) or Cmd + Shift + P (macOS).
2. Type Terminal Keeper and select your desired action, such as:
   - Generate Configuration
   - Open Configuration
   - Activate Session
   - Import Session
   - Remove Session

> If this is your first time using Terminal Keeper, you'll be prompted to generate a configuration. Choose "Yes" to create and customize your settings.

### Built-in themes

<p align="center">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-theme.png">
</p>

Choose between randomly assigned colors and icons based on the terminal name or opt for the `Dice` theme for a fresh look every time you activate a session.

### Terminal Keeper activity ✨

![Terminal Keeper Activity](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-activity.gif)

### Import session from different source ✨

![Terminal Keeper Import](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-import.gif)

### Generate configuration

![Generate configuration templates](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/generate-configuration.gif)

### Active on startup

![Active on startup](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-on-startup.gif)

### Distinct random colors and icons

![Active on startup](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/auto-theme.gif)

### Choose session to activate

![Choose which terminal session to activate](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-session.gif)

### Active session in workspace directory

![Active terminal session in your workspace directory](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-session-here.gif)

### Remove unwanted sessions

![Remove unwanted terminal sessions](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/remove-session.gif)

### Quick configuration access

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

    // A Boolean variable indicating whether to execute the clear command during initialization. If the value is true, the clear command will not be executed upon initialization. If the value is false, the clear command will be executed.
    noClear: boolean,

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

// The operators to join multiple commands. e.g. semicolon (;), logical OR (||), logical AND (&&) and more
joinOperator?: string,

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
strictEnv?: boolean,

// ✨ Focused the terminal on startup.
focus?: boolean
```

### Optional: Hide Terminal Commands in Explorer Descriptions

By default, Terminal Keeper shows the commands for each terminal as a description in the explorer tree view. If you prefer a cleaner look, you can hide these descriptions by setting the following option in your VS Code settings:

```json
"terminal-keeper.hideCommandsInExplorerDescriptions": true
```

This will remove the command text from the explorer tree items, showing only the terminal names.

## Troubleshoot

If you see the error message `The terminal process failed to launch: A native exception occurred during launch (posix_spawnp failed.).` while running your vscode, it's important to know that this error is not caused by the `Terminal Keeper`, but rather by VSCode itself. Therefore, it's recommended that you don't submit an issue to `Terminal Keeper` regarding this error.

This error is usually caused by VSCode's inability to start a new terminal process. There could be various reasons why this error occurs, such as incorrect configuration or conflicts with other programs on your system.

If you encounter this error, you can try quitting all instances of VSCode and reopening it, or restarting your computer to see if the problem is resolved. If the problem persists, you can refer to the troubleshooting guide provided by VSCode or seek help from the VSCode community through forums or support pages.

You can find more information about this error and how to troubleshoot it at this link: https://code.visualstudio.com/docs/supporting/troubleshoot-terminal-launch

## Feedback

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/nguyenngoclongdev/vs-terminal-keeper/issues).

## LICENSE

This extension is licensed under the [MIT License](LICENSE)
