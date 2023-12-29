import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useInitRepo } from '@/hooks/useInitRepo';
import { OidType, useReadRepoByOid } from '@/hooks/useReadRepoByOid';
import { FileIcon } from '@/icons/FileIcon';
import { FolderIcon } from '@/icons/FolderIcon';
import { RepoIcon } from '@/icons/RepoIcon';
import { Box, Flex, Spinner, Link, Center } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Repo() {
  const router = useRouter();
  const pathName = usePathname();
  const { name } = router.query;
  const type = router.query.type as OidType;
  const { data: endpoint, isLoading: getSpUrlLoading } = useGetSpUrlByBucket(
    name as string | undefined,
  );
  const fs = useFs({
    endpoint,
    repoName: name as string,
  });
  const { data: latestCommitOid = '', isLoading: initRepoLoading } = useInitRepo(
    fs,
    name as string,
  );
  const { tree, blob, isLoading: readRepoLoading } = useReadRepoByOid(fs, latestCommitOid);

  const isLoading = getSpUrlLoading || initRepoLoading || readRepoLoading;

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      {/* name is {name}
      latestCommit is {latestCommitOid} */}

      <RepoContainer w="960px">
        <RepoTitleContainer>
          <RepoName>
            <RepoIcon mr="8px" />
            {name}
          </RepoName>
        </RepoTitleContainer>
        <RepoConentList>
          {isLoading && (
            <Center minH="200px">
              <Spinner />
            </Center>
          )}
          {type === 'tree' &&
            tree &&
            tree?.tree.map((item) => {
              return (
                <RepeContentItem key={item.path + item.oid}>
                  <Link
                    as={NextLink}
                    href={`${pathName}?type=${item.type}&oid=${item.oid}`}
                    sx={{
                      display: 'block',
                      padding: '13px',
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                  >
                    <Box as="span" mr="8px" mb="2px" verticalAlign="text-top">
                      {item.type === 'tree' && <FolderIcon />}
                      {item.type === 'blob' && <FileIcon />}
                    </Box>
                    {item.path}
                  </Link>
                </RepeContentItem>
              );
            })}
        </RepoConentList>

        {type === 'blob' && <BlobContainer>{blob}</BlobContainer>}
      </RepoContainer>
      <Side>
        <UserInfo>username</UserInfo>
      </Side>
    </Flex>
  );
}

const RepoContainer = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
`;
const RepoTitleContainer = styled(Box)`
  background: #282829;
  box-shadow: 0px 10px 10px 0px rgba(18, 18, 20, 0.25);
  height: 70px;
  line-height: 70px;
  padding: 0 15px;
`;
const RepoName = styled(Box)`
  font-size: 20px;
  color: #a276ff;
  font-weight: 800;
`;
const RepoConentList = styled(Box)`
  border: 1px solid #282829;
  background: #1c1c1e;
`;
const RepeContentItem = styled(Box)`
  color: #ffffff;
  border-bottom: 1px solid #282829;
  &:hover {
    background: #282829;
  }
  &:nth-last-child {
    border-bottom: none;
  }
`;
const Side = styled(Box)`
  flex: 1;
`;
const UserInfo = styled(Box)`
  background: #1c1c1e;
`;

const BlobContainer = styled(Box)``;
