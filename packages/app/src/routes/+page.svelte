<script lang="ts">
  import SearchBox from "../components/Input/SearchBox.svelte";
  import VerticalStack from "../components/Stack/VerticalStack.svelte";
  import Table from "../components/Table/Table.svelte";
  import LandingPageInfo from "../components/Display/LandingPageInfo.svelte";
  import LeverageIcon from "../public/images/Leverage.png";
  import OptimisedIcon from "../public/images/Optimised.png";
</script>

<VerticalStack>
  <title>Crypto OTC Attestation Protocol (COAP)</title>
  <description>Welcome to the Future of OTC Cryptocurrency Trading</description>
  <LandingPageInfo
    landingPageInfo={{
      src: LeverageIcon,
      title: "Leveraged Farming",
      description:
        "With our leveraged yield farming feature, you can borrow funds from AAVE and invest them in Uniswap V3 pools, allowing you to increase your potential returns without tying up all of your capital all in one-click.",
    }}
  />
  <LandingPageInfo
    landingPageInfo={{
      src: OptimisedIcon,
      title: "Optimised Re-Balancing",
      description:
        "Our Coffin (vault) feature is optimised to ensure that your capital is being used to its fullest potential. Our algorithms continuously analyse market trends and adjust your portfolio accordingly, allowing you to earn the highest possible returns on your investments.",
    }}
  />
</VerticalStack>

<style lang="scss">
  @import "../styles/colours";

  title {
    width: auto;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 5rem;
    display: block;
    word-break: normal;
    justify-content: center;
    display: flex;
    align-items: center;
    color: $primary;
  }

  description {
    width: auto;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 54px;
    display: flex;
    align-items: center;
    text-align: center;

    color: $primary;
  }
</style>
