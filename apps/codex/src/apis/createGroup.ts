import { GreenfieldClient } from '@/config/GnfsClient';
import { MsgCreateGroup } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';

export type CreateGroupParams = Awaited<ReturnType<typeof GreenfieldClient.group.createGroup>>;

export const createGroup = async (msg: MsgCreateGroup) => {
  return await GreenfieldClient.group.createGroup(msg);
};
