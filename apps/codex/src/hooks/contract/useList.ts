import { MARKET_PLACE_ABI } from '@/constants/abi/marketplaceAbi';
import { BSC_CHAIN, MARKET_CONTRACT_ADDRESS } from '@/env';
import { useEffect } from 'react';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export interface IListParams {
  // groupName: string;
  // price: string;
  // desc: string;

  groupId: bigint;
  price: bigint;
}

export const useList = (
  { groupId, price }: IListParams,
  onSuccess: () => void,
  onError: (e: Error | null) => void,
) => {
  console.log('useList', groupId, price);
  const { chain } = useNetwork();
  const isRightChain = chain?.id === BSC_CHAIN.id;

  const {
    config,
    error: prepareError,
    isLoading: prepareIsLoading,
  } = usePrepareContractWrite({
    address: MARKET_CONTRACT_ADDRESS,
    abi: MARKET_PLACE_ABI,
    functionName: 'list',
    // args: [groupId, price],
    args: [1721n, 212n],
    chainId: BSC_CHAIN.id,
    // enabled: !!groupId && !!price && isRightChain,
  });

  console.log('config', config, prepareError);

  const { data, error, isError, write } = useContractWrite(config);

  const {
    isLoading: waitForTransactionIsLoading,
    isSuccess,
    isError: waitForTxError,
  } = useWaitForTransaction({
    hash: data?.hash,
    // enabled: isRightChain,
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    if (isError || waitForTxError) {
      onError(prepareError || error);
    }
  }, [error, isError, isSuccess, onError, onSuccess, prepareError, waitForTxError]);

  console.log('write', write);

  return {
    write,
    isLoading: prepareIsLoading || waitForTransactionIsLoading,
    isSuccess,
    isRightChain,
  };
};
