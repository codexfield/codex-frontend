import { newRepoAtom } from '@/atoms/newRepoAtom';
import { offchainDataAtom } from '@/atoms/offchainDataAtom';
import { selectSp } from '@/config/GnfsClient';
import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FormikErrors, useFormik } from 'formik';
import { useAtomValue, useSetAtom } from 'jotai';
import { StyledButton, StyledInput } from './modals/register/forms';
import { createBucket } from '@/apis/createBucket';
import GnfdBackend from '@/config/GnfdBackend';
import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { getBucketName } from '@/utils';
import git from '@codexfield/isomorphic-git';
// @ts-ignore
import LightningFS from '@codexfield/lightning-fs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useGetRepoList } from '@/hooks/gnfd/useGetRepoList';
import { GNFD_CHAINID } from '@/env';

interface FormValues {
  repoName: string;
  description?: string;
}

export const CreateRepoForm = () => {
  const [creating, setCreating] = useState(false);
  const offchainData = useAtomValue(offchainDataAtom);
  const { address } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address);
  const { refetch: refetchRepoList } = useGetRepoList();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const isGnfdChain = chain?.id === GNFD_CHAINID;

  const createRepoFormik = useFormik({
    initialValues: {
      repoName: '',
      description: '',
    },
    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.repoName) {
        errors.repoName = 'repo name is required';
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      if (!offchainData || !address || !offchainData.seed || !userInfo) return;

      switchNetwork?.(GNFD_CHAINID);

      const { repoName } = values;
      const { seed } = offchainData;

      setCreating(true);

      try {
        const spInfo = await selectSp();
        // eslint-disable-next-line no-console
        console.log('spInfo', spInfo);

        const bucketName = getBucketName(repoName, userInfo[0]);

        const createBucketRes = await createBucket({
          bucketName,
          address,
          seed,
          primarySpAddress: spInfo.primarySpAddress,
        });

        if (createBucketRes.code === 0) {
          // eslint-disable-next-line no-console
          console.log('create repo success');
        }

        const backend = new GnfdBackend(bucketName, seed, spInfo.endpoint, offchainData.address);
        const fs = new LightningFS('fs', {
          // @ts-ignore
          backend,
        });
        if (!fs) return;
        const res = await git.init({
          fs: fs,
          dir: '',
          gitdir: '',
          defaultBranch: 'main',
        });
        // console.log(res);

        setShowCreateRepo({
          clickedButton: false,
        });

        await refetchRepoList();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // ...
        setErrors({
          repoName: err && err.message,
        });
      } finally {
        setCreating(false);
      }
    },
  });

  const setShowCreateRepo = useSetAtom(newRepoAtom);

  const handleCancel = () => {
    setShowCreateRepo({
      clickedButton: false,
    });
  };

  return (
    <>
      <Title as="h2">Create A New Repository</Title>
      <SubTitle as="h3">
        A repository contains all project files, including the revision history. Already have a
        project repository elsewhere?
      </SubTitle>

      <Link
        aria-disabled
        href="#"
        color="#0094FF"
        fontSize="20px"
        _hover={{
          textDecoration: 'none',
        }}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Import a repository (Coming Soon)
      </Link>

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
            isDisabled={creating}
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
            disabled={creating}
            isLoading={creating}
          >
            {isGnfdChain ? 'Creat repository' : 'Switch Network'}
          </StyledButton>
        </Flex>
      </Box>
    </>
  );
};

const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
  font-weight: 700;
  color: #d9d9d9;
`;

const Title = styled(Box)`
  font-size: 24px;
  font-weight: 500;
`;

const SubTitle = styled(Box)`
  font-size: 20px;
  color: #5f5f5f;
  margin-top: 20px;
  margin-bottom: 20px;
`;
