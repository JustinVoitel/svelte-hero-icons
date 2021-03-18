<script>
  import { onMount } from "svelte";
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
  onMount(async () => {
    console.log("mounted");
    let res = await import(
      "./../../node_modules/svelte-hero-icons/src/heroicons/hero-AcademicCap.json"
    ).then(({ default: res }) => res);
    icon = res;
  });
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
