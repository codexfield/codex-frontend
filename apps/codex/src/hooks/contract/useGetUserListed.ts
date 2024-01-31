import { ACCOUNT_MANAGE_ABI } from '@/constants/abi/accountManageAbi';
import { MARKET_PLACE_ABI } from '@/constants/abi/marketplaceAbi';
import { BSC_CHAIN, CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS } from '@/env';
import { useContractRead } from 'wagmi';

interface IParams {
  address?: `0x${string}`;
  offset: bigint;
  limit: bigint;
}

export const useGetUserListed = ({ address, offset, limit }: IParams) => {
  return useContractRead({
    address: MARKET_CONTRACT_ADDRESS,
    abi: MARKET_PLACE_ABI,
    functionName: 'getUserListed',
    args: [address as `0x${string}`, offset, limit],
    chainId: BSC_CHAIN.id,
    enabled: address !== undefined,
    staleTime: 60000,
  });
};
