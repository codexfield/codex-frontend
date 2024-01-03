import { AppLayout } from '@/components/layout/app-layout';
import { CustomAvatar } from '@/components/ui/avatars';
import { chains, wagmiConfig } from '@/config/wallet';
import { ChakraProvider } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';
import { HomepageLayout } from '../components/layout/homepage-layout';
import { theme } from '../theme';
import './globals.css';
import { queryClient } from '@/config/ReactQuery';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = Component.displayName === 'Home' ? HomepageLayout : AppLayout;

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        avatar={CustomAvatar}
        theme={darkTheme({
          accentColor: '#1E1E1E',
          borderRadius: 'large',
        })}
      >
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <JotaiProvider>
              <NiceModal.Provider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </NiceModal.Provider>
            </JotaiProvider>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
