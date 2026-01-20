import { type Address, parseUnits } from "viem";
import { TokenApprovalService } from "../protocol/router/services/TokenApprovalService.ts";
import { SwapRouterService } from "../protocol/router/services/SwapRouterService.ts";
import {
  someSwapFactoryAbi,
  someSwapRouterAbi,
} from "../core/contracts/generated/contracts.ts";
import { cfg } from "../config.ts";
import { client } from "../core/client/client.ts";
import { account, walletClient } from "../core/client/wallet.ts";

async function main() {
  const approval = new TokenApprovalService(client, walletClient, account);

  const swap = new SwapRouterService(
    client,
    walletClient,
    someSwapRouterAbi,
    someSwapFactoryAbi,
    approval,
    account,
  );

  const router = cfg.SOMESWAP_ROUTER_ADDRESS as Address;
  const factory = cfg.SOMESWAP_FACTORY_ADDRESS as Address;

  const token0 = cfg.WMON_ADDRESS as Address; // WMON
  const token1 = cfg.EXAMPLE_SOMESWAP_TOKEN_ADDRESS as Address;

  const send = await swap.buyToken({
    account: account.address,
    router,
    factory,
    token0,
    token1,
    baseFeeBps: 25,
    feeType: "Base",
    ethIn: parseUnits("0.01", 18),
    // TODO: Add calculation for amounts out
    outMin: parseUnits("1", 18),
    deadline: BigInt(Math.floor(Date.now() / 1000) + 1200),
  });

  const buyHash = await send();
  console.log("Swap (buyToken) TX hash:", buyHash);

  await client.waitForTransactionReceipt({ hash: buyHash });

  const sendSell = await swap.sellToken({
    account: account.address,
    router,
    factory,
    token0,
    token1,
    baseFeeBps: 25,
    feeType: "Base",
    tokenInWei: parseUnits("10", 18),
    ethOutMin: parseUnits("0.01", 18),
    deadline: BigInt(Math.floor(Date.now() / 1000) + 1200),
  });

  const hashSell = await sendSell();
  console.log("Swap (sellToken) TX hash:", hashSell);
}

main();
