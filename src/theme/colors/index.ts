import { dark } from './dark';
import { light } from './light';

export const colors = {
  colors: {
    light: {
      ...light.colors,
    },
    dark: {
      ...dark.colors,
    },
  },
  shadows: {
    light: {
      ...light.shadows,
    },
    dark: {
      ...dark.shadows,
    },
  },
};
