import { ChildProcess, spawn } from "child_process";
import commander, { createCommand } from "commander";
// enums, options
import { getSubcommand, Subcommand } from "./getSubcommand";
import { GenerateOptions, GenerateDefaultOptions, GenerateOptionName } from "./options/generateOptions";
import { OptionType, DefaultOptionType } from "./options/option.type";
import { BatchOptions } from "./options/batchOptions";
import { ListOptions } from "./options/listOptions";
import { ConfigHelpOptions } from "./options/configHelpOptions";
import { MetaOptions } from "./options/metaOptions";
import { ValidateOptions } from "./options/validateOptions";
import { CustomOptions, CustomOptionType, CustomOptionName, CustomTemplates, SEBTemplate } from "./options/customOptions";
import { OpenApiGenerator } from "./generatorList";
import { generateMock } from "./mockGenerator/mockGenerator";

export function generatorFn() {
    const program: commander.Command = createCommand();
    [...GenerateOptions, ...BatchOptions, ...ListOptions, ...ConfigHelpOptions, ...MetaOptions, ...ValidateOptions, ...CustomOptions].map((item: OptionType) => {
        program.option(item.option.join(", "), item.description, item.defaultValue);
    });
    program
        .action(() => {
            const args: Array<string> = process.argv.slice(2);
            const subcommand: Subcommand = getSubcommand(args[0]);
            args.shift();
            let command: string = `node ./node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator ${subcommand}`;
            const extraOptions: Array<string> = formatExtraOption(args);
            if (subcommand === "generate") {
                const generatorNameIndex: number = getArgumentIndex(args, [GenerateOptionName.generatorNameShort, GenerateOptionName.generatorName]);
                let generatorName: OpenApiGenerator = args[generatorNameIndex] as OpenApiGenerator;
                GenerateDefaultOptions.filter((item: DefaultOptionType) => !args.every((arg: string) => arg === item.key1 || arg === item.key2))
                    .map((item: DefaultOptionType) => {
                        if (item.key1 === GenerateOptionName.generatorNameShort) {
                            generatorName = item.value as OpenApiGenerator;
                        }
                        command += ` ${item.key1} ${item.value}`;
                    });
                const templateIndex: number = getArgumentIndex(args, [GenerateOptionName.templateDirShort, GenerateOptionName.templateDir]);
                const sebTemplatePath: string = CustomTemplates.find((item: SEBTemplate) => item.generator === generatorName)?.templatePath;
                if (args.indexOf(CustomOptionName.sebTemplate) > -1 && templateIndex === 0 && !!sebTemplatePath) {
                    command += ` ${GenerateOptionName.templateDirShort} ${sebTemplatePath}`;
                }
                const swaggerUrlIndex: number = getArgumentIndex(args, [GenerateOptionName.inputSpecShort, GenerateOptionName.inputSpec]);
                const extraParamIndex: number = getArgumentIndex(args, [GenerateOptionName.additionalPropertiesShort, GenerateOptionName.additionalProperties]);
                const baseUrlIndex: number = getArgumentIndex(args, [CustomOptionName.baseUrlShort, CustomOptionName.baseUrl]);
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
                const outputPathIndex: number = getArgumentIndex(args, [GenerateOptionName.outputShort, GenerateOptionName.output]);
                // generate mock
                generateMock(
                    args[swaggerUrlIndex],
                    outputPathIndex ? args[outputPathIndex] : GenerateDefaultOptions.find(({ key1 }: DefaultOptionType) => key1 === GenerateOptionName.outputShort).value
                );
            }
            CustomOptions.map((item: CustomOptionType) => {
                const index: number = args.findIndex((arg: string) => item.option.indexOf(arg) > -1);
                if (index > -1) {
                    args.splice(index, item.noValue ? 1 : 2);
                }
            })
            if (args) {
                command += ` ${args.join(" ")}`;
            }

            process.env["JAVA_OPTS"] = `-Dio.swagger.parser.util.RemoteUrl.trustAll=true -Dio.swagger.v3.parser.util.RemoteUrl.trustAll=true`;
            const cmd: ChildProcess = spawn(command, { stdio: "inherit", shell: true });
            cmd.on("exit", process.exit);
        });
    program.parse(process.argv);
}

function formatExtraOption(args: Array<string>, extraOptions?: Array<string>) {
    const newExtraOptions: Array<string> = extraOptions ? [...extraOptions] : [];
    CustomOptions.filter(({ dependedOption }) => dependedOption && dependedOption.length > 0)
        .map((option: CustomOptionType) => {
            const argumentIndex: number = getArgumentIndex(args, option.option);
            const relatedArgumentIndex: number = getArgumentIndex(args, option.dependedOption);
            if (!!(argumentIndex) !== !!relatedArgumentIndex) {
                throw new Error(option.errorMessage);
            } else if (argumentIndex > 0) {
                newExtraOptions.push(`${option.mappingName}=${args[argumentIndex]}`)
            }
        });
    return newExtraOptions;
}

function getArgumentIndex(args: Array<string>, keys: Array<string>, withoutValue?: boolean) {
    const indicatorIndex: number = args.findIndex((item: string) => keys.some((key: string) => key === item));
    const possibleArgumentIndex: number = indicatorIndex + 1;
    return indicatorIndex > -1 &&
        (args[possibleArgumentIndex] !== undefined || args[possibleArgumentIndex].indexOf("-") > 0) ?
        possibleArgumentIndex :
        withoutValue ? indicatorIndex : 0;
}