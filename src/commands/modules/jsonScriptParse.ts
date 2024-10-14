import { fs } from '@vscode-utility/fs-browserify';

const getFileContent = async (filePath: string): Promise<string> => {
    return await fs.readFileAsync(filePath);
};

const buildCommands = (contents: string): Record<string, string[]> => {
    const scripts: Record<string, string[]> = {};
    const packageJson = JSON.parse(contents);
    Object.entries(packageJson?.scripts ?? {}).forEach(([name, command]) => {
        scripts[name] = Array.isArray(command) ? command : [command];
    });
    return scripts;
};

export const extractJsonScriptCommands = async (filePath: string): Promise<Record<string, string[]> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
