import { GreenfieldClient, getAllSps } from '@/config/GnfsClient';
import { ENV, GNFD_CHAINID } from '@/env';
import { IReturnOffChainAuthKeyPairAndUpload } from '@bnb-chain/greenfield-js-sdk';

/**
 * generate off-chain auth key pair and upload public key to sp
 */
export const getKey = (address: string) => {
  return 'CodeX' + '_' + ENV + '_' + address;
};

export const getOffchainAuthKeys = async (
  address: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any,
): Promise<IReturnOffChainAuthKeyPairAndUpload | undefined> => {
  const key = getKey(address);
  const storageResStr = localStorage.getItem(key);

  if (storageResStr) {
    const storageRes = JSON.parse(storageResStr) as IReturnOffChainAuthKeyPairAndUpload;
    if (storageRes.expirationTime < Date.now()) {
      // alert('Your auth key has expired, please generate a new one');
      localStorage.removeItem(key);
      return;
    }

    return storageRes;
  }

  const allSps = await getAllSps();
  // console.log('allSps', allSps, GNFD_CHAINID, window.location.origin, address);
  const offchainAuthRes = await GreenfieldClient.offchainauth.genOffChainAuthKeyPairAndUpload(
    {
      sps: allSps,
      chainId: GNFD_CHAINID,
      expirationMs: 5 * 24 * 60 * 60 * 1000,
      domain: window.location.origin,
      address,
    },
    provider,
  );

  const { code, body: offChainData } = offchainAuthRes;
  if (code !== 0 || !offChainData) {
    throw offchainAuthRes;
  }

  localStorage.setItem(key, JSON.stringify(offChainData));
  return offChainData;
};
