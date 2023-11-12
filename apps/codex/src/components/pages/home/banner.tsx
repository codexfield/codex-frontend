import { BaseButton } from "@/components/ui/button"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, VStack } from "@chakra-ui/react"
import styled from '@emotion/styled'
import Link from "next/link"

export const Banner = () => {
  return <Container>
    <Box position="relative" h="100vh" overflow="hidden">
      <Box position="absolute" left="0" right="0">
        <video src="/banner_01.mp4" width="100%" autoPlay loop muted />
      </Box>

      <VStack
        w="50vw"
        justify="space-between"
        align="flex-start"
        position="absolute"
        zIndex={100}
        ml="auto"
        mr="auto"
        p="5rem"
      >
        <Title as="h1">CodexField</Title>
        <Desc as="p">
        Empowers developers by providing them with true ownership and control over their code assets. Creates a mutually beneficial ecosystem that fosters the growth of high-quality code.
        </Desc>
        <Box mt="40px">
          <BaseButton p="15px 70px">
            <Link href="/">
              <Box as="span" mr="5px">Start Dapp</Box> <ArrowForwardIcon />
            </Link>
          </BaseButton>
        </Box>
      </VStack>
    </Box>
  </Container>
}

const Container = styled(Box)`
`

const Title = styled(Box)`
  color: #7A3CFF;
  font-size: 64px;
  font-weight: 700;
`

export const Desc = styled(Box)`
  color: #EFF0F3;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.4;
`