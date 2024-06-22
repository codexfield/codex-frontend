import img from '@/images/create_channel.png';
import { BaseButton } from '@/shared/components/button';
import { Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useCreateBlogSpace } from '../../hooks/useCreateBlogSpace';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { useAccount } from 'wagmi';
import { useGetBlogList } from '../../hooks/useGetBlogList';
import { getBlogSpaceName } from '@/shared/utils';
import { useGetBucketInfo } from '@/shared/hooks/gnfd/useGetBucketInfo';

export const CreateBlogSpace: React.FC = () => {
  const { address } = useAccount();
  const { data: userInfo } = useGetAccountDetails(address as `0x${string}`);
  const { refetch } = useGetBucketInfo(getBlogSpaceName(userInfo?.id || BigInt(0)));

  const { doCreateBlogSpace, start, text } = useCreateBlogSpace({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <Center flexDirection="column" gap="20px" minH="500px">
      <img src={img.src} alt={'create channel'} width={64} height={64} />
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
