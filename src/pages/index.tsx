import styled from "@emotion/styled"
import { Box, Button, Flex } from "@totejs/uikit"
// import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';
import Image from 'next/image'
import Link from "next/link"
import { useState } from "react"
import gitd from '../../public/gitd.png'
import iphone from '../../public/iphone.png'

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Box>

      <Box position="relative">
        <video src="/bg_small_ver.mp4" autoPlay loop width="100%" muted />
        <Box
          position="absolute"
          bottom="80px"
          left='50%'
          transform="translateX(-50%)"
        >
          <NavButton variant='ghost' w="380px" h="60px">
            <Link
              href="/explore"
              color="#FFF"
            >Explore</Link>
          </NavButton>
        </Box>
      </Box>

      <Box maxW="1200px" ml="auto" mr="auto" position="relative" pt="120px" pb="300px">
      
      <ShowCase mt="120px" justifyContent="space-between">
        <Box w="500px" pt="80px">
          <Box as="h2">
            Decentralized Code Storage
          </Box>
          <Box as='p' mt="20px" mb="20px" fontWeight="800">
            CodexField provides a code upload tool called gitd, fully compatible with Git usage. Use gitd to upload code to BNB Greenfield.
          </Box>
          <NavButton variant='ghost'>
            <Link target="_blank" href="https://docs.codexfield.com/ ">
              <Box w="110px" h="40px" lineHeight="40px">
                Try it &gt;
              </Box>
            </Link>
          </NavButton>
        </Box>
        <Box w="600">
          <Image src={gitd} width="600" alt="gitd" />
        </Box>
      </ShowCase>

      <ShowCase mt="100px" justifyContent="space-between">
        <Box w="600">
          <Image src={iphone} alt="iphone" />
        </Box>
        <Box>
          <Box as="h2">
            Code Marketplace
          </Box>

          <Box fontSize="16px">
            <Flex mt="40px" fontWeight="900">
              <Tab style={{borderBottom: tabIndex === 0 ? "2px solid #7A3CFF" : ''}} mr="35px" onClick={() => {setTabIndex(0)}}>Sell</Tab>
              <Tab style={{borderBottom: tabIndex === 1 ? "2px solid #7A3CFF" : ''}}  mr="35px" onClick={() => {setTabIndex(1)}}>Buy</Tab>
              <Tab style={{borderBottom: tabIndex === 2 ? "2px solid #7A3CFF" : ''}}  onClick={() => {setTabIndex(2)}}>Rate</Tab>
            </Flex>

            <Box fontSize="16px" w="500px" mt="25px" mb="25px">
              {tabIndex === 0 && <Box>Offer your code for sale at a price of your choosing on our marketplace.</Box> }
              {tabIndex === 1 && <Box>Purchase your desired code from our marketplace.</Box>}
              {tabIndex === 2 && <Box>
                Provide feedback on the code you have purchased from our marketplace.
              </Box>}
            </Box>
          </Box>

          <NavButton variant="ghost">
            <Link href="/explore">
              <Box w="150px" h="40px" lineHeight="40px">
                Learn More &gt;
              </Box>
            </Link>
          </NavButton>
        </Box>
      </ShowCase>

      <Puple right="50px" top="-60px" />
      <Blue bottom="10px" left="20px" />
      
      </Box>

    </Box>
  )
}

const ShowCase = styled(Flex)`
  position: relative;
  z-index: 19;
  max-width: 1200px; 
  margin-left: auto;
  margin-right: auto;
  h2 {
    font-size: 48px;
    font-weight: 800;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    font-weight: 300;
    margin-top: 20px;
    color: #E8E8E8;
  }
`

const NavButton = styled(Button)`
  font-size: 20px;
  font-weight: 800;
  color: #FFF;
  border: "3px solid #FFF";
  border-radius: 5px;
`

const Puple = styled(Box)`
  position: absolute;
  width: 800px;
  height: 800px;
  background: #430B4C;
  box-shadow: 6px 6px 3px;
  border-radius: 100%; 
  filter: blur(500px);
`;

const Blue = styled(Box)`
  font-family: 'Source Code Pro';
  position: absolute;
  width: 800px;
  height: 800px;
  background: #150B4C;
  box-shadow: 6px 6px 3px;
  border-radius: 9999px;
  filter: blur(500px);
`;

const Tab  = styled(Box)`
  padding-bottom: 5px;
  cursor: pointer;
`