<script lang="ts">
  // import { Annotation } from "./../../package";
  // import Icon from "./../../package/Icon.svelte";
  import { Annotation, Fire } from "svelte-hero-icons";
  import Icon from "svelte-hero-icons/Icon.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p width="100px">
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<Icon src={Annotation} size="100" />
<Icon src={Fire} size="150" solid height="200px" />
