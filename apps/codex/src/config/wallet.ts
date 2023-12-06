import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const bscChain: Chain = {
  ...bscTestnet,
  name: 'BSC',
};

const gnfdChain: Chain = {
  id: 9000,
  name: 'Greenfield',
  network: 'Greenfield',
  iconBackground: '#ebac0e',
  iconUrl: async () => (await import('./icons/bsc.svg')).default.src,
  nativeCurrency: {
    name: 'BNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://gnfd.qa.bnbchain.world'],
    },
    public: {
      http: ['https://gnfd.qa.bnbchain.world'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: `Greenfield Testnet Scan`,
      url: 'https://testnet.greenfieldscan.com/',
    },
    default: {
      name: `Greenfield Testnet Scan`,
      url: 'https://testnet.greenfieldscan.com/',
    },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscChain, gnfdChain],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ],
);

const projectId = 'edc80e81d845099ccfb3511b5ca24cd0';
const { connectors } = getDefaultWallets({
  appName: 'CodeXField',
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  webSocketPublicClient,
  publicClient,
});

export { chains, wagmiConfig };
