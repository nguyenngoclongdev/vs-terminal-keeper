# Personalization

## Built-in themes

<p align="center">
  <img src="https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/terminal-keeper-theme.png">
</p>

Choose between randomly assigned colors and icons based on the terminal name or opt for the `Dice` theme for a fresh look every time you activate a session.

## Distinct random colors and icons

![Active on startup](https://github.com/nguyenngoclongdev/cdn/raw/HEAD/images/terminal-keeper/auto-theme.gif)

## Specify terminal icon and color

- Built-in icons: https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
- Built-in colors: https://code.visualstudio.com/api/references/theme-color#integrated-terminal-colors

```json
{
  "active": "default",
  "sessions": {
    "default": [
      {
        "name": "dev",
        "icon": "account", // [!code focus]
        "color": "terminal.ansiBlue", // [!code focus]
        "commands": []
      }
    ]
  }
}
```