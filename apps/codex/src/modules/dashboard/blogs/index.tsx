import { DashboardLayout } from '../layout';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { CreateBlogSpace } from './components/CreateBlogSpace';
import { useGetBucketInfo } from '@/shared/hooks/gnfd/useGetBucketInfo';
import { getBlogSpaceName } from '@/shared/utils';
import { useAccount } from 'wagmi';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { BlogList } from './components/BlogList';

export const BlogsPage = () => {
  const { address } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address);
  const bucketName = getBlogSpaceName(userInfo?.id || BigInt(0));
  const { data: bucketInfo, isLoading } = useGetBucketInfo(bucketName);

  console.log('bucketInfo', bucketName, bucketInfo);

  // if (isLoading) {
  //   return (
  //     <Center>
  //       <Spinner />
  //     </Center>
  //   );
  // }

  return (
    <DashboardLayout>
      <Box>{bucketInfo ? <BlogList /> : <CreateBlogSpace />}</Box>
    </DashboardLayout>
  );
};
