import { REPO_PREFIX } from '@/shared/constants/app';
import { GNFD_RPC } from '@/env';
import dayjs from 'dayjs';

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

export const getCloneUrlByRepoName = (userId: string, repoName: string) => {
  const RPC = GNFD_RPC.replace('https://', '');
  return `gnfd://${RPC}:443/codex-${userId}-${repoName}`;
};

export const getCloneUrlByBucketName = (bucketName: string) => {
  const RPC = GNFD_RPC.replace('https://', '');
  return `gnfd://${RPC}:443/${bucketName}`;
};

export const DYMTimeAsObject = (timestamp: number) => {
  const res = dayjs.unix(timestamp).format('DD,MMM,YYYY');

  const dym = res.split(',');

  return {
    d: dym[0],
    m: dym[1],
    y: dym[2],
  };
};

export const shortAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-6);
};

export const shortName = (name: string) => {
  if (name.length > 10) {
    return name.slice(0, 20) + '...';
  }
  return name;
};
