import GnfdBackend from '@/config/GnfdBackend';
import LightningFS from '@isomorphic-git/lightning-fs';
import { useEffect, useRef, useState } from 'react';

export const useFs = ({
  repoName,
  privateKey,
  endpoint,
  address,
}: {
  repoName: string;
  privateKey: string;
  endpoint: string;
  address?: string;
}) => {
  const [fs, setFs] = useState<LightningFS | null>(null);

  useEffect(() => {
    if (!repoName || !privateKey) return;

    console.log('endpoint', endpoint);

    const backend = new GnfdBackend(repoName, privateKey, endpoint);
    console.log('useFs', repoName, privateKey, endpoint);

    const lightningFS = new LightningFS('fs', {
      // @ts-ignore
      backend,
    });

    setFs(lightningFS);
  }, [endpoint, privateKey, repoName]);

  return fs;
};
