import { RegisterModal } from '@/components/modals/register';
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

  return <Box>dashboard</Box>;
}
