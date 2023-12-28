import { GreenfieldClient } from '@/config/client';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useSelectSp } from './useSelectSp';

export const useGetRepoList = () => {
  const { address } = useAccount();

  const { data: spInfo } = useSelectSp();

  return useQuery({
    enabled: address !== undefined && !!spInfo,
    queryKey: ['GET_BUCKET_REPO_LIST', address],
    queryFn: async () => {
      if (!address || !spInfo) return;

      const { body: bucketList } = await GreenfieldClient.bucket.listBuckets({
        address: address,
        endpoint: spInfo.endpoint,
      });

      return bucketList?.filter((bucket) => {
        return bucket.BucketInfo.BucketName.startsWith('codex-');
      });
    },
    staleTime: Infinity,
  });
};
