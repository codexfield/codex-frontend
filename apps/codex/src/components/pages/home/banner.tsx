import { BaseButton } from '@/components/ui/button';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';

export const Banner = () => {
  return (
    <Container>
      <Box position="relative">
        <Box>
          <Video src="/banner_01.mp4" autoPlay loop muted />
        </Box>

        <VStack
          w="50vw"
          maxW="900px"
          justify="space-between"
          align="flex-start"
          position="absolute"
          bottom="80px"
          zIndex={9}
          ml="auto"
          mr="auto"
          p="5rem"
        >
          <Title as="h1">CodexField</Title>
          <Desc as="p">
            Empowers developers by providing them with true ownership and control over their code
            assets.
            <br />
            Creates a mutually beneficial ecosystem that fosters the growth of high-quality code.
          </Desc>
          <Box mt="40px">
            <Link href="/dashboard">
              <BaseButton p="15px 70px">
                <Box as="span" mr="5px">
                  Start Dapp
                </Box>
                <ArrowForwardIcon />
              </BaseButton>
            </Link>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

const Container = styled(Box)``;

const Title = styled(Box)`
  color: #7a3cff;
  font-size: 64px;
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
  font-size: 36px;
  font-weight: 400;
  line-height: 1.4;
`;
