import { RepoList } from '@/modules/dashboard/components/RepoList';
import { Side } from '@/shared/components/Side';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { Box, Flex } from '@chakra-ui/react';

interface IProps {
  address: `0x${string}`;
}

export const Profile: React.FC<IProps> = (props: IProps) => {
  const { address } = props;

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <Flex gap="20px" w="1360px" ml="auto" mr="auto">
      <Box w="960px">
        <RepoList address={address} />
      </Box>

      <Side address={address} />
    </Flex>
  );
};
