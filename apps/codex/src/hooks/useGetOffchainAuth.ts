import { offchainDataAtom } from '@/atoms/offchainDataAtom';
import { getOffchainAuthKeys } from '@/utils/offchainAuth';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export const useGetOffchainAuth = () => {
  const { address, connector } = useAccount();
  const [offchainData, setOffchainData] = useAtom(offchainDataAtom);

  useEffect(() => {
    const fetchOffchainAuth = async () => {
      if (!address) return;

      const provider = await connector?.getProvider();

      // console.log('provider', provider);
      const offChainData = await getOffchainAuthKeys(address, provider);

      // console.log('offChainData', offChainData);

      setOffchainData({
        address: address,
        seed: offChainData.seedString,
      });
    };

    fetchOffchainAuth();
  }, [address, connector, setOffchainData]);

  return offchainData;
};
