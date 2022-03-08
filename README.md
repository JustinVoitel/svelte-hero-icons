<div align="center">
  <h1>Svelte Heroicons</h1>
  <a href="https://www.npmjs.com/package/svelte-hero-icons"><img src="https://img.shields.io/npm/v/svelte-hero-icons.svg?style=flat" /></a>
</div>

## Important Info for Current or New Users

This package won't be updated for the upcoming Heroicons 2.0 release and will stay as a reference to v1.x.

If you want to use v2.0 Icons, check out [@steeze-ui/icons](https://github.com/steeze-ui/icons) which is meant as a successor of svelte-hero-icons and will be be maintained instead:

### What is @steeze-ui/Icons ?

- Icon Components for various frameworks (svelte, lit, solid and react)
- Icon Packs (e.g heroicons, radix-icons, feathericons and more)
- A template to create your own publishable Icon Pack
- Now lives under an org that will focus on more ui tools for svelte

---

## Description

- complete [heroicons](https://heroicons.dev/) set optimized for svelte
- programatically change solid or outline version based on the `solid` attribute
- fully typed for a great IDE experience
- works out of the box with SvelteKit
- SSR compatible (no JS is needed for the client to display the icon)

## Installation

- install as `devDependency`

### Example for npm

```bash
npm i -D svelte-hero-icons
```

## Configuration

## [SvelteKit](https://github.com/sveltejs/kit)

- svelte-hero-icons should work with SvelteKit `without any configuration`
- If you have any problems, this could help adding to your `svelte.config.js`:

```js
kit: {
  vite: {
    ssr: {
      noExternal: ["svelte-hero-icons"],
    },
  },
},
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

## Author

This package is based on [heroicons](https://github.com/refactoringui/heroicons)

See all available icons here: https://github.com/refactoringui/heroicons
