import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { monad } from "viem/chains";

// TODO: remove
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";

const paramsMainnet = {
  chain: monad,
  transport: http("https://rpc-mainnet.monadinfra.com"),
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet.monadinfra.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Mainnet explorer",
      url: "https://mainnet-beta.monvision.io",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 9248132,
    },
  },
};

export const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

export const walletClient = createWalletClient(paramsMainnet);
