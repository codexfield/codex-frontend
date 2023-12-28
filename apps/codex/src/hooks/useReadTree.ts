import FS from '@isomorphic-git/lightning-fs';
import { useQuery } from '@tanstack/react-query';
import git from 'isomorphic-git';
import { OidType } from './useReadRepoByOid';

export const useReadTree = (fs: FS | null, oid: string, type: OidType) => {
  return useQuery({
    enabled: type === 'tree',
    queryKey: ['GET_REPO_TREE', oid],
    queryFn: async () => {
      if (!fs || !oid) return null;
      const tree = await git.readTree({
        fs: fs,
        dir: '',
        gitdir: '',
        oid,
      });
      return tree;
    },
    staleTime: Infinity,
  });
};
