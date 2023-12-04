import styled from '@emotion/styled';
import Header from './header';
import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer } from './footer';
import { DocumentHead } from '../head';

export const HomepageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container flexDirection={'column'} justifyContent={'space-between'}>
      <DocumentHead />

      <Header />

      <Main>{children}</Main>
      <Footer />
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
