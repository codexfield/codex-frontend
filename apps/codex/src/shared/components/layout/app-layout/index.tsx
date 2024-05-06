import styled from '@emotion/styled';
import { Flex, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DocumentHead } from '../common/head';
import Header from '../common/header';
import HeaderContent from './headerContent';
import { getOffchainAuthKeys } from '@/shared/utils/offchainAuth';
import { Connector, useAccountEffect } from 'wagmi';
import { useSetAtom } from 'jotai';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useRouter } from 'next/router';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const setOffchainData = useSetAtom(offchainDataAtom);

  const onAuthCb = async (address: string, connector: Connector) => {
    const provider = await connector?.getProvider();
    const offChainData = await getOffchainAuthKeys(address, provider);
    setOffchainData({
      address: address,
      seed: offChainData?.seedString,
    });
  };

  useAccountEffect({
    onConnect: (data) => {
      if (router.pathname.includes('dashboard')) {
        onAuthCb(data.address, data.connector);
      }
    },
  });

  return (
    <Container flexDirection={'column'} justifyContent={'space-between'}>
      <DocumentHead />

      <Header content={HeaderContent()} />

      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled(Flex)`
  background-color: #000000;
  min-height: 100vh;
`;

const Main = styled.main`
  margin-top: 80px;
`;
