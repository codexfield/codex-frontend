import { useQueryUser } from '@/modules/airdrop/hooks/useQueryUser';
import { Box, Button } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { TwitterIcon } from '../icons/TwitterIcon';
import { useRouter } from 'next/router';

export const TwitterButton = () => {
  const { address } = useAccount();
  const { data: userInfo } = useQueryUser(address);

  if (!userInfo?.result) {
    return null;
  }

  return (
    <Button
      bg="#1E1E1E"
      h="46px"
      fontWeight="500"
      color="#FFF"
      fontSize="16px"
      borderRadius="12px"
      p="15px"
      _hover={{
        bg: '#333',
      }}
    >
      <TwitterIcon />
      <Box as="span" ml="5px">
        {' '}
        @ {userInfo?.result.user.twitter_name}
      </Box>
    </Button>
  );
};
