import { GreenfieldClient } from '@/config/GnfsClient';
import { Long } from '@bnb-chain/greenfield-js-sdk';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import { Address, PublicClient, WalletClient } from 'viem';
import { BUCKET_HUB_ADDRESS } from '@/env';
import { BUCKET_HUB_ABI } from '@/shared/constants/abi/bucketHubAbi';

export enum BucketVisibilityType {
  Unspecified = 0,
  PublicRead,
  Private,
  Inherit,
}

export type CreateBucketSynPackage = {
  creator: Address;
  name: string;
  visibility: VisibilityType;
  paymentAddress: Address;
  primarySpAddress: Address;
  primarySpApprovalExpiredHeight: bigint;
  globalVirtualGroupFamilyId: number;
  primarySpSignature: Address;
  chargedReadQuota: bigint;
  extraData: `0x${string}`;
};

export const createBucket = async ({
  bucketName,
  address,
  primarySpAddress,
  seed,
  visibility,
  publicClient,
  walletClient,
  fees,
}: {
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  bucketName: string;
  address: Address;
  seed: string;
  primarySpAddress: Address;
  visibility: VisibilityType;
  fees?: bigint;
}) => {
  if (!publicClient || !walletClient || !fees) return;

  const createBucketSyncPkg: CreateBucketSynPackage = {
    name: bucketName,
    creator: address,
    chargedReadQuota: BigInt(0),
    visibility,
    paymentAddress: address,
    primarySpAddress,
    primarySpApprovalExpiredHeight: BigInt(0),
    globalVirtualGroupFamilyId: 1,
    primarySpSignature: '0x',
    extraData: '0x',
  };

  const { request } = await publicClient.simulateContract({
    account: address,
    address: BUCKET_HUB_ADDRESS,
    abi: BUCKET_HUB_ABI,
    functionName: 'createBucket',
    args: [createBucketSyncPkg],
    value: fees,
  });

  console.log('request', request);

  return await walletClient.writeContract(request);

  // const tx = await GreenfieldClient.bucket.createBucket({
  //   bucketName,
  //   creator: address,
  //   visibility,
  //   chargedReadQuota: Long.fromString('0'),
  //   primarySpAddress,
  //   paymentAddress: address,
  // });

  // const simulateInfo = await tx.simulate({
  //   denom: 'BNB',
  // });

  // // console.log('simulateInfo', simulateInfo);

  // const res = await tx.broadcast({
  //   denom: 'BNB',
  //   gasLimit: Number(simulateInfo?.gasLimit),
  //   gasPrice: simulateInfo?.gasPrice || '5000000000',
  //   payer: address,
  //   granter: '',
  // });

  // return res;

  // if (res.code === 0) {
  //   alert('success');
  // }
};
