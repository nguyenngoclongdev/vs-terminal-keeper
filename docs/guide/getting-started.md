# Getting Started

Setting up **Terminal Keeper** is quick and easy. Follow these steps to get started in no time!

## Installation

1. Open Visual Studio Code.
2. Open the Extensions View (Shift+Cmd+P or F1 and type "Extensions: Install Extensions") or (Shift+Cmd+X)
3. Type `Terminal Keeper`
4. Click `Install`

Alternatively, you can install the extension directly from:

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
- [Open VSX](https://open-vsx.org/extension/nguyenngoclong/terminal-keeper)

Or:

1. Open a command-line prompt
2. Run `code --install-extension nguyenngoclong.terminal-keeper`

Once installed, **Terminal Keeper** will appear in your VSCode environment, ready for configuration.

## Using Terminal Keeper

After installation, you can start using **Terminal Keeper** right away. Here's a quick guide to help you get up and running:

![Activate the last used terminal session](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/active-default-session.gif)

The following features will help you get started:

1. Open the Command Palette using `Ctrl + Shift + P` on Windows or `Cmd + Shift + P` on macOS.
2. Type **Terminal Keeper** and select your desired action, such as:
    - **Generate Configuration**: Set up the extension by creating a default configuration.
    - **Open Configuration**: Open the configuration.
    - **Activate Session**: Open a specific session you’ve saved.
    - **Import Session**: Import terminal settings from files.
    - **Remove Session**: Delete any session you no longer need.
    - **Kill All**: Kill all terminals.
    - **Abort All**: Abort all terminals.
    - **Clear All**: Clear all terminals.

### First-Time Setup

When you first use **Terminal Keeper**, you’ll be prompted to create a configuration. Accept this prompt to generate a sessions.json configuration file in the `.vscode` directory. This file will store your terminal settings.


## Configuration

**Terminal Keeper** uses a configuration file named `sessions.json` (located in the `.vscode` folder). This file defines the structure, commands, and visual aspects of your terminal sessions.

### Basic Configuration Example:

Here’s an example configuration template for `sessions.json`:

```json
{
   "active": "default",
   "activateOnStartup": true,
   "keepExistingTerminals": true,
   "theme": "Dice",
   "sessions": {
      "default": [
        {
            "name": "Server",
            "commands": ["npm run dev"]
        },
        [
            {
                "name": "API Server",
                "commands": ["npm run api"]
            },
            {
                "name": "Frontend Server",
                "commands": ["npm start"]
            }
        ]
      ]
   }
}
```

### Explanation of Key Settings:

- `active`: Specifies the default session to be activated (e.g., "default").
- `activateOnStartup`: If true, the default session starts when VSCode launches.
- `keepExistingTerminals`: Determines if existing terminals should remain open when a session starts.
- `theme`: Choose a theme for session colors and icons (e.g., "Dice" for random themes).
- `sessions`: Defines your terminal sessions and their configurations.

You can explore more [advanced configurations](../manage/configuration.md) as you grow familiar with Terminal Keeper!

### Adding Multiple Commands and Terminals

Each terminal can have its own name and commands. Use the following settings for individual terminals within a session:

- `name`: Display name for each terminal (e.g., "Frontend").
- `commands`: List of commands to run in the terminal (e.g., ["npm start"]).

## Next Steps

Now that you're set up, here are a few things you can explore next:
- Personalize your terminal themes to match your style.
- Manage multiple sessions across different projects effortlessly.
- Speed up your workflow with the command import feature.

For more detailed usage and tips, check out our [FAQ](https://github.com/nguyenngoclongdev/vs-terminal-keeper/issues) or visit the [GitHub repository](https://github.com/nguyenngoclongdev/vs-terminal-keeper).