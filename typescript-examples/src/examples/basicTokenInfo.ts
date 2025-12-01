import { getBasicTokenInfo } from "../utils/getBasicTokenInfo.ts";
import { formatBigNumberForUI } from "../utils/formatBigNumberForUI.ts";
import { cfg } from "../config.ts";

export const basicTokenInfo = async () => {
  const tokenInfo = await getBasicTokenInfo(cfg.EXAMPLE_CURVE_TOKEN);

  return {
    raw: tokenInfo,
    uiFormatted: formatBigNumberForUI(tokenInfo, 18, [
      "tokenDecimals",
      "launchNonce",
    ]),
  };
};
