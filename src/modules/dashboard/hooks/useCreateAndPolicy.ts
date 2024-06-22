import {
  CrossChainClient,
  MultiMessageClient,
  BasicClientParams,
} from '@bnb-chain/bsc-cross-greenfield-sdk';
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
import { getCrossClientConfig } from '@/config/BscCrossClient';
import { ResourceType } from '@bnb-chain/greenfield-cosmos-types/greenfield/resource/types';
import {
  ActionType,
  Effect,
  PrincipalType,
} from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
import { POLICY_ACCOUNT } from './usePutPolicy';

interface FormValues {
  repoName: string;
  visibility: keyof typeof VisibilityType;
  description?: string;
}

interface IParams {
  isInitGit?: boolean;
  onSuccess?: () => Promise<void>;
}

export const useCreateAndPolicy = ({ isInitGit = true, onSuccess }: IParams) => {
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
    validate: async (values: FormValues) => {
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

        const config = getCrossClientConfig(address);

        const crossChainClient = new CrossChainClient(
          config,
          '0x994Aa0C06B64CD112972c812f9839309315ED466',
        );

        const { relayFee, minAckRelayFee } = await crossChainClient.getRelayFee();

        console.log('spInfo', spInfo);
        console.log('values', values);

        const multiMsgClient = new MultiMessageClient(
          config,
          '0xda62826dbbf7ecb3f49d25394e459801a75acd1b',
          {
            bucketHubAddress: '0x8A0b8755430F7df0f92DE45ce3E0408A4a324941',
            objectHubAddress: '0x993a74b1aA302eF975F97F72f40d066B9f1431c3',
            groupHubAddress: '0xaC6d82150875fe05e2067F1f10d9B417fDfDe6a7',
            permissionHubAddress: '0x1f1201DDF9915eacE0C5667b03406071355A8B1d',
            tokenHubAddress: '0x6dE189130920E87FCb779688e8318C8305c2C798',
          },
        );

        const arg1 = multiMsgClient.createBucket(
          {
            name: bucketName,
            chargedReadQuota: BigInt(0),
            creator: address,
            visibility: 1,
            paymentAddress: address,
            primarySpAddress: spInfo.primarySpAddress,
            primarySpApprovalExpiredHeight: BigInt(0),
            globalVirtualGroupFamilyId: 1,
            primarySpSignature: '0x',
            extraData: '0x',
          },
          {
            sender: address,
            minAckRelayFee,
            relayFee,
          },
        );

        const arg2 = multiMsgClient.createPolicy(
          {
            id: '0',
            resourceId: '234011',
            resourceType: ResourceType.RESOURCE_TYPE_BUCKET,
            statements: [
              {
                effect: Effect.EFFECT_ALLOW,
                actions: [
                  ActionType.ACTION_CREATE_OBJECT,
                  ActionType.ACTION_GET_OBJECT,
                  ActionType.ACTION_UPDATE_OBJECT_CONTENT,
                ],
                resources: [],
              },
            ],
            principal: {
              type: PrincipalType.PRINCIPAL_TYPE_GNFD_ACCOUNT,
              value: POLICY_ACCOUNT,
            },
          },
          {
            sender: address,
            minAckRelayFee,
            relayFee,
          },
        );

        const txHash = await multiMsgClient.sendMessages([arg1, arg2]);

        console.log('txHash', txHash);

        // const createBucketTxHash = await createBucket({
        //   fees,
        //   publicClient,
        //   walletClient,
        //   bucketName,
        //   address,
        //   sp: spInfo,
        //   // visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        //   visibility: values.visibility,
        // });

        // console.log('createBucketTxHash', createBucketTxHash);

        // while (true) {
        //   let bucketInfo;
        //   try {
        //     bucketInfo = await GreenfieldClient.bucket.headBucket(bucketName);
        //   } catch (e) {}

        //   console.log('bucket res', bucketInfo);
        //   if (bucketInfo) {
        //     break;
        //   }

        //   await sleep(5000);
        // }

        // if (isInitGit) {
        //   const backend = new GnfdBackend(bucketName, seed, spInfo.endpoint, offchainData.address);
        //   const fs = new LightningFS('fs', {
        //     // @ts-ignore
        //     backend,
        //   });
        //   if (!fs) return;
        //   const res = await git.init({
        //     fs: fs,
        //     dir: '',
        //     gitdir: '',
        //     defaultBranch: 'main',
        //   });
        // }

        // await onSuccess?.();

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
    text: !offchainData?.seed ? 'Signature' : isBSCChain ? 'Create repository' : 'Switch Network',
  };
};
