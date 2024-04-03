import { BaseButton } from '@/components/ui/button';
import GitdImage from '@/images/gitd.png';
import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Desc } from './banner';

export const Gitd = () => {
  return (
    <Container p="60px" display={{ lg: 'flex' }}>
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

        <BaseButton p="15px 40px">
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
`;

const Title = styled(Box)`
  font-weight: 700;
  font-size: 96px;
  line-height: 1.4;
`;
