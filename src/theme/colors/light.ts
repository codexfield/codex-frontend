import { rgba } from '@totejs/uikit';

export const light = {
  colors: {
    readable: {
      normal: '#1E2026',
      secondary: '#76808F',
      disabled: '#AEB4BC',
      border: '#E6E8EA',
      white: '#FFFFFF',
      top: {
        secondary: '#474D57',
      },
    },

    bg: {
      bottom: '#F5F5F5',
      walletTab: '#F7F7F7',
      middle: '#000000',
      codebox: '#F0FEFE',
      top: {
        normal: '#F5F5F5',
        active: '#E6E8EA',
      },
    },

    scene: {
      primary: {
        normal: '#F0B90B',
        active: '#58CED2',
        opacity: rgba('#58CED2', 0.1),
        semiOpacity: rgba('#58CED2', 0.15),
      },

      success: {
        normal: '#29CA0E',
        active: '#30EE11',
        opacity: rgba('#30EE11', 0.1),
      },

      danger: {
        normal: '#CA300E',
        active: '#EE3911',
        opacity: rgba('#EE3911', 0.1),
      },

      warning: {
        normal: '#CAA20E',
        active: '#EEBE11',
        opacity: rgba('#EEBE11', 0.1),
      },

      orange: {
        normal: '#EE7C11',
      },
    },
  },

  shadows: {
    normal: '0px 4px 24px rgba(0, 0, 0, 0.04)',
  },
};
