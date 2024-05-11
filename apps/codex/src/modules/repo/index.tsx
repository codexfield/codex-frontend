import Loading from '@/images/loading.svg';
import { ClonePopver } from '@/modules/repo/components/ClonePopover';
import { EmptyRepo } from '@/modules/repo/components/EmptyRepo';
import { Side } from '@/shared/components/Side';
import { VisibilityBadge } from '@/shared/components/VisibilityBadge';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetBucketInfo } from '@/shared/hooks/gnfd/useGetBucketInfo';
import { useGetSpUrlByBucket } from '@/shared/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/shared/hooks/useFs';
import { useInitRepo } from '@/shared/hooks/useInitRepo';
import { OidType, useReadRepoByOid } from '@/shared/hooks/useReadRepoByOid';
import { ErrorIcon } from '@/shared/icons/ErrorIcon';
import { FileIcon } from '@/shared/icons/FileIcon';
import { FolderIcon } from '@/shared/icons/FolderIcon';
import { RepoIcon } from '@/shared/icons/RepoIcon';
import { getRepoName } from '@/shared/utils';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Link, Spinner, VStack } from '@chakra-ui/react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { useAccount } from 'wagmi';
import { SharePopver } from './components/ShareRepo';
import { useCheckRepo } from './hooks/useCheckRepo';

const spin = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export default function Repo() {
  const router = useRouter();
  const pathName = usePathname();
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

  const { data: checkRepoRes, refetch } = useCheckRepo(bucketInfo?.id);

  console.log('checkRepoRes', checkRepoRes, checkRepoRes?.result.status);

  // if (checkRepoRes?.result.status === 11) {
  //   // failure
  //   return (
  //     <Center minH="200px">
  //       <Spinner />
  //     </Center>
  //   );
  // } else if (checkRepoRes?.result.status === 1) {
  //   // init
  // }

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
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

        {checkRepoRes?.result.status === 11 && (
          <Center minH="200px" w="960px" bg="#1c1c1e">
            <VStack>
              {/* failure */}
              <ErrorIcon />
              <Box color="#F44336">Failed</Box>
              <Button
                bg="#048118"
                fontSize="16px"
                onClick={() => {
                  refetch();
                }}
              >
                Retry
              </Button>
            </VStack>
          </Center>
        )}

        {checkRepoRes?.result.status === 1 && (
          <Center minH="200px" w="960px" bg="#1c1c1e">
            {/* init */}
            <Box
              css={css`
                animation: ${spin} 2s ease infinite;
              `}
            >
              <img src={Loading.src} title="loading" />
            </Box>
          </Center>
        )}

        {checkRepoRes?.result.status === 10 && (
          <>
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
          </>
        )}
      </RepoContainer>

      {/* {checkRepoRes?.result.status === 10 && <></>} */}

      {bucketInfo?.owner && <Side address={bucketInfo.owner as `0x${string}`} />}
    </Flex>
  );
}

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
