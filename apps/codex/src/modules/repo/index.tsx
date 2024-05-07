import { css, keyframes } from '@emotion/react';
import Loading from '@/images/loading.svg';
import { Side } from '@/shared/components/Side';
import { Box, Button, Center, Flex, HStack, Spinner, Stack, VStack } from '@chakra-ui/react';
import { useCheckRepo } from './hooks/useCheckRepo';
import { useGetBucketInfo } from '@/shared/hooks/gnfd/useGetBucketInfo';
import { useRouter } from 'next/router';
import { RepoContent } from './components/RepoContent';
import { ErrorIcon } from '@/shared/icons/ErrorIcon';

const spin = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export default function Repo() {
  const router = useRouter();
  const { name } = router.query;
  const { data: bucketInfo } = useGetBucketInfo(name as string);

  const { data: checkRepoRes, refetch } = useCheckRepo(bucketInfo?.id);

  console.log('checkRepoRes', checkRepoRes, checkRepoRes?.result.status);

  // if (checkRepoRes?.result.status === 11) {
  //   // failure
  //   return (
  //     <Center minH="200px">
  //       <Spinner />
  //     </Center>
  //   );
  // } else if (checkRepoRes?.result.status === 1) {
  //   // init
  // }

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      {checkRepoRes?.result.status === 11 && (
        <Center minH="200px" w="960px">
          <VStack>
            {/* failure */}
            <ErrorIcon />
            <Box color="#F44336">Failed</Box>
            <Button
              bg="#048118"
              fontSize="16px"
              onClick={() => {
                refetch();
              }}
            >
              Retry
            </Button>
          </VStack>
        </Center>
      )}

      {checkRepoRes?.result.status === 1 && (
        <Center minH="200px" w="960px">
          {/* init */}
          <Box
            css={css`
              animation: ${spin} 2s ease infinite;
            `}
          >
            <img src={Loading.src} title="loading" />
          </Box>
        </Center>
      )}

      {checkRepoRes?.result.status === 10 && <RepoContent />}

      {bucketInfo?.owner && <Side address={bucketInfo.owner as `0x${string}`} />}
    </Flex>
  );
}
