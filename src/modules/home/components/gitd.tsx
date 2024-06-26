import { BaseButton } from '@/shared/components/button';
import GitdImage from '@/images/gitd.png';
import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Desc } from './banner';
import { useMedia } from '@/shared/hooks/useMedia';

export const Gitd = () => {
  const media = useMedia();

  return (
    <Container display={{ lg: 'flex' }}>
      <Box pb="20px">
        <Title>
          <Box as="span">Manage Code</Box>
          <br />
          <Box as="span">
            Through{' '}
            <Box as="span" color="#7A3CFF">
              Gitd
            </Box>
          </Box>
          <br />
          <Box as="span">Git for Greenfield</Box>
        </Title>

        {media == 'PC' && (
          <Desc maxW="800px" mt="55px" mb="70px" fontSize={['18px', '24px', '36px']}>
            CodexField provides a code management tool called{' '}
            <Box as="span" color="#7A3CFF">
              gitd
            </Box>
            , fully compatible with Git usage. Use gitd to manage and upload code to{' '}
            <Box as="span" color="#FFC700">
              BNB Greenfield
            </Box>
            .
          </Desc>
        )}

        <BaseButton
          p="15px 40px"
          w={{ base: '100%', xl: 'auto' }}
          my={{ base: '30px', xl: 'auto' }}
        >
          <Link href="https://github.com/codexfield/gitd" target="_blank">
            Download Gitd
          </Link>
        </BaseButton>
      </Box>

      <Box>
        <img src={GitdImage.src} />
      </Box>
    </Container>
  );
};

const Container = styled(Box)`
  justify-content: space-between;

  padding: 15px;
  @media (min-width: ${(props: any) => props.theme.breakpoints.lg}) {
    padding: 60px;
  }
`;

const Title = styled(Box)`
  font-weight: 700;
  line-height: 1.4;

  font-size: 40px;

  @media (min-width: ${(props: any) => props.theme.breakpoints.lg}) {
    font-size: 96px;
  }
`;
