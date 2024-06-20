import img from '@/images/share_vision.png';
import { BaseButton } from '@/shared/components/button';
import { Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const EmptyBlog = () => {
  const router = useRouter();
  return (
    <Center flexDirection="column" gap="20px" minH="500px">
      <Image src={img.src} alt={'create channel'} width={64} height={64} />
      <Text fontSize="20px">Share Your Vision</Text>
      <BaseButton
        height="46px"
        minW="180px"
        bg="#7A3CFF"
        color="#FFF"
        fontWeight="500"
        _hover={{
          background: '#7a5cff',
        }}
        onClick={() => {
          router.push('/dashboard/blogs/new');
        }}
        textAlign="center"
        // isLoading={start}
      >
        New Post
      </BaseButton>
    </Center>
  );
};
