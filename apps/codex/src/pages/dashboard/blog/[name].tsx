import DEFAULT_COVER from '@/images/default_cover.jpeg';
import { useGetBlogContent } from '@/modules/dashboard/hooks/useGetBlogContent';
import { DashboardLayout } from '@/modules/dashboard/layout';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetSpUrlByBucket } from '@/shared/hooks/gnfd/useGetSpUrlByBucket';
import { getBlogSpaceName } from '@/shared/utils';
import { Box, Center, Image, Spinner, Text } from '@chakra-ui/react';
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

  const bucketName = getBlogSpaceName(userInfo?.id || BigInt(0));
  const { data: endpoint } = useGetSpUrlByBucket(bucketName);

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <DashboardLayout>
      <Box w="960px" h="400px">
        <Image
          w="100%"
          h="100%"
          objectFit={'cover'}
          src={`${endpoint}/view/${bucketName}/cover/${name}`}
          fallbackSrc={DEFAULT_COVER.src}
        />
      </Box>

      <Text as="h1" fontSize="40px" my="30px">
        {name}
      </Text>
      <Box my="30px">{content && <Box dangerouslySetInnerHTML={{ __html: content }} />}</Box>
    </DashboardLayout>
  );
}
