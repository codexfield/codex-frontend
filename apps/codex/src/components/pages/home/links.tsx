import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import BNBCHAINLOGO from '@/images/bnbchain.png';
import GITBOOKLOGO from '@/images/gitbook.png';
import Link from 'next/link';

export const Links = () => {
  return (
    <Box>
      <Link target="_blank" href="https://www.bnbchain.org/en/blog/bnb-chain-hackvolution-winners">
        <AdLink justifyContent="space-between" role="group">
          <Title>BNB HACKATHON</Title>
          <Info direction="column" justifyContent="space-between" alignItems="flex-end">
            <InfoTitle
              _groupHover={{
                color: '#000',
              }}
            >
              1st place infrastructure
            </InfoTitle>
            <Date
              _groupHover={{
                color: '#000',
              }}
            >
              September 27
            </Date>
            <Box>
              <img src={BNBCHAINLOGO.src} />
            </Box>
          </Info>
        </AdLink>
      </Link>
      <Link target="_blank" href="https://www.youtube.com/watch?v=W5md4N4BhN8">
        <AdLink justifyContent="space-between" role="group">
          <Title>WINNER DEMO DAY</Title>
          <Info direction="column" justifyContent="space-between" alignItems="flex-end">
            <InfoTitle
              _groupHover={{
                color: '#000',
              }}
            >
              SPEAKERS
            </InfoTitle>
            <Date
              _groupHover={{
                color: '#000',
              }}
            >
              October 12
            </Date>
            <Box>
              <img src={BNBCHAINLOGO.src} />
            </Box>
          </Info>
        </AdLink>
      </Link>
      <Link
        target="_blank"
        href="https://www.bnbchain.org/en/blog/greenfield-dapp-exploration-series-codex-field"
      >
        <AdLink justifyContent="space-between" role="group">
          <Title>DATA OWNERSHIP</Title>
          <Info direction="column" justifyContent="space-between" alignItems="flex-end">
            <InfoTitle
              _groupHover={{
                color: '#000',
              }}
            >
              Greenfield dApp Exploration Series: CodexField
            </InfoTitle>
            <Date
              _groupHover={{
                color: '#000',
              }}
            >
              September 27
            </Date>
            <Box>
              <img src={BNBCHAINLOGO.src} />
            </Box>
          </Info>
        </AdLink>
      </Link>
      <Link target="_blank" href="https://docs.codexfield.com">
        <AdLink justifyContent="space-between" role="group">
          <Title>LEARN MORE</Title>
          <Info direction="column" justifyContent="space-between" alignItems="flex-end">
            <InfoTitle
              _groupHover={{
                color: '#000',
              }}
            >
              Learn how codexfield works
            </InfoTitle>
            <Date
              _groupHover={{
                color: '#000',
              }}
            >
              September 27
            </Date>
            <Box>
              <img src={GITBOOKLOGO.src} />
            </Box>
          </Info>
        </AdLink>
      </Link>
    </Box>
  );
};

const Title = styled(Box)`
  font-size: 38px;
  @media (min-width: ${(props: any) => props.theme.breakpoints.md}) {
    font-size: 48px;
  }
  @media (min-width: ${(props: any) => props.theme.breakpoints.xl}) {
    font-size: 96px;
  }
  font-weight: 900;
`;

const Info = styled(Flex)`
  text-transform: uppercase;
  color: #ffffff;

  font-size: 24px;
  @media (min-width: ${(props: any) => props.theme.breakpoints.md}) {
    font-size: 28px;
  }
  @media (min-width: ${(props: any) => props.theme.breakpoints.xl}) {
    font-size: 32px;
  }
  line-height: 1.4;
`;

const InfoTitle = styled(Box)`
  font-weight: 600;
  text-align: right;
`;
const Date = styled(Box)`
  font-weight: 400;
`;

const AdLink = styled(Flex)`
  &:nth-child(1) {
    border-top: 1px solid #ffffff;
  }
  border-bottom: 1px solid #ffffff;
  color: #ffffff;
  padding: 50px;

  &:hover {
    background: #fff;
    color: #000000;
  }
`;
