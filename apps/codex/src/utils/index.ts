import { REPO_PREFIX } from '@/constants/app';
import { GNFD_RPC } from '@/env';

export const getBucketName = (repoName: string, userId: bigint) => {
  return `${REPO_PREFIX}-${userId}-${repoName}`;
};
export const getRepoName = (bucketName: string, userId: bigint) => {
  return bucketName.replace(`${REPO_PREFIX}-${userId}-`, '');
};
export const getVisibility = (n: number) => {
  if (n === 1) {
    return 'Public';
  } else if (n === 2) {
    return 'Private';
  }
};

export const getCloneUrl = (bucketName: string) => {
  const RPC = GNFD_RPC.replace('https://', '');
  return `gnfd://${RPC}:443/${bucketName}`;
};
