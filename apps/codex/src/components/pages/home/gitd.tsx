import styled from '@emotion/styled'
import { Box, Flex } from "@chakra-ui/react"
import { Desc } from './banner'
import { BaseButton } from '@/components/ui/button'
import { DownloadIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import GitdImage from '@/images/gitd.png'

export const Gitd = () => {
  return <Container p="60px">
    <Box>
      <Title>
        <Box as="span">Git for CodexField</Box>
        <br />
        <Box as="span">Manage Code</Box>
        <br />
        <Box as="span">Through <Box as="span" color="#7A3CFF">Gitd</Box></Box>
      </Title>

      <Desc maxW="800px" mb="70px">
      The <Box as="span" color="#FFC700">Gitd tool</Box> is fully compatible with Git&#39;s functionality and usage, enabling developers to use Gitd for version control and code submission. Here is the guide on how to use Gitd to manage your code.
      </Desc>

      <BaseButton p="15px 40px">
        <Link href="https://github.com/codexfield/gitd" target='_blank'>
          Download Gitd
        </Link>
      </BaseButton>
    </Box>
    
    <Box>
      <img src={GitdImage.src} />
    </Box>
  </Container>
}

const Container = styled(Flex)`
  justify-content: space-between;
`

const Title = styled(Box)`
  font-size: 96px;
  line-height: 1.4;
`