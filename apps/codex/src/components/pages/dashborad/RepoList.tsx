import { deleteBucket } from '@/apis/deleteBucket';
import { NewRepo } from '@/components/NewRepo';
import { VisibilityBadge } from '@/components/ui/VisibilityBadge';
import { queryClient } from '@/config/ReactQuery';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { GET_REPO_LIST_QUERY_KEY, useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { CanlanderIcon } from '@/icons/CanlanderIcon';
import { MoreActionIcon } from '@/icons/MoreActionIcon';
import { RepoIcon } from '@/icons/RepoIcon';
import { DYMTimeAsObject, getRepoName } from '@/utils';
import {
  Box,
  Center,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import dayjs from 'dayjs';

export const RepoList = () => {
  const { data: repoList, isLoading } = useGetRepoList();
  const { address } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address);

  console.log('repoList', repoList);
  // const handleDeleteRepo = async (bucketName: string) => {
  //   if (!address) return;

  //   // console.log('handleDeleteRepo', bucketName);
  //   const res = await deleteBucket(bucketName, address);
  //   // console.log(res);
  //   const x = await queryClient.invalidateQueries({
  //     queryKey: [GET_REPO_LIST_QUERY_KEY, address],
  //   });
  //   // console.log('x', x);
  // };

  return (
    <Box>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <RepoListContainer background="linear-gradient(to right, transparent 14px, #5f5f5f 15px, transparent 1px);">
          {repoList?.length === 0 && (
            <Center p="40px">
              <VStack gap="20px">
                <Box as="h2" fontWeight="800" fontSize="20px">
                  Create Your First Repo
                </Box>
                <NewRepo />
              </VStack>
            </Center>
          )}
          {repoList &&
            userInfo &&
            repoList?.map((repo) => {
              const createdAt = DYMTimeAsObject(repo.BucketInfo.CreateAt);
              return (
                <Box key={repo.BucketInfo.BucketName} mb="20px">
                  <RepoDate>
                    <Box as="span" color="#FFF" mr="6px">
                      {createdAt.m} {createdAt.d}
                    </Box>
                    <Box as="span" color="#5F5F5F">
                      {createdAt.y}
                    </Box>
                  </RepoDate>
                  <Flex alignItems="center" gap="16px">
                    <Box>
                      <CanlanderIcon />
                    </Box>
                    <RepoItem
                      flex="1"
                      _hover={{
                        bg: '#282829',
                      }}
                    >
                      <Link
                        as={NextLink}
                        href={`/repo/${repo?.BucketInfo?.BucketName}?type=tree`}
                        display="flex"
                        padding="18px"
                        alignItems="center"
                        gap="6px"
                        flex={1}
                        _hover={{
                          textDecoration: 'none',
                        }}
                      >
                        <RepoIcon mr="8px" />
                        {getRepoName(repo.BucketInfo.BucketName, userInfo.id)}
                        <VisibilityBadge visibility={repo.BucketInfo?.Visibility || -1} />
                      </Link>
                      {/* <Menu>
                      <MenuButton as={IconButton} icon={<MoreActionIcon />} variant="unstyled" />
                      <MenuList bg="#1C1C1E">
                        <MenuItem
                          color="#CA1414"
                          fontSize="14px"
                          onClick={() => {
                            // console.log('e', e);
                            handleDeleteRepo(repo?.BucketInfo?.BucketName);
                          }}
                        >
                          Delete Repo
                        </MenuItem>
                      </MenuList>
                    </Menu> */}
                    </RepoItem>
                  </Flex>
                </Box>
              );
            })}
        </RepoListContainer>
      )}
    </Box>
  );
};

const RepoListContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
`;

const RepoDate = styled(Box)`
  background-color: #000;
  font-size: 24px;
  font-weight: 600;
`;

const RepoItem = styled(Flex)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #1c1c1e;
  color: #a276ff;
  font-size: 16px;
  font-weight: 800;
  border: 1px solid #282829;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
  border-radius: 8px;
`;
