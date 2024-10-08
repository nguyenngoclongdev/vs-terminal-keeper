import { workspace } from 'vscode';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const getCommand = (): string => {
    return 'npx gulp';
};

const parseGulpExport = (line: string) => {
    let idx1: number, idx2: number;
    let tgtName: string | undefined;

    if (line.toLowerCase().trimLeft().startsWith('exports.')) {
        idx1 = line.indexOf('.') + 1;
        idx2 = line.indexOf(' ', idx1);
        /* istanbul ignore if */
        if (idx2 === -1) {
            idx2 = line.indexOf('=', idx1);
        }
        /* istanbul ignore else */
        if (idx1 !== -1) {
            tgtName = line.substring(idx1, idx2).trim();
        }
    } else if (line.toLowerCase().trimLeft().startsWith('exports[')) {
        /* istanbul ignore else */
        idx1 = line.indexOf('[') + 2; // skip past [ and '/"
        idx2 = line.indexOf(']', idx1) - 1; // move up to "/'
        /* istanbul ignore else */
        if (idx1 !== -1) {
            tgtName = line.substring(idx1, idx2).trim();
        }
    }

    return tgtName;
};

const parseGulpTask = (line: string, contents: string, eol: number) => {
    let idx1: number;
    let tgtName: string | undefined;

    idx1 = line.indexOf("'");
    if (idx1 === -1) {
        idx1 = line.indexOf('"');
    }

    if (idx1 === -1) {
        // check next line for task name
        let eol2 = eol + 1;
        eol2 = contents.indexOf('\n', eol2);
        line = contents.substring(eol + 1, eol2).trim();
        /* istanbul ignore else */
        if (line.startsWith("'") || line.startsWith('"')) {
            idx1 = line.indexOf("'");
            if (idx1 === -1) {
                idx1 = line.indexOf('"');
            }
            /* istanbul ignore else */
            if (idx1 !== -1) {
                eol = eol2;
            }
        }
    }

    /* istanbul ignore else */
    if (idx1 !== -1) {
        idx1++;
        let idx2 = line.indexOf("'", idx1);
        if (idx2 === -1) {
            idx2 = line.indexOf('"', idx1);
        }
        /* istanbul ignore else */
        if (idx2 !== -1) {
            tgtName = line.substring(idx1, idx2).trim();
        }
    }

    return tgtName;
};

const buildCommands = (contents: string): Record<string, string> => {
    const scripts: Record<string, string> = {};
    const cmd = getCommand();
    let idx = 0;
    let eol = contents.indexOf('\n', 0);
    while (eol !== -1) {
        let tgtName: string | undefined;
        const line = contents.substring(idx, eol).trim();

        if (line.length > 0) {
            if (line.toLowerCase().trimStart().startsWith('exports')) {
                tgtName = parseGulpExport(line);
            } else if (line.toLowerCase().trimStart().startsWith('gulp.task')) {
                tgtName = parseGulpTask(line, contents, eol);
            }
            if (tgtName) {
                scripts[tgtName] = `${cmd} ${tgtName}`;
            }
        }
        idx = eol + 1;
        eol = contents.indexOf('\n', idx);
    }
    return scripts;
};

export const extractGulpCommands = async (filePath: string): Promise<Record<string, string> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
