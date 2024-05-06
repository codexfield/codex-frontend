import { importGithubAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { StyledButton } from '@/modules/dashboard/components/modals/forms';
import { useGetGithubRepoList } from '@/modules/dashboard/hooks/useGetGithubRepoList';
import { Box, Flex, FormControl, Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Select } from 'chakra-react-select';
import { useAtom } from 'jotai';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa6';

interface IProps {
  handleConfirmSelect: () => void;
}

export default function GithubOAuth(props: IProps) {
  const { data: session, status } = useSession();
  const { data: repoList } = useGetGithubRepoList(session?.accessToken);

  const [importGithub, setImportGithub] = useAtom(importGithubAtom);

  const options = repoList?.map((repo) => {
    return {
      label: repo.full_name,
      value: repo.clone_url,
    };
  });

  // console.log('options', options);

  if (session) {
    return (
      <>
        <Container>
          <Box as="span">{session.user?.email}</Box>
          <StyledButton
            bg="#EA0000"
            onClick={() =>
              signOut({
                redirect: false,
              })
            }
          >
            Disconnect Github
          </StyledButton>
        </Container>

        {options?.length !== 0 && (
          <>
            <Box my="20px">
              <FormControl>
                <Select
                  size="lg"
                  options={options}
                  isRequired
                  onChange={(e) => {
                    setImportGithub((draft) => {
                      draft.url = e!.value;
                    });
                  }}
                />
              </FormControl>
            </Box>

            <Flex justifyContent="end">
              <StyledButton
                h="50px"
                p="14px 28px"
                bg="hsla(259, 100%, 62%, 1)"
                _hover={{
                  bg: 'hsla(259, 100%, 62%, 0.8)',
                }}
                _active={{
                  bg: 'hsla(259, 100%, 58%, 0.6)',
                }}
                isDisabled={!importGithub.url}
                onClick={() => {
                  props.handleConfirmSelect();
                }}
              >
                Confirm Select
              </StyledButton>
            </Flex>
          </>
        )}
      </>
    );
  }
  return (
    <>
      <Container>
        <Icon as={FaGithub} w="30px" boxSize={30} />
        <StyledButton
          h="50px"
          p="14px 28px"
          bg="hsla(259, 100%, 62%, 1)"
          _hover={{
            bg: 'hsla(259, 100%, 62%, 0.8)',
          }}
          _active={{
            bg: 'hsla(259, 100%, 58%, 0.6)',
          }}
          onClick={() => {
            signIn('github', {
              redirect: false,
              // callbackUrl: '/dashboard/import/github',
            });
          }}
        >
          Connect Github
        </StyledButton>
      </Container>
    </>
  );
}

const Container = styled(Flex)`
  height: 70px;
  padding: 15px;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  background: #1c1c1e;
  border-radius: 8px;
`;
