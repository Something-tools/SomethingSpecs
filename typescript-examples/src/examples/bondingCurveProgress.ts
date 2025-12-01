import { getBondingCurveProgress } from "../utils/getBondingCurveProgress.ts";
import { basicTokenInfo } from "./basicTokenInfo.ts";

export const bondingCurveProgress = async () => {
  const { raw: tokenInfo } = await basicTokenInfo();

  return getBondingCurveProgress({
    rReserveEth: tokenInfo.rQuoteReserves,
    vReserveEth: tokenInfo.vQuoteReserves,
  });
};
