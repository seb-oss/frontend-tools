import { OptionType } from "./option.type";

const options: Array<OptionType> = [
    {
        option: "--fail-fast",
        description: "fail fast on any errors"
    },
    {
        option: "--includes-base-dir <includes>",
        description: "base directory used for includes"
    },
    {
        option: "--root-dir <root>",
        description: "root directory used output/includes (includes can be overridden)"
    },
    {
        option: "--timeout <timeout>",
        description: "execution timeout (minutes)"
    },
    {
        option: "-r, --threads",
        description: "thread count"
    },
    {
        option: "-v, --verbose",
        description: "verbose mode"
    }
];

export { options as BatchOptions };