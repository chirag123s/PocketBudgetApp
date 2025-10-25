/**
 * Responsive Design Utilities
 *
 * This file provides utilities for creating responsive layouts that work
 * consistently across different screen sizes (mobile, tablet, desktop).
 *
 * USAGE:
 * import { scale, verticalScale, moderateScale, wp, hp, isSmallDevice, breakpoints } from '@/constants/responsive';
 *
 * // Scale based on width
 * fontSize: scale(16)  // Will be 16 on base device, scale proportionally on others
 *
 * // Scale based on height
 * marginTop: verticalScale(20)
 *
 * // Moderate scale (less aggressive)
 * padding: moderateScale(10)
 *
 * // Width/Height percentages
 * width: wp(50)  // 50% of screen width
 * height: hp(30) // 30% of screen height
 *
 * // Conditional rendering
 * {isTablet && <TabletView />}
 *
 * // Breakpoint-based styling
 * fontSize: breakpoints.isSmall ? 14 : breakpoints.isLarge ? 20 : 16
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro / iPhone X size - 375x812)
// We use this as our design reference
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * DEVICE TYPE DETECTION
 */

// Detect device type based on screen width
export const isSmallDevice = SCREEN_WIDTH < 375; // iPhone SE
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;
export const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;
export const isDesktop = SCREEN_WIDTH >= 1024;

// Check if web platform
export const isWeb = Platform.OS === 'web';

/**
 * BREAKPOINTS
 * Use these for conditional rendering or styling
 */

