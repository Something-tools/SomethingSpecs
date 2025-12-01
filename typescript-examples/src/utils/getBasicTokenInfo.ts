import type { Address } from "viem/accounts";
import { client } from "../client.ts";
import { cfg } from "../config.ts";
import { smth_token_factory } from "../abis/smth_token_factory.ts";

export async function getBasicTokenInfo(token: Address) {
  const info = await client.readContract({
    address: cfg.SOMETHING_CURVE_ADDRESS,
    abi: smth_token_factory,
    functionName: "tokenInfo",
    args: [token],
  });

  return {
    creator: info.creator,
    tokenAddress: info.tokenAddress,
    quoteAsset: info.quoteAsset,
    pairAddress: info.pairAddress,
    name: info.name,
    symbol: info.symbol,
    uri: info.uri,
    tokenTotalSupply: info.tokenTotalSupply,
    tokenDecimals: info.tokenDecimals,
    launchNonce: info.launchNonce,
    launchSalt: info.launchSalt,
    feePercent: info.feePercent,
    useCustomPairFee: info.useCustomPairFee,
    feeConfigId: info.feeConfigId,
    feeParams: {
      baseFeeParams: {
        baseFeeBps: info.feeParams.baseFeeParams.baseFeeBps,
        wToken0In: info.feeParams.baseFeeParams.wToken0In,
        wToken1In: info.feeParams.baseFeeParams.wToken1In,
      },
      useDynamicFee: info.feeParams.useDynamicFee,
    },
    vQuoteReserves: info.vQuoteReserves,
    vTokenReserves: info.vTokenReserves,
    rQuoteReserves: info.rQuoteReserves,
    rTokenReserves: info.rTokenReserves,
    ammTokenReserves: info.ammTokenReserves,
    migrationFee: info.migrationFee,
    isCompleted: info.isCompleted,
    liquidityMigrated: info.liquidityMigrated,
    pairCreated: info.pairCreated,
    quoteIsWeth: info.quoteIsWeth,
    feeClaimer1: info.feeClaimer1,
    feeClaimer2: info.feeClaimer2,
    assetConfig: {
      approved: info.assetConfig.approved,
      frozen: info.assetConfig.frozen,
      migrationFeeNumerator: info.assetConfig.migrationFeeNumerator,
      tradeFeeBpsNumerator: info.assetConfig.tradeFeeBpsNumerator,
      minInitialQuoteAmount: info.assetConfig.minInitialQuoteAmount,
    },
  };
}
