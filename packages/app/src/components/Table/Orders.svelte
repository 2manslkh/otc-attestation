<script lang="ts">
  import { getAccount, getConfig } from "@wagmi/core";
  import Button from "../Button/Button.svelte";

  import { providers } from "ethers";

  let signer: Signer;

  import {
    EAS,
    Offchain,
    SchemaEncoder,
    SchemaRegistry,
  } from "@ethereum-attestation-service/eas-sdk";
  import type { Signer } from "ethers";
  import { onMount } from "svelte";
  import { getAddress } from "viem";
  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  type Order = {
    assetAAmount: string;
    assetAType: string;
    assetBAmount: string;
    assetBType: string;
    longitude: string;
    latitude: string;
    timestamp: number;
    attestationScore?: number;
    proof?: string;
  };

  // Sample orders data (replace this with your actual data)
  const orders = [
    {
      assetAAmount: "1",
      assetAType: "BTC",
      assetBAmount: "42069",
      assetBType: "EUR",
      longitude: "48.869135152711614",
      latitude: "2.341314433508059",
      attestationScore: "25",
      timestamp: 1679814496, // Replace with actual Unix timestamp
    },
    {
      assetAAmount: "5000",
      assetAType: "USDT",
      assetBAmount: "5000",
      assetBType: "EUR",
      longitude: "48.89036242982921",
      latitude: "2.3551452797698107",
      attestationScore: "25",
      timestamp: 1679822200, // Replace with actual Unix timestamp
    },
    // Add more orders as needed
  ];

  function getGoogleMapsLink(latitude: number, longitude: number): string {
    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return link;
  }

  // Function to convert Unix timestamp to human-readable format
  function formatTimestamp(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleString(); // Format date to human-readable string
  }

  async function handleLocation() {
    const successCallback = (position: any) => {
      console.log(position);
    };

    const errorCallback = (error: any) => {
      console.log(error);
    };

    let result = navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    console.log("🚀 | handleLocation | result:", result);
  }

  async function getSchema() {
    eas.connect(signer);

    const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    schemaRegistry.connect(signer);

    const schemaUID = "0x2fc0e929c1ec681c003c858c7a874cbccc3db5bad965a3e5df86a2916d762f26";

    const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });
    return schemaRecord;
  }

  async function handleAttest(order: Order) {
    eas.connect(signer);

    const schemaEncoder = new SchemaEncoder((await getSchema()).schema);
    const encodedData = schemaEncoder.encodeData([
      { name: "asset_a_amount", value: order.assetAAmount, type: "string" },
      { name: "asset_a_type", value: order.assetAType, type: "string" },
      { name: "asset_b_amount", value: order.assetBAmount, type: "string" },
      { name: "asset_b_type", value: order.assetBType, type: "string" },
      { name: "longitude", value: order.longitude, type: "string" },
      { name: "latitude", value: order.latitude, type: "string" },
      { name: "timestamp", value: order.timestamp, type: "uint32" },
    ]);

    // OFFCHAIN

    // const offchain = await eas.getOffchain();

    // const offchainAttestation = await offchain.signOffchainAttestation(
    //   {
    //     recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
    //     // Unix timestamp of when attestation expires. (0 for no expiration)
    //     expirationTime: 0,
    //     // Unix timestamp of current time
    //     time: 1671219636,
    //     revocable: true,
    //     version: 1,
    //     nonce: 0,
    //     schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
    //     refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    //     data: encodedData,
    //   },
    //   signer
    // );

    // ONCHAIN

    const schemaUID = "0x2fc0e929c1ec681c003c858c7a874cbccc3db5bad965a3e5df86a2916d762f26";

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0xA63dDdB69E6e470Bf3d236B434EF80a213B998A7",
        expirationTime: 0,
        revocable: false,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
  }

  onMount(async () => {
    // @ts-ignore
    const provider = new providers.Web3Provider(window.ethereum);
    const [address] = await provider.listAccounts();
    signer = provider.getSigner(address);
    console.log("🚀 | onMount | signer:", signer);
  });
</script>

<!-- Table displaying orders data -->
<table>
  <thead>
    <tr>
      <th>Asset A Amount</th>
      <th>Asset A Type</th>
      <th>Asset B Amount</th>
      <th>Asset B Type</th>
      <th>Map Link</th>
      <th>Timestamp</th>
      <th>Attestation Score</th>
      <th>Attest</th>
    </tr>
  </thead>
  <tbody>
    {#each orders as order}
      <tr>
        <td>{order.assetAAmount}</td>
        <td>{order.assetAType}</td>
        <td>{order.assetBAmount}</td>
        <td>{order.assetBType}</td>
        <td
          ><a href={getGoogleMapsLink(Number(order.longitude), Number(order.latitude))}>Link</a></td
        >
        <td>{formatTimestamp(order.timestamp)}</td>
        <td>{order.attestationScore}</td>
        <td><Button buttonText="Attest" handleClick={() => handleAttest(order)} /></td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
</style>
