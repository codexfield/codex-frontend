import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';

const HeaderContent = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'end'} flex="1">
      <>
        <NavText target="_blank" href="https://docs.codexfield.com/">
          <Text fontWeight="900">Docs</Text>
        </NavText>

        <NavText target="_blank" href="https://github.com/codexfield">
          <Text fontWeight="900">Github</Text>
        </NavText>

        <NavText target="_blank" href="https://twitter.com/CodexField">
          <Text fontWeight="900">Twitter</Text>
        </NavText>

        <NavText target="_blank" href="https://t.me/CodexField">
          <Text fontWeight="900">Community</Text>
        </NavText>
      </>
    </Flex>
  );
};

export default HeaderContent;

const NavText = styled(Link)`
  font-size: 14px;
  margin-right: 8px;
  @media (min-width: ${(props: any) => props.theme.breakpoints.md}) {
    font-size: 20px;
    margin-right: 45px;
  }
  font-weight: 600;
  color: #fff;
  text-align: center;
`;
