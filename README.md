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

<Icon src="{ArrowUp}" size="24" />
<Icon src="{Filter}" solid size="2rem" />

//use Windi CSS or tailwindcss classes directly
<Icon src="{Filter}" class="w-6 h-6 text-red-500" />
```

See all icons here: https://github.com/refactoringui/heroicons

## Author

This package is based on [heroicons](https://github.com/refactoringui/heroicons)
