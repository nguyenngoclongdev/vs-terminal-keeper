import { workspace } from 'vscode';
import { parseStringPromise } from 'xml2js';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const getCommand = (): string => {
    let ant = 'ant';
    if (process.platform === 'win32') {
        ant = 'ant.bat';
    }
    return ant;
};

const buildCommands = async (contents: string): Promise<Record<string, string[]>> => {
    const scripts: Record<string, string[]> = {};
    const cmd = getCommand();
    const text = await parseStringPromise(contents);
    if (text && text.project && text.project.target) {
        const defaultTask = text.project.$.default;
        const targets = text.project.target;
        for (const tgt of targets) {
            if (tgt.$ && tgt.$.name) {
                const name = defaultTask === tgt.$.name ? tgt.$.name + ' - Default' : tgt.$.name;
                scripts[name] = [`${cmd} ${tgt.$.name}`];
            }
        }
    }
    return scripts;
};

export const extractAntCommands = async (filePath: string): Promise<Record<string, string[]> | undefined> => {
    const content = await getFileContent(filePath);
    return await buildCommands(content);
};
