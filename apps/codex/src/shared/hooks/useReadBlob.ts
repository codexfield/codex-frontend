import git from '@codexfield/isomorphic-git';
// @ts-ignore
import FS from '@codexfield/lightning-fs';
import { useQuery } from '@tanstack/react-query';

export const useReadBlob = (fs: FS | null, oid: string, enabled: boolean) => {
  return useQuery({
    enabled,
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
