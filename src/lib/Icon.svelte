<script>
  // import type { IconSource } from "@steeze-ui/heroicons/types";

  export let src;
  export let size = "100%";
  export let solid = false;
  export let mini = false;
  export let micro = false;

  $: icon = src?.[solid ? "solid" : mini ? "mini" : micro ? "micro" : "default"];

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

<svg
  {...icon?.a}
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  aria-hidden="true"
  {...$$restProps}
>
  {#each icon?.path ?? [] as a}
    <path {...a} />
  {/each}
</svg>
