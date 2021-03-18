# svelte-hero-icons

### Now optimized for [sveltekit](https://github.com/sveltejs/kit) & [vitejs](https://github.com/vitejs/vite) Applications and fully typed

## Install

NPM

```bash
npm install svelte-hero-icons
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
