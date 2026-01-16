import { basicTokenInfo } from "./examples/basicTokenInfo.ts";
import { bondingCurveProgress } from "./examples/bondingCurveProgress.ts";
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
