/**
 * Spacing System (4px base unit)
 * Used for padding, margin, gaps
 */

export const spacing = {
  0: 0,
  1: 4,    // 4px
  2: 8,    // 8px
  3: 12,   // 12px
  4: 16,   // 16px
  5: 20,   // 20px
  6: 24,   // 24px
  8: 32,   // 32px
  10: 40,  // 40px
  12: 48,  // 48px
  16: 64,  // 64px
  20: 80,  // 80px
  24: 96,  // 96px
};

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,  // Main card radius (matches screens)
  full: 9999,
};

export const layout = {
  // Screen padding
  screenPadding: spacing[4],  // 16px

  // Card padding
  cardPadding: spacing[4],    // 16px

  // List item height
  listItemHeight: 64,
  listItemHeightLarge: 72,

  // Input height
  inputHeight: 48,

  // Button height
  buttonHeight: 48,
  buttonHeightLarge: 56,

  // Touch target minimum
  touchTarget: 44,

  // Bottom tab bar height
  tabBarHeight: 60,

  // Header height
  headerHeight: 56,
};
