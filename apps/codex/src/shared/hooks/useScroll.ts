import { useCallback, useEffect, useState } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onScroll = useCallback((event: any) => {
    const { pageYOffset, scrollY } = window;
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return scrollY;
};
