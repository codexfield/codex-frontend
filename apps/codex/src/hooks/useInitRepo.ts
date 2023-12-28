// @ts-ignore
import FS from '@codexfield/lightning-fs';
import { useQuery } from '@tanstack/react-query';
import git from '@codexfield/isomorphic-git';

export const useInitRepo = (fs: FS | null, repoName: string) => {
  return useQuery({
    enabled: !!fs && !!repoName,
    queryKey: ['INIT_REPO', repoName],
    queryFn: async () => {
      if (!fs) return;

      const res = await git.resolveRef({
        fs: fs,
        dir: '',
        gitdir: '',
        ref: 'HEAD',
      });
      const commit = await git.readCommit({
        fs: fs,
        dir: '',
        gitdir: '',
        oid: res,
      });

      return commit.commit.tree;
    },
    staleTime: Infinity,
  });
};
