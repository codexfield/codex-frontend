import { Theme } from '@totejs/uikit';

import { colors } from './colors';

export const theme: Theme = {
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    storageKey: 'marketplace-color-mode',
  },

  ...colors,

  styles: {
    global: {
      body: {
        bg: 'bg.bottom',
        color: 'readable.normal',
        lineHeight: 'normal',
        WebkitTapHighlightColor: 'transparent',
      },
    },
  },

  fonts: {
    body: "Source Code Pro",
    heading: "Source Code Pro",
    mono: "Source Code Pro, monospace",
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
