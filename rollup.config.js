import resolve from "@rollup/plugin-node-resolve"
import rollupTypescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import asTable from "as-table";
import chalk from "chalk";

function color(value) {
    const [num, unit] = value.split(" ");
    switch (unit) {
        case "B": return chalk.green(value);
        case "KB": return chalk.yellowBright(value);
        case "MB": return chalk.red(value);
        default: return value;
    }
}

function calculateByteSize(value) {
    const [num, unit] = value.split(" ");
    switch (unit) {
        case "B": return parseFloat(num);
        case "KB": return parseFloat(num) * 1e3;
        case "MB": return parseFloat(num) * 1e6;
        default: return parseFloat(num);
    }
}

function getReadableSize(value) {
    switch (true) {
        case value < 1e3:
            return value.toFixed() + " B";
        case value < 1e6 && value >= 1e3:
            return (value / 1e3).toFixed() + " KB";
        case value >= 1e6:
            return (value / 1e6).toFixed() + " MB";
    }
}

const sizes = [];
let totalSize = 0;
let totalMinified = 0;
let totalGzipped = 0;

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
        filesize({
            reporter: (options, bundle, { fileName, bundleSize, minSize, gzipSize }) => {
                totalSize += calculateByteSize(bundleSize);
                totalMinified += calculateByteSize(minSize);
                totalGzipped += calculateByteSize(gzipSize);
                sizes.push({
                    Name: fileName,
                    Size: bundleSize,
                    Minified: minSize,
                    Gzipped: gzipSize,
                });
            }
        }),
        {
            name: "pretty output",
            generateBundle: () => {
                sizes.push(
                    {
                        Name: "-----------",
                        Size: "-----",
                        Minified: "-----",
                        Gzipped: "-----",
                    },
                    {
                        Name: "Total",
                        Size: getReadableSize(totalSize),
                        Minified: getReadableSize(totalMinified),
                        Gzipped: getReadableSize(totalGzipped),
                    }
                );
                console.log(asTable(sizes.map(item => ({
                    Name: item.Name,
                    Size: color(item.Size),
                    Minified: color(item.Minified),
                    Gzipped: color(item.Gzipped),
                }))));
            }
        }
    ]
};
