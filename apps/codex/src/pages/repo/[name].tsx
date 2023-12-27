import { RepoTree } from '@/components/pages/repo/Tree';
import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useInitRepo } from '@/hooks/useInitRepo';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

export default function Repo() {
  const router = useRouter();
  const { address } = useAccount();
  const { name, privateKey } = router.query;

  const endpoint = useGetSpUrlByBucket(name as string | undefined);
  const fs = useFs({
    address,
    endpoint: endpoint as string,
    privateKey: privateKey as string,
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
