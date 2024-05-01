import { BSC_CHAIN, CROSS_CHAIN_ADDRESS } from '@/env';
import { CROSS_CHAIN_ABI } from '@/shared/constants/abi/crossChainAbi';
import { useReadContract } from 'wagmi';

export const useGetFee = () => {
  return useReadContract({
    address: CROSS_CHAIN_ADDRESS,
    abi: CROSS_CHAIN_ABI,
    functionName: 'getRelayFees',
    args: [],
    chainId: BSC_CHAIN.id,
    query: {
      staleTime: 60000,
    },
  });
};
