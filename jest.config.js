const { argv } = process;
/**
 * Retrives the specified components only by eliminating:
 *  - The first two are `node` and `jest` URLs
 *  - Anything with `--` is an inline property such as `--watch` and `--detectOpenHandles`
 */
const specific = argv.slice(2, argv.length).filter((value) => value.indexOf("--") === -1);

const collectCoverageFrom = ["!src/index.js"];
const testMatch = [];

function extractSpecifics(injectTo) {
    return specific.map((item) => injectTo.replace("%inject%", item))
}

if (specific.length) {
    collectCoverageFrom.push(...extractSpecifics("src/%inject%.(ts|js)"));
    testMatch.push(...extractSpecifics("**/%inject%.test.(ts|js)"))
} else {
    collectCoverageFrom.push("src/*.(ts|js)");
    testMatch.push("**/*.test.(ts|js)");
}

module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testEnvironment: "jsdom",
    testMatch,
    modulePaths: [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    globals: {
        "NODE_ENV": "test"
    },
    verbose: true,
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    transformIgnorePatterns: [], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
    testEnvironment: "node",
    moduleNameMapper: {
        "aurelia-(.*)": "<rootDir>/node_modules/$1"
    },
    // some coverage and results processing options
    collectCoverage: true,
    collectCoverageFrom,
    coverageDirectory: "./tests/coverage",
    coverageReporters: ["json", "lcov", "text"]
};