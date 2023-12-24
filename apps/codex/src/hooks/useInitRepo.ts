import FS from '@isomorphic-git/lightning-fs';
import git from 'isomorphic-git';
import { useEffect, useState } from 'react';

export const useInitRepo = (fs: FS | null) => {
  const [latestCommit, setLatestCommit] = useState('');
  useEffect(() => {
    if (!fs) return;

    const init = async () => {
      console.log('resolveRef');
      const res = await git.resolveRef({
        fs: fs,
        dir: '',
        gitdir: '',
        ref: 'refs/HEAD',
      });
      console.log('example ref', res);

      const commit = await git.readCommit({
        fs: fs,
        dir: '',
        gitdir: '',
        oid: res,
      });
      console.log('example commit', commit.commit.tree);

      setLatestCommit(commit.commit.tree);
    };

    init();
  }, [fs]);

  return latestCommit;
};
