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
let outputIconset: string = "./dist/heroicons";
let outputIconComponent: string = "./dist/Icon.svelte";
let outputTypes: string = "./dist/index.d.ts";
let outputExportsModule: string = "./dist/index.js";
let outputExportsCommon: string = "./dist/index.cjs";

let svgDict = {};

function main() {
  mkdirSync(outputIconset, { recursive: true });
  copyComponent();
  getIconsFromDir("solid");
  getIconsFromDir("outline");
  writeSvgDict();
  generateExportsModule();
  generateExportsCommon();
  generateTypes();
}

function copyComponent() {
  const iconComponent = readFileSync("./src/Icon.svelte");
  writeFile(outputIconComponent, iconComponent, (err: any) => {
    if (err) throw new Error(err);
  });
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
  let typeTemplate = readFileSync("./types/index.d.ts").toString();
  const types = Object.keys(svgDict)
    .map(
      (name) => `export {default as ${name} } from "./heroicons/${name}.json"`
    )
    .join("\n");
  typeTemplate = typeTemplate.replaceAll("//&&TYPEEXPORTS&&", types);
  const logger = createWriteStream(outputTypes, { flags: "a" });
  logger.write(typeTemplate);
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
