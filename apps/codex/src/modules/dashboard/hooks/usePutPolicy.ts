import { putPolicy } from '@/apis/policy';
import { BSC_CHAIN } from '@/env';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetFee } from '@/shared/hooks/contract/useGetFee';
import { getBucketName, sleep } from '@/shared/utils';
import {
  ActionType,
  Effect,
  PrincipalType,
} from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
import { MsgPutPolicy } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { GRNToString, newBucketGRN } from '@bnb-chain/greenfield-js-sdk';
import { useState } from 'react';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';

interface Params {
  repoName: string;
  onSuccess?: () => Promise<void>;
  onFailure?: () => Promise<void>;
}

export const POLICY_ACCOUNT = '0x498a2E6d6dCdD63482191E138beeFf5410724909';

export const usePutPolicy = ({ repoName, onSuccess, onFailure }: Params) => {
  const { address, connector, chain } = useAccount();
  const publicClient = usePublicClient({
    chainId: BSC_CHAIN.id,
  });
  const { data: walletClient } = useWalletClient();
  const { data: userInfo } = useGetAccountDetails(address);
  const { switchChain } = useSwitchChain();
  const [start, setStart] = useState(false);
  const { data: fees } = useGetFee();

  const doPutPolicy = async () => {
    if (!address || !userInfo) return;

    if (chain?.id !== BSC_CHAIN.id) {
      switchChain?.({
        chainId: BSC_CHAIN.id,
      });
      return;
    }

    setStart(true);

    // const reg = /(?<=\/)[^\/]+(?=\.git$)/;
    // const repoName = reg.exec(githubUrl);
    // if (!repoName) return;
    // const bucketName = getBucketName(repoName[0], userInfo.id);

    const bucketName = getBucketName(repoName, userInfo.id);

    console.log('bucketName', bucketName);
    console.log('GRNToString(newBucketGRN(bucketName))', GRNToString(newBucketGRN(bucketName)));

    try {
      const bytes = MsgPutPolicy.encode({
        operator: address,
        resource: GRNToString(newBucketGRN(bucketName)),
        principal: {
          type: PrincipalType.PRINCIPAL_TYPE_GNFD_ACCOUNT,
          value: POLICY_ACCOUNT,
        },
        statements: [
          {
            effect: Effect.EFFECT_ALLOW,
            actions: [ActionType.ACTION_CREATE_OBJECT],
            resources: [],
            // resources: [GRNToString(newBucketGRN(bucketName))],
          },
        ],
      }).finish();

      const createPolicyHash = await putPolicy({
        bytes,
        address,
        publicClient,
        walletClient,
        fees,
      });

      console.log('createPolicy', createPolicyHash);

      await sleep(5000);

      onSuccess?.();

      // await importRepo({
      //   bucketName,
      //   address,
      //   repoUrl: values.githubUrl,
      //   gnfdUrl: getCloneUrlByRepoName(userInfo.id.toString(), repoName[0]),
      //   repoType: '1',
      // });
    } catch (err: any) {
      // setErrors({
      //   githubUrl: err && err.message,
      // });
      onFailure?.();
    } finally {
      setStart(false);
    }
  };

  return {
    doPutPolicy,
    start,
  };
};
