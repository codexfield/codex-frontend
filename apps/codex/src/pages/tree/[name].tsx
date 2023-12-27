import { RepoTree } from '@/components/pages/repo/Tree';
import { useGetOffchainAuth } from '@/hooks/useGetOffchainAuth';
import { useRouter } from 'next/router';

export default function Tree() {
  const router = useRouter();
  const { name } = router.query;
  // useGetOffchainAuth();

  return (
    <div>
      {name}
      <RepoTree />
    </div>
  );
}
