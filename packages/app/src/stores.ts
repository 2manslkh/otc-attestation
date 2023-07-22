import { readable, writable } from "svelte/store";

import { Chain } from "@wagmi/core";
import { Config } from "@wagmi/core";
import type { EthereumClient } from "@web3modal/ethereum";
import type { PublicClient } from "@wagmi/core";
import type { Web3Modal } from "@web3modal/html";
import { WebSocketPublicClient } from "@wagmi/core";

export const ethereumClient = writable<EthereumClient>();
export const wagmiClient = writable();
export const web3Modal = writable<Web3Modal>();
export const signature = writable<string>("");
export const typedSignature = writable<string>("");

export const input = writable<string>("");
