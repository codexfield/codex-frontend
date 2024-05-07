import { AIRDROP_DOMAIN } from '@/modules/airdrop/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';

interface IResponse {
  code: number;
  message: string;
  result: {
    err_msg: string;
    /**
     * ImportTaskStatusInit    int = 1
     * ImportTaskStatusSuccess int = 10
     * ImportTaskStatusFailed  int = 11
     */
    status: 1 | 10 | 11;
  };
}

export const useCheckRepo = (bucketId?: string) => {
  const { address } = useAccount();

  return useQuery({
    // enabled: !!address && !!bucketId,
    queryKey: ['CHECK', bucketId],
    queryFn: async () => {
      const res = await axios.get<IResponse>(`${AIRDROP_DOMAIN}/repo/check`, {
        params: {
          address,
          code_bucket_id: bucketId,
        },
      });

      return res.data;
    },
    staleTime: 0,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    refetchOnMount: false,
  });
};
