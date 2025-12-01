import { basicTokenInfo } from "./examples/basicTokenInfo.ts";
import { bondingCurveProgress } from "./examples/bondingCurveProgress.ts";

async function main() {
  const basicInfo = await basicTokenInfo();

  console.log(basicInfo);

  const bondingCurve = await bondingCurveProgress();

  console.log(bondingCurve);
}

main();
