import { GreenfieldClient } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useSelectSp } from './useSelectSp';
import { REPO_PREFIX } from '@/shared/constants/app';

export const GET_REPO_LIST_QUERY_KEY = 'GET_BUCKET_REPO_LIST';

export const useGetRepoList = () => {
  const { address } = useAccount();

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

      return bucketList?.filter((bucket) => {
        return bucket.BucketInfo.BucketName.startsWith(`${REPO_PREFIX}-`);
      });
    },
    staleTime: Infinity,
  });
};
