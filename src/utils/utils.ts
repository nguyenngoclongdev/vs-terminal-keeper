import { commands, QuickPickItem, Uri, window, workspace } from 'vscode';
import { SessionItem } from '../configuration/interface';
import { constants, extCommands } from './constants';

export const showErrorMessageWithDetail = (message: string, error: unknown): void => {
    const detailError = error instanceof Error ? (error as Error)?.message : `${error}`;
    window.showErrorMessage(message, constants.viewError).then((selection) => {
        if (selection === constants.viewError) {
            window.showErrorMessage(detailError, { modal: true });
        }
    });
};

export const delay = async (milliseconds: number): Promise<void> => {
    return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const showTextDocument = (filePath: string): void => {
    const existingDoc = workspace.textDocuments.find((doc) => doc.uri.fsPath === filePath);
    if (existingDoc) {
        const visibleEditor = window.visibleTextEditors.find((editor) => editor.document === existingDoc);
        if (visibleEditor) {
            window.showTextDocument(visibleEditor.document, visibleEditor.viewColumn, false);
        } else {
            window.showTextDocument(existingDoc, { preserveFocus: false });
        }
    } else {
        const stepDefinitionFileUri = Uri.file(filePath);
        window.showTextDocument(stepDefinitionFileUri, { preserveFocus: false });
    }
};

export const showQuickPick = async (params: {
    title: string;
    placeHolder: string;
    items: string[];
    additionItems?: QuickPickItem[];
}): Promise<QuickPickItem | undefined> => {
    const { title, placeHolder, items, additionItems = [] } = params;
    const selected = await window.showQuickPick([...items.map((key) => ({ label: key })), ...additionItems], {
        title: title,
        placeHolder: placeHolder,
        canPickMany: false,
        ignoreFocusOut: true
    });
    return selected;
};

export const showInputBox = async (params: {
    title: string;
    placeHolder: string;
    validateInput?: (value: string) => string;
}): Promise<string | undefined> => {
    const { title, placeHolder, validateInput } = params;
    const inputText = await window.showInputBox({
        title: title,
        placeHolder: placeHolder,
        ignoreFocusOut: true,
        validateInput
    });
    return inputText;
};

export const getSessionQuickPickItems = (sessions?: {
    default: SessionItem[];
    [key: string]: SessionItem[];
}): QuickPickItem[] => {
    if (!sessions) {
        return [];
    }

    const sessionsWithDescription: QuickPickItem[] = Object.entries(sessions).map(([label, session]): QuickPickItem => {
        const descriptions: string[] = [];
        session.forEach((sessionItem) => {
            if (Array.isArray(sessionItem)) {
                for (let j = 0; j < sessionItem.length; j++) {
                    descriptions.push(sessionItem[j].name || '');
                }
            } else {
                descriptions.push(sessionItem.name || '');
            }
        });

        const icon = 'arrow-small-right';
        const terminals = descriptions.filter(Boolean).join(', ');
        return { label, detail: `$(${icon})${terminals}` };
    });
    return sessionsWithDescription;
};

export const getTabWidth = (): number => {
    let prettierTabWidth = workspace.getConfiguration().get('prettier.tabWidth');
    if (!Number.isNaN(prettierTabWidth) && Number(prettierTabWidth) > 0) {
        return Number(prettierTabWidth);
    }

    const editorTabWidth = workspace.getConfiguration().get('editor.tabSize');
    if (!Number.isNaN(editorTabWidth) && Number(editorTabWidth) > 0) {
        return Number(editorTabWidth);
    }

    const defaultTabWidth = 4;
    return defaultTabWidth;
};

export const showGenerateConfiguration = async (): Promise<void> => {
    const quickPickItem = await showQuickPick({
        title: constants.generateConfigurationTitle,
        placeHolder: constants.generateConfigurationPlaceHolder,
        items: [constants.yesButton, constants.noButton]
    });
    if (quickPickItem && quickPickItem.label === constants.yesButton) {
        await commands.executeCommand(extCommands.generate);
    }
};
