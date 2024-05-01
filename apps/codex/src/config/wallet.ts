import {
  BSC_CHAIN,
  ENV,
  GNFD_CHAINID,
  GNFD_RPC,
  GNFD_SCAN_URL,
  WALLET_CONNECT_PROJECT_ID,
} from '@/env';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { rainbowWallet, walletConnectWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { Chain } from 'wagmi/chains';

export const bscChain: Chain = {
  ...BSC_CHAIN,
  name: 'BNB Chain',
};

const gnfdChain: Chain = {
  id: GNFD_CHAINID,
  name: 'BNB Greenfield',
  // network: 'Greenfield',
  // iconBackground: '#ebac0e',
  // iconUrl: async () => (await import('./icons/bsc.svg')).default.src,
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [GNFD_RPC],
    },
    public: {
      http: [GNFD_RPC],
    },
  },
  blockExplorers: {
    etherscan: {
      name: `Greenfield Scan`,
      url: GNFD_SCAN_URL,
    },
    default: {
      name: `Greenfield Scan`,
      url: GNFD_SCAN_URL,
    },
  },
  testnet: ENV === 'TESTNET',
};

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [bscChain],
//   [
//     // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
//     publicProvider(),
//   ],
// );

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, trustWallet],
    },
  ],
  {
    appName: 'CodeXfield',
    projectId: WALLET_CONNECT_PROJECT_ID,
  },
);

const wagmiConfig = createConfig({
  chains: [bscChain],
  transports: {
    [bscChain.id]: http(),
  },
  connectors,
});

export { wagmiConfig };
