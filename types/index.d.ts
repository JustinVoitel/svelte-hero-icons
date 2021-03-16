import { SvelteComponentTyped } from "svelte";
import { HeroIconset } from "../dist/iconsets";

export default class Icon extends SvelteComponentTyped<{
  src?: HeroIconset;
  size?: string;
  solid?: boolean;
  class?: string;
}> {}
