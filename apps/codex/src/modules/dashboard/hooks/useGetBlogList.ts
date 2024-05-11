import { GreenfieldClient } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  bucketName: string;
}

export const useGetBlogList = ({ bucketName }: IParams) => {
  return useQuery({
    queryKey: ['GET_BLOG_LIST'],
    queryFn: async () => {
      const endpoint = await GreenfieldClient.sp.getSPUrlByBucket(bucketName);
      const data = await GreenfieldClient.object.listObjects({
        bucketName,
        endpoint,
      });
      return data.body?.GfSpListObjectsByBucketNameResponse.Objects;
    },
    staleTime: 60_000,
  });
};
