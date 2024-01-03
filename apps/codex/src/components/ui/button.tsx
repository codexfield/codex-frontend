import { Button, ButtonProps } from '@chakra-ui/react';

export const BaseButton = (props: ButtonProps) => {
  return (
    <Button
      h='60px'
      borderRadius='30px'
      bg='#EFF0F3'
      color='#000000'
      fontSize='20px'
      fontWeight='500'
      _hover={{
        bg: '#aeb0b4',
      }}
      {...props}
    />
  );
};

export const HConnectButton = (props: ButtonProps) => {
  return (
    <Button
      bg='#1E1E1E'
      h='46px'
      fontWeight='500'
      color='#FFF'
      fontSize='16px'
      _hover={{
        bg: '#333',
      }}
      {...props}
    />
  );
};
