import type { Account, Address, Hex, PublicClient, WalletClient } from "viem";
import { TokenApprovalService } from "./TokenApprovalService.ts";
import { FEE_PRESETS } from "../constants/feePresets.ts";
import { calculateFeeTypeBasedOnBps } from "../utils/calculateFeeTypeBasedOnBps.ts";

export class SwapRouterService {
  constructor(
    private readonly publicClient: PublicClient,
    private readonly walletClient: WalletClient,
    private readonly routerAbi: any,
    private readonly factoryAbi: any,
    private readonly tokenApproval: TokenApprovalService,
    private readonly account: Account,
  ) {}

  resolvePreset(baseFeeBps: number, feeType: string) {
    const preset = FEE_PRESETS.find(
      (p) =>
        p.baseFeeBps === baseFeeBps &&
        calculateFeeTypeBasedOnBps(p) === feeType,
    );
    if (!preset) throw new Error("Preset not found for feeType/baseFeeBps");
    return preset;
  }

  async computeFeeConfigId(factory: Address, preset: any): Promise<Hex> {
    const id = await this.publicClient.readContract({
      address: factory,
      abi: this.factoryAbi,
      functionName: "computeFeeConfigId",
      args: [
        {
          baseFeeBps: preset.baseFeeBps,
          wToken0In: BigInt(preset.wToken0In),
          wToken1In: BigInt(preset.wToken1In),
        },
      ],
    });
    return id as Hex;
  }

  async buyToken(params: {
    account: Address;
    router: Address;
    factory: Address;
    token0: Address;
    token1: Address;
    baseFeeBps: number;
    feeType: string;
    ethIn: bigint;
    outMin: bigint;
    deadline: bigint;
  }): Promise<() => Promise<Hex>> {
    const preset = this.resolvePreset(params.baseFeeBps, params.feeType);
    const feeConfigId = await this.computeFeeConfigId(params.factory, preset);

    const path = [params.token0, params.token1];
    const feeIds = [feeConfigId];

    return async () => {
      const simulation = await this.publicClient.simulateContract({
        chain: this.walletClient.chain,
        address: params.router,
        abi: this.routerAbi,
        functionName: "swapExactETHForTokens",
        args: [params.outMin, path, feeIds, params.account, params.deadline],
        value: params.ethIn,
        account: this.account,
      });

      return this.walletClient.writeContract(simulation.request);
    };
  }

  async sellToken(params: {
    account: Address;
    router: Address;
    factory: Address;
    token0: Address;
    token1: Address;
    baseFeeBps: number;
    feeType: string;
    tokenInWei: bigint;
    ethOutMin: bigint;
    deadline: bigint;
  }): Promise<() => Promise<Hex>> {
    const preset = this.resolvePreset(params.baseFeeBps, params.feeType);
    const feeConfigId = await this.computeFeeConfigId(params.factory, preset);

    const path = [params.token1, params.token0];
    const feeIds = [feeConfigId];

    await this.tokenApproval.ensureAllowance(
      params.account,
      params.token1,
      params.router,
      params.tokenInWei,
    );

    return async () => {
      const simulation = await this.publicClient.simulateContract({
        chain: this.walletClient.chain,
        address: params.router,
        abi: this.routerAbi,
        functionName: "swapExactTokensForETH",
        args: [
          params.tokenInWei,
          params.ethOutMin,
          path,
          feeIds,
          params.account,
          params.deadline,
        ],
        account: this.account,
      });

      return this.walletClient.writeContract(simulation.request);
    };
  }
}
