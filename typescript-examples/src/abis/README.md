# Contract ABIs and Addresses

The most up-to-date ABIs and deployment addresses for the **SomethingCurve** ecosystem on Monad mainnet are maintained in a separate public specs repository.

> **Source of truth:**  
> https://github.com/Something-tools/SomethingSpecs/tree/main/mainnet-beta/smth_curve

This directory contains:

- **ABIs** for core contracts (e.g. router, factory, curve contracts, helpers)
- **Deployed addresses** for the corresponding contracts on **Monad mainnet-beta**
- Any additional metadata required for clients, indexers, and bots

---

## Why this repo matters

- It is the **canonical** place for ABIs and addresses.
- Client libraries (TypeScript/viem, bots, indexers, backends, frontends) should **not** hardcode ABIs and addresses directly in their code when possible.
- When contracts are upgraded or new components are deployed, this specs repository is updated first.

---

## How to use in a TypeScript / viem project

1. Add this repository as a git submodule or fetch it during your build/deploy step.
2. Read ABIs and addresses from the `smth_curve` folder instead of duplicating them in your code.
3. Keep your config layer (network + addresses + ABIs) isolated from business logic.

Example structure (conceptual):

```text
project-root/
  src/
    client/
      monadClient.ts
      smthCurve.ts
  vendor/
    SomethingSpecs/               # cloned or added as submodule
      mainnet-beta/
        smth_curve/
          factory.abi.json
          router.abi.json
          addresses.json
```
