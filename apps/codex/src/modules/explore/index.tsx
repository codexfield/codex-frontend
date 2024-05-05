import styled from '@emotion/styled';
import NextLink from 'next/link';
import {
  Badge,
  Box,
  Center,
  Flex,
  Link,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useHackathon } from './hooks/useGetHackathon';
import { useAccount } from 'wagmi';
import { DYMTimeAsObject, getRepoName } from '@/shared/utils';
import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { useRouter } from 'next/router';
import { RepoIcon } from '@/shared/icons/RepoIcon';
import { useState } from 'react';
import { VisibilityBadge } from '@/shared/components/VisibilityBadge';

export const ExplorePage: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();

  const [page, setPage] = useState(0);
  const { data: hackathonList, isLoading } = useHackathon({
    address,
    page,
  });

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  console.log('hackathonList', hackathonList);
  return (
    <Box w="960px" ml="auto" mr="auto">
      <Tabs variant="unstyled" position="relative" my="50px">
        <TabList>
          <Tab>
            <Text fontSize="24px" fontWeight="700">
              BNB Hackathon Season1
            </Text>
          </Tab>
        </TabList>

        <TabIndicator mt="-1.5px" height="2px" bg="#d9d9d9" borderRadius="1px" />

        <TabPanels>
          <TabPanel py="30px">
            <Box>
              {hackathonList &&
                hackathonList.result.repoInfoList.map((repo) => {
                  const createdAt = DYMTimeAsObject(Number(repo.created_at) / 1000);

                  // const isRepoPublic =
                  // repo.BucketInfo.Visibility === VisibilityType.VISIBILITY_TYPE_PUBLIC_READ;

                  return (
                    <Box key={repo.codex_bucket_id} mb="20px">
                      <RepoDate>
                        <Box as="span" color="#FFF" mr="6px">
                          {createdAt.m} {createdAt.d}
                        </Box>
                        <Box as="span" color="#5F5F5F">
                          {createdAt.y}
                        </Box>
                      </RepoDate>

                      <Flex alignItems="center" gap="16px">
                        <RepoItem
                          flex="1"
                          _hover={{
                            bg: '#282829',
                          }}
                        >
                          <Link
                            as={NextLink}
                            // href={isOwner ? `/repo/${repo?.BucketInfo?.BucketName}?type=tree` : '#'}
                            href="#"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/repo/${repo?.repo_name}?type=tree`);
                            }}
                            // pointerEvents={isOwner || isRepoPublic ? 'auto' : 'none'}
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

                            <Stack>
                              <Flex alignItems="center" gap="10px">
                                <Box>{repo.repo_name}</Box>
                                <VisibilityBadge
                                  visibility={
                                    repo.repo_type === 0
                                      ? VisibilityType.VISIBILITY_TYPE_PRIVATE
                                      : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ
                                  }
                                />
                              </Flex>

                              <Box color="#DDD" fontSize="16px">
                                {repo.description}
                              </Box>
                            </Stack>
                          </Link>
                        </RepoItem>
                      </Flex>

                      <Flex>
                        {repo.tag_list?.map((tag) => {
                          return (
                            <Badge
                              variant="solid"
                              bg="#1E1E1E"
                              color="#5F5F5F"
                              fontSize="14px"
                              h="28px"
                              lineHeight="28px"
                              borderRadius="14px"
                              px="8px"
                            >
                              {tag}
                            </Badge>
                          );
                        })}
                      </Flex>
                    </Box>
                  );
                })}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

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
