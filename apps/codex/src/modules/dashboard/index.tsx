import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { RepoList } from '@/modules/dashboard/components/RepoList';
import { CreateRepoForm } from '@/modules/dashboard/components/createRepoForm';
import { RegisterModal } from '@/modules/dashboard/components/modals/users/register';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import NiceModal from '@ebay/nice-modal-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
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
