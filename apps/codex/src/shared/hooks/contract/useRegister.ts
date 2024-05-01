import { ACCOUNT_MANAGE_ABI } from '@/shared/constants/abi/accountManageAbi';
import { BSC_CHAIN, CONTRACT_ADDRESS } from '@/env';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from 'wagmi';

export const useRegister = (
  address: `0x{string}`,
  values: IRegister,
  onSuccess: () => void,
  onError: (e: Error | null) => void,
) => {
  const debounceValues = useDebounce(values, 500);
  const { chain } = useAccount();
  const { name, avatar, bio, company, location, website, socialAccounts } = debounceValues;

  const isRightChain = chain?.id === BSC_CHAIN.id;

  const {
    data: simulateData,
    error: prepareError,
    isLoading: prepareIsLoading,
  } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: ACCOUNT_MANAGE_ABI,
    functionName: 'register',
    args: [address, name, avatar, bio, company, location, website, socialAccounts],
    chainId: BSC_CHAIN.id,
    query: {
      enabled: name !== '' && address !== undefined && isRightChain,
    },
  });

  const { data, writeContract, isError, error } = useWriteContract();

  const {
    isLoading: waitForTransactionIsLoading,
    isSuccess,
    isError: waitForTxError,
  } = useWaitForTransactionReceipt({
    hash: data,
    query: {
      enabled: isRightChain,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
    if (isError || waitForTxError) {
      onError(prepareError || error);
    }
  }, [error, isError, isSuccess, onError, onSuccess, prepareError, waitForTxError]);

  return {
    simulateData,
    write: writeContract,
    isLoading: prepareIsLoading || waitForTransactionIsLoading,
    isSuccess,
    isRightChain,
  };
};
