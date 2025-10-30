/**
 * Settings Typography
 *
 * Common font sizes and text styles for all settings screens.
 * This ensures consistent typography across the entire settings module.
 *
 * Usage:
 * import { settingsTypography } from './typography';
 *
 * <Text style={{ fontSize: settingsTypography.sectionTitle }}>Section Title</Text>
 */

import { responsive } from '@/constants/responsive';

/**
 * Font sizes for settings screens
 * All sizes scale responsively with device size and system font settings
 */
export const settingsTypography = {
  // ==================== Headings ====================

  /** Main page heading (28-32px) - Used for primary page titles */
  pageHeading: responsive.fontSize.h2,

  /** Section heading (18-20px) - Used for major section titles */
  sectionHeading: responsive.fontSize.lg,

  /** Subsection heading (16-18px) - Used for subsection titles */
  subsectionHeading: responsive.fontSize.md,

  // ==================== Body Text ====================

  /** Primary text (16-18px) - Main content, list item titles, button text */
  primary: responsive.fontSize.md,

  /** Secondary text (12-14px) - Descriptions, subtitles, helper text */
  secondary: responsive.fontSize.sm,

  /** Tertiary text (10-12px) - Captions, labels, footnotes */
  tertiary: responsive.fontSize.xs,

  // ==================== Interactive Elements ====================

  /** Button text (16-18px) - Primary and secondary buttons */
  button: responsive.fontSize.md,

  /** Link text (12-14px) - Hyperlinks and action text */
  link: responsive.fontSize.sm,

  /** Tab text (12-14px) - Tab bar items */
  tab: responsive.fontSize.sm,

  // ==================== Form Elements ====================

  /** Input text (16-18px) - Text input fields */
  input: responsive.fontSize.md,

  /** Input label (12-14px) - Form field labels */
  inputLabel: responsive.fontSize.sm,

  /** Input placeholder (14-16px) - Placeholder text */
  inputPlaceholder: responsive.fontSize.base,

  /** Input error (10-12px) - Validation error messages */
  inputError: responsive.fontSize.xs,

  /** Input hint (10-12px) - Helper text below inputs */
  inputHint: responsive.fontSize.xs,

  // ==================== List Items ====================

  /** List item title (16-18px) - Main text in list rows */
  listItemTitle: responsive.fontSize.md,

  /** List item subtitle (12-14px) - Secondary text in list rows */
  listItemSubtitle: responsive.fontSize.sm,

  /** List item value (16-18px) - Right-aligned values in list rows */
  listItemValue: responsive.fontSize.md,

  /** List item caption (10-12px) - Small text in list rows */
  listItemCaption: responsive.fontSize.xs,

  // ==================== Cards ====================

  /** Card title (16-18px) - Card heading */
  cardTitle: responsive.fontSize.md,

  /** Card body (12-14px) - Card content text */
  cardBody: responsive.fontSize.sm,

  /** Card caption (10-12px) - Card footer or metadata */
  cardCaption: responsive.fontSize.xs,

  // ==================== Special Elements ====================

  /** Badge text (10px) - Small badges and counts */
  badge: responsive.fontSize.xs,

  /** Chip text (12-14px) - Chip/tag labels */
  chip: responsive.fontSize.sm,

  /** Avatar initial (18-20px) - Letter in avatar circle */
  avatarInitial: responsive.fontSize.lg,

  /** Hero text (36-40px) - Large display text (e.g., profile name) */
  hero: responsive.fontSize.h1,

  /** Mega text (40-48px) - Extra large display (e.g., subscription price) */
  mega: responsive.fontSize.display,

  // ==================== Alerts & Modals ====================

  /** Modal title (20-24px) - Modal dialog heading */
  modalTitle: responsive.fontSize.xl,

  /** Modal body (14-16px) - Modal content text */
  modalBody: responsive.fontSize.base,

  /** Alert text (12-14px) - Alert/notification text */
  alert: responsive.fontSize.sm,

  // ==================== Metadata ====================

  /** Timestamp (10-12px) - Date/time stamps */
  timestamp: responsive.fontSize.xs,

  /** Version number (10-12px) - App version, build info */
  version: responsive.fontSize.xs,

  /** Copyright (10-12px) - Legal text, copyright notices */
  copyright: responsive.fontSize.xs,
} as const;

/**
 * Font weights for settings screens
 * Use these to maintain consistent text hierarchy
 */
export const settingsFontWeights = {
  /** Regular weight (400) - Body text */
  regular: '400' as const,

  /** Medium weight (500) - Emphasized text */
  medium: '500' as const,

  /** Semibold weight (600) - Subheadings, important text */
  semibold: '600' as const,

  /** Bold weight (700) - Headings, primary buttons */
  bold: '700' as const,

  /** Extra bold weight (800) - Hero text, special emphasis */
  extrabold: '800' as const,
} as const;

/**
 * Common text style presets for settings screens
 * Combines font size with appropriate weight
 */
export const settingsTextStyles = {
  // Headings
  pageHeading: {
    fontSize: settingsTypography.pageHeading,
    fontWeight: settingsFontWeights.bold,
  },
  sectionHeading: {
    fontSize: settingsTypography.sectionHeading,
    fontWeight: settingsFontWeights.bold,
  },
  subsectionHeading: {
    fontSize: settingsTypography.subsectionHeading,
    fontWeight: settingsFontWeights.semibold,
  },

  // Body text
  primaryText: {
    fontSize: settingsTypography.primary,
    fontWeight: settingsFontWeights.medium,
  },
  secondaryText: {
    fontSize: settingsTypography.secondary,
    fontWeight: settingsFontWeights.regular,
  },
  tertiaryText: {
    fontSize: settingsTypography.tertiary,
    fontWeight: settingsFontWeights.regular,
  },

  // Interactive
  buttonText: {
    fontSize: settingsTypography.button,
    fontWeight: settingsFontWeights.semibold,
  },
  linkText: {
    fontSize: settingsTypography.link,
    fontWeight: settingsFontWeights.medium,
  },

  // Form elements
  inputText: {
    fontSize: settingsTypography.input,
    fontWeight: settingsFontWeights.regular,
  },
  inputLabel: {
    fontSize: settingsTypography.inputLabel,
    fontWeight: settingsFontWeights.medium,
  },
  inputError: {
    fontSize: settingsTypography.inputError,
    fontWeight: settingsFontWeights.medium,
  },

  // List items
  listItemTitle: {
    fontSize: settingsTypography.listItemTitle,
    fontWeight: settingsFontWeights.semibold,
  },
  listItemSubtitle: {
    fontSize: settingsTypography.listItemSubtitle,
    fontWeight: settingsFontWeights.regular,
  },
  listItemValue: {
    fontSize: settingsTypography.listItemValue,
    fontWeight: settingsFontWeights.medium,
  },

  // Cards
  cardTitle: {
    fontSize: settingsTypography.cardTitle,
    fontWeight: settingsFontWeights.semibold,
  },
  cardBody: {
    fontSize: settingsTypography.cardBody,
    fontWeight: settingsFontWeights.regular,
  },

  // Special
  hero: {
    fontSize: settingsTypography.hero,
    fontWeight: settingsFontWeights.bold,
  },
  badge: {
    fontSize: settingsTypography.badge,
    fontWeight: settingsFontWeights.semibold,
  },
} as const;

// Type exports for TypeScript autocompletion
export type SettingsTypography = typeof settingsTypography;
export type SettingsFontWeight = typeof settingsFontWeights;
export type SettingsTextStyle = typeof settingsTextStyles;
