import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';

const myTheme = {
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    // storageKey: 'marketplace-color-mode',
  },

  ...colors,

  styles: {
    global: {
      body: {
        bg: '#000',
        color: '#FFF',
        lineHeight: 'normal',
        WebkitTapHighlightColor: 'transparent',
      },
    },
  },

  fonts: {
    body: 'Commissioner',
    heading: 'Commissioner',
    mono: 'Commissioner, Source Code Pro, monospace',
  },

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

export const theme = extendTheme(myTheme);
