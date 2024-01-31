import { GreenfieldClient } from '@/config/GnfsClient';

export const getGroupInfo = async (groupName: string, address: string) => {
  try {
    return await GreenfieldClient.group.headGroup(groupName, address);
  } catch (e) {
    return {
      groupInfo: null,
    };
  }
};
