import { Box, Flex, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Desc } from './banner';

export const SideBanner = () => {
  return (
    <Box position="relative">
      <Video src="/banner_02.mp4" autoPlay loop muted />

      <TextContainer direction="column" w={{ xl: '50%' }} padding={{ base: '10px', xl: '40px' }}>
        <Title fontSize={{ base: '32px', md: '48px', lg: '96px' }}>
          <Box as="span">Decentralized</Box>
          <br />
          <Box as="span" color="#7A3CFF">
            Code Storage
          </Box>
        </Title>

        <Desc my={{ lg: '10px' }} fontSize={['16px', '22px', '26px']}>
          CodexField operates by interacting with a decentralized network of storage providers
          (SPs). Users can securely upload their code with unique access and usage permissions. The
          data is then stored off-chain with redundancy and backup, while metadata is stored on the
          BNB Greenfield blockchain.
          <Box textAlign="right">
            <Link href="https://docs.codexfield.com" target="_blank">
              <Box color="#7A3CFF" as="span" fontSize={['12px', '18px', '24px']}>
                Learn More
              </Box>
            </Link>
          </Box>
        </Desc>
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
  background: linear-gradient(270deg, #000 0%, rgba(0, 0, 0, 0) 100%);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: content-box;
`;
