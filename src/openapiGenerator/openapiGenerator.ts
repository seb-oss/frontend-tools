import { getSubcommand, SUBCOMMAND } from "./getSubcommand";
import { GenerateOptions, GenerateDefaultOptions } from "./options/generateOptions";
import { OptionType, DefaultOptionType } from "./options/option.type";
import { BatchOptions } from "./options/batchOptions";
import { ListOptions } from "./options/listOptions";
import { ConfigHelpOptions } from "./options/configHelpOptions";
import { MetaOptions } from "./options/metaOptions";
import { ValidateOptions } from "./options/validateOptions";

export function generatorFn() {
    const { createCommand } = require("commander");
    const program = createCommand();
    [...GenerateOptions, ...BatchOptions, ...ListOptions, ...ConfigHelpOptions, ...MetaOptions, ...ValidateOptions].map((item: OptionType) => {
        program.option(item.option, item.description, item.defaultValue);
    });
    program
        .action(() => {
            const { spawn } = require("child_process");
            const args = process.argv.slice(2);
            const subcommand: string = getSubcommand(args[0]);
            args.shift();
            let command = `node ./node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator ${subcommand}`;
            if (args) {
                command += ` ${args.join(" ")}`;
            }
            if (subcommand === SUBCOMMAND.GENERATE.toString()) {
                GenerateDefaultOptions.filter((item: DefaultOptionType) => !args.every((arg: string) => arg === item.key1 || arg === item.key2))
                    .map((item: DefaultOptionType) => {
                        command += ` ${item.key1} ${item.value}`;
                    });
            }
            const cmd = spawn(command, { stdio: "inherit", shell: true });
            cmd.on("exit", process.exit);
        });
    program.parse(process.argv);
}