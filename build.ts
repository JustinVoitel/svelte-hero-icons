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

const svgTemplate = (outline: string, solid: string) => {
  return `
<script>
   export let size = "100%";
   export let solid = false;
   let customClass = "";
   export { customClass as class };

   if (size !== "100%") {
   size = size.slice(-1) === 'x' 
         ? size.slice(0, size.length -1) + 'em'
         : parseInt(size) + 'px';
   }
</script>
   
{#if solid}
${solid}
{:else}
${outline}
{/if}`;
};

let sourceDir: string;
let outputDir: string;
let outputDirIcons: string;
let outputDirExports: string;
let outputDirTypes: string;

let svgDict = {};

function main() {
  sourceDir = "./node_modules/heroicons";
  outputDir = ".";
  outputDirIcons = outputDir + "/icons";
  outputDirExports = outputDir + "/index.mjs";
  outputDirTypes = "./index.d.ts";

  mkdirSync(outputDirIcons, { recursive: true });
  getIconsFromDir("outline");
  getIconsFromDir("solid");

  generateExportsFile();
  generateSvelteIcons();
  generateFileTypes();
}

function generateFileTypes() {
  const logger = createWriteStream(outputDirTypes, { flags: "a" });
  logger.write("import type { SvelteComponentTyped } from 'svelte' \n");

  Object.keys(svgDict).forEach((name) => {
    logger.write(
      `export class ${name} extends SvelteComponentTyped<{size?: string,solid?: boolean, class?:string}> {}`
    );
    logger.write(EOL);
  });
  logger.end();
}

function getIconsFromDir(dir: string) {
  readdirSync(join(sourceDir, dir)).forEach((fileName) => {
    const key = pascalcase(fileName.replace(".svg", ""));
    const data = readFileSync(join(sourceDir, dir, fileName)).toString();
    if (!svgDict[key]) {
      svgDict[key] = {};
    }
    svgDict[key][dir] = data;
  });
}

function generateExportsFile() {
  const logger = createWriteStream(outputDirExports, { flags: "a" });
  Object.keys(svgDict).forEach((name) => {
    logger.write(`export { default as ${name} } from './icons/${name}.svelte'`);
    logger.write(EOL);
  });
  logger.end();
}

function generateSvelteIcons() {
  Object.entries(svgDict).forEach(([name, data]) => {
    writeFile(
      outputDirIcons + "/" + name + ".svelte",
      getConvertedSvelteData(data, name),
      (err: any) => {
        if (err) throw new Error(err);
      }
    );
  });
}

function getConvertedSvelteData(data: any, name: string): string {
  //console.log(data);
  let outlineStr = transformIconData("outline", "solid", data);
  let solidStr = transformIconData("solid", "outline", data);

  return svgTemplate(outlineStr, solidStr);
}

function transformIconData(
  format: string,
  fallback: string,
  data: any
): string {
  let output = "";

  if (data[format]) {
    output =
      data[format].substring(0, 4) +
      ` width={size} height={size} class='hero ${format} {customClass}'` +
      data[format].substring(4);
  } else if (data[fallback]) {
    output =
      data[fallback].substring(0, 4) +
      ` width={size} height={size} class='hero ${fallback} {customClass}'` +
      data[fallback].substring(4);
  }
  return output;
}

main();
