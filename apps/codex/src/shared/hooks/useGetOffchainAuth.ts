import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { getOffchainAuthKeys } from '@/shared/utils/offchainAuth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export const useGetOffchainAuth = (isFetch: boolean) => {
  const router = useRouter();

  const { address, connector } = useAccount();
  const [offchainData, setOffchainData] = useAtom(offchainDataAtom);

  useEffect(() => {
    const fetchOffchainAuth = async () => {
      if (router.pathname !== '/dashboard') return;
      if (!isFetch) return;
      if (!address) return;

      const provider = await connector?.getProvider();

      // console.log('provider', provider);
      const offChainData = await getOffchainAuthKeys(address, provider);

      // console.log('offChainData', offChainData);

      setOffchainData({
        address: address,
        seed: offChainData?.seedString,
      });
    };

    fetchOffchainAuth();
  }, [address, connector, setOffchainData]);

  return offchainData;
};
