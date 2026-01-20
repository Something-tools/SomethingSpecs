import type { Account, Address, Hash, PublicClient, WalletClient } from "viem";
import { ERC20_ABI } from "../../../core/contracts/generated/erc20.ts";

export class TokenApprovalService {
  readonly erc20Abi = ERC20_ABI;

  constructor(
    private readonly publicClient: PublicClient,
    private readonly walletClient: WalletClient,
    private readonly account: Account,
  ) {}

  async getAllowance(
    owner: Address,
    token: Address,
    spender: Address,
  ): Promise<bigint> {
    return await this.publicClient.readContract({
      address: token,
      abi: this.erc20Abi,
      functionName: "allowance",
      args: [owner, spender],
    });
  }

  async ensureAllowance(
    owner: Address,
    token: Address,
    spender: Address,
    amount: bigint,
  ): Promise<Hash | null> {
    const current = await this.getAllowance(owner, token, spender);
    if (current >= amount) return null;

    const hash = await this.walletClient.writeContract({
      address: token,
      abi: this.erc20Abi,
      functionName: "approve",
      args: [spender, amount],
      account: this.account,
      chain: this.walletClient.chain,
    });

    await this.publicClient.waitForTransactionReceipt({ hash });
    return hash;
  }
}
