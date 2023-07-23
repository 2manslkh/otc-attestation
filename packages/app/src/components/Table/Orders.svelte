<script lang="ts">
  import Button from "../Button/Button.svelte";

  // Sample orders data (replace this with your actual data)
  const orders = [
    {
      assetAAmount: 1,
      assetAType: "BTC",
      assetBAmount: 42069,
      assetBType: "EUR",
      longitude: 48.869135152711614,
      latitude: 2.341314433508059,
      timestamp: 1679814496, // Replace with actual Unix timestamp
      proof:
        "H4sIAAAAAAAAA8VVu25cRwz9l62lgJwZcoYqjTSp7VSBC77GXmD1gFYWLBj693ABJQiSIoUC5DZ3djkkD8lzeH8c9OHhlzjcHOA7ttzcByDwahO1L8voDcRGtIw4XB3u9DbPD-pZDufj-fb-OuP4dLy_K9tzPp4vpz8sfn93l_50_Yw_YZkfHu_v9_lw89uPg5_0ePuX46eXhwoIV4cvj_ff_kTjkYzCHOm2GCB2wBxi0SdubIe365-OBelJbx_K66RPdb5g0dO3Col0dcjvT4_6sz5p2ctyPH_MU8FSO-WHl1_P-Xi42Xo65-vnN4xvdy_9gG7S2pgiu3VxH2MNGebQBqyWuoSQQCB9Krs6d1iFVxMhAgBXJ_MA7-QNp6zRkDuH2KZBEWt6BaOkobxclWcstdEulhgdEwxai9b7SBNO024MpNIE1JVx-NLRZ86QMQPCBzRaW5kHB6Kt1sTERwBJ1jthGyjVHaasEGNoH2vN9MJqvYuuShJ4-TUEMJEqxlgkPHYsc5wjOiHKiqDWp2uzGo-sqmeLiOUkaCm6oyaWwyR47crW9shlhG22yd5EfHXr2ndjqXJXAyzQ2Vpf0aijNUXc3IqKXP_CWNo5Ze8B2V2m98QRMahGwtu0YIVVx7EZtQVV1xzlhla9Xx3Ll6g6JWk9QptSUFWKc4NuzsiGNQQjRhfuE3qFqgL-52du9oLU0mjKXGvMNZeUHtyAfUMa8spBM1NrXLonjeKr9CozirkwgS-so5oNZIj0vUJ9waTtSH3NvrTRBpdWBgHyUlkNGhfLVrTMRZVwyCVtWHDFlCjaTcfq886iWXEqdbsUH8wQc0AtEW5UG2TuKUVtLB3bRR2DJ5UMtpqLJlm5llSwrFgC2_WadZIKQVySwwJVVAow8tKNc4LrJlzDW_FMi2cdkbCPGuaobBLWxRh19r78vd3f_7aB2Ln0wDSLa__FuP_-IJYyYa4NHSmmse4urXbBIgoXnN3bLF7bADerri656Ci8Q_IucpQ6Qgemo5JMDs2JsPe02jHVIq2adq0ikepuiZnI5y4eNQkvqcV74b-3_sM_lnft5-fj3ZeP_jVvL5-gry_xqNfnXh-Y18-vvwMItjnAzAYAAA",
    },
    {
      assetAAmount: 5000,
      assetAType: "USDT",
      assetBAmount: 5000,
      assetBType: "EUR",
      longitude: 48.89036242982921,
      latitude: 2.3551452797698107,
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
        <td><a href={getGoogleMapsLink(order.longitude, order.latitude)}>Link</a></td>
        <td>{formatTimestamp(order.timestamp)}</td>
        <td><Button buttonText="Attest" /></td>
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
