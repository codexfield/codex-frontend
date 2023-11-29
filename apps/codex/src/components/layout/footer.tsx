import { Box, Flex } from "@chakra-ui/react"
import styled from '@emotion/styled'
import Logo from '../../images/logo.svg';

export const Footer = () => {
  return <Container>
    <Flex maxW="1920px" m="0 auto" fontWeight="400" justifyContent="space-between">

      <Box>
        <Box>
          <img src={Logo.src} />
        </Box>
        <Box color="#898989" fontSize="24px"  mt="10px">
        © 2023 CodexField Labs
        </Box>
      </Box>

      <Social>
        <Box>
          <Title>LEARN</Title>
          <Flex mt="15px" direction="column" justifyContent="space-between" alignItems='flex-start'>
            <a target="_blank" href="https://docs.codexfield.com">Blog</a>
            <a target="_blank" href="https://docs.codexfield.com">FAQS</a>
            <a target="_blank" href="https://docs.codexfield.com">Documentation</a>
          </Flex>
        </Box>

        <Box>
          <Title>CONNECT</Title>
          <Flex mt="15px" direction="column" justifyContent="space-between" alignItems='flex-start'>
            <a target="_blank" href="https://docs.codexfield.com">Blog</a>
            <a target="_blank" href="https://docs.codexfield.com">FAQS</a>
            <a target="_blank" href="https://docs.codexfield.com">Documentation</a>
          </Flex>
        </Box>

        <Box>
          <Title>LINK</Title>
          <Flex mt="15px" direction="column" justifyContent="space-between" alignItems='flex-start'>
            <a target="_blank" href="https://twitter.com/CodexField">Twitter</a>
            <a target="_blank" href="https://t.me/CodexField">Telegram</a>
            <a target="_blank" href="https://github.com/codexfield">Github</a>
          </Flex>
        </Box>
      </Social>
    </Flex>
  </Container>
}

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
`