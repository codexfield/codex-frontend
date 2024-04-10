import InviteImage from '@/images/invite.png';

import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { GreenButton, PurpleButton } from './components/Buttons';
import { CopyButton } from './components/Buttons/CopyButton';
import { User } from './components/User';
import { useConnectTwitter } from './hooks/useConnectTwitter';
import { useQueryUser } from './hooks/useQueryUser';
import { useVerify } from './hooks/useVerify';
import { postTweet } from './utils';
import { RankList } from './components/RankList';

export const Airdrop = () => {
  const { address } = useAccount();
  const router = useRouter();

  if (!address) {
    // redirect to metamask
  }

  const { isLoading, data: userInfo } = useQueryUser(address);

  console.log('userInfo', userInfo);

  const { mutateAsync: connect } = useConnectTwitter({
    address: address,
    referenceCode: '',
  });

  const { mutateAsync: verify } = useVerify();

  const code = !isLoading && userInfo && userInfo.result?.user.invite_code;
  const inviteUrl = window.location.href + '/invite?code=' + code;
  const taskList = userInfo?.result?.taskList;

  return (
    <Flex gap="30px" w="1360px" ml="auto" mr="auto" justifyContent="space-between" p="30px">
      <Stack w="730px">
        <Box>
          <Title>Mandatory Tasks</Title>

          <Stack gap="15px" w="100%">
            <Task>
              <Status done={userInfo?.code == 0} />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Connect Twitter account</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton
                    isDisabled={userInfo?.code == 0}
                    onClick={async () => {
                      connect();
                    }}
                  >
                    Connect
                  </PurpleButton>
                </Buttons>
              </TaskContent>
            </Task>
            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Follow @CodexField on Twitter</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton
                    onClick={() => {
                      window.open('https://twitter.com/codexfield');
                    }}
                  >
                    Follow
                  </PurpleButton>
                  <GreenButton
                    // isLoading={isPending}
                    onClick={async () => {
                      await verify({
                        taskName: 'FollowTwitter',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
            <Task>
              <Status
                done={taskList?.find((x) => x.name === 'PostCodexFieldTwitter')?.status === 1}
              />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Post CodexField Airdrop Campaign tweet</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton
                    onClick={() => {
                      const url = postTweet();
                      window.open(url, '_blank');
                    }}
                  >
                    Post
                  </PurpleButton>
                  <GreenButton
                    // isLoading={isPending}
                    onClick={async () => {
                      await verify({
                        taskName: 'PostCodexFieldTwitter',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
            <Task>
              <Status done={taskList?.find((x) => x.name === 'JoinTelegram')?.status === 1} />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Join CodexField Telegrame group</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Join</PurpleButton>
                  <GreenButton
                    // isLoading={isPending}
                    onClick={async () => {
                      await verify({
                        taskName: 'JoinTelegram',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
          </Stack>
        </Box>

        <Box>
          <Title>Optional Tasks</Title>
          <Stack gap="15px">
            <Task>
              <Status done={taskList?.find((x) => x.name === 'PostTwitterWithTag')?.status === 1} />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Post a tweet with @CodexField tag(Daily)</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton
                    onClick={() => {
                      const url = postTweet();
                      window.open(url, '_blank');
                    }}
                  >
                    Post
                  </PurpleButton>
                  <GreenButton
                    onClick={async () => {
                      await verify({
                        taskName: 'PostTwitterWithTag',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>

            <Task>
              <Status done={taskList?.find((x) => x.name === 'RetweetLatestTweet')?.status === 1} />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Retweet, like and comment on the latest tweet</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton
                    onClick={() => {
                      const url = postTweet();
                      window.open(url, '_blank');
                    }}
                  >
                    Retweet
                  </PurpleButton>
                  <GreenButton
                    onClick={async () => {
                      await verify({
                        taskName: 'RetweetLatestTweet',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>

            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Invite friends to join the campaign</Text>
                  <Text>10 Points / Invite</Text>
                </Flex>

                <Buttons justifyContent="flex-end">
                  <CopyButton value={inviteUrl} />
                </Buttons>
              </TaskContent>
            </Task>
          </Stack>
        </Box>

        <Box>
          <Title>Advanced Tasks</Title>
          <Stack gap="15px">
            <Task>
              <Status done={taskList?.find((x) => x.name === 'RegisterCodexFiled')?.status === 1} />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Register CodexField ID</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton
                    onClick={() => {
                      router.push('/dashboard');
                    }}
                  >
                    Register
                  </PurpleButton>
                  <GreenButton
                    onClick={async () => {
                      await verify({
                        taskName: 'RegisterCodexFiled',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>

            <Task>
              <Status
                done={taskList?.find((x) => x.name === 'CreateRepoCodexField')?.status === 1}
              />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Create a repo on CodexField</Text>
                  <Text>10 Points</Text>
                </Flex>

                <Buttons justifyContent="flex-end">
                  <GreenButton
                    onClick={async () => {
                      await verify({
                        taskName: 'CreateRepoCodexField',
                      });
                    }}
                  >
                    Verify
                  </GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
          </Stack>
        </Box>
      </Stack>

      <Box flex="1" mt="130px">
        <User />

        <Invites>
          <Tabs variant="unstyled" position="relative">
            <TabList>
              <InvitesTab>Leaderboard</InvitesTab>
              <InvitesTab>Invites</InvitesTab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="#d9d9d9" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                <RankList />
              </TabPanel>
              <TabPanel>
                <Stack alignItems="center" gap="30px" p="40px">
                  <Box w="54px">
                    <img src={InviteImage.src} />
                  </Box>
                  <Box as="p">{inviteUrl}</Box>
                  <CopyButton value={inviteUrl} />
                </Stack>
                <Box as="p" color="#5F5F5F" fontSize="12px">
                  Great Britain, whose children we are, and whose language we speak, should no
                  longer be our standard; for the taste of her writers is already corrupted, and her
                  language on the decline.
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Invites>
      </Box>
    </Flex>
  );
};

const Title = styled(Heading)`
  color: #7a3cff;
  padding-left: 30px;
  font-size: 24px;
  font-weight: 700;
  margin-top: 60px;
  margin-bottom: 30px;
`;

const Task = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const TaskContent = styled(Flex)`
  flex: 1;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #282829;
  border-radius: 10px;
  background: #282829;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 15px;
`;

const Buttons = styled(Flex)`
  width: 180px;
  gap: 5px;

  justify-content: ${(props) => props.justifyContent || 'space-between'};
`;

const Status = ({ done }: { done?: boolean }) => {
  const bg = done ? '#0094FF' : '#1C1C1E';
  return (
    <Center background={bg} borderRadius="50%" w="24px" h="24px">
      <CheckIcon w="12px" h="12px" />
    </Center>
  );
};

const Invites = styled(Box)`
  margin-top: 30px;
  padding: 30px;
  background: #1c1c1e;
  border-radius: 10px;
`;

const InvitesTab = (props: TabProps) => (
  <Tab
    _selected={{ color: '#d9d9d9', fontWeight: 700 }}
    color="#5F5F5F"
    fontSize="24px"
    {...props}
  />
);
