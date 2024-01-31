import { GreenfieldClient } from '@/config/GnfsClient';
import { useQuery } from '@tanstack/react-query';

export const useHeadGroup = (groupName: string, address?: `0x${string}`) => {
  return useQuery({
    enabled: !!address,
    queryKey: ['HEAD_GROUP', address, groupName],
    queryFn: async () => {
      if (!address) return;
      const { groupInfo } = await GreenfieldClient.group.headGroup(groupName, address);

      return groupInfo;
    },
  });
};
