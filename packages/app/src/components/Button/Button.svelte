<script lang="ts">
  export let handleClick: () => void = () => {
    console.log("Unassigned Button");
  };
  export let buttonText = "INSERT_TEXT";
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
