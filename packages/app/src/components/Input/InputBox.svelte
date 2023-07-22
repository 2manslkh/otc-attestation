<script lang="ts">
  let name = "world";
  // @ts-ignore
  import HorizontalStack from "../Stack/HorizontalStack.svelte";

  import ErrorX from "../../public/images/file-x.svg";
  import Success from "../../public/images/file-check.svg";
  import { recoverMessageAddress } from "viem";
  let _currentProof: string;
  let input: string;
  let message: string;
  let status: string = "";

  async function handleClick() {
    let result = await recoverMessageAddress({
      message: "Hello World",
      signature: input as `0x${string}`,
    });
    console.log(result);
    if (result) {
      status = "success";
      message = result;
    } else {
      status = "error";
    }
  }
</script>

<container>
  <HorizontalStack>
    <input bind:value={input} />
    <button on:click={handleClick}>
      <button-text>Verify</button-text>
    </button>
  </HorizontalStack>
  <info>
    {#if status == "error"}
      <img src={ErrorX} alt="Error" />
      <info-text>Error</info-text>
    {:else if status == "success"}
      <img src={Success} alt="Error" />
      <info-text>{message}</info-text>
    {/if}
  </info>
</container>

<style lang="scss">
  @import "../../styles/colours";
  container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  info {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 100%;
  }
  input {
    /* box-sizing: border-box; */

    width: 100%;
    height: 40px;

    border: 1px solid $primary;
    border-radius: 8px;
  }
  button {
    /* Buttons */

    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    gap: 8px;

    width: 100px;
    height: 40px;

    background: $primary_border;
    border: 0px;
    border-bottom: 4px solid $primary;
    border-radius: 10px;

    /* Inside auto layout */
  }

  button:active {
    background: $secondary_2;
    border: 0px;
    border-bottom: 4px solid $primary;
    border-radius: 10px;
  }

  button-text {
    /* NEXT */

    width: auto;
    height: 21px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: $secondary_1;

    /* Inside auto layout */
  }
</style>
