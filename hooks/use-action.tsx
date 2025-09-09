import { toast } from "sonner"
import { useWalletClient } from "wagmi"
import { erc20Abi } from "viem";
import { createPublicClient, EstimateContractGasParameters, http, WriteContractParameters } from "viem";
import { RECEIVER_EVM_ADDRESS, RECEIVER_SOLANA_ADDRESS } from "@/config/constants";
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react"
import type { AnyTransaction, Provider } from "@reown/appkit-adapter-solana/react"
import { useAppKitProvider } from "@reown/appkit/react";

export const useActions = () => {
  const { data: walletClient } = useWalletClient()
  const { connection } = useAppKitConnection()
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const buyEvmToken = async ({coin, amount}: {coin: any, amount: bigint}) => {
    const client = createPublicClient({
      chain: coin.chain,
      transport: http(),
    })
    
    if (!walletClient) {
      return { success: false }
    }

    console.info(`Buying ${amount} wei for account ${walletClient.account.address}`)

    try {
      const gasLimit = await client.estimateContractGas({
        account: walletClient.account.address,
        address: coin.address,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [RECEIVER_EVM_ADDRESS, amount]
      } as unknown as EstimateContractGasParameters)

      const { maxFeePerGas, maxPriorityFeePerGas } = await client.estimateFeesPerGas();

      const hash = await walletClient.writeContract({
        address: coin.address,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [RECEIVER_EVM_ADDRESS, amount],
        gas: gasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas
      } as unknown as WriteContractParameters)

      const receipt = await client.waitForTransactionReceipt({ hash })

      if (!receipt || receipt.status !== "success") {
        toast.error("Transaction failed", {
          description: <div className="text-black">
            There was an error processing your transaction. Please try again.
          </div>,
          duration: 5000,
          position: "bottom-right",
          style: {border: "1px solid #00000090"}
        })
        return { success: false }
      } 

      return { success: true, hash }
    } catch (error: any) {
      console.error("Error while buying:", error.message)
      const message = String(error.message)
      const index = message.indexOf("Contract Call:")
      toast.error("Transaction failed", {
        description: <div className="text-black">
          {message.slice(0, index)}
        </div>,
        duration: 5000,
        position: "bottom-right",
        style: {border: "1px solid #00000090"}
      })
      return { success: false }
    }
  }

  const buyEvmCoin = async ({coin, amount}: {coin: any, amount: bigint}) => {
    const client = createPublicClient({
      chain: coin.chain,
      transport: http(),
    })
    
    if (!walletClient) {
      return { success: false }
    }

    console.info(`Buying ${amount} wei for account ${walletClient.account.address}`)

    try {
      const hash = await walletClient.sendTransaction({
        account: walletClient.account.address,
        to: RECEIVER_EVM_ADDRESS,
        value: amount
      })

      const receipt = await client.waitForTransactionReceipt({ hash })

      if (!receipt || receipt.status !== "success") {
        toast.error("Transaction failed", {
          description: <div className="text-black">
            There was an error processing your transaction. Please try again.
          </div>,
          duration: 5000,
          position: "bottom-right",
          style: {border: "1px solid #00000090"}
        })
        return { success: false }
      } 

      return { success: true, hash }
    } catch (error: any) {
      console.error("Error while buying:", error.message)
      const message = String(error.message)
      const index = message.indexOf("Contract Call:")
      toast.error("Transaction failed", {
        description: <div className="text-black">
          {message.slice(0, index)}
        </div>,
        duration: 5000,
        position: "bottom-right",
        style: {border: "1px solid #00000090"}
      })
      return { success: false }
    }
  }

  const buySol = async (amount: bigint) => {
    if (!connection || !walletProvider.publicKey) {
      return { success: false }
    }

    const latestBlockhash = await connection.getLatestBlockhash();
    const transaction= new Transaction({
      feePayer: walletProvider.publicKey,
      recentBlockhash: latestBlockhash.blockhash,
    }).add(
      SystemProgram.transfer({
        fromPubkey: walletProvider.publicKey,
        toPubkey: new PublicKey(RECEIVER_SOLANA_ADDRESS), // destination address
        lamports: amount,
      })
    );

    const signature = await walletProvider.sendTransaction(transaction as unknown as AnyTransaction, connection)

    return { success: true, hash: signature }
  }

  return {
    buyEvmToken,
    buyEvmCoin,
    buySol
  }
}