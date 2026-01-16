export type FeeConfig = {
  baseFeeBps: number;
  protocolShareBps: number;
  wToken0In: string | bigint | number;
  wToken1In: string | bigint | number;
};

export type FeeType = "Hybrid" | "Base" | "Quote";
