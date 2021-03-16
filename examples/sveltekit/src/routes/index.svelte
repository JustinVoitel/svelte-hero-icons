<script lang="ts">
  import Counter from "$lib/Counter.svelte";
  import Icon from "svelte-hero-icons";
  import type { HeroIconset } from "svelte-hero-icons/dist/iconsets";

  let solid = false;
  let src: HeroIconset = "X";
</script>

<main>
  <Icon src="AcademicCap" size="100" {solid} />
  <Icon src="LightBulb" size="100" />
  <Icon {src} size="100" {solid} />

  <input type="checkbox" bind:checked={solid} />
  <input bind:value={src} />

  <Counter />

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 4rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
