import { writeFile, createWriteStream, readdirSync, readFileSync, mkdirSync, } from "fs"
import { join } from "path"
import { EOL } from "os"
import pascalcase from "pascalcase"



interface svgElement {
   name: string
   data: string
}

let svgTemplate = `
<script>
   export let size = "100%";
   let customClass = "";
   export { customClass as class };

   if (size !== "100%") {
   size = size.slice(-1) === 'x' 
         ? size.slice(0, size.length -1) + 'em'
         : parseInt(size) + 'px';
   }
</script>

`

let sourceDir: string
let outputDir: string
let outputDirIcons: string
let outputDirExports: string

let svgArray: svgElement[] = []

function main() {
   sourceDir = "./heroicons/dist"
   outputDir = "./src/"
   outputDirIcons = outputDir + "/icons"
   outputDirExports = outputDir + "/index.js"

   mkdirSync(outputDirIcons, { recursive: true })
   svgArray = getNameArray();

   generateExportsFile()
   generateSvelteIcons()
}

function flattenDeep(arr1: any): any[] {
   return arr1.reduce((acc: any, val: any) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

function getNameArray(): svgElement[] {
   let a = readdirSync(sourceDir).map(svgFolder => {
      return readdirSync(join(sourceDir, svgFolder)).map(svgFile => ({
         name: pascalcase(svgFile.replace(".svg", "")),
         data: readFileSync(join(sourceDir, svgFolder, svgFile)).toString()
      }))
   })
   return flattenDeep(a);
}



function generateExportsFile() {
   const logger = createWriteStream(outputDirExports, { flags: "a" })
   getNameArray().forEach(({ name }) => {
      logger.write(`export { default as ${name} } from './icons/${name}.svelte'`)
      logger.write(EOL)
   })
   logger.end()
}

function generateSvelteIcons() {
   svgArray.forEach(element => {
      writeToSvelteFile(element.name, element.data)
   })
}



function writeToSvelteFile(name: string, data: string) {
   writeFile(getSvelteFileUrl(name), getConvertedSvelteData(data), (err: any) => {
      if (err) throw new Error(err)
   })
}

function getSvelteFileUrl(name: string): string {
   return outputDirIcons + "/" + name + ".svelte"
}


function getConvertedSvelteData(data: string): string {
   const str = data.substring(0, 4) + " width={size} height={size} class='hero {customClass}'" + data.substring(4)
   return svgTemplate + str
}

main()
