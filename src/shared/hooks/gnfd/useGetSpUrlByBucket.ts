import { GreenfieldClient } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';

/**
 * get endpoint by repo name
 */
export const useGetSpUrlByBucket = (repoName?: string) => {
  return useQuery({
    enabled: !!repoName,
    queryKey: ['GET_SP_URL_BY_BUCKET_NAME', repoName],
    queryFn: async () => {
      if (!repoName) {
        return '';
      }
      const endpoint = await GreenfieldClient.sp.getSPUrlByBucket(repoName);

      return endpoint;
    },
  });
};
