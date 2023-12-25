import { GreenfieldClient } from '@/config/client';
import FS from '@isomorphic-git/lightning-fs';
import git from 'isomorphic-git';
import { useEffect, useState } from 'react';

export const useInitRepo = (fs: FS | null) => {
  const [latestCommit, setLatestCommit] = useState('');
  useEffect(() => {
    if (!fs) return;

    const init = async () => {
      // const r = await GreenfieldClient.object.getObject(
      //   {
      //     bucketName: 'codex-3-test-repo',
      //     objectName: 'refs/HEAD',
      //     endpoint: 'https://gnfd-testnet-sp1.bnbchain.org',
      //   },
      //   {
      //     type: 'ECDSA',
      //     privateKey: '0x6547492644d0136f76ef65e3bd04a77d079ed38028f747700c6c6063564d7032',
      //   },
      // );
      // console.log('r', r);

      console.log('resolveRef');
      debugger;
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
