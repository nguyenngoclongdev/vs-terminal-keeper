# FAQ

If you encounter bugs or would like to suggest a new feature, please open an issue on the [GitHub repository](https://github.com/nguyenngoclongdev/vs-terminal-keeper/issues).
Or you can directly posted on [VSCode Marketplace Q&A](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper&ssr=false#qna)

## A native exception occurred during launch (posix_spawnp failed.)

If you see the error message:

```
The terminal process failed to launch: A native exception occurred during launch (posix_spawnp failed.).
```

This issue is not caused by the Terminal Keeper extension, but rather by VSCode itself. Please do not submit an issue to Terminal Keeper for this error.
This error typically arises when VSCode is unable to start a new terminal process due to various reasons such as incorrect configuration or software conflicts on your system.

Suggested Solutions:

- Close all instances of VSCode and reopen them.
- Restart your computer if the problem persists.

For more detailed troubleshooting, refer to the [VSCode terminal launch troubleshooting guide](https://code.visualstudio.com/docs/supporting/troubleshoot-terminal-launch) or seek help from the VSCode community.

## How can I prevent the terminal from clearing on startup?

To stop the terminal from clearing on startup, modify the `session.json` file by adding the `"noClear": true` option as shown below:

```json
{
    "active": "default",
    "noClear": true, // [!code focus]
    "sessions": {...}
}
```

## How can I focus on a specific terminal upon startup?

> I have a terminal keeper profile with 4 terminals splittet into 2 groups.
> The default behavior ist that the focus is on the last group when the session is activated / on vscode startup.
> But i want to specify which groups/terminal should be focused,

If you have multiple terminal splits and want to focus on a specific one when a session is activated or VSCode starts, you can specify which terminal to focus on by setting `"focus": true` in the `session.json` file.

```json
{
  "active": "default",
  "sessions": {
    "default": [
      {
        "name": "dev",
        "focus": true, // [!code focus]
        "commands": []
      }
    ]
  }
}
```

## How do I change the join operator between commands?

You can customize the join operator between commands using the `joinOperator` option. This allows you to use operators like `;`, `&&`, or `||` to join your commands.

```json
{
  "active": "default",
  "sessions": {
    "default": [
      {
        "name": "dev",
        "joinOperator": "&&", // [!code focus]
        "commands": ["npm run build", "npm run dev"]
      }
    ]
  }
}
```

## Can I specify the height or width of split terminals?

Currently, there is no way to specify the width or height of split terminals. This appears to be a limitation of the current VSCode API.

## Can I specify terminal profiles?

At the moment, there is no way to specify terminal profiles. This is also a limitation of the current VSCode API.
