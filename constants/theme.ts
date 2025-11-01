console.log('📦 theme.ts MODULE LOADING');

import { colors, darkColors } from './colors';
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

// Dark theme
export const darkTheme = {
  ...theme,
  colors: {
    ...colors,
    ...darkColors,
    // Merge deep objects
    primary: darkColors.primary,
    background: darkColors.background,
    text: darkColors.text,
    border: darkColors.border,
    success: darkColors.success,
    warning: darkColors.warning,
    danger: darkColors.danger,
    // Keep rest of colors from light theme
    info: colors.info,
    accent: colors.accent,
    secondary: colors.secondary,
    neutral: colors.neutral,
    transaction: colors.transaction,
    categories: colors.categories,
    shadow: colors.shadow,
  },
  shadows: {
    sm: {
      shadowColor: colors.shadow.main,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    base: {
      shadowColor: colors.shadow.main,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: colors.shadow.dark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5,
    },
    primary: {
      shadowColor: colors.primary[600],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

// Helper function to get theme based on mode with optional custom background and card color
export const getTheme = (mode: 'light' | 'dark', customBackgroundColor?: string | null, customCardColor?: string | null) => {
  const baseTheme = mode === 'dark' ? darkTheme : theme;

  // If custom colors are provided, override them
  if (customBackgroundColor || customCardColor) {
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: {
          ...baseTheme.colors.background,
          ...(customBackgroundColor ? { secondary: customBackgroundColor } : {}),
          ...(customCardColor ? { primary: customCardColor } : {}),
        },
      },
    };
  }

  return baseTheme;
};

export type Theme = typeof theme;
