import { GnfdClient } from '@/config/client';

export type GetObjectRequest = {
  bucketName: string;
  objectName: string;
  privateKey: string;
}

export const getObject = async (params: GetObjectRequest) => {
  const { bucketName, objectName, privateKey } = params
  const res = await GnfdClient.object.getObject({
    bucketName,
    objectName
  }, {
    type: 'ECDSA',
    privateKey
  })

  return await res.body?.text()
}

export const getBranch = (ref: string) => {
  return ref.replace('ref: refs/heads/', '')
    .replace('\n', '')
}