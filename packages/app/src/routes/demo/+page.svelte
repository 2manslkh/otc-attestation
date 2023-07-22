<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../../components/Button/Button.svelte";
  import SignMessageButton from "../../components/Button/SignMessageButton.svelte";
  import SignTypedMessageButton from "../../components/Button/SignTypedMessageButton.svelte";
  import InputBox from "../../components/Input/InputBox.svelte";
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";
  import { signature, typedSignature } from "../../stores";
  import BarChart from "../../components/Charts/BarChart.svelte";

  import { writeTestContract, prepareWriteTestContract } from "../../generated";
  import type { PrepareWriteContractConfig } from "@wagmi/core";
  import { parseEther } from "viem";

  async function handleDeposit() {
    let { request } = await prepareWriteTestContract({
      functionName: "deposit",
      value: parseEther("1"),
    });

    let { hash } = await writeTestContract(request as any);
  }

  async function handleWithdraw() {
    let { request } = await prepareWriteTestContract({
      functionName: "withdraw",
    });

    let { hash } = await writeTestContract(request as any);
  }

  onMount(() => {});
</script>

<VerticalStack>
  <Button />
  <SignMessageButton />
  {$signature}
  <SignTypedMessageButton />
  {$typedSignature}
  <InputBox />
  <BarChart />
  <!-- Deposit -->
  <Button buttonText="DEPOSIT" handleClick={handleDeposit} />
  <!-- Withdraw -->
  <Button buttonText="WITHDRAW" handleClick={handleWithdraw} />
</VerticalStack>

<style lang="scss">
  @import "../../styles/colours";
</style>
