import { useBreakpointValue } from '@chakra-ui/react';

export const useMedia = (): 'MOBILE' | 'TABLET' | 'PC' => {
  return (
    useBreakpointValue({
      base: 'MOBILE',
      md: 'TABLET',
      lg: 'PC',
    }) || 'PC'
  );
};
