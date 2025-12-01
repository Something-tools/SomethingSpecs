import { createPublicClient, http } from "viem";

export const client = createPublicClient({
  transport: http("https://monad-mainnet.drpc.org"),
});
