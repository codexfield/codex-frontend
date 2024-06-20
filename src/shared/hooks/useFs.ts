import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import GnfdBackend from '@/config/GnfdBackend';
// @ts-ignore
import LightningFS from '@codexfield/lightning-fs';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export const useFs = ({ repoName, endpoint }: { endpoint?: string; repoName: string }) => {
  const [fs, setFs] = useState<LightningFS | null>(null);
  const offchainData = useAtomValue(offchainDataAtom);

  useEffect(() => {
    if (!offchainData) return;
    const { address, seed } = offchainData;
    if (!repoName || !seed || !address || !endpoint) return;

    const backend = new GnfdBackend(repoName, seed, endpoint, address);
    // console.log('useFs', repoName, seed, endpoint);

    const lightningFS = new LightningFS('fs', {
      // @ts-ignore
      backend,
    });

    setFs(lightningFS);
  }, [endpoint, offchainData, repoName]);

  return fs;
};
