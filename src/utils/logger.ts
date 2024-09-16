import util from 'util';
import { OutputChannel, window } from 'vscode';

/* eslint-disable @typescript-eslint/naming-convention */
enum LogLevel {
    Trace,
    Debug,
    Info,
    Warn,
    Error
}

class Logger {
    private channel: OutputChannel;
    private level: LogLevel;

    constructor(name: string, level: LogLevel = LogLevel.Info) {
        this.channel = window.createOutputChannel(name);
        this.level = level;
    }

    trace(message: string, ...params: any[]) {
        if (this.level <= LogLevel.Trace) {
            this.log('TRACE', message, params);
        }
    }

    debug(message: string, ...params: any[]) {
        if (this.level <= LogLevel.Debug) {
            this.log('DEBUG', message, params);
        }
    }

    info(message: string, ...params: any[]) {
        if (this.level <= LogLevel.Info) {
            this.log('INFO', message, params);
        }
    }

    warn(message: string, ...params: any[]) {
        if (this.level <= LogLevel.Warn) {
            this.log('WARN', message, params);
        }
    }

    error(message: string, ...params: any[]) {
        if (this.level <= LogLevel.Error) {
            this.log('ERROR', message, params);
        }
    }

    private log(prefix: string, message: string, ...params: any[]) {
        const formattedMessage = `[${prefix}] ${message} ${params}`;
        const fullMessage = params.length > 0 ? util.format(formattedMessage, ...params) : formattedMessage;
        this.channel.appendLine(formattedMessage);
    }
}

export const logger = new Logger('Terminal Keeper');
