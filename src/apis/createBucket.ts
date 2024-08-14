import { GreenfieldClient, SpInfo } from '@/config/GnfsClient';
import { BUCKET_HUB_ADDRESS } from '@/env';
import { BUCKET_HUB_ABI } from '@/shared/constants/abi/bucketHubAbi';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import { PickVGFStrategy } from '@bnb-chain/greenfield-cosmos-types/greenfield/virtualgroup/common';
import { Address, PublicClient, WalletClient } from 'viem';

export enum BucketVisibilityType {
  Unspecified = 0,
  PublicRead,
  Private,
  Inherit,
}

export type CreateBucketSynPackage = {
  creator: Address;
  name: string;
  visibility: BucketVisibilityType;
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
  visibility,
  publicClient,
  walletClient,
  fees,
  sp,
}: {
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  bucketName: string;
  address: Address;
  sp: SpInfo;
  visibility: keyof typeof VisibilityType;
  fees?: bigint;
}) => {
  if (!publicClient || !walletClient || !fees) return;

  console.log('sp.id', sp);

  const { globalVirtualGroupFamilyId } =
    await GreenfieldClient.virtualGroup.getSpOptimalGlobalVirtualGroupFamily({
      spId: sp.id,
      pickVgfStrategy: PickVGFStrategy.Strategy_Oldest_Create_Time,
    });

  console.log('globalVirtualGroupFamilyId', globalVirtualGroupFamilyId);

  const createBucketSyncPkg: CreateBucketSynPackage = {
    name: bucketName,
    creator: address,
    chargedReadQuota: BigInt(0),
    visibility:
      visibility === 'VISIBILITY_TYPE_PRIVATE'
        ? BucketVisibilityType.Private
        : BucketVisibilityType.PublicRead,
    paymentAddress: address,
    primarySpAddress: sp.primarySpAddress,
    primarySpApprovalExpiredHeight: BigInt(0),
    // globalVirtualGroupFamilyId: globalVirtualGroupFamilyId,
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
    // gasPrice: BSC_GAS_PRICE,
  });

  console.log('request', request);

  const createBucketHash = await walletClient.writeContract(request);

  console.log('createBucketHash', createBucketHash);

  if (!createBucketHash) return;

  const tx = await publicClient?.waitForTransactionReceipt({
    hash: createBucketHash,
  });

  return tx;
};
