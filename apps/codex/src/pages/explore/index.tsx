import { ExplorePage } from '@/modules/explore';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { Box } from '@chakra-ui/react';

export default function Explore() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return <ExplorePage />;
}
