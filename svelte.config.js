import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import vercel from "@sveltejs/adapter-vercel";

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
    vite: {
      optimizeDeps: {
        include: ["svelte-hero-icons"],
      },
    },
  },
};

export default config;
