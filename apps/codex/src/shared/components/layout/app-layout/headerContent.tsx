import { CustomConnectButton } from '@/shared/components/connectButton';
import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const HeaderContent = () => {
  const router = useRouter();

  return (
    <>
      <Flex gap="45px" ml="45px">
        {/* <NavLink
          as={NextLink}
          href="/explore"
          sx={{
            color: router.pathname == '/explore' ? '#A276FF' : '',
          }}
        >
          Explore
        </NavLink> */}

        <NavLink
          as={NextLink}
          href="/dashboard"
          sx={{
            color: router.pathname == '/dashboard' ? '#A276FF' : '',
          }}
        >
          Dashboard
        </NavLink>

        <NavLink
          as={NextLink}
          href="/airdrop"
          sx={{
            color: router.pathname == '/airdrop' ? '#A276FF' : '',
          }}
        >
          Airdrop
        </NavLink>
      </Flex>

      <CustomConnectButton />
    </>
  );
};

export default HeaderContent;

const NavLink = styled(Link)`
  font-size: 16px;
  font-weight: 800;
  &:hover {
    text-decoration: none;
  }
`;
