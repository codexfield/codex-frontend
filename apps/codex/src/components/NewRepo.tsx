import { newRepoAtom } from '@/atoms/newRepoAtom';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';

export const NewRepo = () => {
  const [showCreateRepo, setShowCreateRepo] = useAtom(newRepoAtom);

  return (
    <NewRepoButton
      _hover={{
        bg: 'rgba(122, 60, 255, 0.8)',
      }}
      _disabled={{
        bg: '#1E1E1E',
        color: '#5F5F5F',
        boxShadow: 'none',
      }}
      isDisabled={showCreateRepo.clickedButton}
      onClick={() => {
        setShowCreateRepo({
          clickedButton: true,
        });
      }}
    >
      New Repo
    </NewRepoButton>
  );
};

const NewRepoButton = styled(Button)`
  font-size: 14px;
  background: #7a3cff;
  box-shadow: 0px 0px 51.6px 0px #874eff, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 30px;
  border-radius: 10px;
`;
