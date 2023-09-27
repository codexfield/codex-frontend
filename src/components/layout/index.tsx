import styled from '@emotion/styled';
import Header from "./header"
import { Flex } from '@totejs/uikit';
import { ReactNode } from 'react';
import { Footer } from './footer';
import Head from 'next/head';

export const Layout = ({children}: {children: ReactNode}) => {
  return (
    <Container flexDirection={'column'} justifyContent={'space-between'}>
      <Head>
        <title>CodeX</title>
        <meta property="og:title" content="CodeX" key="title" />
      </Head>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

const Container = styled(Flex)`
  background-color: #000000;
  min-height: 100vh;
`;

const Main = styled.main`
  /* display: flex;
  flex: 1 1 0%;
  justify-content: center; */
  margin-top: 80px;
`;
