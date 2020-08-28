import resolve from "@rollup/plugin-node-resolve"
import rollupTypescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import summary from "rollup-plugin-summary";

export default {
    input: "src/index.ts",
    cache: true,
    output: {
        dir: "dist",
        format: "esm",
        sourcemap: true,
        esModule: true,
        preserveModules: true,
    },
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript(),
        terser(),
        json(),
        summary({ warnLow: 3e3 })
    ]
};
