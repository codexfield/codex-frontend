import { Airdrop } from '@/modules/airdrop';
import { useIsMounted } from '@/shared/hooks/useIsMounted';

export default function AirdropPage() {
  const isMounted = useIsMounted();
  return isMounted && <Airdrop />;
}
