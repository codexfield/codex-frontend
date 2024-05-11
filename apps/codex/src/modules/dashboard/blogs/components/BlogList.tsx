import { useGetRepoList } from '@/shared/hooks/gnfd/useGetRepoList';
import { Box, Center } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useGetBlogList } from '../../hooks/useGetBlogList';
import { getBlogSpaceName } from '@/shared/utils';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { EmptyBlog } from './EmptyBlog';

// interface IProps {
//   address: `0x${string}`;
// }

export const BlogList: React.FC = () => {
  const { address } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);
  const {
    data: blogList,
    isLoading,
    refetch: refetchBlogList,
  } = useGetBlogList({
    bucketName: getBlogSpaceName(userInfo?.id || BigInt(0)),
  });

  console.log('blogList', blogList);

  return <Box>{blogList?.length === 0 ? <EmptyBlog /> : <Box>11</Box>}</Box>;
};
