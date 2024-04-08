import { useQuery } from '@tanstack/react-query';
import { AIRDROP_DOMAIN } from '../api';
import axios from 'axios';

interface IUserResult {
  code: number;
  message: string;
  result: {
    current_timestamp: string;
    user: {
      address: string;
      invite_code: string;
      twitter_id: string;
      twitter_name: string;
      avatar: string;
      telegram_id: string;
      telegram_name: string;
      points: number;
      rank: number;
    };
    taskList: {
      name: string;
      task_type: 'Mandatory' | 'Optional' | 'Advanced';
      status: number;
      complete_time: '';
    }[];
    invites: [];
  };
}

export const useQueryUser = (address?: string) => {
  return useQuery({
    enabled: address !== undefined,
    queryKey: ['queryUser', address],
    queryFn: async () => {
      const res = await axios.get<Promise<IUserResult>>(
        `${AIRDROP_DOMAIN}/query/user?address=${address}`,
      );
      return res.data;
    },
    staleTime: -1,
  });
};
