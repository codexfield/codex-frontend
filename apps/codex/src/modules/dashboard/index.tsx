import { RepoList } from '@/modules/dashboard/components/RepoList';
import { Side } from '@/shared/components/Side';
import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { NewRepo } from '@/modules/dashboard/components/NewRepo';
import { CreateRepoForm } from '@/modules/dashboard/components/createRepoForm';
import { RegisterModal } from '@/modules/dashboard/components/modals/users/register';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import styled from '@emotion/styled';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { BlogsPage } from './blogs';
import { DashboardLayout } from './layout';

export const Dashboard: React.FC = () => {
  const { address, chain } = useAccount();
  const { data: userInfo, isError, isLoading } = useGetAccountDetails(address);
  const { openConnectModal } = useConnectModal();
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

  const showCreateRepo = useAtomValue(newRepoAtom);

  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <DashboardLayout>
      {showCreateRepo.start ? <CreateRepoForm /> : <RepoList address={address} />}
    </DashboardLayout>
  );
};
