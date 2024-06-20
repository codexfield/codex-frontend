import NotFoundImage from '@/images/not_found.svg';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
  searchKw: string;
}

export const NotFound = (props: IProps) => {
  const router = useRouter();

  return (
    <Stack
      gap="40px"
      alignItems="center"
      // my="80px"
      py="200px"
      bg="#000"
      bgGradient="radial(rgba(122, 60, 255, 0.5) 10%,rgba(73, 36, 153, 0) 60%, transparent 100%)"
    >
      <Text fontSize="30px" fontWeight="800">
        Search not found
      </Text>

      <Image priority width={257} height={257} src={NotFoundImage.src} alt="not found" />

      <Text fontSize="16px">
        Oops! The search string you entered was:{' '}
        <Box as="span" fontWeight="800">
          {props.searchKw}
        </Box>{' '}
        Sorry! This is an invalid search string.
      </Text>

      <Button
        bg="#7A3CFF"
        w="180px"
        h="46px"
        color="#FFF"
        onClick={() => {
          router.push('/');
        }}
        _hover={{
          bg: '#7A3CFF',
        }}
      >
        Back Home
      </Button>
    </Stack>
  );
};
