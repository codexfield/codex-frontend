import { useScroll } from '@/hooks/useScroll';
import { Box, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/images/logo.svg';

interface IProps {
  content: React.ReactNode;
}

const Header = (props: IProps) => {
  const { content } = props;

  const y = useScroll();
  return (
    <Container
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'10px 25px'}
      style={{
        backdropFilter: y > 50 ? 'blur(10px)' : 'blur(0px)',
      }}
    >
      <Flex gap={42} alignItems={'center'}>
        <Box>
          <Link href='/'>
            <Image priority width={240} height={60} src={Logo.src} alt='codex logo' />
          </Link>
        </Box>
      </Flex>

      <Flex alignItems={'center'} justifyContent='space-between' gap={18} flex={1}>
        {content}
      </Flex>
    </Container>
  );
};

export default Header;

const Container = styled(Flex)`
  position: fixed;
  z-index: 10000;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  height: 80px;
  left: 0;
  right: 0;
  /* border-bottom: 1px #2f3034 solid; */
`;

const NavText = styled(Link)`
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;
