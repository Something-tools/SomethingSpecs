import { cfg } from "../config.ts";
import { client } from "../core/client/client.ts";
import { account, walletClient } from "../core/client/wallet.ts";
import { smthTokenFactoryAbi } from "../core/contracts/generated/contracts.ts";

export const smthCurve_createToken = async () => {
  try {
    // Token metadata (displayed on UI)
    const name = "Example Token";
    const symbol = "EXMPL";
    const uri = "ipfs://your-metadata-uri";
    // Protocol minimum for initial quote liquidity (in wei)
    const minInitialQuoteNative = (await client.readContract({
      address: cfg.SOMETHING_CURVE_ADDRESS,
      abi: smthTokenFactoryAbi,
      functionName: "minInitialQuoteNative",
    })) as bigint;

    // Initial quote liquidity for the curve (in quote asset wei)
    const initialAmmQuoteAmount =
      cfg.EXAMPLE_INITIAL_AMM_QUOTE_AMOUNT || minInitialQuoteNative;
    // Initial ratio in basis points (denominator = 10_000)
    const initialRatio = cfg.EXAMPLE_INITIAL_RATIO_BPS;
    // Quote asset used for the curve (WMON by default)
    const quoteAsset = cfg.WMON_ADDRESS;
    // Fee preset enum value (0 = 0.25%, 1 = 1%, 2 = 3%)
    const feePercent = 0;
    // Optional buyback amount paid as msg.value (in wei)
    const buybackAmount = cfg.EXAMPLE_BUYBACK_AMOUNT || 0n;
    const value = buybackAmount;

    if (initialAmmQuoteAmount < minInitialQuoteNative) {
      throw new Error(
        `initialAmmQuoteAmount below minInitialQuoteNative. initial=${initialAmmQuoteAmount} min=${minInitialQuoteNative}`,
      );
    }

    const balance = await client.getBalance({ address: account.address });
    if (balance < value) {
      throw new Error(
        `Insufficient balance for value. balance=${balance} required=${value}`,
      );
    }

    const hash = await walletClient.writeContract({
      account,
      address: cfg.SOMETHING_CURVE_ADDRESS,
      abi: smthTokenFactoryAbi,
      functionName: "launchToken",
      args: [
        name,
        symbol,
        uri,
        initialAmmQuoteAmount,
        initialRatio,
        quoteAsset,
        feePercent,
      ],
      value,
    });

    return { hash };
  } catch (error) {
    console.error("smthCurve_createToken failed:", error);
    throw error;
  }
};

smthCurve_createToken();
