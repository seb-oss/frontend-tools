import { OptionType, DefaultOptionType } from "./option.type";

/**
 * generate options
 */

const options: Array<OptionType> = [
    {
        option: "-a, --auth",
        description: "adds authorization headers when fetching the OpenAPI definitions remotely. Pass in a URL-encoded string of name:header with a comma separating multiple values"
    },
    {
        option: "--api-name-suffix",
        description: "Suffix that will be appended to all API names ('tags'). Default: Api. e.g. Pet => PetApi. Note: Only ruby, python, jaxrs generators suppport this feature at the moment."
    },
    {
        option: "-api-package",
        description: "package for generated api classes"
    },
    {
        option: "--artifact-id",
        description: "artifactId in generated pom.xml. This also becomes part of the generated library's filename"
    },
    {
        option: "--artifact-version",
        description: "artifact version in generated pom.xml. This also becomes part of the generated library's filename"
    },
    {
        option: "-c, --config",
        description: `Path to configuration file. It can be JSON or YAML. If file is JSON, the content should have the format {"optionKey":"optionValue", "optionKey1":"optionValue1"...}. If file is YAML, the content should have the format optionKey: optionValue. Supported options can be different for each language. Run config-help -g {generator name} command for language-specific config options.`
    },
    {
        option: "-D",
        description: "sets specified system properties in the format of name=value,name=value (or multiple options, each with name=value)"
    },
    {
        option: "--dry-run",
        description: "Try things out and report on potential changes (without actually making changes)."
    },
    {
        option: "-e, --engine",
        description: `templating engine: "mustache" (default) or "handlebars" (beta)`
    },
    {
        option: "--enable-post-process-file",
        description: "Enable post-processing file using environment variables."
    },
    {
        option: "-g, --generator-name",
        description: "generator to use (see list command for list)",
        defaultValue: "typescript-axios"
    },
    {
        option: "--generate-alias-as-model",
        description: "Generate model implementation for aliases to map and array schemas. An 'alias' is an array, map, or list which is defined inline in a OpenAPI document and becomes a model in the generated code. A 'map' schema is an object that can have undeclared properties, i.e. the 'additionalproperties' attribute is set on that object. An 'array' schema is a list of sub schemas in a OAS document"
    },
    {
        option: "--git-host",
        description: "Git host, e.g. gitlab.com."
    },
    {
        option: "--git-repo-id",
        description: "Git repo ID, e.g. openapi-generator."
    },
    {
        option: "--git-user-id",
        description: "Git user ID, e.g. openapitools."
    },
    {
        option: "--group-id",
        description: "groupId in generated pom.xml"
    },
    {
        option: "--http-user-agent",
        description: "HTTP user agent, e.g. codegen_csharp_api_client, default to 'OpenAPI-Generator/{packageVersion}}/{language}'"
    },
    {
        option: "--ignore-file-override",
        description: "Specifies an override location for the .openapi-generator-ignore file. Most useful on initial generation."
    },
    {
        option: "--import-mappings",
        description: "specifies mappings between a given class and the import that should be used for that class in the format of type=import,type=import. You can also have multiple occurrences of this option."
    },
    {
        option: "--instantiation-types",
        description: "sets instantiation type mappings in the format of type=instantiatedType,type=instantiatedType.For example (in Java): array=ArrayList,map=HashMap. In other words array types will get instantiated as ArrayList in generated code. You can also have multiple occurrences of this option."
    },
    {
        option: "--invoker-package",
        description: "root package for generated code"
    },
    {
        option: "--language-specific-primitives",
        description: "specifies additional language specific primitive types in the format of type1,type2,type3,type3. For example: String,boolean,Boolean,Double. You can also have multiple occurrences of this option."
    },
    {
        option: "--library",
        description: "library template (sub-template)"
    },
    {
        option: "--log-to-stderr",
        description: "write all log messages (not just errors) to STDOUT. Useful for piping the JSON output of debug options (e.g. `-DdebugOperations`) to an external parser directly while testing a generator."
    },
    {
        option: "--minimal-update",
        description: "Only write output files that have changed."
    },
    {
        option: "--model-name-prefix",
        description: "Prefix that will be prepended to all model names."
    },
    {
        option: "--model-name-suffix",
        description: "Suffix that will be appended to all model names."
    },
    {
        option: "--model-package",
        description: "package for generated models"
    },
    {
        option: "--package-name",
        description: "package for generated classes (where supported)"
    },
    {
        option: "--release-note",
        description: "Release note, default to 'Minor update'."
    },
    {
        option: "--remove-operation-id-prefix",
        description: "Remove prefix of operationId, e.g. config_getId => getId"
    },
    {
        option: "--reserved-words-mappings",
        description: "specifies how a reserved name should be escaped to. Otherwise, the default _<name> is used. For example id=identifier. You can also have multiple occurrences of this option."
    },
    {
        option: "--server-variables",
        description: "sets server variables overrides for spec documents which support variable templating of servers."
    },
    {
        option: "--skip-validate-spec",
        description: "Skips the default behavior of validating an input specification."
    },
    {
        option: "--strict-spec",
        description: "'MUST' and 'SHALL' wording in OpenAPI spec is strictly adhered to. e.g. when false, no fixes will be applied to documents which pass validation but don't follow the spec."
    },
    {
        option: "--type-mappings",
        description: "sets mappings between OpenAPI spec types and generated code types in the format of OpenAPIType=generatedType,OpenAPIType=generatedType. For example: array=List,map=Map,string=String. You can also have multiple occurrences of this option."
    },
    {
        option: "-i, --input-spec",
        description: "location of the OpenAPI spec, as URL or file (required)"
    },
    {
        option: "-o, --output",
        description: "where to write the generated files (current dir by default)"
    },
    {
        option: "-p, --additional-properties",
        description: "sets additional properties that can be referenced by the mustache templates in the format of name=value,name=value. You can also have multiple occurrences of this option."
    },
    {
        option: "-s, --skip-overwrite",
        description: "specifies if the existing files should be overwritten during the generation."
    },
    {
        option: "-t, --template-dir",
        description: "folder containing the template files"
    },
    {
        option: "-v, --verbose",
        description: "verbose mode"
    }
];

const defaultOptions: Array<DefaultOptionType> = [
    {
        key1: "-g",
        key2: "--generator-name",
        value: "typescript-axios"
    },
    {
        key1: "-o",
        key2: "--output",
        value: "./generated"
    },
    // {
    //     key1: "-p",
    //     key2: "--additional-properties",
    //     value: "apiUrl=$(ApiUrl),apiVersion=${apiVersion},withSeparateModelsAndApi=true,apiPackage=api,modelPackage=model"
    // }
]

export { options as GenerateOptions, defaultOptions as GenerateDefaultOptions };