import { TomlReader } from '@sgarciac/bombadil';
import { workspace } from 'vscode';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const getCommand = (): string => {
    const pythonPath = workspace.getConfiguration('python').get('pythonPath', 'python');
    const gradle = `${pythonPath} -m pipenv run`;
    return gradle;
};

const buildCommands = (contents: string): Record<string, string> => {
    const scripts: Record<string, string> = {};
    const cmd = getCommand();
    const pipfile = new TomlReader();
    pipfile.readToml(contents);
    Object.entries(pipfile.result?.scripts ?? {}).forEach(([scriptName, _scriptCmd]) => {
        scripts[scriptName] = `${cmd} ${scriptName}`;
    });
    return scripts;
};

export const extractPipenvCommands = async (filePath: string): Promise<Record<string, string> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
