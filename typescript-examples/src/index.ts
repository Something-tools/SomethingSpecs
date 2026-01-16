import { basicTokenInfo } from "./examples/smthCurve_basicTokenInfo.ts";
import { bondingCurveProgress } from "./examples/smthCurve_bondingCurveProgress.ts";
import {tokenCalculatedInfo} from "./examples/tokenCalculatedInfo.ts";

async function main() {
    const basicInfo = await basicTokenInfo();

    console.log(basicInfo);

    const bondingCurve = await bondingCurveProgress();

    console.log(bondingCurve);

    const tokenCalculated = await tokenCalculatedInfo();

    console.log(tokenCalculated);
}

main();
