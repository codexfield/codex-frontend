import { RepoList } from '@/modules/dashboard/components/RepoList';
import { Side } from '@/shared/components/Side';
// @ts-ignore
import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { NewRepo } from '@/modules/dashboard/components/NewRepo';
import { CreateRepoForm } from '@/modules/dashboard/components/createRepo';
import { Box, Flex, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import React from 'react';

export const Dashboard: React.FC = () => {
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
};

const TabTitle = styled(Box)`
  font-size: 24px;
  font-weight: 800;
`;
