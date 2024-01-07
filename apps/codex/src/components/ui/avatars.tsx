import { useGetAccountDetails } from '@/hooks/contract/useGetAccountDetails';
import { Box } from '@chakra-ui/react';
import { MetaMaskAvatar } from 'react-metamask-avatar';

interface IProps {
  address: string;
  size: number;
}

export const CustomAvatar = (props: IProps) => {
  const { address, size } = props;
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);

  if (userInfo?.avatar) {
    return (
      <Box overflow="hidden" borderRadius="100%" w={size} h={size}>
        <img alt={address} src={userInfo?.avatar} />
      </Box>
    );
  }

  return <MetaMaskAvatar address={address} size={size} />;
};
