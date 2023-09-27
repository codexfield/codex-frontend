import { Box, Flex } from "@totejs/uikit"
import styled from '@emotion/styled'

export const Footer = () => {
  return <footer>
    <Flex w="1200px" h="30px" m="0 auto" fontWeight="400" justifyContent="space-between">
      <Box as="p" fontWeight="600" fontSize="14px">© 2023 CodexField Labs</Box>

      <Social>
        <a target="_blank" href="https://twitter.com/CodexField">Twitter</a>
        <a target="_blank" href="https://t.me/CodexField">Telegram</a>
        <a target="_blank" href="https://github.com/codexfield">Github</a>
        <a target="_blank" href="https://docs.codexfield.com">Doc</a>
      </Social>
    </Flex>
  </footer>
}

const Social = styled(Box)`
  a {
    margin-left: 40px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
`