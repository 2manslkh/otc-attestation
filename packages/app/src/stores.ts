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

export const assetAType = writable<string>("");
export const assetBType = writable<string>("");
export const assetAAmount = writable<string>("");
export const assetBAmount = writable<string>("");

export type Order = {
    assetAAmount: string;
    assetAType: string;
    assetBAmount: string;
    assetBType: string;
    longitude: string;
    latitude: string;
    timestamp: number;
    attestationScore?: string;
    proof?: string;
};

export const orders = writable<Order[]>([
    {
        assetAAmount: "1",
        assetAType: "BTC",
        assetBAmount: "42069",
        assetBType: "EUR",
        longitude: "48.869135152711614",
        latitude: "2.341314433508059",
        attestationScore: "25",
        timestamp: 1679814496, // Replace with actual Unix timestamp
    },
    {
        assetAAmount: "5000",
        assetAType: "USDT",
        assetBAmount: "5000",
        assetBType: "EUR",
        longitude: "48.89036242982921",
        latitude: "2.3551452797698107",
        attestationScore: "25",
        timestamp: 1679822200, // Replace with actual Unix timestamp
    },
    // Add more orders as needed
]);
