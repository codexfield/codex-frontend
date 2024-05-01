import { queryClient } from '@/config/ReactQuery';
import { wagmiConfig } from '@/config/wallet';
import { CustomAvatar } from '@/shared/components/avatars';
import { AppLayout } from '@/shared/components/layout/app-layout';
import { ChakraProvider } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import { HomepageLayout } from '../shared/components/layout/homepage-layout';
import { theme } from '../theme';
import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = Component.displayName === 'Home' ? HomepageLayout : AppLayout;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          avatar={CustomAvatar}
          theme={darkTheme({
            accentColor: '#1E1E1E',
            borderRadius: 'large',
          })}
        >
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
