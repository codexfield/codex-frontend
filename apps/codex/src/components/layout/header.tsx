import { Box, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Logo from '../../images/logo.svg';
import { useScroll } from '@/hooks/useScroll';

const Header = () => {
  const y = useScroll()

  return (
    <Container
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'10px 25px'}
      style={{
        backdropFilter: y > 50 ? 'blur(10px)': 'blur(0px)',
      }}
    >
      <Flex gap={42} alignItems={'center'}>
        <Box>
          <Link href="/">
            <Image
              priority
              width={240}
              height={60}
              src={Logo.src}
              alt="codex logo"
            />
          </Link>
        </Box>
      </Flex>

      <Flex alignItems={'center'} justifyContent={'center'} gap={18}>
        <>
          <Link target='_blank' href="https://docs.codexfield.com/">
            <Text fontWeight="900" fontSize="16" mr="45">
              Docs
            </Text>
          </Link>

          <Link target='_blank' href="https://github.com/codexfield">
            <Text fontWeight="900" fontSize="16" mr="35">
              Github
            </Text>
          </Link>

          <Link target='_blank' href="https://twitter.com/CodexField">
            <Text fontWeight="900" fontSize="16" mr="35">
              Twitter
            </Text>
          </Link>

          <NavText target='_blank' href="https://t.me/CodexField">
            <Text fontWeight="900" fontSize="16" mr="35">
              Community
            </Text>
          </NavText>
        </>
      </Flex>
    </Container>
  );
};

export default Header;

const Container = styled(Flex)`
  position: fixed;
  z-index: 10000;
  font-size: 15px;
  background-color: rgba(0,0,0,0.8);
  height: 80px;
  left: 0;
  right: 0;
  /* border-bottom: 1px #2f3034 solid; */
`;

const NavText = styled(Box)`
  color: #FFF;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`
