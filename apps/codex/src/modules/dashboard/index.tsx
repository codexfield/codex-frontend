import { RepoList } from '@/modules/dashboard/components/RepoList';
import { Side } from '@/shared/components/Side';
// @ts-ignore
import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { NewRepo } from '@/modules/dashboard/components/NewRepo';
import { CreateRepoForm } from '@/modules/dashboard/components/createRepo';
import { RegisterModal } from '@/modules/dashboard/components/modals/users/register';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetOffchainAuth } from '@/shared/hooks/useGetOffchainAuth';
import { Box, Button, Center, Flex, Stack } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useIsMounted } from '@/shared/hooks/useIsMounted';

export const Dashboard: React.FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: userInfo, isError, isLoading } = useGetAccountDetails(address);
  const { openConnectModal } = useConnectModal();
  // const { switchNetwork } = useSwitchNetwork();
  const userIsRegister = userInfo !== undefined && userInfo.id !== BigInt(0);

  useEffect(() => {
    // if don't connect wallet, show rainbow wallets modal
    if (!address) {
      openConnectModal?.();
      return;
    }

    // if user don not register yet, show register modal
    if (!isError && !isLoading && userInfo && userInfo.id === BigInt(0)) {
      NiceModal.show(RegisterModal);
    } else {
      NiceModal.hide(RegisterModal);
    }
  }, [address, chain?.id, userInfo, isError, isLoading, openConnectModal]);

  // useEffect(() => {
  //   // if chain is not BSC, switch to BSC check register status
  //   if (chain?.id !== BSC_CHAIN.id && chain?.id !== GNFD_CHAINID) {
  //     switchNetwork?.(BSC_CHAIN.id);
  //   }
  // }, [chain?.id, switchNetwork]);

  // apply offchain auth data
  useGetOffchainAuth(userIsRegister);
  const showCreateRepo = useAtomValue(newRepoAtom);

  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Stack gap="40px">
        <Flex justifyContent="space-between">
          <TabTitle>My Repos</TabTitle>
          {userIsRegister ? (
            <NewRepo />
          ) : (
            <RegisterButton
              color="#FFF"
              _hover={{
                bg: 'rgba(122, 60, 255, 0.8)',
              }}
              _disabled={{
                bg: '#1E1E1E',
                color: '#5F5F5F',
                boxShadow: 'none',
              }}
              onClick={() => NiceModal.show(RegisterModal)}
            >
              Register
            </RegisterButton>
          )}
        </Flex>

        <Box w="960px">
          {userIsRegister && (
            <>
              {showCreateRepo.clickedButton ? <CreateRepoForm /> : <RepoList address={address} />}
            </>
          )}
        </Box>
      </Stack>

      <Side />
    </Flex>
  );
};

const TabTitle = styled(Box)`
  font-size: 24px;
  font-weight: 800;
`;

const RegisterButton = styled(Button)`
  font-size: 14px;
  background: #7a3cff;
  box-shadow: 0px 0px 51.6px 0px #874eff, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 30px;
  border-radius: 10px;
`;
