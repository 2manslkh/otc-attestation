<script lang="ts">
  import SearchBox from "../components/Input/SearchBox.svelte";
  import VerticalStack from "../components/Stack/VerticalStack.svelte";
  import Table from "../components/Table/Table.svelte";
  import LandingPageInfo from "../components/Display/LandingPageInfo.svelte";
  import LeverageIcon from "../public/images/trust.jpeg";
  import OptimisedIcon from "../public/images/proximity.jpeg";
</script>

<VerticalStack>
  <title>Crypto OTC Attestation Protocol (COAP)</title>
  <!-- <description>Welcome to the Future of OTC Cryptocurrency Trading</description> -->
  <LandingPageInfo
    landingPageInfo={{
      src: LeverageIcon,
      title: "Trustworthy Trading, Anywhere in the World",
      description:
        "With our innovative protocol, you can trade cryptocurrencies securely and confidently, no matter where you are in the world. Say goodbye to worries about the legitimacy of assets or the credibility of your trading partner. Our cutting-edge technology ensures every OTC transaction is attested and verified, empowering you to trade with peace of mind.",
    }}
  />
  <LandingPageInfo
    landingPageInfo={{
      src: OptimisedIcon,
      title: "Effortless Proximity Trading",
      description:
        "Connect with OTC trading partners in your local area effortlessly. Our protocol allows you to find trustworthy traders near you, making it easier than ever to establish face-to-face connections. Experience the convenience of proximity trading and explore exciting opportunities right within your neighborhood.",
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
