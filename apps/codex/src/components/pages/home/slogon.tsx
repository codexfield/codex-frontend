import styled from "@emotion/styled"
import SlogonImage from '@/images/slogon.png'
import { Box, css } from "@chakra-ui/react"
import { useScroll } from "@/hooks/useScroll"

export const Slogon = () => {
  const y = useScroll()

  return <SlogonContainer yy={y} title="The Truly Decentralized Platform to Store, Share and Trade Code." />
}

const SlogonContainer = styled(Box)`
  height: 190px;
  background-image: url(${SlogonImage.src});
  background-repeat: no-repeat;
  /* background-position: left center; */
  background-size: cover;
  margin: 60px 0;
  background-position: -${(props: any) => {
    if (Math.abs(props.yy) > 800) return 'right';
    return props.yy - 200 + 'px';
  }} center;
`