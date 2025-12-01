type CalcProgressArgs = {
  tokenTotalSupply: bigint;
  rTokenReserves: bigint;
  ammTokenReserves: bigint;
};

export function getBondingCurveProgress({
  rReserveEth,
  vReserveEth,
}: {
  rReserveEth: bigint;
  vReserveEth: bigint;
}): number {
  if (vReserveEth === 0n) return 0;
  const percent = Number((rReserveEth * 100n) / vReserveEth);
  if (percent < 0) return 0;
  if (percent > 100) return 100;
  return percent;
}
