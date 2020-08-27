const fs = require("fs");
const path = require("path");

function isDirectory(name) {
    return fs.lstatSync(`${path.resolve("src")}\\${name}`).isDirectory()
}

const utils = fs
    .readdirSync(path.resolve("src"))
    .filter(name => isDirectory(name))
    .map(name => `export * from "./${name}";`);

const indexes = utils.reduce((prev, curr) => prev + "\n" + curr);

fs.writeFileSync(`${path.resolve("src")}\\index.ts`, indexes);
