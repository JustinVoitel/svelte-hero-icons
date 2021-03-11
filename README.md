# svelte-hero-icons

## Install

NPM

```bash
npm install --save-dev svelte-hero-icons
```

## Usage

- Default is Outline version of icon
- Use **solid** attribute for Solid Icons

```html
<script>
  // Only import what you need!
  import { ArrowUp, Filter, ... } from 'svelte-hero-icons'
</script>

<ArrowUp size="24" />
<Filter solid size="1.5x" />
```

### For Vitejs/Kit Users
Add this to your vite.config.js
```js
//vite.config.js
export default {
  ssr: {
      noExternal: ["svelte-hero-icons"],
  },
  ...
}
```

See all icons here: https://github.com/refactoringui/heroicons

## Author

This package is based on [heroicons](https://github.com/refactoringui/heroicons)
