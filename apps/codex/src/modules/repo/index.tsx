import { Side } from '@/shared/components/Side';
import { Center, Flex, Spinner } from '@chakra-ui/react';
import { useCheckRepo } from './hooks/useCheckRepo';
import { useGetBucketInfo } from '@/shared/hooks/gnfd/useGetBucketInfo';
import { useRouter } from 'next/router';
import { RepoContent } from './components/RepoContent';

export default function Repo() {
  const router = useRouter();
  const { name } = router.query;
  const { data: bucketInfo } = useGetBucketInfo(name as string);

  const { data: checkRepoRes } = useCheckRepo(bucketInfo?.id);

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
      {/* name is {name}
      latestCommit is {latestCommitOid} */}

      {checkRepoRes?.result.status === 11 && (
        <Center minH="200px" w="960px">
          {/* failure */}
          <Spinner />
        </Center>
      )}

      {checkRepoRes?.result.status === 1 && (
        <Center minH="200px" w="960px">
          {/* success */}
          <Spinner />
        </Center>
      )}

      {checkRepoRes?.result.status === 10 && <RepoContent />}

      {bucketInfo?.owner && <Side address={bucketInfo.owner as `0x${string}`} />}
    </Flex>
  );
}
