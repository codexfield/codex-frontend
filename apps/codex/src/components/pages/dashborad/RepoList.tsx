import { CodexTable } from '@/components/ui/CodexTable';
import { GreenfieldClient } from '@/config/client';
import { useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { useSelectSp } from '@/hooks/gnfd/useSelectSp';
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
  // const { data: spInfo } = useSelectSp();

  const handleClickTr = useCallback(
    (originalData?: BucketMetaWithVGF) => {
      console.log(originalData);
      router.push({
        pathname: `/repo/${originalData?.BucketInfo?.BucketName}`,
        query: {
          privateKey: '0x6547492644d0136f76ef65e3bd04a77d079ed38028f747700c6c6063564d7032',
          // endpoint: spInfo?.endpoint,
          // oid: originalData?.BucketInfo?.Oid,
        },
      });
    },
    [router],
  );

  return (
    <CodexTable loading={isLoading} columns={columns} data={repoList} clickTr={handleClickTr} />
  );
};
