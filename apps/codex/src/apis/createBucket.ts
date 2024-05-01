import { GreenfieldClient } from '@/config/GnfsClient';
import { Long } from '@bnb-chain/greenfield-js-sdk';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';

export const createBucket = async ({
  bucketName,
  address,
  primarySpAddress,
  seed,
  visibility,
}: {
  bucketName: string;
  address: string;
  seed: string;
  primarySpAddress: string;
  visibility: VisibilityType;
}) => {
  const tx = await GreenfieldClient.bucket.createBucket({
    bucketName,
    creator: address,
    visibility,
    chargedReadQuota: Long.fromString('0'),
    primarySpAddress,
    paymentAddress: address,
  });

  const simulateInfo = await tx.simulate({
    denom: 'BNB',
  });

  // console.log('simulateInfo', simulateInfo);

  const res = await tx.broadcast({
    denom: 'BNB',
    gasLimit: Number(simulateInfo?.gasLimit),
    gasPrice: simulateInfo?.gasPrice || '5000000000',
    payer: address,
    granter: '',
  });

  return res;

  // if (res.code === 0) {
  //   alert('success');
  // }
};
