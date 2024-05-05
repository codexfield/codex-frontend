import { createBucket } from '@/apis/createBucket';
import { importRepo } from '@/apis/importRepo';
import { putPolicy } from '@/apis/policy';
import { selectSp } from '@/config/GnfsClient';
import { BSC_CHAIN } from '@/env';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import GithubOAuth from '@/shared/components/oauth/github';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useGetFee } from '@/shared/hooks/contract/useGetFee';
import { getBucketName, getCloneUrlByRepoName, sleep } from '@/shared/utils';
import { getOffchainAuthKeys } from '@/shared/utils/offchainAuth';
import {
  ActionType,
  Effect,
  PrincipalType,
} from '@bnb-chain/greenfield-cosmos-types/greenfield/permission/common';
import { MsgPutPolicy } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx';
import { GRNToString, VisibilityType, newBucketGRN } from '@bnb-chain/greenfield-js-sdk';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Link,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  useSteps,
} from '@chakra-ui/react';
import { FormikErrors, useFormik } from 'formik';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Address } from 'viem';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { newRepoAtom } from '../../atoms/newRepoAtom';
import { StyledButton, StyledInput } from '../modals/forms';
import { SubTitle, Title } from './ui';

const steps = [
  { title: 'Step 1', description: 'Select Repository' },
  { title: 'Step 2', description: 'Confirm to Import' },
];

export const ImportGithub: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [offchainData, setOffchainData] = useAtom(offchainDataAtom);
  const [showCreateRepo, setShowCreateRepo] = useAtom(newRepoAtom);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const { address, connector, chain } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address);
  const { data: fees } = useGetFee();
  const { switchChain } = useSwitchChain();
  const publicClient = usePublicClient({
    chainId: BSC_CHAIN.id,
  });
  const { data: walletClient } = useWalletClient();

  const importGithubFormik = useFormik({
    initialValues: {
      githubUrl: '',
    },
    validateOnChange: false,
    validate: (values) => {
      const errors: FormikErrors<{ githubUrl: string }> = {};
      if (!values.githubUrl) {
        errors.githubUrl = 'github url is required';
      }
      if (!values.githubUrl.endsWith('.git'.toLowerCase())) {
        errors.githubUrl = 'github url is invalid';
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      // ...
      console.log('values', values);
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

      if (chain?.id !== BSC_CHAIN.id) {
        switchChain?.({
          chainId: BSC_CHAIN.id,
        });
        return;
      }

      setCreating(true);

      const reg = /(?<=\/)[^\/]+(?=\.git$)/;
      const repoName = reg.exec(values.githubUrl);
      if (!repoName) return;

      const { seed } = offchainData;
      const bucketName = getBucketName(repoName[0], userInfo.id);

      try {
        const spInfo = await selectSp();

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

        const bytes = MsgPutPolicy.encode({
          operator: address,
          resource: GRNToString(newBucketGRN(bucketName)),
          principal: {
            type: PrincipalType.PRINCIPAL_TYPE_GNFD_ACCOUNT,
            value: '0x498a2E6d6dCdD63482191E138beeFf5410724909',
          },
          statements: [
            {
              effect: Effect.EFFECT_ALLOW,
              actions: [ActionType.ACTION_CREATE_OBJECT],
              resources: [GRNToString(newBucketGRN(bucketName))],
            },
          ],
        }).finish();

        const createPolicyHash = await putPolicy({
          bytes,
          address,
          publicClient,
          walletClient,
          fees,
        });

        console.log('createPolicy', createPolicyHash);

        await sleep(5000);

        await importRepo({
          bucketName,
          address,
          repoUrl: values.githubUrl,
          gnfdUrl: getCloneUrlByRepoName(userInfo.id.toString(), repoName[0]),
          repoType: '1',
        });
      } catch (err: any) {
        setErrors({
          githubUrl: err && err.message,
        });
      } finally {
        setCreating(false);
      }
    },
  });

  return (
    <Box>
      <Link
        aria-disabled
        href="#"
        color="#FFF"
        fontSize="20px"
        fontWeight="700"
        _hover={{
          textDecoration: 'none',
        }}
        onClick={(e) => {
          e.preventDefault();

          setShowCreateRepo((draft) => {
            draft.importGithub = false;
            draft.normal = true;
          });
        }}
      >
        <ChevronLeftIcon w="24px" h="24px" boxSize="24px" />
        <Box verticalAlign="-2px" as="span">
          Back
        </Box>
      </Link>

      <Title as="h2">Create A New Repository</Title>

      <SubTitle as="h3">Easily import your repository in 2 steps</SubTitle>

      <Stack>
        <Stepper index={activeStep} gap="0">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Stack>

      <Tabs
        variant="unstyled"
        position="relative"
        my="50px"
        index={tabIndex}
        onChange={setTabIndex}
      >
        <TabList>
          <CdTab onClick={() => setActiveStep(1)}>Select Repository</CdTab>
          <CdTab onClick={() => setActiveStep(2)}>Import with URL</CdTab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="#d9d9d9" borderRadius="1px" />
        <TabPanels>
          <TabPanel py="30px">
            <GithubOAuth
              handleConfirmSelect={() => {
                setTabIndex(1);
                setActiveStep(2);
              }}
              handleSelect={(e) => {
                importGithubFormik.setFieldValue('githubUrl', e);
              }}
            />
          </TabPanel>

          <TabPanel py="30px">
            <Box as="form" onSubmit={importGithubFormik.handleSubmit}>
              <FormControl mt="16px" isRequired isInvalid={!!importGithubFormik.errors.githubUrl}>
                <StyledInput
                  placeholder="Repository URL"
                  name="githubUrl"
                  value={importGithubFormik.values.githubUrl}
                  onChange={importGithubFormik.handleChange}
                />
                {importGithubFormik.errors.githubUrl && (
                  <FormErrorMessage>{importGithubFormik.errors.githubUrl}</FormErrorMessage>
                )}
              </FormControl>

              <Flex mt="20px" justifyContent="end">
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
                  Confirm
                </StyledButton>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export const CdTab = (props: TabProps) => (
  <Tab
    _selected={{ color: '#d9d9d9', fontWeight: 700 }}
    color="#5F5F5F"
    fontSize="24px"
    {...props}
  />
);
