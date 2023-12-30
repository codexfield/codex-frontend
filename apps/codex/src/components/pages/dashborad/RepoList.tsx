import { useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { RepoIcon } from '@/icons/RepoIcon';
import { Box, Center, Flex, Link, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { Side } from './Side';

export const RepoList = () => {
  const { data: repoList, isLoading } = useGetRepoList();

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Box w="960px">
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <RepoListContainer>
            {repoList &&
              repoList?.map((repo) => {
                return (
                  <Link
                    as={NextLink}
                    href={`/repo/${repo?.BucketInfo?.BucketName}?type=tree`}
                    key={repo.BucketInfo.BucketName}
                    bg="#1c1c1e"
                    sx={{
                      display: 'block',
                      '&:hover': {
                        textDecoration: 'none',
                        bg: '#282829',
                      },
                    }}
                  >
                    <RepoItem>
                      <RepoIcon mr="8px" />
                      {repo.BucketInfo.BucketName}
                    </RepoItem>
                  </Link>
                );
              })}
          </RepoListContainer>
        )}
      </Box>

      <Side />
    </Flex>
  );
};

const RepoListContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
`;

const RepoItem = styled(Box)`
  padding: 18px;
  color: #a276ff;
  font-size: 16px;
  font-weight: 800;
  border-bottom: 1px solid #282829;

  &:last-child {
    border-bottom: none;
  }
`;
