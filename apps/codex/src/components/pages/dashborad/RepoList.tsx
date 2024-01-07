import { deleteBucket } from '@/apis/deleteBucket';
import { NewRepo } from '@/components/NewRepo';
import { queryClient } from '@/config/ReactQuery';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { GET_REPO_LIST_QUERY_KEY, useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { MoreActionIcon } from '@/icons/MoreActionIcon';
import { RepoIcon } from '@/icons/RepoIcon';
import { getRepoName } from '@/utils';
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

export const RepoList = () => {
  const { data: repoList, isLoading } = useGetRepoList();
  const { address } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address);
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
        <RepoListContainer>
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
              return (
                <Box
                  key={repo.BucketInfo.BucketName}
                  bg="#1c1c1e"
                  _hover={{
                    bg: '#282829',
                  }}
                >
                  <RepoItem>
                    <Link
                      as={NextLink}
                      href={`/repo/${repo?.BucketInfo?.BucketName}?type=tree`}
                      display="block"
                      padding="18px"
                      flex={1}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <RepoIcon mr="8px" />
                      {getRepoName(repo.BucketInfo.BucketName, userInfo.id)}
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

const RepoItem = styled(Flex)`
  color: #a276ff;
  font-size: 16px;
  font-weight: 800;
  border-bottom: 1px solid #282829;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;

  &:nth-last-of-type {
    border-bottom: none;
  }
`;
