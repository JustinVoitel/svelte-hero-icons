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
let outputIconset: string = "./src/lib/heroicons";
let outputExportsModule: string = "./src/lib/index.js";

let svgDict = {};

function main() {
  mkdirSync(outputIconset, { recursive: true });
  getIconsFromDir("solid");
  getIconsFromDir("outline");
  writeSvgDict();
  generateExportsModule();
}

async function writeSvgDict() {
  Object.keys(svgDict).forEach((name) => {
    writeFile(
      join(outputIconset, `${name}.js`),
      "export default " + JSON.stringify(svgDict[name]),
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
    const pathsAst: Record<string, any>[] = (parse(data)[0] as any).children;
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

function generateExportsModule() {
  const logger = createWriteStream(outputExportsModule, { flags: "a" });
  let exports = Object.keys(svgDict)
    .map((name) => `export {default as ${name}} from "./heroicons/${name}.js"`)
    .join("\n");
  exports += `\nexport {default as Icon} from "./Icon.svelte"\n`;
  logger.write(exports);
  logger.write(EOL);
  logger.end();
}

main();
