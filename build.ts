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
let outputDir: string;
let outputIconset: string;
let outputDirTypes: string;

let svgDict = {};

function main() {
  sourceDir = "./node_modules/heroicons";
  outputDir = "./dist";
  outputIconset = outputDir + "/iconset.json";
  outputDirTypes = outputDir + "/iconsets.d.ts";

  mkdirSync(outputDir, { recursive: true });
  getIconsFromDir("solid");
  getIconsFromDir("outline");
  writeSvgDict();
  generateTypes();
}

async function writeSvgDict() {
  writeFile(outputIconset, JSON.stringify(svgDict), (err: any) => {
    if (err) throw new Error(err);
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
  //console.log(svgDict["AcademicCap"]);
}

function generateTypes() {
  const logger = createWriteStream(outputDirTypes, { flags: "a" });

  const types = Object.keys(svgDict)
    .map((e) => `'${e}'`)
    .join("|");
  logger.write(`export type HeroIconset = ${types}`);
  logger.write(EOL);
  logger.end();
}

main();
