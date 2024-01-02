import { RepoList } from '@/components/pages/dashborad/RepoList';
import { Side } from '@/components/pages/dashborad/Side';
// @ts-ignore
import { newRepoAtom } from '@/atoms/newRepoAtom';
import { NewRepo } from '@/components/NewRepo';
import { CreateRepoForm } from '@/components/createRepo';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';

export default function Dashboard() {
  const showCreateRepo = useAtomValue(newRepoAtom);

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Stack gap="40px">
        <Flex justifyContent="space-between">
          <TabTitle>My Repos</TabTitle>
          <NewRepo />
        </Flex>

        <Box w="960px">{showCreateRepo.clickedButton ? <CreateRepoForm /> : <RepoList />}</Box>
      </Stack>

      <Side />
    </Flex>
  );
}

const TabTitle = styled(Box)`
  font-size: 24px;
  font-weight: 800;
`;
