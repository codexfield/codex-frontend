import { useQuery } from '@tanstack/react-query';
import { AIRDROP_DOMAIN } from '../api';

interface IResult {
  code: number;
  message: string;
  result: {
    rank_user_list: {
      address: string;
      avatar: string;
      invite_code: string;
      points: number;
      rank: number;
      twitter_id: string;
      twitter_name: string;
      telegram_id: string;
      telegram_name: string;
    }[];
    user_rank: number;
  };
}

export const useQueryRank = (address: string | undefined) => {
  return useQuery<IResult['result']>({
    enabled: !!address,
    queryKey: ['queryRank', address],
    queryFn: async () => {
      const res = await fetch(`${AIRDROP_DOMAIN}/query/rank?address=${address}`);
      const data = await res.json();
      return data.result;
    },
    // staleTime: 10_000,
  });
};
