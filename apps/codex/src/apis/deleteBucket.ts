import { GreenfieldClient } from '@/config/GnfsClient';

export const deleteBucket = async (bucketName: string, address: `0x${string}`) => {
  const deleteBucketTx = await GreenfieldClient.bucket.deleteBucket({
    bucketName: bucketName,
    operator: address,
  });

  const simulateInfo = await deleteBucketTx.simulate({
    denom: 'BNB',
  });

  const res = await deleteBucketTx.broadcast({
    denom: 'BNB',
    gasLimit: Number(simulateInfo?.gasLimit),
    gasPrice: simulateInfo?.gasPrice || '5000000000',
    payer: address,
    granter: '',
  });

  return res;
};
