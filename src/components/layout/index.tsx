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
        <title>CodexField</title>
        <meta property="og:title" content="CodeX" key="title" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="icon" color="#000000" href="/favicon.png" />
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
  margin-top: 80px;
`;
