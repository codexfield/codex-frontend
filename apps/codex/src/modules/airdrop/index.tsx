import InviteImage from '@/images/invite.png';
import RankImage from '@/images/rank.png';
import StarImage from '@/images/star.png';
import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Stat,
  StatNumber,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

// post tweet

//1. url
// const windowReference=window.location.href;
// const hrefEl="https://twitter.com/intent/tweet?url=" + windowReference + "&text=" + encodeURIComponent(textToTweet);
// tweetButton.setAttribute('href',hrefEl)

// 2. sdk
// https://developer.twitter.com/en/docs/twitter-api
// https://www.postman.com/twitter/workspace/twitter-s-public-workspace/request/9956214-5bd6ebb1-9d79-4456-a9a6-22ead4a41625

export const Airdrop = () => {
  const [cloneUrl, setCloneUrl] = useState('');
  const { onCopy, value, hasCopied } = useClipboard(cloneUrl);

  return (
    <Flex gap="30px" w="1360px" ml="auto" mr="auto" justifyContent="space-between" p="30px">
      <Stack w="730px">
        <Box>
          <Title>Mandatory Tasks</Title>

          <Stack gap="15px" w="100%">
            <Task>
              <Status done />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Connect Twitter account</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Connect</PurpleButton>
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
                  <PurpleButton>Follow</PurpleButton>
                  <GreenButton>Verify</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Post CodexField Airdrop Campaign tweet</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Post</PurpleButton>
                  <GreenButton>Verify</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Join CodexField Telegrame group</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Join</PurpleButton>
                  <GreenButton>Verify</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
          </Stack>
        </Box>

        <Box>
          <Title>Optional Tasks</Title>
          <Stack gap="15px">
            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Post a tweet with @CodexField tag(Daily)</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Post</PurpleButton>
                  <GreenButton>Verify</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>

            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Retweet, like and comment on the latest tweet</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Retweet</PurpleButton>
                  <GreenButton>Verify</GreenButton>
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
                  <GreenButton>Copy URL</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
          </Stack>
        </Box>

        <Box>
          <Title>Advanced Tasks</Title>
          <Stack gap="15px">
            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Register CodexField ID</Text>
                  <Text>10 Points</Text>
                </Flex>
                <Buttons>
                  <PurpleButton>Register</PurpleButton>
                  <GreenButton>Verify</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>

            <Task>
              <Status />
              <TaskContent>
                <Flex justifyContent="space-between" flex="1">
                  <Text>Create a repo on CodexField</Text>
                  <Text>10 Points</Text>
                </Flex>

                <Buttons justifyContent="flex-end">
                  <GreenButton>Copy URL</GreenButton>
                </Buttons>
              </TaskContent>
            </Task>
          </Stack>
        </Box>
      </Stack>

      <Box flex="1" mt="130px">
        <Flex gap="30px">
          <Show>
            <Heading
              textAlign="center"
              fontSize="24px"
              h="48px"
              lineHeight="48px"
              bg={`#7A3CFF url(${StarImage.src}) no-repeat 10px 14px`}
              bgSize="contain"
            >
              Your Points
            </Heading>
            <StatNumber textAlign="center" h="58px" lineHeight="58px" color="#7a3cff">
              253423
            </StatNumber>
          </Show>
          <Show>
            <Heading
              textAlign="center"
              fontSize="24px"
              h="48px"
              lineHeight="48px"
              bg={`#A276FF url(${RankImage.src}) no-repeat 15px 14px`}
              bgSize="contain"
            >
              Rank
            </Heading>
            <StatNumber textAlign="center" h="58px" lineHeight="58px" color="#A276FF">
              #2423{/* .toLocaleString() */}
            </StatNumber>
          </Show>
        </Flex>

        <Invites>
          <Tabs variant="unstyled" position="relative">
            <TabList>
              <InvitesTab>Leaderboard</InvitesTab>
              <InvitesTab>Invites</InvitesTab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="#d9d9d9" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                <Stack gap="8px">
                  <Flex justifyContent="space-between">
                    <Box>1</Box>
                    <Box>Dujun</Box>
                    <Box>0xad3b...275e</Box>
                    <Box>12413412356435</Box>
                  </Flex>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack alignItems="center" gap="30px" p="40px">
                  <Box w="54px">
                    <img src={InviteImage.src} />
                  </Box>
                  <Box as="p">{`https://codexfield.com/dashboard/`}</Box>
                  <GreenButton>Copy URL</GreenButton>
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

const PurpleButton = styled(Button)`
  background: #7a3cff;
  border-radius: 10px;
  color: #ffffff;
  width: 85px;
  font-size: 14px;
  height: 28px;
  &:hover {
    background: #7a5cff;
  }
`;

const GreenButton = styled(Button)`
  background: #048118;
  border-radius: 10px;
  color: #ffffff;
  width: 85px;
  font-size: 14px;
  height: 28px;

  &:hover {
    background: #049118;
  }
`;

const Status = ({ done }: { done?: boolean }) => {
  const bg = done ? '#0094FF' : '#1C1C1E';
  return (
    <Center background={bg} borderRadius="50%" w="24px" h="24px">
      <CheckIcon w="12px" h="12px" />
    </Center>
  );
};

const Show = styled(Stat)`
  border-radius: 10px;
  overflow: hidden;
  background-color: #282829;
`;

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
