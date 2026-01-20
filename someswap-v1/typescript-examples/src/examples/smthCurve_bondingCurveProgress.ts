import { getBondingCurveProgress } from "../protocol/bondingCurve/getBondingCurveProgress.ts";
import { smthCurve_basicTokenInfo } from "./smthCurve_basicTokenInfo.ts";

export const smthCurve_bondingCurveProgress = async () => {
  const { raw: tokenInfo } = await smthCurve_basicTokenInfo();

  return getBondingCurveProgress({
    rReserveEth: tokenInfo.rQuoteReserves,
    vReserveEth: tokenInfo.vQuoteReserves,
  });
};
