import { OptionType } from "./option.type";

const options: Array<OptionType> = [
    {
        option: "-l, --language",
        description: "the implementation language for the generator class"
    },
    {
        option: "-n, --name",
        description: "the human-readable name of the generator"
    },
    {
        option: "-o, --output",
        description: "where to write the generated files (current dir by default)"
    },
    {
        option: "-p, --package",
        description: "the package to put the main class into (defaults to org.openapitools.codegen)"
    },
    {
        option: "-t, --type",
        description: "the type of generator that is created"
    }
];

export { options as MetaOptions };
