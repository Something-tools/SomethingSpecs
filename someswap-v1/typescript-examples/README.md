# SomethingCurve — TypeScript Examples (Monad)

This repository provides minimal TypeScript examples for interacting with the **SomethingCurve** ecosystem deployed on *
*Monad mainnet-beta**.  
It demonstrates how to configure a viem client, access core bonding-curve data, compute curve-progress values, and
prepare values for UI formatting.

The project relies on our specifications repository for ABIs and deployment addresses:

**Source of truth:**  
https://github.com/Something-tools/SomethingSpecs/tree/main/mainnet-beta/smth_curve

Production applications should load ABIs and addresses from that specs repo rather than hardcoding them.

---

## Project Structure

```
src/
- abis/
  smth_token_factory.ts
  README.md
- examples/
  smthCurve_basicTokenInfo.ts
  smthCurve_bondingCurveProgress.ts
- utils/
  client.ts
  config.ts
  formatBigNumberForUI.ts
  getBasicTokenInfo.ts
  getBondingCurveProgress.ts
  index.ts
index.ts
package.json
tsconfig.json
README.md
```

---

## Directory Overview

### `abis/`

Local ABI references.  
Actual ABIs should be imported from this repository in _mainnet-beta_ or _testnet_ folders.

### `utils/`

Reusable building blocks:

- viem client setup
- configuration layer
- formatting helpers
- bonding-curve progress calculator
- token-info retrieval helper

### `examples/`

Minimal demonstrations showing how to:

- fetch token data
- calculate bonding-curve progress

These examples import utilities from `utils/`.

### `src/index.ts`

Entrypoint that loads the example modules and prints results.

---

## Key Concepts

### Bonding-Curve Data

Token information includes:

- virtual reserves
- real reserves
- total supply
- launch metadata

Related files:  
`utils/getBasicTokenInfo.ts`  
`examples/smthCurve_basicTokenInfo.ts`

### Curve Progress (0–100%)

Progress is computed using virtual vs. real quote-asset reserves.

Computation logic:  
`utils/getBondingCurveProgress.ts`  
`examples/smthCurve_bondingCurveProgress.ts`

### Number Formatting

Helper for displaying bigint values cleanly:  
`utils/formatBigNumberForUI.ts`

### Configuration

Contains example addresses used by the demo:  
`utils/config.ts`

---

## Build & Run

```bash
npm install
npm start
```

The main entrypoint (src/index.ts) imports and runs the example modules.

---

Notes

This repository is intentionally minimal and exists only to demonstrate how to interact with SomethingCurve contracts
via TypeScript and viem.
Production systems should load network metadata from SomethingSpecs and extend utilities as required.

---