import { exec } from 'child_process';
import * as path from 'path';
import { promisify } from 'util';
import { FileType, Uri, workspace } from 'vscode';

const execPromise = promisify(exec);

const wslPathToWindowsPath = async (workspacePath: string, distro: string): Promise<string> => {
    const { stdout } = await execPromise(`wsl.exe -d ${distro} wslpath -w '${workspacePath}'`);
    return stdout.trim();
};

export const getWorkspaceRootPath = async (uri?: Uri): Promise<string | undefined> => {
    // If there is no uri, set to first workspace folder
    const workspaceFolderUri = uri ?? workspace.workspaceFolders?.[0]?.uri;
    if (!workspaceFolderUri) {
        return undefined;
    }

    // If is in ssh, remove first / if running on windows
    const isSSHRemote = workspaceFolderUri.authority.startsWith('ssh-remote+');
    if (isSSHRemote) {
        const isWindows = !!workspaceFolderUri.path.match(/^\/[a-zA-Z]:\/.*$/);
        return isWindows ? workspaceFolderUri.path.substring(1) : workspaceFolderUri.path;
    }

    // If is in dev-container return dir path
    const isDevContainer = workspaceFolderUri.authority.startsWith('dev-container+');
    if (isDevContainer) {
        return path.dirname(workspaceFolderUri.path);
    }

    // If is in wsl mode convert wsl path to windows path
    let cwd = workspaceFolderUri.fsPath;
    const isWSL = workspaceFolderUri.authority.startsWith('wsl+');
    if (isWSL) {
        const distro = workspaceFolderUri.authority.split('+')[1];
        cwd = await wslPathToWindowsPath(workspaceFolderUri.path, distro);
    }

    const stat = await workspace.fs.stat(Uri.file(cwd));
    return stat.type === FileType.File ? path.dirname(cwd) : cwd;
};
