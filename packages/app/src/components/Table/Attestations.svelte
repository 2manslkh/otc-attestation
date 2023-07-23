<script lang="ts">
  import { onMount } from "svelte";
  import { getAttestations } from "./query";
  import { writable } from "svelte/store";

  type AttestationDetails = {
    asset_a_amount: string;
    asset_a_type: string;
    asset_b_amount: string;
    asset_b_type: string;
    longitude: string;
    latitude: string;
    timestamp: number;
  };

  type Attestation = {
    attester: string;
    decodedDataJson: string;
  };

  let attestations = writable<Attestation[]>([]);

  // Sample data (replace this with your actual data)
  const data = [
    {
      attester: "John Doe",
      decodedJsonData: JSON.stringify({
        assetANumber: 100,
        assetAType: "USD",
        assetBNumber: 200,
        assetBType: "EUR",
        longitude: 40.7128,
        latitude: 74.006,
        timestamp: 1679814496,
      }),
    },

    // Add more data rows as needed
  ];

  onMount(async () => {
    $attestations = (await getAttestations("0xA63dDdB69E6e470Bf3d236B434EF80a213B998A7"))?.data
      .attestations;
    console.log("🚀 | onMount | attestations:", $attestations);
  });
</script>

<!-- Table displaying data -->
<table>
  <thead>
    <tr>
      <th>Attester</th>
      <th>Asset A Number</th>
      <th>Asset A Type</th>
      <th>Asset B Number</th>
      <th>Asset B Type</th>
      <th>Location</th>
      <th>Proof</th>
    </tr>
  </thead>
  <tbody>
    {#if $attestations}
      {#each $attestations as row}
        <tr>
          <td>{row.attester}</td>
          <td>{row.decodedDataJson}</td>
          <!-- <td>{JSON.parse(row.decodedJsonData).assetAType}</td>
          <td>{JSON.parse(row.decodedJsonData).assetBNumber}</td>
          <td>{JSON.parse(row.decodedJsonData).assetBType}</td>
          <td>{JSON.parse(row.decodedJsonData).longitude}</td>
          <td>{JSON.parse(row.decodedJsonData).latitude}</td> -->
        </tr>
      {/each}
    {/if}
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
