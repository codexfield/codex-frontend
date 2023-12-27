import { offchainDataAtom } from '@/atoms/offchainDataAtom';
import GnfdBackend from '@/config/GnfdBackend';
import LightningFS from '@isomorphic-git/lightning-fs';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

export const useFs = ({
  repoName,
  // seed,
  endpoint,
}: {
  endpoint: string;
  repoName: string;
  // seed: string;
}) => {
  const [fs, setFs] = useState<LightningFS | null>(null);
  const offchainData = useAtomValue(offchainDataAtom);

  useEffect(() => {
    if (!offchainData) return;
    const { address, seed } = offchainData;
    if (!repoName || !seed || !address) return;

    const backend = new GnfdBackend(repoName, seed, endpoint, address);
    console.log('useFs', repoName, seed, endpoint);

    const lightningFS = new LightningFS('fs', {
      // @ts-ignore
      backend,
    });

    setFs(lightningFS);
  }, [endpoint, offchainData, repoName]);

  return fs;
};
