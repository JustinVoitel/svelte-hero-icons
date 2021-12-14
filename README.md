<div align="center">
  <h1>Svelte Heroicons</h1>
  <a href="https://www.npmjs.com/package/svelte-hero-icons"><img src="https://img.shields.io/npm/v/svelte-hero-icons.svg?style=flat" /></a>
</div>

## !!!WARNING!!!

With version 3.0.0 , this package is primarily meant for SvelteKit projects and it is not guaranteed to work with other build systems!

## Description

- complete heroicon set optimized for svelte
- programatically change solid or outline version based on the `solid` attribute
- fully typed for a great IDE experience
- works with SvelteKit & Vite

## Install

NPM

```bash
npm install svelte-hero-icons
```

## Configuration

### [SvelteKit](https://github.com/sveltejs/kit) & [vitejs](https://github.com/vitejs/vite)

- install as `dependency` (important)
- Add this to your `vite.config.js`, so all icons are bundled into one file -> no import waterfalls

```js
const config = {
  // other vite-plugin-svelte config
  kit: {
    // other svelte-kit config
    vite: {
      // other vite config
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
  import { ArrowUp, Filter, ... } from 'svelte-hero-icons'

  // For now you have to import the icon component like this:
  import Icon from 'svelte-hero-icons/Icon.svelte'
</script>

<!-- use solid attribute to control whether to show solid or outline version of icon -->
<Icon src="{Filter}" solid />

<!-- use size attribute to set icon size (32 -> 32px | 2rem | 100% == default ) -->
<Icon src="{ArrowUp}" size="32" />

<!-- use Windi CSS or tailwindcss classes directly -->
<Icon src="{Filter}" class="w-6 h-6 text-red-500" />
```

See all icons here: https://github.com/refactoringui/heroicons

## Known Problems
### Windows
If you are developing with Windows you might need to prevent the dependency from being externalized for SSR:
```js
const config = {
    // ...
    kit: {
        // ...
        vite: {
            // ...
            ssr: {
                noExternal: ['svelte-hero-icons']
            }
        }
    }
}
```

## Author

This package is based on [heroicons](https://github.com/refactoringui/heroicons)
