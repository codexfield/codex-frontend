import { GreenfieldClient } from '@/config/GnfsClient';

export const putBucketPolicy = async (bucketName: string, srcMsg: any) => {
  return await GreenfieldClient.bucket.putBucketPolicy(bucketName, srcMsg);
};
