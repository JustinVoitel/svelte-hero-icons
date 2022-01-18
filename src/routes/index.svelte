<script lang="ts">
  //* import Icon component and single Icon source
  // import { Annotation, Icon } from "$lib";

  // import * as Icons from "$lib";

  // const icons = Icons as unknown as any[];

  import * as Icons from "svelte-hero-icons";
  import { Icon } from "svelte-hero-icons";
</script>

<h1>Welcome to Heroicons in SvelteKit</h1>
<p width="100px">
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<p width="100px">
  Visit <a href="https://heroicons.com">heroicons.com</a> to browse all available
  icons
</p>

<!-- <Icon src={Annotation} size="100" solid /> -->
<!-- <div style="display:flex;gap:1rem;flex-wrap:wrap;width:100%;height:100%">
  {#each Object.values(icons) as icon}
    <Icon src={icon} size="30" />
  {/each}
</div> -->

<ul style="">
  <Icon src={Icons.FingerPrint} size="100" />
</ul>
