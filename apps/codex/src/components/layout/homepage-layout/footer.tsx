import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Logo from '@/images/logo.svg';

export const Footer = () => {
  return (
    <Container>
      <Box
        maxW="1920px"
        mx="auto"
        fontWeight="400"
        justifyContent="space-between"
        flexDir="row-reverse"
        display={{ lg: 'flex' }}
      >
        <Social>
          <Box>
            <Title>LEARN</Title>
            <Flex
              mt="15px"
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <a
                target="_blank"
                href="https://www.bnbchain.org/en/blog/greenfield-dapp-exploration-series-codex-field"
              >
                Blog
              </a>
              <a target="_blank" href="https://docs.codexfield.com/other/whitepaper">
                Whitepaper
              </a>
              <a target="_blank" href="https://docs.codexfield.com">
                Documents
              </a>
            </Flex>
          </Box>

          <Box>
            <Title>CONNECT</Title>
            <Flex
              mt="15px"
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <a target="_blank" href="https://linktr.ee/codexfield">
                Linktree
              </a>
              <a target="_blank" href="mailto:support@codexfield.com">
                Support
              </a>
              <a target="_blank" href="mailto:contact@codexfield.com">
                Contact
              </a>
            </Flex>
          </Box>

          <Box>
            <Title>LINK</Title>
            <Flex
              mt="15px"
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <a target="_blank" href="https://twitter.com/CodexField">
                Twitter
              </a>
              <a target="_blank" href="https://t.me/CodexField">
                Telegram
              </a>
              <a target="_blank" href="https://github.com/codexfield">
                Github
              </a>
            </Flex>
          </Box>
        </Social>

        <Box mt={{ base: '20px', lg: '0' }}>
          <Box>
            <img src={Logo.src} />
          </Box>
          <Box color="#898989" fontSize="24px" mt="10px">
            © 2024 CodexField Labs
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const Container = styled.footer`
  margin: 100px;
`;

const Social = styled(Flex)`
  a {
    margin-top: 5px;
    color: #898989;
    font-size: 24px;
    font-weight: 300;
  }
  gap: 5em;
`;

const Title = styled(Box)`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;
