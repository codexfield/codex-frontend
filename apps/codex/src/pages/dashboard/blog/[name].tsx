import { useGetBlogContent } from '@/modules/dashboard/hooks/useGetBlogContent';
import { DashboardLayout } from '@/modules/dashboard/layout';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { getBlogSpaceName } from '@/shared/utils';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

export default function Blog() {
  const router = useRouter();
  const { address } = useAccount();

  const { name } = router.query;

  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);

  const { data: content, isLoading } = useGetBlogContent({
    userInfo,
    objectName: name as string,
  });

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <DashboardLayout>
      {content && <Box dangerouslySetInnerHTML={{ __html: content }} />}
    </DashboardLayout>
  );
}
