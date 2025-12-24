---
"terminal-keeper": minor
---

Add "Run Terminal by Name" command for keybinding support

- New command `terminal-keeper.run-terminal-by-name` that allows running a specific terminal by name
- Supports keybinding args: `{ "name": "terminal-name", "session": "optional-session" }`
- Shows QuickPick with all available terminals when `name` is not provided
- Filters terminals by session when `session` is provided without `name`
- Resolves issue #67
