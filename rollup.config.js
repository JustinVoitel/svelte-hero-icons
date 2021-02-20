import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
///_snowpack/pkg/svelte/internal.js:1345:15
// const name = pkg.name
//    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
//    .replace(/^\w/, m => m.toUpperCase())
//    .replace(/-\w/g, m => m[1].toUpperCase());

// export default {
//    input: 'src/index.js',
//    output: [
//       { file: pkg.module, 'format': 'es' },
//       { file: pkg.main, 'format': 'umd', name }
//    ],
//    plugins: [
//       svelte(),
//       resolve(),
//       terser()
//    ]
// };
console.log(pkg.module);
export default [
  {
    input: "src/index.js",
    output: [
      { file: pkg.module, format: "es", sourcemap: true },
      {
        file: pkg.main,
        format: "umd",
        name: "Heroicons",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      svelte({ compilerOptions: { generate: "ssr" } }),
      terser(),
    ],
  },
];
