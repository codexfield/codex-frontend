import { ABI } from '@/constants/abi';
import { BSC_CHAIN, CONTRACT_ADDRESS } from '@/env';
import { useContractRead } from 'wagmi';

export const useGetAccountDetails = (addr?: `0x${string}`) => {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getAccountDetails',
    args: [addr as `0x${string}`],
    chainId: BSC_CHAIN.id,
    enabled: addr !== undefined,
  });
};
