import { createBucket } from '@/apis/createBucket';
import GnfdBackend from '@/config/GnfdBackend';
import { selectSp } from '@/config/GnfsClient';
import { BSC_CHAIN } from '@/env';
import { newRepoAtom } from '@/modules/dashboard/atoms/newRepoAtom';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetRepoList } from '@/shared/hooks/gnfd/useGetRepoList';
import { getBucketName, sleep } from '@/shared/utils';
import { getOffchainAuthKeys } from '@/shared/utils/offchainAuth';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import git from '@codexfield/isomorphic-git';
import styled from '@emotion/styled';
import { FormikErrors, useFormik } from 'formik';
import { useAtom, useSetAtom } from 'jotai';
import { StyledButton, StyledInput } from '../modals/forms';
import { useGetFee } from '@/shared/hooks/contract/useGetFee';
// @ts-ignore
import LightningFS from '@codexfield/lightning-fs';
import { useState } from 'react';
import { Address } from 'viem';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { StyledFormLabel, SubTitle, Title } from './ui';

interface FormValues {
  repoName: string;
  visibility: keyof typeof VisibilityType;
  description?: string;
}

export const CreateRepoNormal: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [offchainData, setOffchainData] = useAtom(offchainDataAtom);
  const { address, connector, chain } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address);
  const { refetch: refetchRepoList } = useGetRepoList(address);
  const { switchChain } = useSwitchChain();
  // const isGnfdChain = chain?.id === GNFD_CHAINID;
  const isBSCChain = chain?.id === BSC_CHAIN.id;
  const publicClient = usePublicClient({
    chainId: BSC_CHAIN.id,
  });
  const { data: walletClient } = useWalletClient();

  const { data: fees } = useGetFee();

  const [showCreateRepo, setShowCreateRepo] = useAtom(newRepoAtom);

  const handleCancel = () => {
    setShowCreateRepo((draft) => {
      draft.start = false;
      draft.importGithub = false;
    });
  };

  const createRepoFormik = useFormik({
    initialValues: {
      repoName: '',
      description: '',
      visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.repoName) {
        errors.repoName = 'repo name is required';
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      if (!address || !userInfo) return;

      if (!offchainData || !offchainData.seed) {
        // alert('no offchain data');
        const provider = await connector?.getProvider();
        const data = await getOffchainAuthKeys(address, provider);
        setOffchainData({
          address: address,
          seed: data?.seedString,
        });
        return;
      }

      if (!isBSCChain) {
        switchChain?.({
          chainId: BSC_CHAIN.id,
        });
        return;
      }

      const { repoName } = values;
      const { seed } = offchainData;

      setCreating(true);

      try {
        const spInfo = await selectSp();
        // eslint-disable-next-line no-console
        console.log('spInfo', spInfo);

        const bucketName = getBucketName(repoName, userInfo.id);

        const createBucketTxHash = await createBucket({
          fees,
          publicClient,
          walletClient,
          bucketName,
          address,
          seed,
          sp: spInfo,
          visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        });

        console.log('createBucketTxHash', createBucketTxHash);

        await sleep(15000);

        // debugger;
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

        setShowCreateRepo((draft) => {
          draft.start = false;
          draft.importGithub = false;
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

  return (
    <>
      <Title as="h2">Create A New Repository</Title>
      <SubTitle as="h3">
        A repository contains all project files, including the revision history. Already have a
        project repository elsewhere?
        <Box my="20px">
          <Link
            aria-disabled
            href="#"
            color="#0094FF"
            fontSize="20px"
            fontWeight="700"
            _hover={{
              textDecoration: 'none',
            }}
            onClick={(e) => {
              e.preventDefault();

              setShowCreateRepo((draft) => {
                draft.importGithub = true;
                draft.normal = false;
              });
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
            {!offchainData || !offchainData.seed
              ? 'Signature'
              : isBSCChain
              ? 'Creat repository'
              : 'Switch Network'}
          </StyledButton>
        </Flex>
      </Box>
    </>
  );
};
