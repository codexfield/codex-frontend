import { ClonePopver } from '@/modules/repo/components/ClonePopover';
import { EmptyRepo } from '@/modules/repo/components/EmptyRepo';
import { VisibilityBadge } from '@/shared/components/VisibilityBadge';
import { FileIcon } from '@/shared/icons/FileIcon';
import { FolderIcon } from '@/shared/icons/FolderIcon';
import { RepoIcon } from '@/shared/icons/RepoIcon';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Link, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { SharePopver } from './ShareRepo';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { OidType, useReadRepoByOid } from '@/shared/hooks/useReadRepoByOid';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useFs } from '@/shared/hooks/useFs';
import { useGetSpUrlByBucket } from '@/shared/hooks/gnfd/useGetSpUrlByBucket';
import { useAccount } from 'wagmi';
import { useInitRepo } from '@/shared/hooks/useInitRepo';
import { getRepoName } from '@/shared/utils';
import { useGetBucketInfo } from '@/shared/hooks/gnfd/useGetBucketInfo';

export const RepoContent = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { address } = useAccount();

  const { name } = router.query;
  const type = router.query.type as OidType;
  const { data: endpoint, isLoading: getSpUrlLoading } = useGetSpUrlByBucket(
    name as string | undefined,
  );
  const { data: userInfo } = useGetAccountDetails(address);
  const fs = useFs({
    endpoint,
    repoName: name as string,
  });
  const { data: latestCommitOid = '', isLoading: initRepoLoading } = useInitRepo(
    fs,
    name as string,
  );
  const { data: bucketInfo } = useGetBucketInfo(name as string);

  const { tree, blob, isLoading: readRepoLoading } = useReadRepoByOid(fs, latestCommitOid);

  const isLoading = getSpUrlLoading || initRepoLoading || readRepoLoading;
  const repoName = userInfo && name && getRepoName(name as string, userInfo.id);

  return (
    <RepoContainer w="960px">
      <Button variant="unstyled" fontSize="20px" onClick={router.back}>
        <ChevronLeftIcon boxSize="22px" verticalAlign="-6px" /> Back
      </Button>
      <RepoTitleContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <RepoName>
            <RepoIcon />
            <Box color="#a276ff">{repoName}</Box>
            <VisibilityBadge visibility={bucketInfo?.visibility || -1} />
          </RepoName>

          <Flex alignItems="center">
            {bucketInfo?.visibility === 1 && (
              <SharePopver
                url={`${window.location.origin}/repo/${bucketInfo?.bucketName}?type=tree`}
              />
            )}
            <ClonePopver buckname={name as string} />
          </Flex>
        </Flex>
      </RepoTitleContainer>
      <RepoConentList>
        {isLoading && (
          <Center minH="200px">
            <Spinner />
          </Center>
        )}
        {type === 'tree' && !tree && !isLoading && <EmptyRepo name={name as string} />}
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

      {type === 'blob' && (
        <BlobContainer>
          <Markdown rehypePlugins={[rehypeHighlight]}>{blob}</Markdown>
          {/* {blob} */}
        </BlobContainer>
      )}
    </RepoContainer>
  );
};

const RepoContainer = styled(Box)`
  overflow: hidden;
`;
const RepoTitleContainer = styled(Box)`
  background: #282829;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 10px 10px 0px rgba(18, 18, 20, 0.25);
  /* height: 70px;
  line-height: 70px; */
  padding: 0 15px;
`;
const RepoName = styled(Flex)`
  gap: 8px;
  height: 70px;
  font-size: 20px;
  font-weight: 800;
  align-items: center;
`;

const RepoConentList = styled(Box)`
  border: 1px solid #282829;
  background: #1c1c1e;
  border-radius: 0 0 8px 8px;
`;
const RepeContentItem = styled(Box)`
  color: #ffffff;
  border-bottom: 1px solid #282829;
  &:hover {
    background: #282829;
  }
  &:nth-last-of-type {
    border-bottom: none;
  }
`;

const BlobContainer = styled(Box)`
  background-color: #1c1c1e;
  padding: 20px;

  h1,
  h2 {
    font-weight: 500;
    font-size: 28px;
  }
  h3,
  h4,
  h5,
  h6 {
    font-size: 26px;
  }
  p {
    font-size: 22px;
  }
`;
