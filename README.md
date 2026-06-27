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

Terminal Keeper helps you define, launch, and manage repeatable VS Code terminal sessions. Create named sessions for your projects, restore them automatically when VS Code starts, import commands from common project files, and keep terminals recognizable with colors, icons, and themes.

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

## Installation

Install Terminal Keeper from one of these registries:

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
- [Open VSX Registry](https://open-vsx.org/extension/nguyenngoclong/terminal-keeper)

## Why use Terminal Keeper?

Terminal Keeper is useful when you often open the same terminals for a project, such as a dev server, test watcher, background worker, or documentation server. Instead of reopening and retyping commands manually, save those workflows as sessions and activate them when you need them.

## Highlights

* 🚀 **Launch repeatable terminal workflows** with a single command.
* 🔄 **Automatically restore sessions** whenever VS Code starts.
* 🗂️ **Organize terminals into named sessions** for different projects or environments.
* 📥 **Import commands** from `package.json`, `composer.json`, `Makefile`, `Pipfile`, Gradle, Ant, Grunt, Gulp, and more.
* 🎨 **Customize terminal colors and icons** or let Terminal Keeper generate them automatically.
* ⌨️ **Run terminals directly from keyboard shortcuts** using built-in keybinding support.
* 🧩 **Works with both Visual Studio Marketplace and Open VSX.**
* 🚫 **No ads. No telemetry. No unnecessary setup.**

## Features

### Session Management

* **Named terminal sessions** – Organize terminals into reusable sessions for different workflows.
* **Automatic startup activation** – Restore your preferred session automatically when VS Code starts.
* **Session picker** – Quickly switch between saved sessions from the Command Palette.
* **Session cleanup** – Remove sessions you no longer need with a single command.

### Productivity

* **Workspace configuration** – Generate a starter configuration and customize it for each workspace.
* **Command importing** – Import commands from common project files instead of writing them manually.
* **Activity Bar integration** – Create, edit, activate, copy, import, and manage sessions from a dedicated explorer view.
* **Keybinding support** – Launch a terminal or session directly from your own keyboard shortcuts.

### Customization

* **Terminal themes** – Assign colors and icons manually or let Terminal Keeper generate consistent themes automatically.
* **Split terminal layouts** – Define both regular and split terminals inside a session.
* **Flexible terminal options** – Configure working directory, environment variables, shell, focus behavior, startup messages, and more.

### Coming Soon

* **Save existing terminal sessions** – VS Code currently doesn't expose enough terminal state through its API to recreate running terminals exactly as they are. Support will be added if the API makes this possible in the future.

## Quick start

![Activate the last used terminal session](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-default-session.gif)

1. Open the Command Palette using Ctrl + Shift + P (Windows) or Cmd + Shift + P (macOS).
2. Type Terminal Keeper and select your desired action, such as:
   - Generate Configuration
   - Open Configuration
   - Activate Session
   - Import Session
   - Remove Session

> If this is your first time using Terminal Keeper, you'll be prompted to generate a configuration. Choose "Yes" to create and customize your settings.

A typical workflow looks like this:

1. Generate a configuration file for the current workspace.
2. Add or edit sessions in the generated configuration.
3. Activate a session from the Command Palette or Terminal Keeper Activity Bar view.
4. Reuse that session whenever you return to the project.

### Built-in themes

<p align="center">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-theme.png">
</p>

Built-in themes automatically assign consistent colors and icons to terminals based on their names, making large workspaces much easier to navigate at a glance.
Prefer a different look every time? Switch to the **Dice** theme for randomly generated colors and icons.

### Activity Bar integration ✨

Manage all your terminal sessions from a dedicated Activity Bar view. Create, edit, activate, duplicate, import, or remove sessions without leaving the explorer.

![Terminal Keeper Activity Bar](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-activity.gif)

### Import sessions from project files ✨

Skip the manual setup by importing commands directly from common project files such as `package.json`, `composer.json`, `Makefile`, `Pipfile`, Gradle, Ant, Grunt, and Gulp.

![Terminal Keeper Import](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-import.gif)

### Generate configuration

Generate a ready-to-use configuration file for the current workspace. Start with sensible defaults and customize sessions as your project grows.

![Generate configuration templates](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/generate-configuration.gif)

### Activate on startup

Automatically restore your preferred terminal session whenever you open the workspace, so your development environment is ready to go immediately.

![Activate on startup](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-on-startup.gif)

### Distinct random colors and icons

Keep terminals easy to distinguish with automatically generated colors and icons. Every terminal gets its own visual identity without any manual configuration.

![Distinct random colors and icons](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/auto-theme.gif)

### Choose a session to activate

Quickly switch between multiple saved sessions using the Command Palette. Perfect for projects with different development, testing, or deployment workflows.

![Choose a session to activate](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-session.gif)

### Launch sessions in any workspace directory

Start a session from the current workspace or any folder you choose, making it easy to reuse the same configuration across multiple projects.

![Launch sessions in any workspace directory](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-session-here.gif)

### Remove unwanted sessions

Keep your configuration clean by deleting sessions you no longer use directly from the Command Palette or Activity Bar.

![Remove unwanted sessions](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/remove-session.gif)

### Quick configuration access

Open your Terminal Keeper configuration with a single command whenever you need to review or update your sessions.

![Quick open configuration](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/open-configuration.gif)

## Configuration

Terminal Keeper stores sessions in a configuration object. Each session contains one or more terminals. Use an object for a normal terminal, or an array of terminal objects when you want split terminals.

```ts
{
    // Used to determine which session to use.
    active: string,

    // Activated the session when Visual Studio Code starts up.
    activateOnStartup: boolean,

    // Keep existing terminals open when a session is executed.
    keepExistingTerminals: boolean,

    // Skip running the clear command during initialization.
    noClear: boolean,

    // Theme used to assign terminal colors and icons.
    theme: string,

    // List of terminal sessions. Multiple sessions can be defined, but default must always exist.
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

### Terminal options

Most terminal options mirror the VS Code terminal API. Common options are `name`, `commands`, `cwd`, `color`, `icon`, and `focus`.

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

// Focused the terminal on startup.
focus?: boolean,

// ✨ When true, this terminal will be disabled and not launched during an active session. Useful for temporarily turning off terminals without removing them.
disabled?: boolean
```

### Keybinding support

Run specific terminals directly via keyboard shortcuts by adding custom keybindings to your `keybindings.json`:

```json
{
  "key": "ctrl+shift+t",
  "command": "terminal-keeper.run-terminal-by-name",
  "args": { "name": "dev-server", "session": "default" }
}
```

| Argument  | Required | Description                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------ |
| `name`    | No       | Terminal name to run. If omitted, shows a picker with all available terminals. |
| `session` | No       | Limit search to a specific session.                                            |

### Optional: hide terminal commands in Explorer descriptions

By default, Terminal Keeper shows the commands for each terminal as a description in the explorer tree view. If you prefer a cleaner look, you can hide these descriptions by setting the following option in your VS Code settings:

```json
"terminal-keeper.hideCommandsInExplorerDescriptions": true
```

This will remove the command text from the explorer tree items, showing only the terminal names.

## Troubleshooting

### `posix_spawnp failed` terminal launch error

If you see this VS Code message:

```text
The terminal process failed to launch: A native exception occurred during launch (posix_spawnp failed.).
```

The failure usually means VS Code could not start a terminal process. It is typically caused by shell configuration, PATH issues, or conflicts with local system tools rather than Terminal Keeper itself.

Try these steps first:

1. Close all VS Code windows and reopen the project.
2. Restart your computer if the issue continues.
3. Check your VS Code terminal profile and shell path settings.
4. Review the official VS Code terminal troubleshooting guide: https://code.visualstudio.com/docs/supporting/troubleshoot-terminal-launch

Please open a Terminal Keeper issue only if the terminal launches normally without this extension but fails specifically when Terminal Keeper activates a session.

## Feedback

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/nguyenngoclongdev/vs-terminal-keeper/issues).

## License

This extension is licensed under the [MIT License](LICENSE)
