import { Box, Flex } from "@chakra-ui/react"
import styled from '@emotion/styled'
import Logo from '../../images/logo.svg';

export const Footer = () => {
  return <Container>
    <Flex w="1920px" m="0 auto" fontWeight="400" justifyContent="space-between">
      {/* <Box as="p" fontWeight="600" fontSize="14px">© 2023 CodexField Labs</Box> */}

      <Box>
        <Box>
          <img src={Logo.src} />
        </Box>
        <Box color="#898989" fontSize="24px" w="600px" mt="10px">
        In the future, we also plan to launch blog and course functions, and we will allow developers to generate income from knowledge through knowledge assetization.
        </Box>
      </Box>

      <Social>
        <Box ml="110px">
          <Box fontSize="24px" fontWeight={600}>LEARN</Box>
          <Flex mt="15px" direction="column" justifyContent="space-between" alignItems='flex-start'>
            <a target="_blank" href="https://docs.codexfield.com">Blog</a>
            <a target="_blank" href="https://docs.codexfield.com">FAQS</a>
            <a target="_blank" href="https://docs.codexfield.com">Documentation</a>
          </Flex>
        </Box>

        <Box ml="110px">
          <Box fontSize="24px" fontWeight={600}>CONNECT</Box>
          <Flex mt="15px" direction="column" justifyContent="space-between" alignItems='flex-start'>
            <a target="_blank" href="https://docs.codexfield.com">Blog</a>
            <a target="_blank" href="https://docs.codexfield.com">FAQS</a>
            <a target="_blank" href="https://docs.codexfield.com">Documentation</a>
          </Flex>
        </Box>

        <Box ml="110px">
          <Box fontSize="24px" fontWeight={600}>LINK</Box>
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
  margin: 100px
`

const Social = styled(Flex)`
  a {
    margin-top: 5px;
    color: #898989;
    font-size: 24px;
    font-weight: 300;
  }
`