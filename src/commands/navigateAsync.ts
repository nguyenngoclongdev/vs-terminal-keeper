import path from 'path';
import { Selection, TextDocument, Uri, window, workspace } from 'vscode';
import { Configuration } from '../configuration/configuration';
import { TKTreeItem } from '../explorer/tree-provider';
import { constants } from '../utils/constants';
import { showErrorMessageWithDetail, showGenerateConfiguration } from '../utils/utils';

const getFileUriBySource = (source: string | undefined): Uri => {
    if (source === 'settings.json') {
        return Uri.file(path.join(Configuration.vscodeDirPath, source));
    }
    return Uri.file(Configuration.sessionFilePath);
};

const escapeRegExp = (input: string) => {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getKeywordRegex = (treeItem: TKTreeItem): RegExp => {
    const { keywords = [] } = treeItem;
    const enhanceKeywords = keywords.map((keyword) => {
        let enhanceKeyword = escapeRegExp(keyword)
            .replace(`: `, `: ?`) // match space or no space
            .replace(`"`, `(?:'|")`); // match single quote or double quote
        return enhanceKeyword;
    });
    return new RegExp(enhanceKeywords.join('|'), 'gm');
};

export const navigateAsync = async (treeItem: TKTreeItem): Promise<void> => {
    try {
        // Write configuration file
        const isDefinedSessionFile = await Configuration.isDefinedSessionFile();
        if (!isDefinedSessionFile) {
            await showGenerateConfiguration();
            return;
        }

        // Get source include keyword
        const { source } = treeItem;
        const sessionFileUri = getFileUriBySource(source);
        const document: TextDocument = await workspace.openTextDocument(sessionFileUri);
        const content = document.getText();

        // Navigate to the session configuration
        const regex = getKeywordRegex(treeItem);
        const matches = [...content.matchAll(regex)];
        let selections: Selection[] = [];
        matches.forEach((match) => {
            if (match.index) {
                const startPosition = document.positionAt(match.index);
                const endPosition = document.positionAt(match.index + match[0].length);
                selections.push(new Selection(startPosition, endPosition));
            }
        });
        await window.showTextDocument(document, { selection: selections?.[0] });
    } catch (error) {
        showErrorMessageWithDetail(constants.openConfigurationFailed, error);
    }
};
