import { Dimensions, PixelRatio } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

/**
 * Responsive Design Utilities
 *
 * This file provides responsive sizing utilities based on device dimensions AND system font scale.
 * Uses react-native-size-matters for consistent scaling across different screen sizes.
 * Respects user's accessibility font size settings while maintaining design proportions.
 *
 * @see https://github.com/nirsky/react-native-size-matters
 */

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Get system font scale (1.0 = normal, 1.3 = large text, etc.)
const FONT_SCALE = PixelRatio.getFontScale();

/**
 * Device dimension constants
 */
export const device = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  aspectRatio: SCREEN_HEIGHT / SCREEN_WIDTH,
  fontScale: FONT_SCALE,
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: SCREEN_WIDTH >= 414,
  isShortDevice: SCREEN_HEIGHT < 700,
  isTallDevice: SCREEN_HEIGHT >= 700,
} as const;

/**
 * Responsive width scaling
 * Scales based on screen width (horizontal scaling)
 *
 * @param size - The size to scale (based on iPhone 11 width: 414)
 * @returns Scaled size for current device
 *
 * @example
 * const buttonWidth = wp(300); // Scales 300 relative to device width
 */
export const wp = (size: number): number => scale(size);

/**
 * Responsive height scaling
 * Scales based on screen height (vertical scaling)
 *
 * @param size - The size to scale (based on iPhone 11 height: 896)
 * @returns Scaled size for current device
 *
 * @example
 * const headerHeight = hp(80); // Scales 80 relative to device height
 */
export const hp = (size: number): number => verticalScale(size);

/**
 * Moderate responsive scaling
 * Scales with a factor to prevent extreme scaling on very large/small devices
 *
 * @param size - The size to scale
 * @param factor - Scaling factor (default: 0.5, range: 0-1)
 * @returns Moderately scaled size
 *
 * @example
 * const fontSize = ms(16);        // Uses default factor 0.5
 * const padding = ms(20, 0.3);    // Uses custom factor 0.3 for less aggressive scaling
 */
export const ms = (size: number, factor?: number): number => moderateScale(size, factor);

/**
 * Font size scaling with system font scale applied
 * Combines device size scaling with user's accessibility font settings
 *
 * @param size - Base font size
 * @param factor - Device scaling factor (default: 0.3 for moderate scaling)
 * @returns Font size that respects both device size and system font scale
 *
 * @example
 * const fontSize = fs(16);        // Scales 16px based on device AND system font size
 * const headingSize = fs(32, 0.2); // Less aggressive device scaling for headings
 *
 * System font scale examples:
 * - Normal text: FONT_SCALE = 1.0  → fs(16) = 16px (scaled for device)
 * - Large text:  FONT_SCALE = 1.3  → fs(16) = 20.8px (scaled for device × 1.3)
 * - Largest:     FONT_SCALE = 2.0  → fs(16) = 32px (scaled for device × 2.0)
 */
export const fs = (size: number, factor: number = 0.3): number => {
  const deviceScaled = moderateScale(size, factor);
  return deviceScaled * FONT_SCALE;
};

/**
 * Responsive font sizes
 * Pre-defined font sizes that scale with BOTH device size AND system font scale
 * Respects user's accessibility settings while maintaining proportions
 */
export const responsiveFontSize = {
  /** Extra small text (10-12px) - Scales with system font size */
  xs: fs(10, 0.3),
  /** Small text (12-14px) - Scales with system font size */
  sm: fs(12, 0.3),
  /** Base/body text (14-16px) - Scales with system font size */
  base: fs(14, 0.3),
  /** Medium text (16-18px) - Scales with system font size */
  md: fs(16, 0.3),
  /** Large text (18-20px) - Scales with system font size */
  lg: fs(18, 0.3),
  /** Extra large text (20-24px) - Scales with system font size */
  xl: fs(20, 0.3),
  /** Heading 4 (24px) - Scales with system font size */
  h4: fs(24, 0.3),
  /** Heading 3 (28px) - Scales with system font size */
  h3: fs(28, 0.3),
  /** Heading 2 (32px) - Scales with system font size */
  h2: fs(32, 0.3),
  /** Heading 1 (36px) - Scales with system font size */
  h1: fs(36, 0.3),
  /** Display/Hero text (40-48px) - Scales with system font size */
  display: fs(40, 0.3),
} as const;

/**
 * Responsive spacing scale
 * Pre-defined spacing values that scale with device size
 * Based on 4px base unit (consistent with theme.spacing)
 */
export const responsiveSpacing = {
  /** 4px */
  1: ms(4, 0.2),
  /** 8px */
  2: ms(8, 0.2),
  /** 12px */
  3: ms(12, 0.2),
  /** 16px */
  4: ms(16, 0.2),
  /** 20px */
  5: ms(20, 0.2),
  /** 24px */
  6: ms(24, 0.2),
  /** 28px */
  7: ms(28, 0.2),
  /** 32px */
  8: ms(32, 0.2),
  /** 40px */
  10: ms(40, 0.2),
  /** 48px */
  12: ms(48, 0.2),
  /** 64px */
  16: ms(64, 0.2),
  /** 80px */
  20: ms(80, 0.2),
} as const;

/**
 * Responsive layout constants
 * Common layout dimensions that scale with device size
 */
export const responsiveLayout = {
  /** Standard button height */
  buttonHeight: hp(48),
  /** Small button height */
  buttonHeightSmall: hp(40),
  /** Large button height */
  buttonHeightLarge: hp(56),
  /** Input field height */
  inputHeight: hp(48),
  /** Header height */
  headerHeight: hp(60),
  /** Tab bar height */
  tabBarHeight: hp(60),
  /** Card border radius */
  cardRadius: ms(12, 0.2),
  /** Button border radius */
  buttonRadius: ms(8, 0.2),
  /** Icon size small */
  iconSm: ms(16, 0.2),
  /** Icon size medium */
  iconMd: ms(24, 0.2),
  /** Icon size large */
  iconLg: ms(32, 0.2),
  /** Icon size extra large */
  iconXl: ms(48, 0.2),
  /** Maximum content width (for tablets/web) */
  maxContentWidth: wp(600),
  /** Horizontal screen padding */
  screenPaddingHorizontal: wp(16),
  /** Vertical screen padding */
  screenPaddingVertical: hp(16),

  // Chart sizing constants
  /** Compact chart size (dashboard, small cards) */
  chartSizeCompact: 120,
  /** Standard chart size (default, most common usage) */
  chartSizeStandard: 160,
  /** Large chart size (analytics, detailed views) */
  chartSizeLarge: 192,
} as const;

/**
 * Percentage-based width
 *
 * @param percentage - Percentage of screen width (0-100)
 * @returns Width in pixels
 *
 * @example
 * const halfWidth = widthPercentage(50); // 50% of screen width
 */
export const widthPercentage = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Percentage-based height
 *
 * @param percentage - Percentage of screen height (0-100)
 * @returns Height in pixels
 *
 * @example
 * const quarterHeight = heightPercentage(25); // 25% of screen height
 */
export const heightPercentage = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * Responsive object that combines all utilities
 * Use this for easier imports: import { responsive } from '@/constants/responsive'
 */
export const responsive = {
  // Device info
  device,

  // Scaling functions
  wp,
  hp,
  ms,
  fs, // Font size scaling with system font scale
  widthPercentage,
  heightPercentage,

  // Pre-defined scales
  fontSize: responsiveFontSize,
  spacing: responsiveSpacing,
  layout: responsiveLayout,
} as const;

export default responsive;
