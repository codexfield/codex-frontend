import { GreenfieldClient } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';

export const useGetBucketInfo = (bucketName: string) => {
  return useQuery({
    queryKey: ['getBucketInfo', bucketName],
    queryFn: async () => {
      const data = await GreenfieldClient.bucket.headBucket(bucketName);
      return data.bucketInfo;
    },
    staleTime: 60_000,
  });
};
