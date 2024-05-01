import { BSC_CHAIN, CONTRACT_ADDRESS } from '@/env';
import { ACCOUNT_MANAGE_ABI } from '@/shared/constants/abi/accountManageAbi';
import { useReadContract } from 'wagmi';

export const useGetAccountDetails = (addr?: `0x${string}`) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ACCOUNT_MANAGE_ABI,
    functionName: 'getAccountDetails',
    args: [addr as `0x${string}`],
    chainId: BSC_CHAIN.id,
    query: {
      enabled: addr !== undefined,
      select(data) {
        const [
          id,
          name,
          avatar,
          bio,
          company,
          location,
          website,
          socialAccounts,
          followingNumber,
          followerNumber,
        ] = data;

        return {
          id,
          name,
          avatar,
          bio,
          company,
          location,
          website,
          socialAccounts,
          // socialAccounts: {

          // },
          followingNumber,
          followerNumber,
        };
      },
    },
  });
};
