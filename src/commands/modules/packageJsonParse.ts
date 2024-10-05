import { fs } from '@vscode-utility/fs-browserify';

const getFileContent = async (filePath: string): Promise<string> => {
    return await fs.readFileAsync(filePath);
};

const buildCommands = (content: string): Record<string, string> => {
    const packageJson = JSON.parse(content);
    const { scripts } = packageJson || {};
    return scripts;
};

export const extractPackageJsonCommands = async (filePath: string): Promise<Record<string, string> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
