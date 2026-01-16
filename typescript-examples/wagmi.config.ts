import { defineConfig } from "@wagmi/cli";
import smthTokenFactoryAbi from "../mainnet-beta/smth_curve/abi/smth_token_factory.json";
import someswapFactoryAbi from "../mainnet-beta/someswap/abi/factory.json";
import someswapRouterAbi from "../mainnet-beta/someswap/abi/router.json";
import { Abi } from "viem";

export default defineConfig({
  out: "./src/core/contracts/generated/contracts.ts",
  contracts: [
    {
      name: "SmthTokenFactory",
      abi: smthTokenFactoryAbi as Abi,
    },
    {
      name: "SomeSwapFactory",
      abi: someswapFactoryAbi as Abi,
    },
    {
      name: "SomeSwapRouter",
      abi: someswapRouterAbi as Abi,
    },
  ],
  plugins: [],
});
