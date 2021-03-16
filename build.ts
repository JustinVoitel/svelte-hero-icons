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

let sourceDir: string;
let outputIconset: string;
let outputTypes: string;

let svgDict = {};

function main() {
  sourceDir = "./node_modules/heroicons";
  outputIconset = "./src/heroicons";
  outputTypes = "./types/iconsets.d.ts";

  mkdirSync(outputIconset, { recursive: true });
  getIconsFromDir("solid");
  getIconsFromDir("outline");
  writeSvgDict();
  generateTypes();
}

async function writeSvgDict() {
  Object.keys(svgDict).forEach((name) => {
    writeFile(
      join(outputIconset, `hero-${name}.json`),
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

  const types = Object.keys(svgDict)
    .map((e) => `'${e}'`)
    .join("|");
  logger.write(`export type HeroiconSet = ${types}`);
  logger.write(EOL);
  logger.end();
}

main();
