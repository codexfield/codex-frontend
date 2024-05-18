import DEFAULT_COVER from '@/images/default_cover.jpeg';
import { Box, Center, Image, Spinner } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useGetBlogList } from '../../hooks/useGetBlogList';
import { DYMTimeAsObject, getBlogSpaceName } from '@/shared/utils';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { EmptyBlog } from './EmptyBlog';
import { useGetSpUrlByBucket } from '@/shared/hooks/gnfd/useGetSpUrlByBucket';
import { useRouter } from 'next/router';

// interface IProps {
//   address: `0x${string}`;
// }

export const BlogList: React.FC = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);
  const {
    data: blogList,
    isLoading,
    refetch: refetchBlogList,
  } = useGetBlogList({
    bucketName: getBlogSpaceName(userInfo?.id || BigInt(0)),
  });

  console.log('blogList', blogList);

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
    <Box>
      {blogList?.length === 0 ? (
        <EmptyBlog />
      ) : (
        <Box>
          {blogList?.map((blog) => {
            const createdAt = DYMTimeAsObject(blog.ObjectInfo.CreateAt);

            return (
              <Box
                key={blog.ObjectInfo.Id}
                py="40px"
                cursor="pointer"
                onClick={() => {
                  router.push(`/dashboard/blog/${blog.ObjectInfo.ObjectName}`);
                }}
              >
                <Box fontSize="24px" mb="8px" fontWeight="700">
                  <Box as="span" color="#FFF" mr="6px">
                    {createdAt.m} {createdAt.d}
                  </Box>
                  <Box as="span" color="#5F5F5F">
                    {createdAt.y}
                  </Box>
                </Box>
                <Box bg="#1C1C1E" borderRadius="8px" overflow="hidden">
                  <Box w="960px" h="400px">
                    <Image
                      w="100%"
                      h="100%"
                      objectFit={'cover'}
                      src={`${endpoint}/view/${bucketName}/cover/${blog.ObjectInfo.ObjectName}`}
                      fallbackSrc={DEFAULT_COVER.src}
                    />
                  </Box>
                  <Box fontWeight="500" fontSize="28px" p="30px">
                    {blog.ObjectInfo.ObjectName}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
