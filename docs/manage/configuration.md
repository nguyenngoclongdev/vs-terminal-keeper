# Configuration

## Generate configuration

![Generate configuration templates](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/generate-configuration.gif)

## Quick configuration access

![Quick open configuration](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/open-configuration.gif)

## Terminal Settings

You can further configure Terminal Keeper through your VSCode settings. Below are some customizable options:

### Session Options

```jsonc
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

```jsonc
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

## Example Configuration

```jsonc
{
  "$schema": "https://cdn.statically.io/gh/nguyenngoclongdev/cdn/main/schema/v10/terminal-keeper.json",
  "theme": "tribe",
  "active": "default",
  "activateOnStartup": true,
  "keepExistingTerminals": false,
  "sessions": {
    "default": [
      {
        "name": "hello",
        "autoExecuteCommands": true,
        "icon": "person",
        "color": "terminal.ansiGreen",
        "commands": ["echo hello"],
      },
      [
        {
          "name": "docker:ros",
          "commands": [""],
        },
        {
          "name": "docker:k8s",
          "commands": [""],
        },
      ],
      [
        {
          "name": "docker:nats",
          "commands": [""],
        },
        {
          "name": "docker:fleet",
          "commands": [""],
        },
      ],
    ],
    "saved-session": [
      {
        "name": "connect",
        "commands": [""],
      },
    ],
  },
}
```
