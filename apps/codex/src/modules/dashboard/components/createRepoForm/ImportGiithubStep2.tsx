import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { importGithubAtom, newRepoAtom } from '../../atoms/newRepoAtom';
import { useCreateRepo } from '../../hooks/useCreateRepo';
import { usePutPolicy } from '../../hooks/usePutPolicy';
import { StyledButton, StyledInput } from '../modals/forms';
import { StyledFormLabel } from './ui';
import { useImportGithub } from '../../hooks/useImportGithub';
import { useRouter } from 'next/router';
import { useGetRepoList } from '@/shared/hooks/gnfd/useGetRepoList';
import { useAccount } from 'wagmi';

interface IProps {
  handleLastStep: () => void;
}

type STEP = 'CREATE_REPO' | 'PUT_POLICY' | 'IMPORT_GITHUB_API';

export const ImportGiithubStep2: React.FC<IProps> = ({ handleLastStep }) => {
  const { address } = useAccount();
  const [step, setStep] = useState<STEP>('CREATE_REPO');
  const router = useRouter();
  const setShowCreateRepo = useSetAtom(newRepoAtom);

  const {
    formik: createRepoFormik,
    text: buttonText,
    start,
  } = useCreateRepo({
    onSuccess: async () => {
      // ...
      setStep('PUT_POLICY');

      await doPutPolicy();

      setStep('IMPORT_GITHUB_API');

      router.push('/dashboard');
      setShowCreateRepo((draft) => {
        draft.start = false;
      });

      await refetchRepoList();
    },
  });

  const { refetch: refetchRepoList } = useGetRepoList(address);
  const importGithub = useAtomValue(importGithubAtom);

  const { doPutPolicy, start: putPolicyStart } = usePutPolicy({
    githubUrl: importGithub.url,
    onSuccess: async () => {
      setStep('IMPORT_GITHUB_API');
    },
  });

  const { doImport } = useImportGithub({
    repoName: createRepoFormik.values.repoName,
    githubUrl: importGithub.url,
    visibility: createRepoFormik.values.visibility,
    onSuccess: async () => {
      // router.push('/dashboard');
      setShowCreateRepo((draft) => {
        draft.start = false;
      });

      await refetchRepoList();
    },
  });

  return (
    <Box>
      <Box as="form" onSubmit={createRepoFormik.handleSubmit}>
        <FormControl mt="16px" isRequired isInvalid={!!createRepoFormik.errors.repoName}>
          <StyledFormLabel fontSize="20px" my="10px">
            Your new repository name
          </StyledFormLabel>
          <StyledInput
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

        <Flex my="30px" justifyContent="space-between">
          <StyledButton
            h="50px"
            p="14px 68px"
            variant="outline"
            onClick={() => {
              handleLastStep();
            }}
          >
            <ChevronLeftIcon w="24px" h="24px" boxSize="24px" /> Last Step
          </StyledButton>

          {step === 'CREATE_REPO' && (
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
              isDisabled={start}
              isLoading={start}
            >
              {buttonText}
            </StyledButton>
          )}

          {step === 'PUT_POLICY' && (
            <StyledButton
              h="50px"
              p="14px 68px"
              bg="hsla(259, 100%, 62%, 1)"
              _hover={{
                bg: 'hsla(259, 100%, 62%, 0.8)',
              }}
              _active={{
                bg: 'hsla(259, 100%, 58%, 0.6)',
              }}
              isDisabled={putPolicyStart}
              isLoading={putPolicyStart}
              onClick={async () => {
                await doPutPolicy();
              }}
            >
              Put Policy
            </StyledButton>
          )}

          {step === 'IMPORT_GITHUB_API' && (
            <StyledButton
              h="50px"
              p="14px 68px"
              bg="hsla(259, 100%, 62%, 1)"
              _hover={{
                bg: 'hsla(259, 100%, 62%, 0.8)',
              }}
              _active={{
                bg: 'hsla(259, 100%, 58%, 0.6)',
              }}
              isDisabled={putPolicyStart}
              isLoading={putPolicyStart}
              onClick={async () => {
                await doImport();
              }}
            >
              Import Repository
            </StyledButton>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
