import { RegisterModal } from '@/components/modals/register';
import { RepoList } from '@/components/pages/dashborad/RepoList';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { Box } from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';

export default function Dashboard() {
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

  return (
    <Box>
      <RepoList />
    </Box>
  );
}