export const breakpoints = {
  isSmall: SCREEN_WIDTH < 375,
  isMedium: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768,
  isLarge: SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024,
  isXLarge: SCREEN_WIDTH >= 1024,

  // Named breakpoints
  phone: SCREEN_WIDTH < 768,
  tablet: SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024,
  desktop: SCREEN_WIDTH >= 1024,

  // Actual dimensions
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

/**
 * SCALING FUNCTIONS
 * These scale values proportionally based on screen size
 */

/**
 * Scale based on screen WIDTH
 * Use for: fontSize, borderRadius, horizontal margins/padding
 *
 * Example: scale(16) will be 16px on base device (375w),
 *          ~21px on tablet (768w), ~32px on desktop (1024w)
 */
export const scale = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Scale based on screen HEIGHT
 * Use for: vertical margins/padding, heights
 *
 * Example: verticalScale(20) will be 20px on base device (812h),
 *          scales proportionally on taller/shorter screens
 */
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Moderate Scale - Less aggressive scaling
 * Use for: general spacing, sizes that shouldn't scale too much
 *
 * Factor of 0.5 means it scales half as much as linear scaling
 * Prevents UI from becoming too large on tablets/desktop
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * PERCENTAGE DIMENSIONS
 * Responsive width/height based on screen percentage
 */

/**
 * Width Percentage
 * wp(50) = 50% of screen width
 */
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Height Percentage
 * hp(30) = 30% of screen height
 */
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * FONT SCALING
 * Platform-aware font scaling with pixel ratio normalization
 */

/**
 * Normalize font size for consistent rendering across devices
 * Accounts for pixel density
 */
const normalizeFontSize = (size: number): number => {
  const newSize = size * scale(1);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

/**
 * Responsive font sizes
 * These automatically scale but have min/max limits to prevent extremes
 */
export const fontSize = {
  // Headings
  h1: Math.min(normalizeFontSize(32), 48),  // Max 48px
  h2: Math.min(normalizeFontSize(28), 40),  // Max 40px
  h3: Math.min(normalizeFontSize(24), 32),  // Max 32px
  h4: Math.min(normalizeFontSize(20), 28),  // Max 28px

  // Body text
  large: Math.min(normalizeFontSize(18), 24),   // Max 24px
  body: Math.min(normalizeFontSize(16), 20),    // Max 20px
  bodySmall: Math.min(normalizeFontSize(14), 18), // Max 18px

  // UI elements
  button: Math.min(normalizeFontSize(16), 20),
  label: Math.min(normalizeFontSize(14), 18),
  caption: Math.min(normalizeFontSize(12), 16),
  tiny: Math.min(normalizeFontSize(10), 14),
};

/**
 * RESPONSIVE SPACING
 * Scale spacing based on screen size but keep it reasonable
 */

export const spacing = {
  xs: moderateScale(4),   // ~4-6px
  sm: moderateScale(8),   // ~8-12px
  md: moderateScale(16),  // ~16-24px
  lg: moderateScale(24),  // ~24-32px
  xl: moderateScale(32),  // ~32-40px
  xxl: moderateScale(48), // ~48-60px
};

/**
 * CONTAINER CONSTRAINTS
 * Maximum widths to prevent content from stretching too much on large screens
 */

export const maxWidth = {
  content: 1200,  // Maximum content width on desktop
  card: 600,      // Maximum card width
  mobile: 480,    // Mobile-optimized max width
};

/**
 * HELPER: Get responsive container width
 * Constrains content width on large screens while staying full-width on mobile
 */
export const getContainerWidth = (): number => {
  if (isDesktop) {
    return Math.min(SCREEN_WIDTH * 0.9, maxWidth.content);
  } else if (isTablet) {
    return SCREEN_WIDTH * 0.95;
  } else {
    return SCREEN_WIDTH; // Full width on phone
  }
};

/**
 * HELPER: Get responsive padding
 * Returns appropriate padding based on device type
 */
export const getScreenPadding = (): number => {
  if (isDesktop) return spacing.xxl;
  if (isTablet) return spacing.xl;
  if (isMediumDevice) return spacing.lg;
  return spacing.md; // Small devices
};

/**
 * HELPER: Get column count for grids
 * Returns appropriate number of columns based on screen width
 */
export const getGridColumns = (): number => {
  if (isDesktop) return 4;
  if (isTablet) return 3;
  if (isMediumDevice) return 2;
  return 1; // Small devices
};

/**
 * HELPER: Check if content should be centered on web
 * On web desktop, we want to center content; on mobile, full width is fine
 */
export const shouldCenterContent = (): boolean => {
  return isWeb && isDesktop;
};

/**
 * RESPONSIVE ICON SIZES
 */
export const iconSize = {
  tiny: moderateScale(12),
  small: moderateScale(16),
  medium: moderateScale(24),
  large: moderateScale(32),
  xlarge: moderateScale(48),
  hero: moderateScale(64),
};

/**
 * RESPONSIVE BUTTON HEIGHTS
 */
export const buttonHeight = {
  small: moderateScale(36),
  medium: moderateScale(44),
  large: moderateScale(52),
};

/**
 * EXAMPLE USAGE IN COMPONENTS:
 *
 * import { scale, moderateScale, fontSize, spacing, wp, hp, breakpoints } from '@/constants/responsive';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     padding: spacing.md,  // Responsive padding
 *     width: wp(90),        // 90% of screen width
 *   },
 *   title: {
 *     fontSize: fontSize.h1,  // Auto-scaled heading
 *     marginBottom: spacing.lg,
 *   },
 *   icon: {
 *     width: moderateScale(24),   // Scales moderately
 *     height: moderateScale(24),
 *   },
 *   card: {
 *     borderRadius: scale(12),  // Scales with screen
 *     maxWidth: breakpoints.phone ? '100%' : 600,  // Full width on phone, max 600 on tablet+
 *   },
 * });
 */

export default {
  scale,
  verticalScale,
  moderateScale,
  wp,
  hp,
  fontSize,
  spacing,
  iconSize,
  buttonHeight,
  breakpoints,
  isSmallDevice,
  isMediumDevice,
  isTablet,
  isDesktop,
  isWeb,
  maxWidth,
  getContainerWidth,
  getScreenPadding,
  getGridColumns,
  shouldCenterContent,
};
