# Terminal Keeper

`Terminal Keeper` core contribution guide.

## Initial Setup

Fork `Terminal Keeper` on GitHub and/or Git clone the default branch:

```shell
# clone your fork
git clone https://github.com/<GITHUB_USER>/Terminal Keeper.git
# or clone vs-terminal-keeper
git clone https://github.com/nguyenngoclongdev/vs-terminal-keeper.git
```

## Development

It is best to format, lint and test your code locally before you commit or push to the remote. Use the following scripts/commands:

```shell
# Lint
npm run lint

# Fix & Format
npm run lint --fix

# Build: for desktop extension
npm run build

# Build: for web extension
npm run build:webext

# Once you decide you want to do a release, you can run
npm run cs
```

## Pull Requests, Releases & Conventional Commits

`Terminal Keeper` is using an automated release tool called [Changesets Release Action](https://github.com/changesets/action) to automatically bump the [SemVer](https://semver.org/) version and generate the [Changelog](https://github.com/nguyenngoclongdev/vs-terminal-keeper/blob/main/CHANGELOG.md). This information is determined by reading the commit history since the last release.
