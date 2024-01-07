import { ClonePopver } from '@/components/ClonePopover';
import { Side } from '@/components/pages/dashborad/Side';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { useGetBucketInfo } from '@/hooks/gnfd/useGetBucketInfo';
import { useGetSpUrlByBucket } from '@/hooks/gnfd/useGetSpUrlByBucket';
import { useFs } from '@/hooks/useFs';
import { useInitRepo } from '@/hooks/useInitRepo';
import { OidType, useReadRepoByOid } from '@/hooks/useReadRepoByOid';
import { FileIcon } from '@/icons/FileIcon';
import { FolderIcon } from '@/icons/FolderIcon';
import { RepoIcon } from '@/icons/RepoIcon';
import { getCloneUrl, getRepoName, getVisibility } from '@/utils';

import { Badge, Box, Center, Flex, Link, Spinner, useClipboard } from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { useAccount } from 'wagmi';

export default function Repo() {
  const router = useRouter();
  const pathName = usePathname();
  const { name } = router.query;
  const type = router.query.type as OidType;
  const { data: endpoint, isLoading: getSpUrlLoading } = useGetSpUrlByBucket(
    name as string | undefined,
  );
  const { address } = useAccount();
  const { data: bucketInfo } = useGetBucketInfo(name as string);
  const { data: userInfo } = useGetAccountDetails(address);
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
  const repoName = userInfo && name && getRepoName(name as string, userInfo[0]);

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      {/* name is {name}
      latestCommit is {latestCommitOid} */}

      <RepoContainer w="960px">
        <RepoTitleContainer>
          <Flex justifyContent="space-between" alignItems="center">
            <RepoName>
              <RepoIcon />
              <Box color="#a276ff">{repoName}</Box>
              <Badge
                mt="3px"
                padding="3px 10px 2px 11px"
                fontSize="12px"
                variant="outline"
                textTransform="none"
                sx={{
                  borderRadius: '10px',
                  color: '#13E735',
                  border: '1px solid #13E735',
                }}
              >
                {getVisibility(bucketInfo?.visibility || -1)}
              </Badge>
            </RepoName>
            <ClonePopver buckname={name as string} />
          </Flex>
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
          {type === 'tree' && !tree && !isLoading && (
            <Box p="30px">
              <Box as="h3" fontSize="24px" fontWeight="800">
                Push to Greenfield Repo
              </Box>
              <Box
                bg="#232323"
                color="#efefef"
                fontSize="16px"
                p="10px"
                borderRadius="8px"
                mt="10px"
              >
                <Box as="p" lineHeight="1.5">
                  {`gitd remote add origin gnfd://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443/${repoName}`}
                </Box>
                <Box as="p" lineHeight="1.5">{`echo "Hello CodexField" >> README.md`}</Box>
                <Box as="p" lineHeight="1.5">
                  gitd add README.md
                </Box>
                <Box as="p" lineHeight="1.5">{`gitd commit -m "add README.md"`}</Box>
                <Box as="p" lineHeight="1.5">
                  {`gitd push origin main -f  // when push firstly, please use force push. will fix later.`}
                </Box>
              </Box>
            </Box>
          )}
        </RepoConentList>

        {type === 'blob' && (
          <BlobContainer>
            <Markdown rehypePlugins={[rehypeHighlight]}>{blob}</Markdown>
            {/* {blob} */}
          </BlobContainer>
        )}
      </RepoContainer>

      <Side />
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
