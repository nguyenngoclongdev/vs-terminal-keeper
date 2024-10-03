import { fs } from '@vscode-utility/fs-browserify';
import { posix } from 'path';
import { workspace, WorkspaceConfiguration } from 'vscode';
import { getWorkspaceRootPath } from '../utils/get-workspace';
import { getTabWidth } from '../utils/utils';
import { SessionConfiguration } from './interface';

export class Configuration {
    private static workSpaceConfigurationSpace: string = 'terminal-keeper';
    private static vscodeDirPath: string = '';
    public static sessionFilePath: string = '';
    public static userConfigKeys: string[] = [];

    public static async initialize(): Promise<boolean> {
        try {
            // Get workspace directory path
            let workspaceDirPath = workspace.workspaceFolders?.[0].uri.fsPath;
            const isWSLSupport = this.getExperimentalConfig<boolean>('wslSupport');
            if (isWSLSupport) {
                workspaceDirPath = await getWorkspaceRootPath();
            }
            if (!workspaceDirPath) {
                throw Error('Can not resolve workspace directory.');
            }

            // Set global path
            this.vscodeDirPath = this.getVscodeDirPath(workspaceDirPath);
            this.sessionFilePath = this.getSessionFilePath(workspaceDirPath);
            return true;
        } catch (error) {
            return false;
        }
    }

    public static async load(): Promise<SessionConfiguration> {
        let sessionConfig = await this.getSessionConfiguration();
        const extensionConfig = this.getWorkspaceConfiguration();
        this.userConfigKeys = [];
        Object.entries(extensionConfig).forEach(([key, value]) => {
            if (this.isSetOnValue(value)) {
                sessionConfig[key as keyof SessionConfiguration] = value;
                this.userConfigKeys.push(key);
            }
        });
        return sessionConfig;
    }

    public static async save(newestConfig: SessionConfiguration): Promise<boolean> {
        const isDefinedSessionFile = await this.isDefinedSessionFile();
        if (isDefinedSessionFile) {
            return await this.update(newestConfig);
        }
        return await this.saveNew(newestConfig);
    }

    public static getExperimentalConfig<T>(key: string): T | undefined {
        const extensionConfig = this.getWorkspaceConfiguration();
        return extensionConfig.get<T>(key);
    }

    public static watch(onConfigChange: () => void) {
        fs.watch(this.sessionFilePath).onDidCreate(() => {
            onConfigChange();
        });
        fs.watch(this.sessionFilePath).onDidChange(() => {
            onConfigChange();
        });
        fs.watch(this.sessionFilePath).onDidDelete(() => {
            onConfigChange();
        });
        workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('terminal-keeper')) {
                onConfigChange();
            }
        });
    }

    public static async isDefinedSessionFile(): Promise<boolean> {
        return await fs.existAsync(this.sessionFilePath);
    }

    private static isSetOnValue(value: any) {
        if (value === null || value === undefined) {
            return false;
        }

        if (typeof value === 'string' || value instanceof String) {
            return value !== '';
        }
        if (typeof value === 'boolean' || value === true || value === false) {
            return true;
        }
        if (typeof value === 'number') {
            return true;
        }
        return true;
    }

    private static async update(newestConfig: SessionConfiguration): Promise<boolean> {
        const config = this.getWorkspaceConfiguration();
        const originalContent = await this.getSessionConfiguration();

        let originalContentHasBeenChanged = false;
        const keyValues = Object.entries(newestConfig);
        for (let i = 0; i < keyValues.length; i++) {
            const [key, value] = keyValues[i];
            const isUserConfig = config.has(key) && this.isSetOnValue(config.get(key));
            if (isUserConfig) {
                await config.update(key, value);
            } else {
                if (originalContent && originalContent.hasOwnProperty(key)) {
                    originalContent[key as keyof SessionConfiguration] = value;
                    originalContentHasBeenChanged = true;
                }
            }
        }

        if (originalContentHasBeenChanged) {
            try {
                await this.writeSessionFile(originalContent);
                return true;
            } catch {
                return false;
            }
        }
        return false;
    }

    private static async saveNew(newestConfig: SessionConfiguration): Promise<boolean> {
        try {
            // TODO: maybe not need create .vscode before
            await fs.createDirectoryAsync(this.vscodeDirPath);

            // Save setting
            await this.writeSessionFile(newestConfig);
            return true;
        } catch {
            return false;
        }
    }

    private static async writeSessionFile(newestConfig: SessionConfiguration): Promise<void> {
        await fs.writeFileAsync(this.sessionFilePath, JSON.stringify(newestConfig, null, getTabWidth()));
    }

    private static getWorkspaceConfiguration(): WorkspaceConfiguration {
        return workspace.getConfiguration(this.workSpaceConfigurationSpace);
    }

    private static async getSessionConfiguration(): Promise<SessionConfiguration> {
        const sessionFileExist = await fs.existAsync(this.sessionFilePath);
        if (!sessionFileExist) {
            return {};
        }

        try {
            const content = await fs.readFileAsync(this.sessionFilePath);
            return JSON.parse(content);
        } catch {
            return {};
        }
    }

    private static getVscodeDirPath(workspaceDirPath: string): string {
        return posix.join(workspaceDirPath, '.vscode');
    }

    private static getSessionFilePath(workspaceDirPath: string): string {
        const vscodeDirPath = this.getVscodeDirPath(workspaceDirPath);
        return posix.join(vscodeDirPath, 'sessions.json');
    }
}