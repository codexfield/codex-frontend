import git from 'isomorphic-git';
import FS from '@isomorphic-git/lightning-fs';
import { useEffect, useState } from 'react';

export const useReadBlob = (fs: FS | null, oid: string) => {
  const [content, setContent] = useState<string>('');
  useEffect(() => {
    console.log('oid', fs, oid);
    if (!fs || !oid) return;

    const readBlob = async () => {
      const file = await git.readBlob({
        fs: fs,
        dir: '',
        gitdir: '',
        oid,
      });

      console.log('file', file);

      const decoder = new TextDecoder();
      const res = decoder.decode(file.blob);

      setContent(res);
    };

    readBlob();
  }, [fs, oid]);

  return content;
};
