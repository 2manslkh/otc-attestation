<script lang="ts">
  import { signTypedData } from "@wagmi/core";
  import { parseEther } from "viem";
  import { typedSignature } from "../../stores";

  // All properties on a domain are optional
  const domain = {
    name: "Ether Mail",
    version: "1",
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  } as const;

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  } as const;

  const message = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  } as const;
  export let handleClick: () => void = async () => {
    const _signature = await signTypedData({
      domain,
      message,
      primaryType: "Mail",
      types,
    });
    typedSignature.set(_signature);
  };
  export let buttonText: string = "SIGN TYPED MESSAGE";
</script>

<button on:click={handleClick}>
  <button-text>{buttonText}</button-text>
</button>

<style lang="scss">
  @import "../../styles/colours";
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

    width: 100%;
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

    flex: none;
    order: 0;
    flex-grow: 0;
  }
</style>
