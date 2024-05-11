import { DashboardLayout } from '../layout';
import { Box } from '@chakra-ui/react';
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
  const { data: bucketInfo } = useGetBucketInfo(bucketName);

  return (
    <DashboardLayout>
      <Box>{bucketInfo ? <BlogList /> : <CreateBlogSpace />}</Box>
    </DashboardLayout>
  );
};
