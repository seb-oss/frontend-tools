import { OptionType } from "./option.type";

const options: Array<OptionType> = [
    {
        option: "-i, --input-spec",
        description: "location of the OpenAPI spec, as URL or file (required)"
    },
    {
        option: "--recommend",
        description: "recommend"
    }
];

export { options as ValidateOptions };
