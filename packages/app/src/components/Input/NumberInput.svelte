<script lang="ts">
  import { writable, type Writable } from "svelte/store";

  let value: string = "";
  export let store: Writable<string> = writable(value);
  // Function to sanitize input and allow only numbers and a single decimal point
  function sanitizeInput(input: string): string {
    const cleanedInput = input.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except '.'
    const decimalCount = cleanedInput.split(".").length - 1;

    // Ensure only one decimal point is present
    if (decimalCount > 1) {
      const parts = cleanedInput.split(".");
      return parts[0] + "." + parts.slice(1).join("");
    }

    return cleanedInput;
  }
  // Function to handle input change
  function handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const newValue = sanitizeInput(inputValue);
    value = newValue;
    $store = newValue;
  }
</script>

<!-- Input element with binding -->
<input type="text" bind:value on:input={handleInput} />

<style lang="scss">
  input {
    height: 40px;
    border-radius: 1rem;
    border: 2px solid #000;
  }
</style>
