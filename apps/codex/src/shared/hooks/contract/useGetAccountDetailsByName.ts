import { BSC_CHAIN, CONTRACT_ADDRESS } from '@/env';
import { ACCOUNT_MANAGE_ABI } from '@/shared/constants/abi/accountManageAbi';
import { useDebounce } from '@uidotdev/usehooks';
import { useReadContract } from 'wagmi';

export const useGetAccountDetailsByName = (kw: string) => {
  const name = useDebounce(kw, 500);

  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ACCOUNT_MANAGE_ABI,
    functionName: 'getAccountDetailsByName',
    args: [name],
    chainId: BSC_CHAIN.id,
    query: {
      enabled: name !== '',
      select(data) {
        console.log('data', data);
        const [
          id,
          account,
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
          account,
          avatar,
          bio,
          company,
          location,
          website,
          socialAccounts,
          followingNumber,
          followerNumber,
        };
      },
    },
  });
};
