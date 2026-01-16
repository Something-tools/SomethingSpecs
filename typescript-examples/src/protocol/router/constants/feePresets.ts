import type { FeeConfig } from "../types/index.ts";

export const FEE_PRESETS: FeeConfig[] = [
  { baseFeeBps: 25, protocolShareBps: 2000, wToken0In: 1e18, wToken1In: 0 },
  { baseFeeBps: 25, protocolShareBps: 2000, wToken0In: 0, wToken1In: 1e18 },
  {
    baseFeeBps: 25,
    protocolShareBps: 2000,
    wToken0In: 50e16,
    wToken1In: 50e16,
  },
  { baseFeeBps: 50, protocolShareBps: 2000, wToken0In: 1e18, wToken1In: 0 },
  { baseFeeBps: 50, protocolShareBps: 2000, wToken0In: 0, wToken1In: 1e18 },
  {
    baseFeeBps: 50,
    protocolShareBps: 2000,
    wToken0In: 50e16,
    wToken1In: 50e16,
  },
  { baseFeeBps: 100, protocolShareBps: 2000, wToken0In: 1e18, wToken1In: 0 },
  { baseFeeBps: 100, protocolShareBps: 2000, wToken0In: 0, wToken1In: 1e18 },
  {
    baseFeeBps: 100,
    protocolShareBps: 2000,
    wToken0In: 50e16,
    wToken1In: 50e16,
  },
  { baseFeeBps: 300, protocolShareBps: 2000, wToken0In: 1e18, wToken1In: 0 },
  { baseFeeBps: 300, protocolShareBps: 2000, wToken0In: 0, wToken1In: 1e18 },
  {
    baseFeeBps: 300,
    protocolShareBps: 2000,
    wToken0In: 50e16,
    wToken1In: 50e16,
  },
  { baseFeeBps: 500, protocolShareBps: 2000, wToken0In: 1e18, wToken1In: 0 },
  { baseFeeBps: 500, protocolShareBps: 2000, wToken0In: 0, wToken1In: 1e18 },
  {
    baseFeeBps: 500,
    protocolShareBps: 2000,
    wToken0In: 50e16,
    wToken1In: 50e16,
  },
] as const;
