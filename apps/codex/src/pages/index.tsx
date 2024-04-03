import { Banner } from '@/components/pages/home/banner';
import { Gitd } from '@/components/pages/home/gitd';
import { Links } from '@/components/pages/home/links';
import { RoadMap } from '@/components/pages/home/roadmap';
import { SideBanner } from '@/components/pages/home/sideBanner';
import { Slogon } from '@/components/pages/home/slogon';
import { useMedia } from '@/hooks/useMedia';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function Home() {
  const media = useMedia();

  return (
    <Box>
      <Banner />

      {media === 'PC' && <Slogon />}

      <Box maxW="1920px" ml="auto" mr="auto">
        {media === 'PC' && <Hr mb="60px" />}

        <SideBanner />
        <Gitd />
        <RoadMap />
        <Links />
      </Box>
    </Box>
  );
}

Home.displayName = 'Home';

const Hr = styled(Box)`
  height: 2px;
  background: #fff;
`;
