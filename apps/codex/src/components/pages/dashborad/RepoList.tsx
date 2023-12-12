import { CodexTable } from '@/components/ui/CodexTable';
import { GreenfieldClient } from '@/config/client';
import { useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

type Repo = NonNullable<Awaited<ReturnType<typeof GreenfieldClient.bucket.listBuckets>>['body']>[0];

const columnHelper = createColumnHelper<Repo>();
const columns = [
  columnHelper.accessor('BucketInfo.BucketName', {
    header() {
      return '';
    },
    cell: (info) => {
      return <Box>{info.getValue()}</Box>;
    },
  }),
];

export const RepoList = () => {
  const { data: repoList, isLoading } = useGetRepoList();

  return <CodexTable loading={isLoading} columns={columns} data={repoList} />;
};
