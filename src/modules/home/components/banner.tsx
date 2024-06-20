import { BaseButton } from '@/shared/components/button';
import { useMedia } from '@/shared/hooks/useMedia';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Center, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';

export const Banner = () => {
  const media = useMedia();

  return (
    <Container>
      <Box position="relative">
        {media == 'PC' && (
          <Box>
            <Video src="/banner_01.mp4" autoPlay loop muted />
          </Box>
        )}

        {media !== 'PC' && (
          <Box w="100vw" h="50vh" pos="relative">
            <Image src="/image1.png" fill alt="banner" objectFit="contain" objectPosition="0 0" />
          </Box>
        )}

        <VStack
          w={{ xl: '50vw' }}
          maxW="900px"
          justify="space-between"
          align="flex-start"
          bottom="80px"
          zIndex={9}
          position={{ xl: 'absolute' }}
          p={{ xl: '2em' }}
        >
          <Title as="h1" textAlign="center" textIndent={{ base: '5vw', xl: 'inherit' }}>
            CodexField
          </Title>

          {media == 'PC' && (
            <Desc fontSize={['28px', '36px']}>
              Empowers developers by providing them with true ownership and control over their code
              assets.
              <br />
              Creates a mutually beneficial ecosystem that fosters the growth of high-quality code.
            </Desc>
          )}

          <Center my={{ base: '40px' }} mx={{ base: 'auto', xl: '0' }}>
            <Link href="/dashboard">
              <BaseButton mx="auto" w={{ base: '90vw', xl: 'auto' }} p="15px 70px">
                <Box fontSize="20px">Start Dapp</Box>
                <ArrowForwardIcon />
              </BaseButton>
            </Link>
          </Center>
        </VStack>
      </Box>
    </Container>
  );
};

const Container = styled(Box)``;

const Title = styled(Box)`
  color: #7a3cff;

  font-size: 40px;
  @media (min-width: ${(props: any) => props.theme.breakpoints.lg}) {
    font-size: 64px;
  }

  font-weight: 700;
`;

const Video = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: right;
`;

export const Desc = styled(Box)`
  color: #eff0f3;
  /* font-size: 36px; */
  font-weight: 400;
  line-height: 1.4;
`;
