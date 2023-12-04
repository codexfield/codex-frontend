// import { chains, publicClient, webSocketPublicClient } from '@/config';
import { ChakraProvider } from '@chakra-ui/react';
import { config } from '../config/wagmi';

import './globals.css';
// import {
//   connectorsForWallets,
//   getDefaultWallets,
//   RainbowKitProvider,
// } from '@rainbow-me/rainbowkit';
import { AppLayout } from '@/components/layout/app-layout';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { HomepageLayout } from '../components/layout/homepage-layout';
import { theme } from '../theme';

// const projectId = '9bf3510aab08be54d5181a126967ee71';
// const { wallets } = getDefaultWallets({
//   projectId,
//   appName: 'greenfield js sdk demo',
//   chains,
// });

// const connectors = connectorsForWallets([
//   ...wallets,
//   // {
//   //   groupName: 'Recommended',
//   //   wallets: [
//   //     trustWallet({ projectId, chains, shimDisconnect: true }),
//   //     // RainbowTrustWalletConnector({ projectId, chains }),
//   //   ],
//   // },
// ]);

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   webSocketPublicClient,
//   publicClient,
// });

export default function App({ Component, pageProps }: AppProps) {
  const Layout = Component.name === 'Home' ? HomepageLayout : AppLayout;

  return (
    <WagmiConfig config={config}>
      {/* <RainbowKitProvider modalSize="compact" chains={chains}> */}
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      {/* </RainbowKitProvider> */}
    </WagmiConfig>
  );
}
