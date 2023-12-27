import { atom, useAtom } from 'jotai';

export type OffChainDataType = {
  seed: string;
  address: string;
};

export const offchainDataAtom = atom<OffChainDataType | null>(null);
