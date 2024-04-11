import { Profile } from '@/modules/profile';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const router = useRouter();

  const profileAddress = router.query.address as `0x${string}`;

  return <Profile address={profileAddress} />;
}
