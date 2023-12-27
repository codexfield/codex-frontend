import { RepoTree } from '@/components/pages/repo/Tree';
import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useGetOffchainAuth } from '@/hooks/useGetOffchainAuth';
import { useInitRepo } from '@/hooks/useInitRepo';
import { useRouter } from 'next/router';

export default function Repo() {
  const router = useRouter();
  const { name } = router.query;

  useGetOffchainAuth();

  const endpoint = useGetSpUrlByBucket(name as string | undefined);
  console.log('endpoint', endpoint);
  const fs = useFs({
    endpoint,
    repoName: name as string,
  });
  const latestCommit = useInitRepo(fs);

  // console.log('router.query', router.query);

  return (
    <>
      name is {name}
      latestCommit is {latestCommit}
      <RepoTree oid={latestCommit} />
    </>
  );
}
