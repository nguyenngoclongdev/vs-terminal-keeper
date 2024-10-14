import { workspace } from 'vscode';

const getFileContent = async (filePath: string): Promise<string> => {
    const document = await workspace.openTextDocument(filePath);
    return document.getText();
};

const suffixRuleTargets = /^(\.\w+|\.\w+\.\w+)$/;
const patternRuleTargets = /^(%\.\w+|%)$/;
const ruleTargetExp = /^([\w-.\/ ]+)\s*:[^=]/gm;
const specialTargets = new Set([
    // https://www.gnu.org/software/make/manual/html_node/Special-Targets.html
    '.PHONY',
    '.SUFFIXES',
    '.DEFAULT',
    '.PRECIOUS',
    '.INTERMEDIATE',
    '.SECONDARY',
    '.SECONDEXPANSION',
    '.DELETE_ON_ERROR',
    '.IGNORE',
    '.LOW_RESOLUTION_TIME',
    '.SILENT',
    '.EXPORT_ALL_VARIABLES',
    '.NOTPARALLEL',
    '.ONESHELL',
    '.POSIX',
    '.MAKE'
]);

const isNormalTarget = (target: string): boolean => {
    if (specialTargets.has(target)) {
        return false;
    }
    if (suffixRuleTargets.test(target)) {
        return false;
    }
    if (patternRuleTargets.test(target)) {
        return false;
    }
    return true;
};

const getCommand = (): string => {
    let make = 'make';
    if (process.platform === 'win32') {
        make = 'nmake';
    }
    return make;
};

const buildCommands = (contents: string): Record<string, string[]> => {
    const scripts: Record<string, string[]> = {};
    const cmd = getCommand();
    let match;
    while ((match = ruleTargetExp.exec(contents))) {
        const tgtName = match[1];
        if (tgtName.startsWith('.')) {
            continue;
        }
        if (isNormalTarget(tgtName)) {
            scripts[tgtName] = [`${cmd} ${tgtName}`];
        }
    }
    return scripts;
};

export const extractMakeCommands = async (filePath: string): Promise<Record<string, string[]> | undefined> => {
    const content = await getFileContent(filePath);
    return buildCommands(content);
};
