const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");

const dist = path.resolve(__dirname, "../dist");
const root = path.resolve(__dirname, "../");

console.log("⌛  Preparing prerelease files...");

function writePackage() {
    const { name, author, version, main, description, publishConfig, repository, bugs, homepage, keywords, license } = pkg;
    const releasePkg = { name, author, version, main, description, publishConfig, repository, bugs, homepage, keywords, license };
    fs.writeFileSync(path.resolve(dist, "package.json"), JSON.stringify(releasePkg, null, 4));
    console.log("📄  Wrote package.json");
}

function writeIndexes() {
    fs.readdirSync(dist)
        .filter((item) => fs.lstatSync(path.resolve(dist, item)).isDirectory())
        .forEach((item) => fs.copyFileSync(path.resolve(dist, item, "index.d.ts"), path.resolve(dist, item, "index.js")));

    fs.copyFileSync(path.resolve(dist, "index.js"), path.resolve(dist, "index.d.ts"));
    console.log("📄  Generated indexes");
}

function writeReadme() {
    fs.copyFileSync(path.resolve(root, "README.md"), path.resolve(dist, "README.md"));
    console.log("📄  Copied README.md");
}

function writeLicense() {
    fs.copyFileSync(path.resolve(root, "LICENSE"), path.resolve(dist, "LICENSE"));
    console.log("📄  Copied LICENSE");
}

writePackage();
writeIndexes();
writeReadme();
writeLicense();

console.log("🎉  Done");