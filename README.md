<div align="center">
  <h1>Svelte Heroicons</h1>
  <a href="https://www.npmjs.com/package/svelte-hero-icons"><img src="https://img.shields.io/npm/v/svelte-hero-icons.svg?style=flat" /></a>
</div>

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
export default {
  // other vite config stuff
  optimizeDeps: {
    include: ['svelte-hero-icons'],
  },
}
```
## Usage

- Default is Outline version of icon
- Use **solid** attribute for Solid Icons

```html
<script>
  // Only import what you need!
  import Icon, { ArrowUp, Filter, ... } from 'svelte-hero-icons'
</script>

<!-- use solid attribute to control whether to show solid or outline version of icon -->
<Icon src="{Filter}" solid />

<!-- use size attribute to set icon size (32 -> 32px | 2rem | 100% == default ) -->
<Icon src="{ArrowUp}" size="32" />

<!-- use Windi CSS or tailwindcss classes directly -->
<Icon src="{Filter}" class="w-6 h-6 text-red-500" />
```

See all icons here: https://github.com/refactoringui/heroicons

## Author

This package is based on [heroicons](https://github.com/refactoringui/heroicons)
