import { Plugin } from "vite/dist/node/index";

import fs from "fs";

/**
 * Prepare the dist folder for npm publishing by modifying a copy of the root package.json
 */
export default function npmDist(components) {
    return {
        name: "npm-dist",
        apply: "build",
        enforce: "post",

        async closeBundle() {
            await new Promise(r => setTimeout(r, 2000));
            const packageJson = require("../package.json");
            packageJson.exports = components.reduce((set, { name, path }) => ({
                ...set,
                [name === "index" ? "." : `./${name.replace(/\/index$/g, "")}`]: {
                    "import": `./${name}.js`,
                    "require": `./${name}.js`
                }
            }), {});

            for(let prop of ["main", "module", "types"]) {
                packageJson[prop] = packageJson[prop].replace("/dist", "");
            }

            packageJson.files = fs.readdirSync("./dist");

            fs.writeFileSync("./dist/package.json", JSON.stringify(packageJson, null, 4));
            console.log("Wrote modified package.json");
        }
    } as Plugin;
}