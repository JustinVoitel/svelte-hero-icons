<script>
  export let src = "LightningBolt";
  export let size = "100%";
  export let solid = false;
  let customClass = "";
  export { customClass as class };
  if (size !== "100%") {
    size =
      size.slice(-1) === "x" || size.slice(-1) === "m"
        ? size
        : parseInt(size) + "px";
  }
  let icon;
  $: src && importIcon(src);

  // $: console.log(icon);

  async function importIcon(iconSrc) {
    icon = await import("./../dist/iconset.json").then(
      (module) => module[iconSrc]
    );
  }
</script>

{#if icon}
  {#if solid}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="heroicon solid {customClass}"
      width={size}
      height={size}
    >
      {#each icon[0] ?? [] as att}
        <!-- @ts-ignore -->
        <path {...att} />
      {/each}
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="heroicon outline {customClass}"
      width={size}
      height={size}
    >
      {#each icon[1] ?? [] as att}
        <!-- @ts-ignore -->
        <path {...att} />
      {/each}
    </svg>
  {/if}
{/if}
