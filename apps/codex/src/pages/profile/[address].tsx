import { Profile } from '@/modules/profile';
import { useRouter } from 'next/router';
import { isAddress } from 'viem';
import { NotFound } from '../../modules/profile/NotFound';

export default function ProfilePage() {
  const router = useRouter();

  const profileAddress = router.query.address as `0x${string}`;

  if (!isAddress(profileAddress)) {
    return <NotFound searchKw={profileAddress} />;
  }

  return <Profile address={profileAddress} />;
}
