console.log('📦 theme.ts MODULE LOADING');

import { colors } from './colors';
console.log('✅ colors imported');

import { typography } from './typography';
console.log('✅ typography imported');

import { spacing, borderRadius, layout } from './spacing';
console.log('✅ spacing, borderRadius, layout imported');

import { responsive } from './responsive';
console.log('✅ responsive imported');

/**
 * Complete Theme Configuration
 */

console.log('🎨 Creating theme object');

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

console.log('✅ theme object created successfully');
console.log('   Checking theme.colors.primary[600]:', theme.colors.primary[600], typeof theme.colors.primary[600]);
console.log('   Checking theme.colors.background.primary:', theme.colors.background.primary, typeof theme.colors.background.primary);

export type Theme = typeof theme;
