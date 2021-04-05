import {
  writeFile,
  createWriteStream,
  readdirSync,
  readFileSync,
  mkdirSync,
} from "fs";
import { join } from "path";
import { EOL } from "os";
import pascalcase from "pascalcase";
import { parse } from "html-parse-stringify";

let sourceDir: string = "./node_modules/heroicons";
let outputIconset: string = "./src/heroicons";
let outputTypes: string = "./types/index.d.ts";
let outputExportsModule: string = "./src/index.js";
let outputExportsCommon: string = "./src/index.cjs";

let svgDict = {};

function main() {
  mkdirSync(outputIconset, { recursive: true });
  getIconsFromDir("solid");
  getIconsFromDir("outline");
  writeSvgDict();
  generateExportsModule();
  generateExportsCommon();
  generateTypes();
}

async function writeSvgDict() {
  Object.keys(svgDict).forEach((name) => {
    writeFile(
      join(outputIconset, `${name}.json`),
      JSON.stringify(svgDict[name]),
      (err: any) => {
        if (err) throw new Error(err);
      }
    );
  });
}

function getIconsFromDir(dir: "solid" | "outline") {
  readdirSync(join(sourceDir, dir)).forEach((fileName) => {
    const key = pascalcase(fileName.replace(".svg", ""));
    const data = readFileSync(join(sourceDir, dir, fileName)).toString();
    const pathsAst: Record<string, any>[] = parse(data)[0].children;
    if (!svgDict[key]) {
      svgDict[key] = [];
    }
    let index = 0;
    if (dir === "outline") {
      index = 1;
    }
    svgDict[key][index] = pathsAst
      .filter((e) => e.type != "text")
      .map((e) => e.attrs);
  });
}

function generateTypes() {
  const logger = createWriteStream(outputTypes, { flags: "a" });

  logger.write(`import { SvelteComponentTyped } from "svelte";

export default class Icon extends SvelteComponentTyped<{
  src?: any;
  size?: string;
  solid?: boolean;
  class?: string;
}> {}\n\n
  `);

  const types = Object.keys(svgDict)
    .map(
      (name) =>
        `export {default as ${name} } from "./../src/heroicons/${name}.json"`
    )
    .join("\n");
  logger.write(types);
  logger.end();
}

function generateExportsModule() {
  const logger = createWriteStream(outputExportsModule, { flags: "a" });
  logger.write(`import Icon from "./Icon.svelte"\nexport default Icon`);
  logger.write(EOL);
  logger.write(EOL);

  const exports = Object.keys(svgDict)
    .map(
      (name) => `export {default as ${name} } from "./heroicons/${name}.json"`
    )
    .join("\n");
  logger.write(exports);
  logger.write(EOL);
  logger.end();
}

function generateExportsCommon() {
  const logger = createWriteStream(outputExportsCommon, { flags: "a" });
  logger.write(`module.exports.default = require("./Icon.svelte")`);
  logger.write(EOL);
  logger.write(EOL);

  const exports = Object.keys(svgDict)
    .map(
      (name) => `module.exports.${name} = require("./heroicons/${name}.json")`
    )
    .join("\n");
  logger.write(exports);
  logger.write(EOL);
  logger.end();
}

main();
