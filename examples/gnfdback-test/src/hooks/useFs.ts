import GnfdBackend from "@/utils/gnfdBackend";
import LightningFS from "@isomorphic-git/lightning-fs";
import { useEffect, useRef, useState } from "react";

export const useFs = (repoName: string, privateKey: string, endpoint: string) => {
  // let ref = useRef<LightningFS | null>(null);

  // useEffect(() => {
  //   if (!repoName || !privateKey) return;
    
  //   const backend = new GnfdBackend(repoName, privateKey);
  //   console.log('in useFs', repoName, privateKey);

  //   const fs = new LightningFS("fs", {
  //     // @ts-ignore
  //     backend,
  //   });

  //   ref.current = fs

  //   console.log('in useFs fs', fs)
  // }, [privateKey, repoName])

  // return ref.current;

  let [fs, setFs] = useState<LightningFS | null>(null);

  useEffect(() => {
    if (!repoName || !privateKey) return;

    const backend = new GnfdBackend(repoName, privateKey, endpoint);
    console.log('useFs', repoName, privateKey);

    const lightningFS = new LightningFS("fs", {
      // @ts-ignore
      backend,
    });

    setFs(lightningFS);
  }, [privateKey, repoName])

  return fs;
}