import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DocumentHead } from '../head';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container flexDirection={'column'} justifyContent={'space-between'}>
      <DocumentHead />

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
