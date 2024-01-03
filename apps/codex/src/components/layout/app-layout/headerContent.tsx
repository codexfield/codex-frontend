import { CustomConnectButton } from '@/components/ui/connectButton';
import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useGetOffchainAuth } from '@/hooks/useGetOffchainAuth';
import NiceModal from '@ebay/nice-modal-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { RegisterModal } from '@/components/modals/register';

const HeaderContent = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useGetAccountDetails(address);
  const { openConnectModal } = useConnectModal();
  // const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    // if don't connect wallet, show rainbow wallets modal
    if (!address) {
      openConnectModal?.();
      return;
    }

    // if user don not register yet, show register modal
    if (!isError && !isLoading && data && data[0] === BigInt(0)) {
      NiceModal.show(RegisterModal);
    } else {
      NiceModal.hide(RegisterModal);
    }
  }, [address, chain?.id, data, isError, isLoading, openConnectModal]);

  // useEffect(() => {
  //   // if chain is not BSC, switch to BSC check register status
  //   if (chain?.id !== BSC_CHAIN.id && chain?.id !== GNFD_CHAINID) {
  //     switchNetwork?.(BSC_CHAIN.id);
  //   }
  // }, [chain?.id, switchNetwork]);

  // apply offchain auth data
  useGetOffchainAuth();

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
