import { CodexTable } from '@/components/ui/CodexTable';
import { GreenfieldClient } from '@/config/client';
import { useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { BucketMetaWithVGF } from 'node_modules/@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common';
import { useCallback } from 'react';

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
  const router = useRouter();
  const { data: repoList, isLoading } = useGetRepoList();

  const handleClickTr = useCallback(
    async (originalData?: BucketMetaWithVGF) => {
      // console.log(originalData)
      router.push({
        pathname: `/repo/${originalData?.BucketInfo?.BucketName}`,
        query: {
          type: 'tree',
        },
      });
    },
    [router],
  );

  return (
    <CodexTable loading={isLoading} columns={columns} data={repoList} clickTr={handleClickTr} />
  );
};
