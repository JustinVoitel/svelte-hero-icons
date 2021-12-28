<script>
  export let src = [];
  export let size = "100%";
  export let solid = false;
  let customClass = "";
  export { customClass as class };
  if (size !== "100%") {
    if (
      size.slice(-1) != "x" &&
      size.slice(-1) != "m" &&
      size.slice(-1) != "%"
    ) {
      try {
        size = parseInt(size) + "px";
      } catch (error) {
        size = "100%";
      }
    }
  }
</script>

{#if src && src != []}
  {#if solid}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      class={customClass}
      width={size}
      height={size}
      {...$$restProps}
    >
      {#each src[0] ?? [] as att}
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
      class={customClass}
      width={size}
      height={size}
      {...$$restProps}
    >
      {#each src[1] ?? [] as att}
        <!-- @ts-ignore -->
        <path {...att} />
      {/each}
    </svg>
  {/if}
{/if}
