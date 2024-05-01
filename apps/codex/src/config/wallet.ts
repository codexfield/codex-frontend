import {
  BSC_CHAIN,
  ENV,
  GNFD_CHAINID,
  GNFD_RPC,
  GNFD_SCAN_URL,
  WALLET_CONNECT_PROJECT_ID,
} from '@/env';
import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

export const bscChain: Chain = {
  ...BSC_CHAIN,
  name: 'BNB Chain',
};

const gnfdChain: Chain = {
  id: GNFD_CHAINID,
  name: 'BNB Greenfield',
  network: 'Greenfield',
  iconBackground: '#ebac0e',
  iconUrl: async () => (await import('./icons/bsc.svg')).default.src,
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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscChain],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'CodeXField',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  webSocketPublicClient,
  publicClient,
});

export { chains, wagmiConfig };
