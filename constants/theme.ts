import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, layout } from './spacing';
import responsive from './responsive';

/**
 * Complete Theme Configuration
 */

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  layout,
  responsive,

  // Shadows
  shadows: {
    sm: {
      shadowColor: colors.shadow.main,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    base: {
      shadowColor: colors.shadow.main,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: colors.shadow.dark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    // Primary button shadow (green glow)
    primary: {
      shadowColor: colors.primary[600],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
  },

  // Animation
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: 'ease-in-out',
  },
};

export type Theme = typeof theme;
