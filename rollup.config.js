import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "index.js",
    output: [
      { file: "dist/index.mjs", format: "es" },
      {
        file: "dist/index.js",
        format: "umd",
        name: "Heroicons",
      },
    ],
    plugins: [resolve(), svelte()],
  },
];
