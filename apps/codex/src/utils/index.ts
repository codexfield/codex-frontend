import { REPO_PREFIX } from '@/constants/app';

export const getBucketName = (repoName: string, userId: bigint) => {
  return `${REPO_PREFIX}-${userId}-${repoName}`;
};
export const getRepoName = (bucketName: string, userId: bigint) => {
  return bucketName.replace(`${REPO_PREFIX}-${userId}-`, '');
};
