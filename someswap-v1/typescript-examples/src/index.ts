import { smthCurve_basicTokenInfo } from "./examples/smthCurve_basicTokenInfo.ts";
import {smthCurve_bondingCurveProgress} from "./examples/smthCurve_bondingCurveProgress.ts";
import {tokenCalculatedInfo} from "./examples/tokenCalculatedInfo.ts";
import {smthCurve_createToken} from "./examples/smthCurve_createToken.js";

async function main() {
    const basicInfo = await smthCurve_basicTokenInfo();

    console.log(basicInfo);

    const bondingCurve = await smthCurve_bondingCurveProgress();

    console.log(bondingCurve);

    const tokenCalculated = await tokenCalculatedInfo();

    console.log(tokenCalculated);

    const createToken = await smthCurve_createToken();

    console.log(createToken)
}

main();
