import { workspace } from 'vscode';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const getCommand = (): string => {
    return 'npm grunt';
};

const buildCommands = (contents: string): Record<string, string[]> => {
    const scripts: Record<string, string[]> = {};
    const cmd = getCommand();
    let idx = 0;
    let eol = contents.indexOf('\n', 0);

    while (eol !== -1) {
        let line: string = contents.substring(idx, eol).trim();
        if (line.length > 0 && line.toLowerCase().trimStart().startsWith('grunt.registertask')) {
            let idx1 = line.indexOf("'");
            if (idx1 === -1) {
                idx1 = line.indexOf('"');
            }

            if (idx1 === -1) {
                let eol2 = eol + 1;
                eol2 = contents.indexOf('\n', eol2);
                line = contents.substring(eol + 1, eol2).trim();
                if (line.startsWith("'") || line.startsWith('"')) {
                    idx1 = line.indexOf("'");
                    if (idx1 === -1) {
                        idx1 = line.indexOf('"');
                    }
                    if (idx1 !== -1) {
                        eol = eol2;
                    }
                }
            }

            if (idx1 !== -1) {
                idx1++;
                let idx2 = line.indexOf("'", idx1);
                if (idx2 === -1) {
                    idx2 = line.indexOf('"', idx1);
                }
                if (idx2 !== -1) {
                    const tgtName = line.substring(idx1, idx2).trim();
                    if (tgtName) {
                        scripts[tgtName] = [`${cmd} ${tgtName}`];
                    }
                }
            }
        }

        idx = eol + 1;
        eol = contents.indexOf('\n', idx);
    }
    return scripts;
};

export const extractGruntCommands = async (filePath: string): Promise<Record<string, string[]> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
