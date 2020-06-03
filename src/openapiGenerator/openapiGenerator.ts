import { ChildProcess, spawn } from "child_process";
import commander, { createCommand } from "commander";
// enums, options
import { Subcommand, getDefaultSubcommand } from "./getSubcommand";
import {
    GenerateOptions,
    GenerateDefaultOptions,
    GenerateOptionName,
    GenerateArgumentType,
} from "./options/generateOptions";
import { OptionType, DefaultOptionType } from "./options/option.type";
import { BatchOptions, BatchArgumentType } from "./options/batchOptions";
import { ListOptions, ListArgumentType } from "./options/listOptions";
import {
    ConfigHelpOptions,
    ConfigHelpArgumentType,
} from "./options/configHelpOptions";
import { MetaOptions, MetaArgumentType } from "./options/metaOptions";
import {
    ValidateOptions,
    ValidateArgumentType,
} from "./options/validateOptions";
import {
    CustomOptions,
    CustomOptionType,
    CustomOptionName,
    CustomTemplates,
    SEBTemplate,
    CustomOptionsArgumentType,
} from "./options/customOptions";
import { OpenApiGenerator } from "./generatorList";
import { generateMock } from "./mockGenerator/mockGenerator";

type GeneratorSubcommand = Subcommand | Array<string>;

type GeneratorArgs = (BatchArgumentType | ConfigHelpArgumentType | GenerateArgumentType |
                     ListArgumentType | MetaArgumentType | ValidateArgumentType) &
                     CustomOptionsArgumentType & {
    _: GeneratorSubcommand;
};

const minimist = require("minimist");

export function generatorFn() {
    const program: commander.Command = createCommand();
    [...GenerateOptions, ...BatchOptions, ...ListOptions, ...ConfigHelpOptions, ...MetaOptions, ...ValidateOptions, ...CustomOptions]
        .map((item: OptionType) => {
            program.option(
                item.option.join(", "),
                item.description,
                item.defaultValue
            );
        });
    program.action(() => {
        const args: GeneratorArgs = minimist(process.argv.slice(2));
        const subcommand: GeneratorSubcommand = args._.length ? args._ : getDefaultSubcommand();
        let command: string = `node ./node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator ${subcommand}`;
        const extraOptions: Array<string> = formatExtraOption(args);
        if (subcommand === "generate" || subcommand[0] === "generate") {
            const generateArgs: GenerateArgumentType = args as GenerateArgumentType;
            let generatorName: OpenApiGenerator = generateArgs.g || generateArgs["generator-name"];
            GenerateDefaultOptions.map((item: DefaultOptionType) => {
                const defaultOptionArgs: GenerateArgumentType = minimist(item.key);
                if (!Object.keys(defaultOptionArgs).some((key: string) => Object.keys(generateArgs).some((argKey: string) => argKey === key))) {
                    if (item?.key?.indexOf(GenerateOptionName.generatorName)) {
                        generatorName = item.value as OpenApiGenerator;
                    }
                    command += ` ${item.key[0]} ${item.value}`;
                }
            });
            const sebTemplatePath: string = CustomTemplates.find(
                (item: SEBTemplate) => item.generator === generatorName
            )?.templatePath;
            if (
                !args.openapiTemplate &&
                (!generateArgs.t && !generateArgs["template-dir"]) &&
                !!sebTemplatePath
            ) {
                command += ` ${GenerateOptionName.templateDirShort} ${sebTemplatePath}`;
            }
            let defaultBasePath: string = (args.baseUrl || args.u) || "http://localhost";
            if ((generateArgs.i || generateArgs["input-spec"]) && !(args.baseUrl || args.u)) {
                try {
                    defaultBasePath = new URL(generateArgs.i || generateArgs["input-spec"]).origin;
                } catch {
                    console.warn(
                        "swagger path is not an url, setting base url to localhost..."
                    );
                }
            }

            const basePathOption: string = `baseUrl=${defaultBasePath}`;
            extraOptions.push(basePathOption);
            if (generateArgs.p || generateArgs["additional-properties"]) {
                const additionalProps: keyof GenerateArgumentType = !!generateArgs.p ? "p" : "additional-properties";
                args[additionalProps] =
                    args[additionalProps] + `,${extraOptions.toString()}`;
            } else {
                (args as GenerateArgumentType).p = extraOptions.toString();
            }
            // generate mock
            generateMock(
                (generateArgs.i || generateArgs["input-spec"]),
                (generateArgs.o || generateArgs.output)
                    ? generateArgs.o || generateArgs.output
                    : GenerateDefaultOptions.find(
                            ({ key }: DefaultOptionType) =>
                                key?.indexOf(GenerateOptionName.output) > -1
                      )?.value
            );
        }
        CustomOptions.map((item: CustomOptionType) => {
            const customOption: CustomOptionsArgumentType = minimist(item.option);
            const selectedKey: string = Object.keys(customOption).find((key: string) => Object.keys(args).some((argKey: string) => argKey === key));
            if (selectedKey) {
                delete args[selectedKey];
            }
        });
        const revertArgs: Array<string> = require("dargs")(args, { excludes: ["_"] });
        if (revertArgs) {
            command += ` ${revertArgs.join(" ")}`;
        }
        process.env[
            "JAVA_OPTS"
        ] = `-Dio.swagger.parser.util.RemoteUrl.trustAll=true -Dio.swagger.v3.parser.util.RemoteUrl.trustAll=true`;
        const cmd: ChildProcess = spawn(command, {
            stdio: "inherit",
            shell: true,
        });
        cmd.on("exit", process.exit);
    });
    program.parse(process.argv);
}

function formatExtraOption(args: GeneratorArgs, extraOptions?: Array<string>) {
    const newExtraOptions: Array<string> = extraOptions
        ? [...extraOptions]
        : [];
    CustomOptions.filter(
        ({ mappingName }) => !!mappingName
    ).map((option: CustomOptionType) => {
        const extraArgs: CustomOptionsArgumentType = minimist(option.option);
        const extraDependentArgs: CustomOptionsArgumentType = minimist(option.dependedOption || []);
        const extraArgument: string = Object.keys(args).find((key: string) =>
            Object.keys(extraArgs).some((argKey: string) => argKey !== "_" && argKey === key)
        );
        const extraDependentArgument: string = Object.keys(args).find((key: string) => Object.keys(extraDependentArgs).some((argKey: string) => argKey === key));
        if (option.dependedOption && !!args[extraArgument] !== !!args[extraDependentArgument]) {
            throw new Error(option.errorMessage);
        } else if (!!args[extraArgument]) {
            newExtraOptions.push(
                `${option.mappingName}=${args[extraArgument]}`
            );
        }
    });
    return newExtraOptions;
}
