import fs from "fs";
import { resolve, dirname } from "path";

import { Plugin } from "vite/dist/node/index";

let viteConfig;

let cssSiblings = [];

export function cssSibling() {
    return {
        name: "sibling-css",
        apply: "build",
        enforce: "post",

        renderChunk(source, module) {
            if(module.viteMetadata?.importedCss.size) {
                cssSiblings.push({
                    parent: module.fileName,
                    stylesheet: Array.from(module.viteMetadata?.importedCss)[0]
                });
            }
        },
    } as Plugin;
}

export default function() {
    return {
        name: "lib-css",
        apply: "build",
        enforce: "post",

        configResolved(resolvedConfig) {
            viteConfig = resolvedConfig;
        },

        // transform(code, id, options) {
        //     console.log(`Transforming`, id);
        // },

        writeBundle(option, bundle) {
            if (!viteConfig.build || !viteConfig.build.lib) {
                // only for lib build
                console.warn("vite-plugin-libcss only works in lib mode.")
                return;
            }
            if (option.format !== "es") {
                // only for es built
                return;
            }

            const files = Object.keys(bundle);
            const cssFile = files.find((v) => v.endsWith(".css"));
            if (!cssFile) {
                return;
            }

            for (const file of files) {
                if (!bundle[file]["isEntry"]) {
                    // only for entry
                    continue;
                }

                let { stylesheet } = cssSiblings.find(x => x.parent === file) || {};

                if(file.startsWith("components/") && file.endsWith("index.js") && stylesheet) {
                    const outDir = viteConfig.build.outDir || "dist";
                    const oldStylePath = resolve(viteConfig.root, outDir, stylesheet);
                    const filePath = resolve(viteConfig.root, outDir, file);
                    const siblingDir = dirname(filePath);
                    const stylePath = resolve(siblingDir, "style.css");

                    fs.renameSync(oldStylePath, stylePath);

                    let data = fs.readFileSync(filePath, "utf8");
                    data = data.replace(/^const style = "";$/m, `\nimport "./style.css";\n`);
                    fs.writeFileSync(filePath, data);
                }
            }
        },
    } as Plugin;
};
