import { useScroll } from '@/shared/hooks/useScroll';
import SlogonImage from '@/images/slogon.svg';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const IMAGE_H = 190;

export const Slogon = () => {
  const ref = useRef<HTMLDivElement>();
  const y = useScroll();
  const [posY, setPosY] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const windHeight = window.innerHeight || document.documentElement.clientHeight;
    const windWidth = window.innerWidth || document.documentElement.clientWidth;

    const { top, bottom, height } = ref.current.getBoundingClientRect();

    const ratio = SlogonImage.width / SlogonImage.height;
    const isView = top >= 0 && bottom <= windHeight;

    if (!isView) return;

    const process = (windHeight - bottom) / (windHeight - height);
    const p = Number((IMAGE_H * ratio - windWidth) * process);
    setPosY(p);
  }, [y]);

  return (
    <SlogonContainer
      ref={ref}
      style={{
        backgroundPosition: `-${posY}px center`,
      }}
      title="The Truly Decentralized Platform to Store, Share and Trade Code."
    />
  );
};

const SlogonContainer = styled(Box)`
  height: ${IMAGE_H}px;
  background-image: url(${SlogonImage.src});
  background-repeat: no-repeat;
  /* background-position: left center; */
  background-size: cover;
  margin: 60px 0;
`;
