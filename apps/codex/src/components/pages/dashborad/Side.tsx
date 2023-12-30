import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Side = () => {
  return (
    <Container>
      <UserInfo>username</UserInfo>
    </Container>
  );
};

const Container = styled(Box)`
  flex: 1;
`;
const UserInfo = styled(Box)`
  background: #1c1c1e;
`;
