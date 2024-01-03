import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';

const HeaderContent = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'end'} gap={18} flex="1">
      <>
        <NavText target="_blank" href="https://docs.codexfield.com/">
          <Text fontWeight="900" fontSize="16" mr="45">
            Docs
          </Text>
        </NavText>

        <NavText target="_blank" href="https://github.com/codexfield">
          <Text fontWeight="900" fontSize="16" mr="35">
            Github
          </Text>
        </NavText>

        <NavText target="_blank" href="https://twitter.com/CodexField">
          <Text fontWeight="900" fontSize="16" mr="35">
            Twitter
          </Text>
        </NavText>

        <NavText target="_blank" href="https://t.me/CodexField">
          <Text fontWeight="900" fontSize="16" mr="35">
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
  font-size: 24px;
  font-weight: 600;
`;
