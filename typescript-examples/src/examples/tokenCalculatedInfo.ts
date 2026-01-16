import { getBasicTokenInfo } from "../utils/getBasicTokenInfo.ts";
import { formatBigNumberForUI } from "../utils/formatBigNumberForUI.ts";
import { cfg } from "../config.ts";

export const tokenCalculatedInfo = async () => {
    const tokenInfo = await getBasicTokenInfo(cfg.EXAMPLE_CURVE_TOKEN);

    const vQuote = tokenInfo.vQuoteReserves;
    const rQuote = tokenInfo.rQuoteReserves;
    const rToken = tokenInfo.rTokenReserves;
    const vToken = tokenInfo.vTokenReserves;
    const totalSupply = tokenInfo.tokenTotalSupply;

    const price =
        vToken > 0n ? Number(vQuote) / Number(vToken) : 0;

    const marketCap =
        price > 0 ? price * Number(totalSupply) : 0;

    const liquidity =
        price > 0 ? Number(rQuote) + Number(rToken) * price : 0;

    return {
        raw: tokenInfo,
        metrics: {
            priceMon: price,
            marketCapMon: marketCap,
            liquidityMon: liquidity,
        },
        uiFormatted: formatBigNumberForUI(tokenInfo, 18, [
            "tokenDecimals",
            "launchNonce",
        ]),
    };
};