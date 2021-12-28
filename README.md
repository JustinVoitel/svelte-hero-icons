<div align="center">
  <h1>Svelte Heroicons</h1>
  <a href="https://www.npmjs.com/package/svelte-hero-icons"><img src="https://img.shields.io/npm/v/svelte-hero-icons.svg?style=flat" /></a>
</div>

## Info

Check out [@steeze-ui/icons](https://github.com/steeze-ui/icons) which is meant as a successor of svelte-hero-icons:

- Icon Components for any framework (for now its only svelte)
- Icon Packs (e.g heroicons, radix-icons, iconic-free)
- A template to create your own publishable Icon Pack (Planned)
- Now lives under an org that will focus on more ui tools that I have planned (primarily for svelte)

## Description

- complete heroicon set optimized for svelte
- programatically change solid or outline version based on the `solid` attribute
- fully typed for a great IDE experience
- works with SvelteKit & Vite

## Install

- install as `dependency` (important)

NPM

```bash
npm install svelte-hero-icons
```

## Configuration

### [SvelteKit](https://github.com/sveltejs/kit) & [vitejs](https://github.com/vitejs/vite)

- Add this to your `vite.config.js`, so all icons are bundled into one file -> no import waterfalls

```js
const config = {
  kit: {
    vite: {
      //!IMPORTANT so the icon data can be imported (as JSON)
      ssr: {
        noExternal: ["svelte-hero-icons"],
      },

      // no import waterfalls in development
      optimizeDeps: {
        include: ["svelte-hero-icons"],
      },
    },
  },
};
export default config;
```

## Usage

- Default is Outline version of icon
- Use **solid** attribute for Solid Icons

```html
<script>
  // Only import what you need!
  import { Icon, ArrowUp, Filter } from "svelte-hero-icons";
</script>

<!-- use solid attribute to control whether to show solid or outline version of icon -->
<Icon src="{Filter}" solid />

<!-- use size attribute to set icon size (32 -> 32px | 2rem | 100% == default ) -->
<Icon src="{ArrowUp}" size="32" />

<!-- use Windi CSS or tailwindcss classes directly -->
<Icon src="{Filter}" class="h-6 text-red-500 w-6" />
```

See all icons here: https://github.com/refactoringui/heroicons

## Known Problems

### Windows & pnpm

If you are developing with Windows or pnpm you need to prevent the dependency from being externalized for SSR:

```js
const config = {
  // ...
  kit: {
    // ...
    vite: {
      // ...
      ssr: {
        noExternal: ["svelte-hero-icons"],
      },
    },
  },
};
```

## Author

This package is based on [heroicons](https://github.com/refactoringui/heroicons)
