import { smthCurve_basicTokenInfo } from "./examples/smthCurve_basicTokenInfo.ts";
import { smthCurve_bondingCurveProgress } from "./examples/smthCurve_bondingCurveProgress.ts";

async function main() {
  const basicInfo = await smthCurve_basicTokenInfo();

  console.log(basicInfo);

  const bondingCurve = await smthCurve_bondingCurveProgress();

  console.log(bondingCurve);
}

main();
