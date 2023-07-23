<script lang="ts">
  import type { Writable } from "svelte/store";

  export let store: Writable<string>;

  // List of available currencies
  export let currencies: string[] = ["USD", "EUR", "CNY", "BTC", "ETH", "USDC"];

  // Function to handle selection change
  function handleSelect(event: Event) {
    $store = (event.target as HTMLSelectElement).value;
  }
</script>

<!-- Select element with options -->
<select bind:value={$store} on:change={handleSelect}>
  {#each currencies as currency}
    <option value={currency}>{currency}</option>
  {/each}
</select>

<style lang="scss">
  select {
    height: 40px;
    border-radius: 1rem;
    border: 2px solid #000;
  }
</style>
