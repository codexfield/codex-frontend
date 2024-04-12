import { Box, Flex, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Desc } from './banner';
import { useMedia } from '@/shared/hooks/useMedia';
import Image from 'next/image';

export const SideBanner = () => {
  const media = useMedia();

  return (
    <Box position="relative">
      {media === 'PC' && <Video src="/banner_02.mp4" autoPlay loop muted />}

      {media !== 'PC' && (
        <Box w="100vw" h="40vh" pos="relative">
          <Image src="/image2.png" fill alt="banner" objectFit="cover" objectPosition="0 0" />
        </Box>
      )}

      <TextContainer
        direction="column"
        w={{ base: '100vw', xl: '50%' }}
        px={{ base: '20px', xl: '40px' }}
        py={{ base: '40px', xl: '30px' }}
        left={{ base: '0', xl: 'auto' }}
        right={{ xl: '0' }}
        bg={{
          base: 'linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0) 100%)',
          xl: 'linear-gradient(270deg, #000 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <Title fontSize={{ base: '32px', md: '48px', lg: '96px' }}>
          <Box as="span">Decentralized</Box>
          <br />
          <Box as="span" color="#7A3CFF">
            Code Storage
          </Box>
        </Title>

        {media === 'PC' && (
          <Desc my={{ lg: '10px' }} fontSize={['16px', '22px', '26px']}>
            CodexField operates by interacting with a decentralized network of storage providers
            (SPs). Users can securely upload their code with unique access and usage permissions.
            The data is then stored off-chain with redundancy and backup, while metadata is stored
            on the BNB Greenfield blockchain.
            <Box textAlign="right">
              <Link href="https://docs.codexfield.com" target="_blank">
                <Box color="#7A3CFF" as="span" fontSize={['12px', '18px', '24px']}>
                  Learn More
                </Box>
              </Link>
            </Box>
          </Desc>
        )}
      </TextContainer>
    </Box>
  );
};

const Title = styled(Box)`
  color: #eff0f3;
  font-weight: 700;
`;

const Video = styled.video`
  height: 60vw;
  object-fit: cover;
`;

const TextContainer = styled(Flex)`
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: content-box;
`;
