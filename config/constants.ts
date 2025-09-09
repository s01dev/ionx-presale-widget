import { solana } from "@reown/appkit/networks";
import { defineChain } from "viem";
import { chainConfig } from "viem/op-stack";

export const bsc = defineChain({
  id: 56,
  name: 'BNB Smart Chain',
  blockTime: 750,
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: ['https://bsc-rpc.publicnode.com'] },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
      apiUrl: 'https://api.bscscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 15921452,
    },
  },
})

export const arbitrum = defineChain({
  id: 42_161,
  name: 'Arbitrum One',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockTime: 250,
  rpcUrls: {
    default: {
      http: ['https://arbitrum-one-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7654707,
    },
  },
})

export const mainnet = defineChain({
  id: 1,
  name: 'Ethereum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockTime: 12_000,
  rpcUrls: {
    default: {
      http: ['https://ethereum-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {
    ensUniversalResolver: {
      address: '0xeeeeeeee14d718c2b47d9923deab1335e144eeee',
      blockCreated: 23_085_558,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14_353_601,
    },
  },
})

export const polygon = defineChain({
  id: 137,
  name: 'Polygon',
  nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://polygon-bor-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
      apiUrl: 'https://api.polygonscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25770160,
    },
  },
})

export const avalanche = defineChain({
  id: 43_114,
  name: 'Avalanche',
  blockTime: 1_700,
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://avalanche-c-chain-rpc.publicnode.com'] },
  },
  blockExplorers: {
    default: {
      name: 'SnowTrace',
      url: 'https://snowtrace.io',
      apiUrl: 'https://api.snowtrace.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11907934,
    },
  },
})

const sourceId = 1 // mainnet

export const base = defineChain({
  ...chainConfig,
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://base-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    disputeGameFactory: {
      [sourceId]: {
        address: '0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e',
      },
    },
    l2OutputOracle: {
      [sourceId]: {
        address: '0x56315b90c40730925ec5485cf004d835058518A0',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
    portal: {
      [sourceId]: {
        address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
        blockCreated: 17482143,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
        blockCreated: 17482143,
      },
    },
  },
  sourceId,
})

export const RECEIVER_EVM_ADDRESS = "0x82e7e984CD4ff6EED9016A1c5FbCd4bB79993cc9"
export const RECEIVER_SOLANA_ADDRESS = "DBpiiM9kLmnci6b3Y6qSGdwkxZwW395rA5qqJcvdGWrQ"

export const COINLIST = [
  {
    name: "ETH",
    symbol: "ERC-20",
    icon: "/eth.png",
    explorer: "https://etherscan.io/",
    chain: mainnet,
    tokens: [
      {
        name: "ETH",
        icon: "/eth.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        name: "USDT",
        icon: "/usdt.png",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
      },
      {
        name: "USDC",
        icon: "/usdc.png",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
      },
      {
        name: "SHIB",
        icon: "https://etherscan.io/token/images/shibainu_ofc_32.svg",
        address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        decimals: 18,
      },
      {
        name: "PEPE",
        icon: "https://etherscan.io/token/images/pepe_32.svg",
        address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
        decimals: 18,
      },
      {
        name: "FLOKI",
        icon: "https://etherscan.io/token/images/flokirplce_32.svg",
        address: "0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E",
        decimals: 9,
      },
    ],
  },
  {
    name: "BSC",
    symbol: "BEP-20",
    icon: "/bnb.png",
    explorer: "https://bscscan.com/",
    chain: bsc,
    tokens: [
      {
        name: "BNB",
        icon: "/bnb.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        name: "BUSD",
        icon: "/busd.png",
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        decimals: 18,
      },
      {
        name: "USDT",
        icon: "/usdt.png",
        address: "0x55d398326f99059fF775485246999027B3197955",
        decimals: 18,
      },
    ],
  },
  {
    name: "BASE",
    symbol: "Base",
    icon: "/base.png",
    explorer: "https://basescan.org/",
    chain: base,
    tokens: [
      {
        name: "ETH",
        icon: "/eth.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        name: "USDC",
        icon: "/usdc.png",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        decimals: 6,
      },
    ],
  },
  {
    name: "MATIC",
    symbol: "Polygon",
    icon: "/polygon.png",
    explorer: "https://polygonscan.com/",
    chain: polygon,
    tokens: [
      {
        name: "MATIC",
        icon: "/polygon.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        name: "USDC",
        icon: "/usdc.png",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        decimals: 6,
      },
      {
        name: "USDT",
        icon: "/usdt.png",
        address: "0x9417669fBF23357D2774e9D421307bd5eA1006d2",
        decimals: 6,
      },
    ],
  },
  {
    name: "ARB",
    symbol: "Arbitrum",
    icon: "/arb.png",
    explorer: "https://arbiscan.io/",
    chain: arbitrum,
    tokens: [
      {
        name: "ETH",
        icon: "/eth.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        name: "USDT",
        icon: "/usdt.png",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimals: 6,
      }
    ],
  },
  {
    name: "AVAX",
    symbol: "Avalanche",
    icon: "/avax.png",
    explorer: "https://snowtrace.io/",
    chain: avalanche,
    tokens: [
      {
        name: "AVAX",
        icon: "/avax.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
    ],
  },
  {
    name: "SOL",
    symbol: "SOLANA",
    icon: "/solana.png",
    explorer: "https://solscan.io/",
    chain: solana,
    tokens: [
      {
        name: "SOL",
        icon: "/solana.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
    ],
  },
];

export const CHAINS = {
  0: solana,
  1: mainnet,
  56: bsc,
  137: polygon,
  8453: base,
  42161: arbitrum,
  43114: avalanche
}