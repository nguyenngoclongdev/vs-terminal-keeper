import { workspace } from 'vscode';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const getCommand = (): string => {
    let gradle = 'gradlew';
    if (process.platform === 'win32') {
        gradle = 'gradlew.bat';
    }
    return gradle;
};

const buildCommands = (contents: string): Record<string, string> => {
    const scripts: Record<string, string> = {};
    const cmd = getCommand();
    let idx = 0;
    let eol = contents.indexOf('\n', 0);
    while (eol !== -1) {
        const line: string = contents.substring(idx, eol).trim();
        if (line.length > 0 && line.toLowerCase().trimStart().startsWith('task ')) {
            let idx1 = line.trimStart().indexOf(' ');
            if (idx1 !== -1) {
                idx1++;
                let idx2 = line.indexOf('(', idx1);
                if (idx2 === -1) {
                    idx2 = line.indexOf('{', idx1);
                }
                if (idx2 !== -1) {
                    const tgtName = line.substring(idx1, idx2).trim();
                    if (tgtName) {
                        scripts[tgtName] = `${cmd} ${tgtName}`;
                    }
                }
            }
        }
        idx = eol + 1;
        eol = contents.indexOf('\n', idx);
    }
    return scripts;
};

export const extractGradleCommands = async (filePath: string): Promise<Record<string, string> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
