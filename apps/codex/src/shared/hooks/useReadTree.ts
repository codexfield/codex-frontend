import git from '@codexfield/isomorphic-git';
// @ts-ignore
import FS from '@codexfield/lightning-fs';
import { useQuery } from '@tanstack/react-query';
import orderBy from 'lodash.orderby';

export const useReadTree = (fs: FS | null, oid: string, enabled: boolean) => {
  return useQuery({
    enabled,
    queryKey: ['GET_REPO_TREE', oid],
    queryFn: async () => {
      if (!enabled) return null;
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
    select(data) {
      const res = data;
      if (res) {
        res.tree = orderBy(data.tree, ['type'], ['desc']);
      }
      return res;
    },
  });
};
