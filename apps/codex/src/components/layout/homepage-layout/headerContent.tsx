import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';

const HeaderContent = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'end'} gap={18} flex="1">
      <>
        <NavText target="_blank" href="https://docs.codexfield.com/">
          <Text fontWeight="900" fontSize="16">
            Docs
          </Text>
        </NavText>

        <NavText target="_blank" href="https://github.com/codexfield">
          <Text fontWeight="900" fontSize="16">
            Github
          </Text>
        </NavText>

        <NavText target="_blank" href="https://twitter.com/CodexField">
          <Text fontWeight="900" fontSize="16">
            Twitter
          </Text>
        </NavText>

        <NavText target="_blank" href="https://t.me/CodexField">
          <Text fontWeight="900" fontSize="16">
            Community
          </Text>
        </NavText>
      </>
    </Flex>
  );
};

export default HeaderContent;

const NavText = styled(Link)`
  color: #fff;
  text-align: center;

  font-size: 22px;
  margin-right: 8px;

  @media (min-width: ${(props: any) => props.theme.breakpoints.md}) {
    font-size: 24px;
    margin-right: 45px;
  }
  font-weight: 600;
`;
