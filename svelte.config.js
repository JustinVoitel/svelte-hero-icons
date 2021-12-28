import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
// import vercel from "@sveltejs/adapter-vercel";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  //   disableDependencyReinclusion: ["svelte-hero-icons"],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    adapter: node(),
    package: {
      exports: (file) => file === "index.js",
      // files: (file) => !file.startsWith("internal"), //exclude internal Components
    },
    vite: {
      // server: {
      //   fs: {
      //     allow: ["package", "package.json"],
      //   },
      // },
      // resolve: {
      //   alias: {
      //     "svelte-hero-icons": path.resolve("package"),
      //   },
      // },
      optimizeDeps: {
        include: ["svelte-hero-icons"],
      },
      ssr: {
        noExternal: ["svelte-hero-icons"],
      },
    },
  },
};

export default config;
