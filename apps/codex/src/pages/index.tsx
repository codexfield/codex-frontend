import { Banner } from "@/components/pages/home/banner"
import { Gitd } from "@/components/pages/home/gitd"
import { Links } from "@/components/pages/home/links"
import { RoadMap } from "@/components/pages/home/roadmap"
import { SideBanner } from "@/components/pages/home/sideBanner"
import SlogonImage from '@/images/slogon.png'
import { Box } from "@chakra-ui/react"
import styled from "@emotion/styled"

export default function Home() {
  return (
    <Box w="1920px" ml="auto" mr="auto">
      <Banner />

      <Slogon title="The Truly Decentralized Platform to Store, Share and Trade Code." />

      <Hr mb="60px" />

      <SideBanner />

      <Gitd />

      <RoadMap />

      <Links />

    </Box>
  )
}

const Slogon = styled(Box)`
  height: 190px;
  background: url(${SlogonImage.src}) no-repeat center center;
  background-size: cover;
  margin: 60px 0;
`

const Hr = styled(Box)`
  height: 2px;
  background: #fff;
`
