import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { useGetRepoList } from '@/shared/hooks/gnfd/useGetRepoList';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSetAtom } from 'jotai';
import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import { useCreateRepo } from '../../hooks/useCreateRepo';
import { StyledButton, StyledInput } from '../modals/forms';
import { StyledFormLabel, SubTitle, Title } from './ui';

export const CreateRepoNormal: React.FC = () => {
  const { address } = useAccount();
  const setShowCreateRepo = useSetAtom(newRepoAtom);
  const { refetch: refetchRepoList } = useGetRepoList(address);

  const handleCancel = () => {
    setShowCreateRepo((draft) => {
      draft.start = false;
    });
  };

  const {
    formik: createRepoFormik,
    text: buttonText,
    start,
  } = useCreateRepo({
    isInitGit: true,
    onSuccess: async () => {
      await refetchRepoList();
      setShowCreateRepo((draft) => {
        draft.start = false;
      });
    },
  });

  return (
    <>
      <Title as="h2">Create A New Repository</Title>
      <SubTitle as="h3">
        A repository contains all project files, including the revision history. Already have a
        project repository elsewhere?
        <Box my="20px">
          <Link
            as={NextLink}
            aria-disabled
            href="/dashboard/import/github"
            color="#0094FF"
            fontSize="20px"
            fontWeight="700"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Import a repository
          </Link>
        </Box>
      </SubTitle>

      <Box as="form" onSubmit={createRepoFormik.handleSubmit}>
        <FormControl mt="16px" isRequired isInvalid={!!createRepoFormik.errors.repoName}>
          <StyledFormLabel>Repository name</StyledFormLabel>
          <StyledInput
            w="240px"
            name="repoName"
            type="text"
            placeholder=""
            onChange={createRepoFormik.handleChange}
          />
          {createRepoFormik.errors.repoName && (
            <FormErrorMessage>{createRepoFormik.errors.repoName}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt="16px">
          <Text fontSize="16px" color="#5f5f5f">
            Great repository names are short and memorable.Need inspiration? How about potential
            -dollop ?
          </Text>
          <RadioGroup
            name="visibility"
            id="visibility"
            onChange={(e) => {
              createRepoFormik.setValues((preValues) => ({
                ...preValues,
                visibility: e as keyof typeof VisibilityType,
              }));
            }}
            value={createRepoFormik.values.visibility}
          >
            <Stack p="20px" bg="#1E1E1E" borderRadius="8px" mt="15px" gap="24px">
              <Radio value="VISIBILITY_TYPE_PUBLIC_READ">
                <Stack>
                  <Text fontSize="16px" fontWeight="700">
                    Public
                  </Text>
                  <Text color="#5F5F5F" fontSize="14px">
                    Anyone on the Internet can see this repository . you choose who can contakt.
                  </Text>
                </Stack>
              </Radio>
              <Radio value="VISIBILITY_TYPE_PRIVATE">
                <Stack>
                  <Text fontSize="16px" fontWeight="700">
                    Private
                  </Text>
                  <Text color="#5F5F5F" fontSize="14px">
                    You choose who can see and connit to this repository.
                  </Text>
                </Stack>
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* <FormControl mt="16px">
    <SubTitle as="h3">
      Great repository names are short and memorable.Need inspiration? How about potential
      -dollop ?
    </SubTitle>
    <StyledFormLabel>Description (optional)</StyledFormLabel>
    <StyledInput
      name="description"
      type="text"
      placeholder=""
      onChange={createRepoFormik.handleChange}
    />
  </FormControl> */}

        <Flex mt="32px" gap="12px" justifyContent="end">
          <StyledButton
            h="50px"
            p="14px 68px"
            bg="#1d1d1d"
            color="#9f9f9f"
            _hover={{
              color: '#9f9f9f',
            }}
            onClick={handleCancel}
            isDisabled={start}
          >
            Cancel
          </StyledButton>

          <StyledButton
            type="submit"
            h="50px"
            p="14px 68px"
            bg="hsla(259, 100%, 62%, 1)"
            _hover={{
              bg: 'hsla(259, 100%, 62%, 0.8)',
            }}
            _active={{
              bg: 'hsla(259, 100%, 58%, 0.6)',
            }}
            disabled={start}
            isLoading={start}
          >
            {buttonText}
          </StyledButton>
        </Flex>
      </Box>
    </>
  );
};
