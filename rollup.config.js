import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import commonPkg from "../package.json";

const components = require("./src/index.json");

const defaults = {
    input: ["./src/index.ts", ...components.indexes],
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {}), ...Object.keys(commonPkg.dependencies || {})],
};

const resolveOnly = [new RegExp(`^((?!${defaults.external.map((item) => `(${item})`).join("|")}).)*$`, "g")];

export default [
    {
        ...defaults,
        plugins: [
            typescript(),
            resolve({ resolveOnly }),
            commonjs(),
        ],
        output: {
            dir: "dist",
            format: "cjs",
            entryFileNames: "[name].js",
            sourcemap: true,
            esModule: true,
            exports: "named",
            preserveModules: true,
        },
    },
    {
        ...defaults,
        plugins: [
            typescript({ compilerOptions: { declarationDir: "dist/esm", outDir: "dist/esm" } }),
            resolve({ resolveOnly }),
            commonjs(),
        ],
        output: {
            dir: "dist/esm",
            format: "esm",
            entryFileNames: "[name].js",
            sourcemap: true,
            esModule: true,
            exports: "named",
            preserveModules: true,
        },
    },
];
