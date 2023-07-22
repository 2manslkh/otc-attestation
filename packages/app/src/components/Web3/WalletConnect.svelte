<script lang="ts">
  import {
    sepolia,
    hardhat,
    gnosisChiado,
    gnosis,
    scrollTestnet,
    lineaTestnet,
  } from "@wagmi/core/chains";
  import { ethereumClient, wagmiClient, web3Modal } from "../../stores";
  import { configureChains, createConfig } from "@wagmi/core";
  import { publicProvider } from "@wagmi/core/providers/public";
  import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
  import { Web3Modal } from "@web3modal/html";
  import { onMount } from "svelte";

  export let projectId: string;

  onMount(() => {
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [sepolia, hardhat, gnosisChiado, gnosis, scrollTestnet, lineaTestnet],
      [w3mProvider({ projectId })]
    );

    $wagmiClient = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, version: 1, chains }),
      publicClient,
      webSocketPublicClient,
    });
    $ethereumClient = new EthereumClient($wagmiClient, chains);
    $web3Modal = new Web3Modal(
      {
        projectId,
        defaultChain: sepolia,
        themeVariables: {
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#FC0FC0",
          "--w3m-background-color": "rgb(39, 42, 42)",
        },
      },
      $ethereumClient
    );
  });
</script>

<slot />
