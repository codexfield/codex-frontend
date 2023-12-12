import * as React from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import styled from '@emotion/styled';

export type DataTableProps<Data extends object> = {
  data?: Data[];
  columns: ColumnDef<Data, any>[];
  loading: boolean;
};

export const CodexTable = <Data extends object>({
  data = [],
  columns,
  loading,
}: DataTableProps<Data>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (data?.length == 0 && !loading) {
    return (
      <Center>
        <Box fontSize="30px">No Data</Box>
      </Center>
    );
  }

  return (
    <TableContainer minHeight={loading ? 200 : 0} position="relative">
      {loading && (
        <LoadingWrapper>
          <Center>
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.800"
              color="#A276FF"
              size="xl"
            />
          </Center>
        </LoadingWrapper>
      )}
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const LoadingWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    height: 100%;
  }
`;
