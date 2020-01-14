import { isEmpty } from "../isEmpty/isEmpty";

export interface LogItem {
    context: string;
    message?: string;
    details?: any;
}

export interface LoggerOptions {
    verbose?: boolean;
    clearConsole?: boolean;
    searchKeyword?: string;
}

export class Logger {
    private domain: string = "ANONYMOUS";
    private logs: Array<LogItem> = [];
    private contextStyle: string = "background-color: #007AC7; color: white; font-size: 16px; padding: 5px 10px;";
    private contextTitleStyle: string = "background-color: #007AC7; color: white; font-size: 16px; padding: 5px 0px 5px 10px; font-weight: bold;";
    private tableSupport: boolean = console.table ? true : false;
    constructor(domain?: string) {
        if (domain) {
            this.domain = domain;
        }
    }
    /**
     * Inserts a log into the logger
     * @param {string} context The context where the log is generated in
     * @param {string} [message] The message to be displayed
     * @param {any} [details] The details of the log, if any.
     * @returns {Logger} The logger object
     */
    insert(context: string, message?: string, details?: any): Logger {
        let logDetails: any;
        if (details) {
            if (typeof (details) === "object") {
                logDetails = JSON.parse(JSON.stringify(details));
            } else {
                logDetails = details;
            }
        }
        this.logs.push({ context: context, message, details: logDetails });
        return this;
    }
    /**
     * Retrieve the list of logs stored
     * @returns The list of logs stored
     */
    getLog(): Array<LogItem> {
        return this.logs;
    }
    /**
     * Display the log in the browser's console
     * @param {LoggerOptions} [options] Control the way the log is displayed
     * @returns {Logger} The logger object
     */
    displayLog(options?: LoggerOptions): Logger {
        if (!options || (options.clearConsole === undefined) || options.clearConsole) {
            console.clear();
        }
        if (options && options.searchKeyword) {
            this.logs.map((log: LogItem) => {
                if (log.context.toLowerCase().indexOf(options.searchKeyword.toLowerCase()) !== -1) {
                    this.log(log, options.verbose);
                }
            });
        } else {
            this.logs.map((log: LogItem) => {
                this.log(log, options ? options.verbose : undefined);
            });
        }
        return this;
    }

    /**
     * Output a log item from the local logs array to the browser's console
     * @param {LogItem} log The log item needed to be outputed
     * @param {boolean} [verbose] Show verbose output. (default: `true`)
     */
    private log(log: LogItem, verbose: boolean = false): void {
        const consoleOutput: Array<string> = [`${this.domain} - `];
        // Add Styles if supported
        if (this.tableSupport) {
            consoleOutput[0] = "%c" + consoleOutput[0] + "%c";
            consoleOutput.push(this.contextTitleStyle, this.contextStyle);
        }
        // Add context
        consoleOutput[0] += log.context;
        // Add message, if any
        if (log.message) {
            consoleOutput[0] += `: ${log.message}`;
        }
        // Add details, if any and "verbose" is enabled
        if (!isEmpty(log.details) && verbose) {
            consoleOutput[0] += " - Details:";
            console.log(...consoleOutput);
            if (this.tableSupport && !(log.details instanceof Function)) {
                console.table(log.details);
            } else {
                console.log((log.details instanceof Function) ? log.details.toString() : log.details);
            }
        } else {
            console.log(...consoleOutput);
        }
    }
}
