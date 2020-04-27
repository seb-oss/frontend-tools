export type Subcommand = "help" | "generate" | "batch" | "list" | "config-help" | "meta" | "validate" | "version";

const subcommands: Array<Subcommand> = [
    "help",
    "generate",
    "batch",
    "list",
    "config-help",
    "meta",
    "validate",
    "version"
];

/**
 * Retrieve openapi subcommand
 * @param {string} commandSet command set by user
 * @returns {string} valid command
 */
export function getSubcommand(commandSet?: string): Subcommand {
    return subcommands.find((item: string) => item === commandSet) || subcommands[0];
}
