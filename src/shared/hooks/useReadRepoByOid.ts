// @ts-ignore
import FS from '@codexfield/lightning-fs';
import { useRouter } from 'next/router';
import { useReadBlob } from './useReadBlob';
import { useReadTree } from './useReadTree';

export type OidType = 'blob' | 'tree';

export const useReadRepoByOid = (fs: FS | null, latestCommitOid: string, enabled: boolean) => {
  const router = useRouter();
  const type = (router.query.type as OidType) || 'tree';
  const oid = (router.query.oid as string) || latestCommitOid;

  const { data: tree, isLoading: isReadTreeLoading } = useReadTree(
    fs,
    oid,
    type === 'tree' && enabled,
  );
  const { data: blob, isLoading: isReadBlobLoading } = useReadBlob(
    fs,
    oid,
    type === 'blob' && enabled,
  );

  return {
    tree,
    blob,
    isLoading: isReadTreeLoading || isReadBlobLoading,
  };
};
