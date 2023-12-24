import { RepoTree } from '@/components/pages/repo/Tree';
import { useRouter } from 'next/router';

export default function Tree() {
  const router = useRouter();
  const { name, privateKey, endpoint } = router.query;

  return (
    <div>
      {name}:
      <RepoTree />
    </div>
  );
}
