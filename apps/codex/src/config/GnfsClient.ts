import { GNFD_CHAINID, GNFD_RPC } from '@/env';
import { Client } from '@bnb-chain/greenfield-js-sdk';
import { Address } from 'viem';

const GREEN_CHAIN_ID = GNFD_CHAINID;
const GRPC_URL = GNFD_RPC;

export const GreenfieldClient = Client.create(GRPC_URL, String(GREEN_CHAIN_ID));

export const getSps = async () => {
  const sps = await GreenfieldClient.sp.getStorageProviders();
  console.log('sps', sps);
  // return sps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const finalSps = (sps ?? []).filter((v: any) => v.endpoint.includes('bnbchain'));

  return sps;
  // return finalSps;
};

export const getAllSps = async () => {
  const sps = await getSps();

  return sps.map((sp) => {
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: sp.description?.moniker,
    };
  });
};

export interface SpInfo {
  id: number;
  endpoint: string;
  primarySpAddress: Address;
  sealAddress: string;
  secondarySpAddresses: string[];
}

export const selectSp = async (): Promise<SpInfo> => {
  const finalSps = await getSps();

  const selectIndex = Math.floor(Math.random() * finalSps.length);

  const secondarySpAddresses = [
    ...finalSps.slice(0, selectIndex),
    ...finalSps.slice(selectIndex + 1),
  ].map((item) => item.operatorAddress);
  const selectSpInfo = {
    id: finalSps[selectIndex].id,
    endpoint: finalSps[selectIndex].endpoint,
    primarySpAddress: finalSps[selectIndex]?.operatorAddress as Address,
    sealAddress: finalSps[selectIndex].sealAddress,
    secondarySpAddresses,
  };

  return selectSpInfo;
};
