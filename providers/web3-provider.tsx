"use client"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { solana, mainnet, arbitrum, avalanche, bsc, base, polygon } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { WagmiProvider } from "wagmi"


// Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "925a76a017d8e139ef2356a9b1704a7a"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const networks = [solana, mainnet, arbitrum, avalanche, bsc, base, polygon] as [AppKitNetwork, ...AppKitNetwork[]]

// Set up Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks
})

// Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter()

// Set up metadata
const metadata = {
  name: 'IONX Presale Widget',
  description: '',
  url: 'https://ionx.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  projectId,
  allowUnsupportedChain: false,
  networks,
  defaultNetwork: mainnet,
  metadata,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    onramp: false,
    email: false, // default to true
    socials: false,
    emailShowWallets: false, // default to true
    swaps: false,
    send: false,
    history: false
  },
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  ],
  excludeWalletIds: [
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0"
  ],
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#ffb86a',
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#000000',
    '--w3m-border-radius-master': '2px'
  }
})

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each session to avoid shared state between users
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider reconnectOnMount config={wagmiAdapter.wagmiConfig}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  )
}