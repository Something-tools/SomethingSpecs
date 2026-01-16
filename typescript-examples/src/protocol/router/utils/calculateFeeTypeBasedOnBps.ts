import type { FeeConfig, FeeType } from "../types/index.ts";

export function calculateFeeTypeBasedOnBps(config: FeeConfig): FeeType {
  const w0 =
    typeof config.wToken0In === "bigint"
      ? config.wToken0In
      : BigInt(config.wToken0In);
  const w1 =
    typeof config.wToken1In === "bigint"
      ? config.wToken1In
      : BigInt(config.wToken1In);

  if (w0 === w1) return "Hybrid";
  if (w0 === 0n) return "Quote";
  if (w1 === 0n) return "Base";
  return w0 > w1 ? "Base" : "Quote";
}
