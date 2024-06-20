import NextLink from 'next/link';
import styled from '@emotion/styled';
import { RepoList } from '@/modules/dashboard/components/RepoList';
import { Side } from '@/shared/components/Side';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { Box, Flex, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BlogList } from '../dashboard/blogs/components/BlogList';
import { useEffect, useState } from 'react';

interface IProps {
  address: `0x${string}`;
}

const TABS = [
  {
    value: 'repos',
    label: 'Repos',
  },
  {
    value: 'posts',
    label: 'Posts',
  },
];

export const Profile: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();
  const { address } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const isMounted = useIsMounted();

  const activeTab = router.query.tab as string;
  const isActiveUrl = (url: string) => router.query.tab === url;

  useEffect(() => {
    const index = TABS.findIndex((tab) => tab.value === activeTab);
    setTabIndex(index);
  }, []);

  if (!isMounted) return null;

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Box w="960px">
        <Tabs
          index={tabIndex}
          variant="unstyled"
          sx={{
            '.active': {
              color: '#FFF',
              fontWeight: 800,
            },
          }}
        >
          <TabList>
            {TABS.map((tab) => {
              return (
                <Tab key={tab.value}>
                  <TabTitle
                    onClick={() => {
                      router.push({
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          tab: tab.value,
                        },
                      });
                    }}
                    className={isActiveUrl(tab.value) && 'active'}
                  >
                    {tab.label}
                  </TabTitle>
                </Tab>
              );
            })}
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box mt="40px">
                <RepoList address={address} />
              </Box>
            </TabPanel>
            <TabPanel>
              <BlogList address={address} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Side address={address} />
    </Flex>
  );
};

const TabTitle = styled(Box)`
  font-size: 24px;
  color: #5f5f5f;
`;
