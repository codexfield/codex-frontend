import { ABI } from '@/constants/abi';
import { BSC_CHAIN, CONTRACT_ADDRESS } from '@/env';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export const useRegister = (
  address: `0x{string}`,
  values: IRegister,
  onSuccess: () => void,
  onError: (e: Error | null) => void,
) => {
  const debounceValues = useDebounce(values, 500);
  const { chain } = useNetwork();
  const { name, avatar, bio, company, location, website, socialAccounts } = debounceValues;

  // if chain is not BSC, switch to BSC check register status
  // useEffect(() => {
  //   if (chain?.id !== BSC_CHAIN.id) {
  //     switchNetwork?.(BSC_CHAIN.id);
  //   }
  // }, [chain?.id, switchNetwork]);

  const isRightChain = chain?.id === BSC_CHAIN.id;

  const {
    config,
    error: prepareError,
    isLoading: prepareIsLoading,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'register',
    args: [address, name, avatar, bio, company, location, website, socialAccounts],
    chainId: BSC_CHAIN.id,
    enabled: name !== '' && address !== undefined && isRightChain,
    onSuccess(data) {
      // console.log('Success', data);
    },
    onError(err) {
      // console.log('Error', err);
    },
  });

  const { data, error, isError, write } = useContractWrite(config);

  const {
    isLoading: waitForTransactionIsLoading,
    isSuccess,
    isError: waitForTxError,
  } = useWaitForTransaction({
    hash: data?.hash,
    enabled: isRightChain,
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
    write,
    isLoading: prepareIsLoading || waitForTransactionIsLoading,
    isSuccess,
    isRightChain,
  };
};
