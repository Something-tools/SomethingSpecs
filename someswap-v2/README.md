# SomeSwap v2 Specs

This folder contains testnet specs for SomeSwap v2: ABIs, addresses, and protocol docs.

## Layout

- `testnet/someswap/addresses.json` - contract addresses
- `testnet/someswap/abi/` - contract ABIs
- `testnet/someswap/docs/` - protocol documentation

## Testnet addresses

From `testnet/someswap/addresses.json`:

- `factory`: `0x2055F3F5f934c8c1b1E09A377cB56A85586A9138`
- `router`: `0xF4B30295EA24938d9705E30F88e144140422BAa3`
- `quoter`: `0x2d33838e6DE7391083a466814B4aFEb4FCa25Ea8`
- `lpFeeManager`: `0x5Ba1A2918777595A9c6f04AD7e44B7fe8c86123b`
- `liquidityLocker`: `0x5aB5A8f8D70462918829A61797180b74a92E6e80`
- `wethModule`: `0x7153f466a8DE3ee8bb7196F8b4c615aD06F4b175`
- `coreModule`: `0xff9EF89b24943A86bB684C1439dF63F653b539F0`
- `permissionsRegistry`: `0x552b11a4a9BBbD4b88588950A5B519D0aeCf52ED`

## Docs

See `testnet/someswap/docs/` for:

- protocol overview
- permissions registry
- quoter fee policy
- fee-on-transfer policy
- user functions
- someswap-v2 pool details

---

## Native Currency Handling (address(0))

- Native currency is represented as `address(0)`.
- Router handles wrapping/unwrapping only at the path edges.
- Multi-hop paths must not include native as an intermediate hop.
- Router refunds excess `msg.value` when applicable.

## ModuleMask and Permissions (Practical)

- `moduleMask` is a bitmask of enabled module categories.
- Bit 0 (value `1`) is reserved for **core module** and must always be set.
- `PermissionsRegistry` can restrict which swap flags core/user modules may use per pool.

## Upgradeability (Core Module)

- `SomeSwapV2CoreModule` is UUPS-upgradeable.
- Upgrade flow:
  1. Deploy new implementation.
  2. Call `upgradeTo` on the proxy via the upgrade script.
- Only core owner can authorize upgrades.

## LP Fees: Pool vs Fee Manager

- Pool accrues LP fees in buckets (`fees0/fees1`).
- Fee manager performs non‑diluted per‑account tracking and exposes `claim()`.
- `SomeSwapV2Pool.collectFees` is **fee‑manager‑only** and moves fees to users.

## Liquidity Locker Beneficiary Semantics

- Beneficiary claims fees while lock is active.
- Changing beneficiary pays out accrued fees to previous beneficiary first.
- After unlock, owner regains fee accruals.
