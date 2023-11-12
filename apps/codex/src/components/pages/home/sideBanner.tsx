import { Box, Flex, Link, VStack } from "@chakra-ui/react"
import styled from '@emotion/styled'
import { Desc } from "./banner"

export const SideBanner = () => {
  return (
    <Box position="relative" h="840px">
      <Box position="absolute">
        <video src="/banner_02.mp4" autoPlay loop width="100%" muted />
      </Box>

      <Flex direction="column" w="800px" position="absolute" right="40px" bottom="50px">
        <Title>
          <Box as="span">Decentralized</Box>
          <br/>
          <Box as="span" color="#7A3CFF">Code Storage</Box>
        </Title>

        <Desc mt="10px" mb="10px">
          CodexField operates by interacting with a decentralized network of storage providers (SPs). Users can securely upload their code with unique access and usage permissions. The data is then stored off-chain with redundancy and backup, while metadata is stored on the BNB Greenfield blockchain.

          <Box textAlign='right'>
            <Link href="" target="_blank">
              <Box color="#7A3CFF" as="span">Learn More</Box>
            </Link>
          </Box>
        </Desc>
      </Flex>

    </Box>
  )
}

const Title = styled(Box)`
  color: #EFF0F3;
  font-size: 96px;
  font-weight: 700;
`