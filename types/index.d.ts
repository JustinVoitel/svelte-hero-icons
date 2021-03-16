import { SvelteComponentTyped } from "svelte";
import { HeroiconSet } from "../dist/iconsets";

export default class Icon extends SvelteComponentTyped<{
  src?: HeroiconSet;
  size?: string;
  solid?: boolean;
  class?: string;
}> {}
