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

  import { writeTestContract, prepareWriteTestContract } from "../../generated";
  import type { PrepareWriteContractConfig } from "@wagmi/core";
  import { createWalletClient } from "viem";
  import NumberInput from "../../components/Input/NumberInput.svelte";
  import { writable } from "svelte/store";
  import Dropdown from "../../components/Input/Dropdown.svelte";

  import { ethers } from "ethers";

  import {
    EAS,
    Offchain,
    SchemaEncoder,
    SchemaRegistry,
  } from "@ethereum-attestation-service/eas-sdk";

  import {
    type ClaimRequest,
    ClaimType,
    SismoConnect,
    type SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";
  import Orders from "../../components/Table/Orders.svelte";

  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  async function handleSignInWithEAS() {
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

    console.log(schemaRecord);
  }

  async function handleSignInWithSismo() {
    const config: SismoConnectConfig = {
      // you will need to get an appId from the Factory
      appId: "0x12ef63401068271a38bed3209b4d2edd",
    };

    const sismoConnect = SismoConnect({
      config,
    });

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
      namespace: "sismo-edition",
      callbackUrl: "http://localhost:5173/demo",
    });
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

  async function handleCreateOrder() {}

  async function handleAttest() {
    const offchain = await eas.getOffchain();
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
      { name: "eventId", value: 1, type: "uint256" },
      { name: "voteIndex", value: 1, type: "uint8" },
    ]);
    const offchainAttestation = await offchain.signOffchainAttestation(
      {
        recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
        // Unix timestamp of when attestation expires. (0 for no expiration)
        expirationTime: 0,
        // Unix timestamp of current time
        time: 1671219636,
        revocable: true,
        version: 1,
        nonce: 0,
        schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: encodedData,
      },
      signer
    );
  }

  onMount(() => {
    client = createWalletClient({
      chain: mainnet,
      transport: custom(window.ethereum),
    });
  });
</script>

<VerticalStack>
  <Button buttonText="Sign In with SISMO" handleClick={handleSignInWithSismo} />
  <Button buttonText="Sign In with EAS" handleClick={handleSignInWithEAS} />
  <div>
    <div>
      <NumberInput store={assetAAmount} />
      <Dropdown store={assetAType} />
    </div>
    <div>
      <NumberInput store={assetBAmount} />
      <Dropdown store={assetBType} />
    </div>
  </div>
  <Button buttonText="Create Order" handleClick={handleCreateOrder} />

  Open Orders
  <Orders />

  My Attestations
  <br />
  Attestation Score
</VerticalStack>

<style lang="scss">
  @import "../../styles/colours";
</style>
