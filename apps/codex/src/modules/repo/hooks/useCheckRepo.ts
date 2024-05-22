import { AIRDROP_DOMAIN } from '@/env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';

interface IResponse {
  code: number;
  message: string;
  result?: {
    access_token: string;
    codex_bucket_id: string;
    err_msg: string;
    /**
     * ImportTaskStatusInit    int = 1
     * ImportTaskStatusSuccess int = 10
     * ImportTaskStatusFailed  int = 11
     */
    status: 1 | 10 | 11;
    repo_type: number;
    repo_url: string;
    gnfd_url: string;
  };
}

export const useCheckRepo = (bucketId?: string) => {
  const { address } = useAccount();

  return useQuery({
    enabled: !!address && !!bucketId,
    queryKey: ['CHECK', bucketId],
    queryFn: async () => {
      if (!bucketId) return;

      const res = await axios.get<IResponse>(`${AIRDROP_DOMAIN}/repo/check`, {
        params: {
          address,
          codex_bucket_id: bucketId,
        },
      });

      console.log('res', res);

      return res.data;
    },
    staleTime: 0,
    refetchInterval: (query) => {
      if (query.state.data?.result?.status === 10) return false;

      return 10_000;
    },
    refetchIntervalInBackground: true,
    refetchOnMount: false,
  });
};
