import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export const NewPost = () => {
  const router = useRouter();

  return (
    <NewPostButton
      color="#FFF"
      _hover={{
        bg: 'rgba(122, 60, 255, 0.8)',
      }}
      _disabled={{
        bg: '#1E1E1E',
        color: '#5F5F5F',
        boxShadow: 'none',
      }}
      onClick={() => {
        router.push('/dashboard/blogs/new');
      }}
    >
      New Post
    </NewPostButton>
  );
};

const NewPostButton = styled(Button)`
  font-size: 14px;
  background: #7a3cff;
  box-shadow: 0px 0px 51.6px 0px #874eff, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 30px;
  border-radius: 10px;
`;
