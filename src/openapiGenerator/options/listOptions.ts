import { OptionType } from "./option.type";

const options: Array<OptionType> = [
    {
        option: "-i, --include",
        description: "comma-separated list of stability indexes to include (value: all,beta,stable,experimental,deprecated). Excludes deprecated by default."
    },
    {
        option: "-s, --short",
        description: "shortened output (suitable for scripting)"
    }
];

export { options as ListOptions };