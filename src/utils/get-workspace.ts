import { Uri, workspace } from 'vscode';

export const getWorkspacePath = (uri: Uri | undefined): string | undefined => {
    const workspacePath = uri?.fsPath;
    if (workspacePath) {
        return workspacePath;
    }
    // Default: workspace.workspaceFolders?.[0]?.uri?.fsPath;
    return undefined;
};
