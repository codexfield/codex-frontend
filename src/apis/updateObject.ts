import { GreenfieldClient } from '@/config/GnfsClient';

export interface UpdateObjectParams {
  bucketName: string;
  objectName: string;
  addr: string;
  visibility: number;
}

/**
 * visibility: 1 - public, 2 - private
 */
export const updateObject = async ({
  bucketName,
  addr,
  visibility,
  objectName,
}: UpdateObjectParams) => {
  const tx = await GreenfieldClient.object.updateObjectInfo({
    bucketName,
    objectName,
    operator: addr,
    visibility,
  });

  const simulateInfo = await tx.simulate({
    denom: 'BNB',
  });

  return await tx.broadcast({
    denom: 'BNB',
    gasLimit: Number(simulateInfo?.gasLimit),
    gasPrice: simulateInfo?.gasPrice || '5000000000',
    payer: addr,
    granter: '',
  });
};
