import { getSubcommand, SUBCOMMAND } from "./getSubcommand";
import { GenerateOptions, GenerateDefaultOptions } from "./options/generateOptions";
import { OptionType, DefaultOptionType } from "./options/option.type";
import { BatchOptions } from "./options/batchOptions";
import { ListOptions } from "./options/listOptions";
import { ConfigHelpOptions } from "./options/configHelpOptions";
import { MetaOptions } from "./options/metaOptions";
import { ValidateOptions } from "./options/validateOptions";
import { CustomOptions, CustomOptionType } from "./options/customOptions";

export function generatorFn() {
    const { createCommand } = require("commander");
    const program = createCommand();
    [...GenerateOptions, ...BatchOptions, ...ListOptions, ...ConfigHelpOptions, ...MetaOptions, ...ValidateOptions, ...CustomOptions].map((item: OptionType) => {
        program.option(item.option.join(", "), item.description, item.defaultValue);
    });
    program
        .action(() => {
            const { spawn } = require("child_process");
            const args = process.argv.slice(2);
            const subcommand: string = getSubcommand(args[0]);
            args.shift();
            let command: string = `node ./node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator ${subcommand}`;
            const extraOptions: Array<string> = formatExtraOption(args);
            if (subcommand === SUBCOMMAND.GENERATE.toString()) {
                GenerateDefaultOptions.filter((item: DefaultOptionType) => !args.every((arg: string) => arg === item.key1 || arg === item.key2))
                    .map((item: DefaultOptionType) => {
                        command += ` ${item.key1} ${item.value}`;
                    });
                const swaggerUrlIndex: number = args.findIndex((item: string) => item === "-i" || item === "--input-spec") + 1;
                const extraParamIndex: number = args.findIndex((item: string) => item === "-p" || item === "--additional-properties") + 1;
                const baseUrlIndex: number = args.findIndex((item: string) => item === "-u" || item === "--baseUrl") + 1;
                let defaultBasePath: string = baseUrlIndex ? args[baseUrlIndex] : "http://localhost";
                if (swaggerUrlIndex && !baseUrlIndex) {
                    try {
                        defaultBasePath = new URL(args[swaggerUrlIndex]).origin;
                    } catch {
                        console.warn("swagger path is not an url, setting base url to localhost...");
                    }
                }
                const basePathOption: string = `baseUrl=${defaultBasePath}`;
                extraOptions.push(basePathOption);
                if (extraParamIndex) {
                    args[extraParamIndex] = args[extraParamIndex] + `,${extraOptions.toString()}`;
                } else {
                    args.push("-p");
                    args.push(extraOptions.toString());
                }
            }
            CustomOptions.map((item: OptionType) => {
                const index: number = args.findIndex((arg: string) => item.option.indexOf(arg) > -1);
                if (index > -1) {
                    args.splice(index, 2);
                }
            })
            if (args) {
                command += ` ${args.join(" ")}`;
            }
            const cmd = spawn(command, { stdio: "inherit", shell: true });
            cmd.on("exit", process.exit);
        });
    program.parse(process.argv);
}

function formatExtraOption(args: Array<string>, extraOptions?: Array<string>) {
    const newExtraOptions: Array<string> = extraOptions ? [...extraOptions] : [];
    CustomOptions.filter(({dependedOption}) => dependedOption && dependedOption.length > 0)
        .map((option: CustomOptionType) => {
            const argumentIndex: number = args.findIndex((item: string) => option.option.indexOf(item) > -1) + 1;
            const relatedArgumentIndex: number = args.findIndex((item: string) => option.dependedOption.indexOf(item) > -1) + 1;
            if (!!(argumentIndex) !== !!relatedArgumentIndex) {
                throw new Error(option.errorMessage);
            } else if (argumentIndex > 0) {
                newExtraOptions.push(`${option.mappingName}=${args[argumentIndex]}`)
            }
        });
    return newExtraOptions;
}