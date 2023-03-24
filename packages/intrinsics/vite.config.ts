import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts";
import libcss, { cssSibling } from "./plugins/libcss";
import npmDist from "./plugins/npmDist";

// import cssInjection from "vite-plugin-css-injected-by-js";

const indexFile = fs.readFileSync("./src/lib/index.ts", "utf-8").toString();
const regex = /^export { default as (\w+) } from "(.*)";/gmi;

let components = [
    { name: "index", path: path.resolve(__dirname, "src/lib/index.ts") },
    { name: "classnames", path: path.resolve(__dirname, "src/lib/classnames.ts") },
    { name: "Polymorphism", path: path.resolve(__dirname, "src/lib/Polymorphism.ts") }
];

let match;
while((match = regex.exec(indexFile))) {
    components.push({ name: `components/${match[1]}/index`, path: path.resolve(__dirname, "src/lib", match[2]) });
}

export default defineConfig({
    plugins: [
        react(),
        npmDist(components),
        dts({
            staticImport: true,
            skipDiagnostics: false,
            rollupTypes: true,
            insertTypesEntry: true
        }),
        cssSibling(),
        libcss()
    ],
    css: {

    },
    build: {
        target: "es2019",
        minify: false,
        cssCodeSplit: true,
        sourcemap: true,
        lib: {
            entry: components.reduce((set, { name, path }) => ({
                ...set,
                [name]: path
            }), {}),
            name: "Intrinsics",
            formats: ["es"]
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                assetFileNames: "[name].[ext]",
                globals: {
                    "react": "React",
                    "react-dom": "ReactDOM"
                },
            },
        }
    }
});
