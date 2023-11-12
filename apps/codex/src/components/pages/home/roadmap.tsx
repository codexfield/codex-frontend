import { Box, Flex } from "@chakra-ui/react"
import styled from '@emotion/styled'

export const RoadMap = () => {
  return <Box p="0 60px">
    <Title>RoadMap</Title>

    <Box color="#EFF0F3" fontSize="24px" lineHeight={1.4} as="p">
      So far, our progress has been very smooth. We have won the <Box as="span" color="7A3CFF">1st place in the infra track</Box> in the hackathon hosted by <Box as="span" color="#FFC700">@BNBCHAIN</Box>, and have already realized the core functions of the protocol. 
      <br/>
      Next, we are dedicated to optimizing the product experience.
    </Box>

    <Flex mt="140px" wrap="wrap" gap="90px" justifyContent='space-between'>
      <Card>
        <CardTitle>
          <Box as="span">Q2</Box>
          <br/>
          <Box as="span">2023</Box>
        </CardTitle>
        <CardDesc>
          Completed the development of the Gitd tool.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q3</Box>
          <br/>
          <Box as="span">2023</Box>
        </CardTitle>
        <CardDesc>
        Completed the function of storing code on BNBGreenfield via Gitd.
        <br />
        Implemented the <Box as="span" color="#048118">code trading</Box>function.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q4</Box>
          <br/>
          <Box as="span">2023</Box>
        </CardTitle>
        <CardDesc>
        Participated in the <Box as="span" color="#FFC700">BNBCHAIN Hackathon</Box> and won <Box as="span" color="#7A3CFF">1st place in the infra track</Box>.
        <br/>
        Optimized CodexField product interaction logic & UI.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q1</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
        Launch the code storage function with optimized interaction logic.
        <br />
        Launch the <Box as="span" color="#7A3CFF">Dashboard page</Box> and the shared code list page.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q2</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
          Completed the development of the Gitd tool.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q3</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
        Completed the function of storing code on BNBGreenfield via Gitd.
        <br />
        Implemented the <Box as="span" color="#048118">code trading</Box>function.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q4</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
        Participated in the <Box as="span" color="#FFC700">BNBCHAIN Hackathon</Box> and won <Box as="span" color="#7A3CFF">1st place in the infra track</Box>.
        <br/>
        Optimized CodexField product interaction logic & UI.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q1</Box>
          <br/>
          <Box as="span">2025</Box>
        </CardTitle>
        <CardDesc>
        Launch the code storage function with optimized interaction logic.
        <br />
        Launch the <Box as="span" color="#7A3CFF">Dashboard page</Box> and the shared code list page.
        </CardDesc>
      </Card>
    </Flex>
  </Box>
}

const Title = styled(Box)`
  font-size: 96px;
  color: #EFF0F3;
  font-weight: 700;
`

const Card = styled(Box)`
  color: #FFF;
  width: calc(25% - 80px);
  margin-bottom: 100px;
  border-top: 1px solid #EFF0F3;
`

const CardTitle = styled(Box)`
  font-size: 48px;
  line-height: 1.4;
  
  & > span:nth-child(1) {
    font-weight: 700;
  }
`
const CardDesc = styled(Box)`
  margin-top: 120px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  color: #EFF0F3;
`