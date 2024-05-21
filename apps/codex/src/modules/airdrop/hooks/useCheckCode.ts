import { AIRDROP_DOMAIN } from '@/env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
