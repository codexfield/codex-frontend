import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AIRDROP_DOMAIN } from '../api';

export const useCheckCode = (code: string) => {
  return useQuery({
    enabled: false,
    queryKey: ['CHECK', code],
    queryFn: async () => {
      const res = await axios.get(`${AIRDROP_DOMAIN}/check`, {
        params: {
          refer_code: code,
        },
      });

      return res.data;
    },
    staleTime: -1,
  });
};
