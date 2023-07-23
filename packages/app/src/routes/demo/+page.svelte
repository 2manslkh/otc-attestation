<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../../components/Button/Button.svelte";
  import SignMessageButton from "../../components/Button/SignMessageButton.svelte";
  import SignTypedMessageButton from "../../components/Button/SignTypedMessageButton.svelte";
  import InputBox from "../../components/Input/InputBox.svelte";
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";
  import {
    signature,
    typedSignature,
    assetAAmount,
    assetBAmount,
    assetAType,
    assetBType,
  } from "../../stores";

  import NumberInput from "../../components/Input/NumberInput.svelte";
  import Dropdown from "../../components/Input/Dropdown.svelte";
  import { ethers } from "ethers";

  import {
    ClaimType,
    SismoConnect,
    type ClaimRequest,
    type SismoConnectConfig,
    type SismoConnectResponse,
    type SismoConnectVerifiedResult,
  } from "@sismo-core/sismo-connect-client";

  import Orders from "../../components/Table/Orders.svelte";
  import { json } from "@sveltejs/kit";

  import {
    EAS,
    Offchain,
    SchemaEncoder,
    SchemaRegistry,
  } from "@ethereum-attestation-service/eas-sdk";
  import Attestations from "../../components/Table/Attestations.svelte";
  import AttestationScore from "../../components/Display/AttestationScore.svelte";
  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  // Initialize Sismo
  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: "0x12ef63401068271a38bed3209b4d2edd",
  };

  const sismoConnect = SismoConnect({
    config,
  });

  async function getSchema() {
    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.providers.getDefaultProvider("sepolia");

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(provider);

    const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    schemaRegistry.connect(provider);

    const schemaUID = "0x2fc0e929c1ec681c003c858c7a874cbccc3db5bad965a3e5df86a2916d762f26";

    const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });
    return schemaRecord;
  }

  async function handleSignInWithEAS() {
    let schema = await getSchema();
    console.log("🚀 | handleSignInWithEAS | schema:", schema);
  }

  async function handleSignInWithSismo() {
    // claim request for a proof of "Gitcoin Passport holders" group membership
    const gitcoinPassportRequest: ClaimRequest = {
      // id of the group gitcoin-passport-holders
      // https://factory.sismo.io/groups-explorer?search=gitcoin-passport-holders
      groupId: "0x1cde61966decb8600dfd0749bd371f12",
      // users should have at least 15 as value in the group to claim the airdrop
      value: 15,
      claimType: ClaimType.GTE,
    };
    // redirect users to the Vault App to generate proofs based on the requirements
    // expressed in the auth and claim requests
    sismoConnect.request({
      // auth: twitterRequest,
      claims: [gitcoinPassportRequest],
      namespace: "main",
      callbackUrl: "http://localhost:5173/demo",
    });
  }

  async function handleVerifySismoProof() {
    console.log("proove");

    try {
      const data = await sismoConnect.getResponse();
      console.log("🚀 | handleVerifySismoProof | data:", data);

      const response = await fetch(`/api/prove?data=${data}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("🚀 | handleVerifySismoProof | responseData:", responseData);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }
  async function handleCreateOrder() {}

  onMount(() => {
    // client = createWalletClient({
    //   chain: mainnet,
    //   transport: custom(window.ethereum),
    // });
  });
</script>

<VerticalStack>
  <Button buttonText="Sign In with SISMO" handleClick={handleSignInWithSismo} />
  <!-- <Button buttonText="Sign In with EAS" handleClick={handleSignInWithEAS} />
  <Button buttonText="Verify SISMO Proof" handleClick={handleVerifySismoProof} /> -->
  <div>
    <div>
      Asset A
      <NumberInput store={assetAAmount} />
      <Dropdown store={assetAType} />
    </div>
    <div>
      Asset B
      <NumberInput store={assetBAmount} />
      <Dropdown store={assetBType} />
    </div>
  </div>
  <Button buttonText="Create Order" handleClick={handleCreateOrder} />

  Open Orders
  <Orders />

  My Attestations
  <Attestations />

  <br />
  Attestation Score
  <AttestationScore score="35" />
</VerticalStack>

<style lang="scss">
  @import "../../styles/colours";
</style>
