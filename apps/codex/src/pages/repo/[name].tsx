import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useInitRepo } from '@/hooks/useInitRepo';
import { OidType, useReadRepoByOid } from '@/hooks/useReadRepoByOid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Repo() {
  const router = useRouter();
  const pathName = usePathname();
  const { name } = router.query;
  const type = router.query.type as OidType;
  const { data: endpoint } = useGetSpUrlByBucket(name as string | undefined);
  const fs = useFs({
    endpoint,
    repoName: name as string,
  });
  const { data: latestCommitOid = '' } = useInitRepo(fs, name as string);
  const { tree, blob, isLoading } = useReadRepoByOid(fs, latestCommitOid);

  return (
    <>
      name is {name}
      latestCommit is {latestCommitOid}
      {type === 'tree' &&
        tree &&
        tree?.tree.map((item) => {
          return (
            <li key={item.path + item.oid}>
              <Link
                style={{ color: '#f00' }}
                href={`${pathName}?type=${item.type}&oid=${item.oid}`}
              >
                {item.path} (type: {item.type}) oid: {item.oid}
              </Link>
            </li>
          );
        })}
      {type === 'blob' && <>blob is {blob}</>}
    </>
  );
}
