import { Box, Flex } from "@chakra-ui/react"
import styled from '@emotion/styled'

export const RoadMap = () => {
  return <Box p="0 60px">
    <Title>RoadMap</Title>

    <Box color="#EFF0F3" fontSize="24px" lineHeight={1.4} as="p" maxW="800px" mb="140px">
      Our progress has been smooth. We won <Box as="span" color="#7A3CFF">first place in the infra track</Box> at the hackathon hosted by <Box as="span" color="#FFC700">@BNBCHAIN</Box> and have implemented the core functions of the protocol. Now, our focus is on optimizing the product experience.
    </Box>

    <Row
      wrap="wrap"
      gap="90px" 
      justifyContent='space-between'
    >
      <Card>
        <CardTitle>
          <Box as="span">Q2</Box>
          <br/>
          <Box as="span">2023</Box>
        </CardTitle>
        <CardDesc>
        Learn <Box as="span" color="#FFC700">BNB Greenfield</Box> whitepaper and related documents.

        <Space />
        Coming up with an initial idea for decentralized code storage.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q3</Box>
          <br/>
          <Box as="span">2023</Box>
        </CardTitle>
        <CardDesc>
        CodexField Proof of Concept on Greenfield Testnet: Decentralized Code Storage and Code Marketplace
        <Space />
        <Box as="span" color="#FFC700">BNBChain Hackvolution</Box>: <Box as="span" color="#7A3CFF">First place in the Infura track</Box>
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q4</Box>
          <br/>
          <Box as="span">2023</Box>
        </CardTitle>
        <CardDesc>
          Optimize CodexField: Enhance interaction logic and user interface.

          <Space />

          Decentralized Code Storage: Enhance <Box as="span" color="#7A3CFF"> &quot;gitd&quot;</Box> and display code repository on the frontend.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q1</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
        Massive Adoption: Solving the transaction fee and storage fee issues for CodexField users.
        <Space />
        Sync with GitHub: Users can seamlessly <Box as="span" color="#7A3CFF">migrate their code from GitHub to </Box><Box as="span" color="#FFC700">Greenfield.</Box>
        </CardDesc>
      </Card>
    </Row>
    <Row
      wrap="wrap"
      gap="90px"
      justifyContent='space-between'
    >
      <Card>
        <CardTitle>
          <Box as="span">Q2</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
          Promote with Partners: Attract a large number of developers to use decentralized code storage.

          <Space />
          Mainnet Launch: Deploy CodexField to <Box as="span" color="#FFC700">Greenfield Mainnet</Box>.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q3</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
        Code Marketplace: Enabling <Box as="span" color="#7A3CFF">Code Trading</Box> Functionality.
        <Space />
        Reputation System: Achieve a good reputation through high-quality output.
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q4</Box>
          <br/>
          <Box as="span">2024</Box>
        </CardTitle>
        <CardDesc>
        <Box as="span" color="#7A3CFF">Tech Blog</Box>: A Decentralized Technology Sharing Column Designed for Developers
        </CardDesc>
      </Card>
      <Card>
        <CardTitle>
          <Box as="span">Q1</Box>
          <br/>
          <Box as="span">2025</Box>
        </CardTitle>
        <CardDesc>
        Lauch Token: Incentivizing High-Quality Creations through Token Economics.
        <Space />
        Tech Courses: Creating a <Box as="span" color="#7A3CFF">Knowledge-Paid Course Platform</Box> for Developers
        </CardDesc>
      </Card>
    </Row>
  </Box>
}

const Title = styled(Box)`
  font-size: 96px;
  color: #EFF0F3;
  font-weight: 700;
`

const Row = styled(Flex)`
  align-items: stretch;
`

const Card = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  color: #FFF;
  width: calc(25% - 80px);
  flex: 1;
  font-weight: 500;
  border-top: 1px solid #EFF0F3;
  margin-bottom: 100px;
`

const CardTitle = styled(Box)`
  font-size: 48px;
  line-height: 1.4;
  
  & > span:nth-child(1) {
    font-weight: 700;
  }
`
const CardDesc = styled(Box)`
  margin-top: 80px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  color: #EFF0F3;
`

const Space = styled(Box)`
  height: 40px;
`