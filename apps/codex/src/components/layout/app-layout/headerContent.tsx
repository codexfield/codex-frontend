import { CustomConnectButton } from '@/components/ui/connectButton';
import { Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const HeaderContent = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} gap={18}>
      <CustomConnectButton />
      {/* <ConnectButton /> */}
    </Flex>
  );
};

export default HeaderContent;
