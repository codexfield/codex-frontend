import { GreenfieldClient } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  bucketName: string;
}

export const useGetBlogList = ({ bucketName }: IParams) => {
  return useQuery({
    queryKey: ['GET_BLOG_LIST', bucketName],
    queryFn: async () => {
      try {
        // exist
        await GreenfieldClient.bucket.headBucket(bucketName);
      } catch (e) {
        // ...
        return [];
      }

      const endpoint = await GreenfieldClient.sp.getSPUrlByBucket(bucketName);
      const data = await GreenfieldClient.object.listObjects({
        bucketName,
        endpoint,
        query: new URLSearchParams({
          delimiter: '/',
          // 'start-after': String(page),
          prefix: '/',
          'max-keys': '1000',
        }),
      });
      return data.body?.GfSpListObjectsByBucketNameResponse.Objects;
    },
    staleTime: 60_000,
  });
};
