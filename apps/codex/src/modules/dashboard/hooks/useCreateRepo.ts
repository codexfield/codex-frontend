import { createBucket } from '@/apis/createBucket';
import GnfdBackend from '@/config/GnfdBackend';
import { GreenfieldClient, selectSp } from '@/config/GnfsClient';
import { BSC_CHAIN } from '@/env';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { getBucketName, sleep } from '@/shared/utils';
import { getOffchainAuthKeys } from '@/shared/utils/offchainAuth';
import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import git from '@codexfield/isomorphic-git';
import { useGetFee } from '@/shared/hooks/contract/useGetFee';
// @ts-ignore
import LightningFS from '@codexfield/lightning-fs';
import { FormikErrors, useFormik } from 'formik';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';

interface FormValues {
  repoName: string;
  visibility: keyof typeof VisibilityType;
  description?: string;
}

interface IParams {
  onSuccess?: () => Promise<void>;
}

export const useCreateRepo = (params?: IParams) => {
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

  const formik = useFormik({
    initialValues: {
      repoName: '',
      description: '',
      visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.repoName) {
        errors.repoName = 'repo name is required';
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      if (!address || !userInfo) return;

      if (!offchainData || !offchainData.seed) {
        const provider = await connector?.getProvider();
        const data = await getOffchainAuthKeys(address, provider);
        setOffchainData({
          address: address,
          seed: data?.seedString,
        });
        return;
      }

      if (!isBSCChain) {
        switchChain?.({
          chainId: BSC_CHAIN.id,
        });
        return;
      }

      const { repoName } = values;
      const { seed } = offchainData;

      // setCreating(true);
      setStart(true);

      try {
        const spInfo = await selectSp();
        const bucketName = getBucketName(repoName, userInfo.id);
        try {
          const bucketInfo = await GreenfieldClient.bucket.headBucket(bucketName);

          if (bucketInfo) {
            setErrors({
              repoName: 'bucket had exists',
            });
            return;
          }
        } catch (e) {
          // ...
        }

        console.log('spInfo', spInfo);
        console.log('values', values);
        const createBucketTxHash = await createBucket({
          fees,
          publicClient,
          walletClient,
          bucketName,
          address,
          sp: spInfo,
          // visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          visibility: values.visibility,
        });

        console.log('createBucketTxHash', createBucketTxHash);

        await sleep(15000);

        const backend = new GnfdBackend(bucketName, seed, spInfo.endpoint, offchainData.address);

        const fs = new LightningFS('fs', {
          // @ts-ignore
          backend,
        });
        if (!fs) return;
        const res = await git.init({
          fs: fs,
          dir: '',
          gitdir: '',
          defaultBranch: 'main',
        });

        await params?.onSuccess?.();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // ...
        setErrors({
          repoName: err && err.message,
        });
      } finally {
        // setCreating(false);
        setStart(false);
      }
    },
  });

  return {
    formik,
    start: start,
    text: !offchainData?.seed ? 'Signature' : isBSCChain ? 'Creat repository' : 'Switch Network',
  };
};
