import { Client, VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Hide,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DashboardLayout } from '../../layout';
import { FormikErrors, useFormik } from 'formik';
import { PurpleButton } from '@/modules/airdrop/components/Buttons';
import { Editor } from '../components/editor';
import { useRouter } from 'next/router';
import { GreenfieldClient } from '@/config/GnfsClient';
import { useAtomValue } from 'jotai';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useAccount } from 'wagmi';
import { getBlogSpaceName, getExtensionName } from '@/shared/utils';
import { useState } from 'react';

export interface FormsValue {
  title: string;
  content: string;
  visibility: keyof typeof VisibilityType;
  // cover: File | null;
}

export const NewPostPage = () => {
  const { address } = useAccount();
  const offchainData = useAtomValue(offchainDataAtom);
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);
  const [cover, setCover] = useState<File | null>(null);

  const postFormik = useFormik<FormsValue>({
    initialValues: {
      title: '',
      content: '',
      visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
      // cover: null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values: FormsValue) => {
      const errors: FormikErrors<FormsValue> = {};
      if (!values.title) {
        errors.title = 'title is required';
      }

      if (!values.content) {
        errors.content = 'content is required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log('values', values);

      const blob = new Blob([values.content], { type: 'text/plain' });
      const file = new File([blob], 'foo', { type: 'text/html' });

      if (!offchainData || !offchainData.seed) return;

      if (cover) {
        console.log('values.cover', cover);
        // const extensionName = getExtensionName(values.cover.name);
        // console.log('extensionName', extensionName);
        const coverRes = await GreenfieldClient.object.delegateUploadObject(
          {
            bucketName: getBlogSpaceName(userInfo?.id || BigInt(0)),
            objectName: 'cover/' + values.title,
            body: cover,
            delegatedOpts: {
              visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
            },
          },
          {
            type: 'EDDSA',
            domain: window.location.origin,
            seed: offchainData.seed,
            address: offchainData.address,
          },
        );

        console.log('coverRes', coverRes);
      }

      const res = await GreenfieldClient.object.delegateUploadObject(
        {
          bucketName: getBlogSpaceName(userInfo?.id || BigInt(0)),
          objectName: values.title,
          body: file,
          delegatedOpts: {
            visibility:
              values.visibility === 'VISIBILITY_TYPE_PUBLIC_READ'
                ? VisibilityType.VISIBILITY_TYPE_PUBLIC_READ
                : VisibilityType.VISIBILITY_TYPE_PRIVATE,
          },
        },
        {
          type: 'EDDSA',
          domain: window.location.origin,
          seed: offchainData.seed,
          address: offchainData.address,
        },
      );

      if (res.code === 0) {
        router.push(`/dashboard/blogs`);
      }
    },
  });

  const router = useRouter();

  return (
    <DashboardLayout>
      <Box as="form" onSubmit={postFormik.handleSubmit}>
        <FormControl py="5px" pos="relative">
          <FormLabel htmlFor="file_input">
            <Center mx="auto" w="200px">
              <Button bg="#1E1E1E" w="200px" h="40px" fontWeight="500" cursor="pointer">
                Upload Cover Image
              </Button>
            </Center>
          </FormLabel>
          <Box pos="absolute" top="0" left="0" right="0" opacity="0" cursor="pointer">
            <Input
              type="file"
              id="file_input"
              // name="cover"
              onChange={(e) => {
                // console.log('e', e.target.files[0]);
                // @ts-ignore
                setCover(e!.target!.files[0]);
              }}
            />
          </Box>
        </FormControl>

        <FormControl py="5px" isRequired isInvalid={!!postFormik.errors.title}>
          <Input
            name="title"
            onChange={postFormik.handleChange}
            placeholder="Give it a title"
            fontSize="44px"
            color="#5F5F5F"
            sx={{
              border: 'none',
              paddingLeft: '10px',
              lineHeight: '1.5em',
              height: '1.5em',
            }}
          />
          {postFormik.errors.title && (
            <FormErrorMessage>{postFormik.errors.title}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl py="5px" isRequired isInvalid={!!postFormik.errors.content}>
          <Editor onChange={postFormik.setFieldValue} />

          {postFormik.errors.content && (
            <FormErrorMessage py="45px" px="10px">
              {postFormik.errors.content}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl mt="40px" p="10px">
          <RadioGroup
            name="visi2bility"
            id="visibility"
            onChange={(e) => {
              postFormik.setValues((preValues) => ({
                ...preValues,
                visibility: e as keyof typeof VisibilityType,
              }));
            }}
            value={postFormik.values.visibility}
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

        <Flex justifyContent="space-between" my="32px" px="10px">
          <Button
            w="220px"
            minH="48px"
            variant="unstyled"
            border="1px #5F5F5F solid"
            onClick={() => {
              router.push('/dashboard/blogs');
            }}
          >
            Discard
          </Button>
          <PurpleButton w="220px" minH="48px" type="submit">
            Post
          </PurpleButton>
        </Flex>
      </Box>
    </DashboardLayout>
  );
};
