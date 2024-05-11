import img from '@/images/create_channel.png';
import { BaseButton } from '@/shared/components/button';
import { Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useCreateBlogSpace } from '../../hooks/useCreateBlogSpace';

export const CreateBlogSpace: React.FC = () => {
  const { doCreateBlogSpace, start, text } = useCreateBlogSpace();

  return (
    <Center flexDirection="column" gap="20px" minH="500px">
      <Image src={img.src} alt={'create channel'} width={64} height={64} />
      <Text fontSize="20px">Create Your Channel</Text>
      <BaseButton
        height="46px"
        minW="180px"
        bg="#7A3CFF"
        color="#FFF"
        fontWeight="500"
        _hover={{
          background: '#7a5cff',
        }}
        onClick={doCreateBlogSpace}
        textAlign="center"
        isLoading={start}
      >
        {text}
      </BaseButton>
    </Center>
  );
};
