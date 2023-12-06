import { AppLayout } from '@/components/layout/app-layout';
import { chains, wagmiConfig } from '@/config/wallet';
import { ChakraProvider } from '@chakra-ui/react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { HomepageLayout } from '../components/layout/homepage-layout';
import { theme } from '../theme';
import './globals.css';
import { CustomAvatar } from '@/components/ui/Avatars';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = Component.name === 'Home' ? HomepageLayout : AppLayout;

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize='compact'
        chains={chains}
        avatar={CustomAvatar}
        theme={darkTheme({
          accentColor: '#1E1E1E',
          borderRadius: 'large',
        })}
      >
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
