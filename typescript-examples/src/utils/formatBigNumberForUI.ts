import { formatUnits } from "viem";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function formatBigNumberForUI<T>(
  value: T,
  decimals = 18,
  skipKeys: string[] = [],
): T {
  const transform = (v: unknown, key?: string): unknown => {
    if (typeof v === "bigint") {
      if (key && skipKeys.includes(key)) {
        return v;
      }
      return formatUnits(v, decimals);
    }

    if (Array.isArray(v)) {
      return v.map((item) => transform(item));
    }

    if (isPlainObject(v)) {
      const result: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v)) {
        result[k] = transform(val, k);
      }
      return result;
    }

    return v;
  };

  return transform(value) as T;
}
