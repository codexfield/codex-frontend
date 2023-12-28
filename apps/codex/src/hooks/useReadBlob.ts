import FS from '@isomorphic-git/lightning-fs';
import { useQuery } from '@tanstack/react-query';
import git from 'isomorphic-git';
import { OidType } from './useReadRepoByOid';

export const useReadBlob = (fs: FS | null, oid: string, type: OidType) => {
  return useQuery({
    enabled: type === 'blob',
    queryKey: ['GET_REPO_BLOB', oid],
    queryFn: async () => {
      if (!fs || !oid) return null;
      const file = await git.readBlob({
        fs: fs,
        dir: '',
        gitdir: '',
        oid,
      });

      const decoder = new TextDecoder();
      const res = decoder.decode(file.blob);
      return res;
    },
    staleTime: Infinity,
  });
};
