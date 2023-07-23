<script lang="ts">
  export let score: number;
  let color = "black";

  $: {
    // Calculate the color based on the number value
    if (score >= 0 && score <= 100) {
      const greenValue = Math.round((score / 100) * 255);
      const redValue = 255 - greenValue;
      color = `rgb(${redValue}, ${greenValue}, 0)`;
    } else if (score < 0) {
      color = "red";
    } else {
      color = "green";
    }
  }
</script>

<!-- Display the score with the dynamic color -->
<p class="score" style="color: {color}">{score}</p>

<style>
  .score {
    font-size: 5rem;
    font-weight: bold;
  }
</style>
