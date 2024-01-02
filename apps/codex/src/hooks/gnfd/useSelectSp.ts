import { selectSp } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';

export const useSelectSp = () => {
  return useQuery({
    queryKey: ['SELECT_SP'],
    queryFn: async () => {
      const spInfo = await selectSp();
      return spInfo;
    },
    staleTime: Infinity,
  });
};
