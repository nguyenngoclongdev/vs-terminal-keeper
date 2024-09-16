# Terminal Keeper - Contributing Guide 🌟

We're thrilled that you want to contribute to Terminal Keeper, the future of communication! 😄

Terminal Keeper is an open-source project, and we welcome your collaboration. Before you jump in, let's make sure you're all set to contribute effectively and have loads of fun along the way!

## Table of Contents

- [Fork the Repository](#fork-the-repository)
- [Clone Your Fork](#clone-your-fork)
- [Create a New Branch](#create-a-new-branch)
- [Code Like a Wizard](#code-like-a-wizard)
- [Committing Your Work](#committing-your-work)
- [Sync with Upstream](#sync-with-upstream)
- [Open a Pull Request](#open-a-pull-request)
- [Review and Collaboration](#review-and-collaboration)
- [Celebrate 🎉](#celebrate-)

## Fork the Repository

🍴 Fork this repository to your GitHub account by clicking the "Fork" button at the top right. This creates a personal copy of the project you can work on.

## Clone Your Fork

📦 Clone your forked repository to your local machine using the `git clone` command:

```bash
git clone https://github.com/YourUsername/terminal-keeper.git
```

## Create a New Branch

🌿 Create a new branch for your contribution. This helps keep your work organized and separate from the main codebase.

```bash
git checkout -b your-branch-name
```

Choose a meaningful branch name related to your work. It makes collaboration easier!

## Code Like a Wizard

🧙‍♀️ Time to work your magic! Write your code, fix bugs, or add new features. Be sure to follow our project's coding style. You can check if your code adheres to our style using:

```bash
pnpm lint
```

This adds a bit of enchantment to your coding experience! ✨

## Committing Your Work

📝 Ready to save your progress? Commit your changes to your branch.

```bash
git add .
git commit -m "Your meaningful commit message"
```

Please keep your commits focused and clear. And remember to be kind to your fellow contributors; keep your commits concise.

## Sync with Upstream

⚙️ Periodically, sync your forked repository with the original (upstream) repository to stay up-to-date with the latest changes.

```bash
git remote add upstream https://github.com/nguyenngoclongdev/vs-terminal-keeper.git
git fetch upstream
git merge upstream/main
```

This ensures you're working on the most current version of Terminal Keeper. Stay fresh! 💨

## Open a Pull Request

🚀 Time to share your contribution! Head over to the original Terminal Keeper repository and open a Pull Request (PR). Our maintainers will review your work.

## Review and Collaboration

👓 Your PR will undergo thorough review and testing. The maintainers will provide feedback, and you can collaborate to make your contribution even better. We value teamwork!

## Scripts

```sh
"vscode:prepublish": "npm run vscode-desktop:publish && npm run vscode-web:publish",
"vscode-desktop:publish": "npm run esbuild-base -- --minify",
"vscode-web:publish": "npm run compile-web -- --mode production --devtool false",
"esbuild-base": "esbuild ./src/extension.ts --bundle --outfile=dist/extension.js --external:vscode --format=cjs --platform=node",
"esbuild": "npm run esbuild-base -- --sourcemap",
"esbuild-watch": "npm run esbuild-base -- --sourcemap --watch",
"compile": "tsc -p ./",
"watch": "tsc -watch -p ./",
"lint": "eslint src --ext ts",
"cs": "changeset",
"pree2e": "code --uninstall-extension nguyenngoclong.terminal-keeper || true",
"e2e": "vsce package -o ./terminal-keeper.vsix",
"poste2e": "code --install-extension ./terminal-keeper.vsix",
"compile-web": "webpack",
"watch-web": "webpack --watch",
"esbuild-test": "esbuild ./src/__test__/*.ts ./src/__test__/**/*.ts --outdir=./dist/__test__ --format=cjs --platform=node",
"clean-test": "rm -rf src/__test__/fixtures/*.ts",
"pretest": "npm run clean-test && npm run esbuild && npm run esbuild-test",
"test": "node ./dist/__test__/runTest.js",
"posttest": "rm -rf .vscode-test/user-data"
```

## Celebrate 🎉

🎈 Congratulations! Your contribution is now part of Terminal Keeper. 🥳

Thank you for making Terminal Keeper even more magical. We can't wait to see what you create! 🌠

Happy Coding! 🚀🦄