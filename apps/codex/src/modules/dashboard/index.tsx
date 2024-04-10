import { RepoList } from '@/modules/dashboard/components/RepoList';
import { Side } from '@/shared/components/Side';
// @ts-ignore
import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { NewRepo } from '@/modules/dashboard/components/NewRepo';
import { CreateRepoForm } from '@/modules/dashboard/components/createRepo';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useGetOffchainAuth } from '@/shared/hooks/useGetOffchainAuth';
import NiceModal from '@ebay/nice-modal-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { RegisterModal } from '@/modules/dashboard/components/modals/users/register';
import { useRouter } from 'next/router';

export const Dashboard: React.FC = () => {
  const router = useRouter();
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

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Stack gap="40px">
        <Flex justifyContent="space-between">
          <TabTitle>My Repos</TabTitle>
          <NewRepo />
        </Flex>

        <Box w="960px">{showCreateRepo.clickedButton ? <CreateRepoForm /> : <RepoList />}</Box>
      </Stack>

      <Side />
    </Flex>
  );
};

const TabTitle = styled(Box)`
  font-size: 24px;
  font-weight: 800;
`;
