import GnfdBackend from '@/config/GnfdBackend';
import LightningFS from '@isomorphic-git/lightning-fs';
import { useEffect, useRef, useState } from 'react';

export const useFs = ({
  address,
  repoName,
  privateKey,
  endpoint,
}: {
  address?: string;
  repoName: string;
  privateKey: string;
  endpoint: string;
}) => {
  const [fs, setFs] = useState<LightningFS | null>(null);

  useEffect(() => {
    if (!repoName || !privateKey || !endpoint || !address) return;

    const backend = new GnfdBackend(address, repoName, privateKey, endpoint);
    console.log('useFs', address, repoName, privateKey, endpoint);

    const lightningFS = new LightningFS('fs', {
      // @ts-ignore
      backend,
    });

    setFs(lightningFS);
  }, [address, endpoint, privateKey, repoName]);

  return fs;
};
