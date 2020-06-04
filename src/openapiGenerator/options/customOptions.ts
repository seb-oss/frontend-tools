import { OptionType } from "./option.type";
import { OpenApiGenerator } from "../generatorList";
import { GenerateOptionName } from "./generateOptions";

export interface CustomOptionType extends OptionType {
    mappingName?: string;
    dependedOption?: Array<string>;
    errorMessage?: string;
    noValue?: boolean;
    defaultValue?: string;
    additionalProp?: boolean;
}

export interface SEBTemplate {
    generator: OpenApiGenerator;
    templatePath: string;
}

export interface CustomOptionsArgumentType {
    baseUrl?: string;
    u?: string;
    openapiTemplate?: boolean;
    disableDirClean?: boolean;
    interceptorPath?: string;
    configPath?: string;
}

enum OptionName {
    baseUrl = "--baseUrl",
    baseUrlShort = "-u",
    openapiTemplate = "--openapiTemplate",
    disableDirClean = "--disableDirClean",
    interceptorPath = "--interceptorPath",
    configPath = "--configPath",
}

/**
 * custom options
 */

const options: Array<CustomOptionType> = [
    {
        option: [OptionName.baseUrlShort, OptionName.baseUrl],
        description: "baseUrl",
        mappingName: "baseUrl"
    },
    {
        option: [OptionName.openapiTemplate],
        description: "use openapi template",
        noValue: true
    },
    {
        option: [OptionName.disableDirClean],
        description: "disable direactory clean",
        noValue: true
    },
    {
        option: [OptionName.interceptorPath],
        description: "path of axios interceptor",
        mappingName: "interceptorPath"
    },
    {
        option: [OptionName.configPath],
        description: "path of axios config",
        mappingName: "configPath"
    },
    {
        option: null,
        description: "separate models and apis",
        mappingName: "withSeparateModelsAndApi",
        defaultValue: "true",
        additionalProp: true
    },
    {
        option: null,
        description: "api package folder",
        mappingName: "apiPackage",
        defaultValue: "api",
        additionalProp: true
    },
    {
        option: null,
        description: "model package folder",
        mappingName: "modelPackage",
        defaultValue: "model",
        additionalProp: true
    }
];

const templates: Array<SEBTemplate> = [
    {
        generator: "typescript-axios",
        templatePath: "./node_modules/@sebgroup/frontend-tools/dist/openapiGenerator/templates/typescript-axios"
    }
]

export { options as CustomOptions, OptionName as CustomOptionName, templates as CustomTemplates };