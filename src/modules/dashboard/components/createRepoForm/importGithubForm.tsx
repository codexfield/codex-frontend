import GithubOAuth from '@/shared/components/oauth/github';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Link,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  Text,
  useSteps,
} from '@chakra-ui/react';
import { FormikErrors, useFormik } from 'formik';
import { useSetAtom } from 'jotai';
import NextLink from 'next/link';
import { useState } from 'react';
import { importGithubAtom } from '../../atoms/newRepoAtom';
import { StyledButton, StyledInput } from '../modals/forms';
import { ImportGiithubStep2 } from './ImportGiithubStep2';
import { SubTitle, Title } from './ui';

const steps = [
  { title: 'Step 1', description: 'Select Repository' },
  { title: 'Step 2', description: 'Confirm to Import' },
];

export const ImportGithub: React.FC = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const setImportGithub = useSetAtom(importGithubAtom);

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
      console.log('values', values);
      setImportGithub((draft) => {
        draft.url = values.githubUrl;
      });
      setActiveStep(1);
    },
  });

  return (
    <Box my="15px">
      <Link
        as={NextLink}
        aria-disabled
        href="/dashboard"
        color="#FFF"
        fontSize="20px"
        fontWeight="700"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <ChevronLeftIcon w="24px" h="24px" boxSize="24px" />
        <Box verticalAlign="-2px" as="span">
          Back
        </Box>
      </Link>

      <Title as="h2" mt="25px">
        Create A New Repository
      </Title>

      <SubTitle as="h3">Easily import your repository in 2 steps</SubTitle>

      <Stack my="50px">
        <Stepper index={activeStep} gap="0">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator w="25px" h="25px">
                <StepStatus
                  complete={<StepIcon />}
                  active={<Box bg="#0094FF" w="15px" h="15px" borderRadius="100%"></Box>}
                  incomplete={<Box bg="#FFF" w="15px" h="15px" borderRadius="100%"></Box>}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <Text fontSize="24px">{step.title}</Text>
                <Text fontSize="20px">{step.description}</Text>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Stack>

      {activeStep === 0 && (
        <Tabs
          variant="unstyled"
          position="relative"
          my="50px"
          index={tabIndex}
          onChange={setTabIndex}
        >
          <TabList>
            <CdTab>Select Repository</CdTab>
            <CdTab>Import with URL</CdTab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="#d9d9d9" borderRadius="1px" />
          <TabPanels>
            <TabPanel py="30px">
              <GithubOAuth
                handleConfirmSelect={() => {
                  setActiveStep(1);
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
                  >
                    Confirm Select
                  </StyledButton>
                </Flex>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {activeStep === 1 && (
        <ImportGiithubStep2
          handleLastStep={() => {
            setActiveStep(0);
          }}
        />
      )}
    </Box>
  );
};

export const CdTab = (props: TabProps) => (
  <Tab
    _selected={{ color: '#d9d9d9', fontWeight: 700 }}
    color="#5F5F5F"
    fontSize="20px"
    {...props}
  />
);
