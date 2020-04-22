export enum SUBCOMMAND {
    HELP = "help",
    GENERATE = "generate",
    BATCH = "batch",
    LIST = "list",
    CONFIGHELP = "config-help",
    META = "meta",
    VALIDATE = "validate",
    VERSION = "version"
}

const subcommands: Array<SUBCOMMAND> = [
    SUBCOMMAND.HELP,
    SUBCOMMAND.GENERATE,
    SUBCOMMAND.BATCH,
    SUBCOMMAND.LIST,
    SUBCOMMAND.CONFIGHELP,
    SUBCOMMAND.META,
    SUBCOMMAND.VALIDATE,
    SUBCOMMAND.VERSION,
];

/**
 * Retrieve openapi subcommand
 * @param {string} commandSet command set by user
 * @returns {string} valid command
 */
export function getSubcommand(commandSet?: string): string {
    return subcommands.find((item: string) => item === commandSet) || subcommands[0];
}
