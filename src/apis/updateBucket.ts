import { GreenfieldClient } from '@/config/GnfsClient';

export interface UpdateBucketParams {
  bucketName: string;
  addr: string;
  visibility: number;
}

/**
 * visibility: 1 - public, 2 - private
 */
export const updateBucket = async ({ bucketName, addr, visibility }: UpdateBucketParams) => {
  const tx = await GreenfieldClient.bucket.updateBucketInfo({
    bucketName,
    operator: addr,
    paymentAddress: addr,
    visibility: visibility,
    chargedReadQuota: '100',
  });

  const simulateInfo = await tx.simulate({
    denom: 'BNB',
  });

  return await tx.broadcast({
    denom: 'BNB',
    gasLimit: Number(simulateInfo?.gasLimit),
    gasPrice: simulateInfo?.gasPrice || '5000000000',
    payer: addr,
    granter: '',
  });
};
