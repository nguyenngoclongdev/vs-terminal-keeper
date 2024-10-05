import { workspace } from 'vscode';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const separator = ': ##';

const buildCommands = (content: string): Record<string, string> => {
    const makefile = content.split('\n');
    const commands: Record<string, string> = {};
    for (let i = 0; i < makefile.length; i++) {
        const line = makefile[i];
        if (line.indexOf(separator) !== -1) {
            const command = line.split(separator)[0];
            commands[line] = command;
        }
    }
    return commands;
};

export const extractMakefileCommands = async (filePath: string): Promise<Record<string, string> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
