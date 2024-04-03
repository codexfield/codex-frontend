import { Banner } from '@/modules/home/components/banner';
import { Gitd } from '@/modules/home/components/gitd';
import { Links } from '@/modules/home/components/links';
import { RoadMap } from '@/modules/home/components/roadmap';
import { SideBanner } from '@/modules/home/components/sideBanner';
import { Slogon } from '@/modules/home/components/slogon';
import { useMedia } from '@/shared/hooks/useMedia';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Home: React.FC = () => {
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
};

const Hr = styled(Box)`
  height: 2px;
  background: #fff;
`;
