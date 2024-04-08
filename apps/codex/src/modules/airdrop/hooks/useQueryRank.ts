import { useQuery } from '@tanstack/react-query';
import { AIRDROP_DOMAIN } from '../api';

interface IResult {
  code: number;
  message: string;
  result: {
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
}

export const useQueryRank = () => {
  return useQuery<IResult>({
    queryKey: ['queryRank'],
    queryFn: async () => {
      const res = await fetch(`${AIRDROP_DOMAIN}/query/rank`);
      const data = await res.json();
      return data;
    },
    staleTime: 10_000,
  });
};
