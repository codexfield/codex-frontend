import { GreenfieldClient } from '@/config/GnfsClient';
import { BSC_CHAIN } from '@/env';

export const mirrorGroup = async (groupName: string, id: string, operator: string) => {
  return await GreenfieldClient.crosschain.mirrorGroup({
    groupName,
    id,
    operator,
    destChainId: BSC_CHAIN.id,
  });
};
