import DEFAULT_COVER from '@/images/default_cover.jpeg';
import { useGetBlogContent } from '@/modules/dashboard/hooks/useGetBlogContent';
import { DashboardLayout } from '@/modules/dashboard/layout';
import { useGetSpUrlByBucket } from '@/shared/hooks/gnfd/useGetSpUrlByBucket';
import { Box, Center, Image, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Blog() {
  const router = useRouter();

  // b: bucketName, v: visibility
  const { name, b, v } = router.query;

  const { data: endpoint } = useGetSpUrlByBucket(b as string);
  const { data: content, isLoading } = useGetBlogContent({
    bucketName: b as string,
    objectName: name as string,
    endpoint,
    visibility: v as string,
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
      <Box w="960px" h="400px">
        <Image
          w="100%"
          h="100%"
          objectFit={'cover'}
          src={`${endpoint}/view/${b}/cover/${name}`}
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
