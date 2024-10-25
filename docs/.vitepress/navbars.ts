import fs from "fs";
import path from "path";
import process from "process";

export const getVersion = () => {
  const versionFilepath = path.join(__dirname, "../../package.json");
  try {
    const content = fs.readFileSync(versionFilepath, "utf8");
    const { version } = JSON.parse(content);
    console.log(`Found version ${version} from ${versionFilepath}`);
    return version;
  } catch (error) {
    console.error(`Failed to find version from file ${versionFilepath}`, error);
    process.exit(1);
  }
};

const en = [
  { text: "Guide", link: "/guide/getting-started" },
  {
    text: "Reference",
    link: "/manage/configuration",
  },
  {
    text: getVersion(),
    items: [
      {
        text: "Changelog",
        link: "https://github.com/nguyenngoclongdev/vs-terminal-keeper/blob/main/CHANGELOG.md",
      },
      { text: "Contribute", link: "/contribute/core" },
      {
        text: "VSCode Marketplace",
        link: "https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper",
      },
      {
        text: "Open VSX",
        link: "https://open-vsx.org/extension/nguyenngoclong/terminal-keeper",
      },
    ],
  },
];

export { en };
