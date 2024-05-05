import { GreenfieldClient } from '@/config/GnfsClient';
import { REPO_PREFIX } from '@/shared/constants/app';
import { useQuery } from '@tanstack/react-query';
import { useSelectSp } from './useSelectSp';

export const GET_REPO_LIST_QUERY_KEY = 'GET_BUCKET_REPO_LIST';

export const useGetRepoList = (address?: `0x${string}`) => {
  // const { address } = useAccount();
  const { data: spInfo } = useSelectSp();

  return useQuery({
    enabled: address !== undefined && !!spInfo,
    queryKey: [GET_REPO_LIST_QUERY_KEY, address],
    queryFn: async () => {
      if (!address || !spInfo) return;

      const { body: bucketList } = await GreenfieldClient.bucket.listBuckets({
        address: address,
        endpoint: spInfo.endpoint,
      });

      // console.log('spInfo.endpoint', spInfo.endpoint);
      // console.log('bucketList', bucketList);

      return bucketList?.filter((bucket) => {
        return bucket.BucketInfo.BucketName.startsWith(`${REPO_PREFIX}-`);
      });
    },
    staleTime: Infinity,
  });
};
