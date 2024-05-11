import { createBucket } from '@/apis/createBucket';
import { GreenfieldClient, selectSp } from '@/config/GnfsClient';
import { BSC_CHAIN } from '@/env';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetFee } from '@/shared/hooks/contract/useGetFee';
import { getBlogSpaceName, sleep } from '@/shared/utils';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';

export const useCreateBlogSpace = () => {
  const { address, connector, chain } = useAccount();
  const publicClient = usePublicClient({
    chainId: BSC_CHAIN.id,
  });
  const { data: walletClient } = useWalletClient();
  const { data: userInfo } = useGetAccountDetails(address);
  const [offchainData, setOffchainData] = useAtom(offchainDataAtom);

  const { switchChain } = useSwitchChain();
  const isBSCChain = chain?.id === BSC_CHAIN.id;
  const { data: fees } = useGetFee();

  const [start, setStart] = useState(false);

  const doCreateBlogSpace = async () => {
    if (!address || !userInfo) return;

    if (!isBSCChain) {
      switchChain?.({
        chainId: BSC_CHAIN.id,
      });
      return;
    }

    // setCreating(true);
    setStart(true);

    try {
      const spInfo = await selectSp();
      const bucketName = getBlogSpaceName(userInfo.id);
      try {
        const bucketInfo = await GreenfieldClient.bucket.headBucket(bucketName);

        if (bucketInfo) {
          // setErrors({
          //   repoName: 'bucket had exists',
          // });
          throw new Error('bucket had exists');
          // return;
        }
      } catch (e) {
        // ...
      }

      const createBucketTxHash = await createBucket({
        fees,
        publicClient,
        walletClient,
        bucketName,
        address,
        sp: spInfo,
        visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
      });

      console.log('createBucketTxHash', createBucketTxHash);

      await sleep(30_000);

      // await onSuccess?.();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // ...
      // setErrors({
      //   repoName: err && err.message,
      // });
    } finally {
      // setCreating(false);
      setStart(false);
    }
  };

  return {
    doCreateBlogSpace,
    start: start,
    text: !offchainData?.seed ? 'Signature' : isBSCChain ? 'Create' : 'Switch Network',
  };
};
