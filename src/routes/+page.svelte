<script>
  import * as Icons from "@steeze-ui/heroicons";
  import Icon from "$lib/Icon.svelte";

  const themes = Object.keys(Icons[Object.keys(Icons)[0]]);

  let theme = "mini";
</script>

<h1>@steeze-ui/heroicons</h1>

<label for="theme-select">Theme</label>
<select id="theme-select" bind:value={theme}>
  {#each themes as th}
    <option value={th}>{th}</option>
  {/each}
</select>
<span>{theme}</span>
<div>
  {#each Object.keys(Icons) as Src}
    <Icon
      src={Icons[Src]}
      size="24px"
      mini={theme == "mini"}
      solid={theme == "solid"}
      micro={theme == "micro"}
    />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
