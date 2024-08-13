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
import {
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  okxWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Chain } from 'wagmi/chains';

export const bscChain: Chain = {
  ...BSC_CHAIN,
  name: 'BNB Chain',
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
      wallets: [rainbowWallet, okxWallet, trustWallet, binanceWallet],
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
