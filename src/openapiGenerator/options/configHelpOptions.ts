import { OptionType } from "./option.type";

const options: Array<OptionType> = [
    {
        option: "-f, --format",
        description: "Write output files in the desired format. Options are 'text', 'markdown' or 'yamlsample'. Default is 'text'."
    },
    {
        option: "--feature-set",
        description: "displays feature set as supported by the generator"
    },
    {
        option: "--import-mappings",
        description: "displays the default import mappings (types and aliases, and what imports they will pull into the template)"
    },
    {
        option: "--instantiation-types",
        description: "displays types used to instantiate simple type/alias names"
    },
    {
        option: "--language-specific-primitive",
        description: "displays the language specific primitives (types which require no additional imports, or which may conflict with user defined model names)"
    },
    {
        option: "--markdown-header",
        description: "When format=markdown, include this option to write out markdown headers (e.g. for docusaurus)."
    },
    {
        option: "--named-header",
        description: "Header includes the generator name, for clarity in output"
    },
    {
        option: "--reserved-words",
        description: "displays the reserved words which may result in renamed model or property names"
    },
    {
        option: "-o, --output",
        description: "Optionally write help to this location, otherwise default is standard output"
    },
    {
        option: "--full-details",
        description: `displays CLI options as well as other configs/mappings (implies --instantiation-types, --reserved-words, --language-specific-primitives, --import-mappings, --supporting-files)`
    },
    {
        option: "-g, --generator-name",
        description: "generator to get config help for",
        defaultValue: "typescript-axios"
    }
];

export { options as ConfigHelpOptions };