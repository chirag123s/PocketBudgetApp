/**
 * SETTINGS SCREEN STANDARD STYLES
 *
 * These are the official settings screen styling standards taken from the Notifications screen.
 * All settings screens MUST use these exact values for consistency.
 *
 * Import this file in all settings screens instead of defining custom styles.
 */

import { StyleSheet } from 'react-native';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { settingsTypography, settingsFontWeights } from './typography';

/**
 * Get standardized settings styles
 * Call this function inside your component with the current theme
 */
export const getSettingsStyles = (themeMode: 'light' | 'dark', customBackgroundColor?: string | null, customCardColor?: string | null) => {
  const theme = getTheme(themeMode, customBackgroundColor, customCardColor);

  return StyleSheet.create({
    // === LAYOUT ===
    content: {
      padding: responsive.spacing[4],
      paddingBottom: responsive.spacing[8],
    },

    section: {
      marginBottom: responsive.spacing[6],
    },

    // === SECTION TITLE (UPPERCASE LABEL) ===
    // Example: "BUDGET ALERTS", "BILL REMINDERS", "PREFERENCES"
    sectionTitle: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: theme.colors.text.tertiary,           // Tertiary text color (muted)
      fontWeight: settingsFontWeights.bold,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginBottom: responsive.spacing[3],
    },

    // === SECTION DESCRIPTION (OPTIONAL SUBTITLE) ===
    sectionDescription: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
      marginBottom: responsive.spacing[3],
    },

    // === GROUPED CARD CONTAINER ===
    card: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',                          // Required for dividers
      ...theme.shadows.sm,
    },

    // === MENU ITEM (ROW INSIDE CARD) ===
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.spacing[3],      // 12px top/bottom
      paddingHorizontal: responsive.spacing[4],    // 16px left/right
      gap: responsive.spacing[3],
      minHeight: ms(72),                           // 72px minimum height
    },

    // === MENU ITEM DIVIDER ===
    menuItemDivider: {
      height: 1,
      backgroundColor: theme.colors.border.light,
      marginLeft: ms(72),                          // Indent to align with text (48px icon + 24px gap)
    },

    // === ICON CONTAINER (CIRCULAR BACKGROUND) ===
    iconContainer: {
      width: ms(48),                               // 48px width
      height: ms(48),                              // 48px height
      borderRadius: ms(24),                        // Circular
      backgroundColor: theme.colors.background.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // === MENU TEXT (TITLE) ===
    menuText: {
      ...theme.typography.styles.body,
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      color: theme.colors.text.primary,
      flex: 1,
    },

    // === SUBTITLE (OPTIONAL SECONDARY TEXT) ===
    menuSubtitle: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
    },

    // === CHEVRON (RIGHT ARROW) ===
    chevron: {
      marginLeft: 'auto',
    },
  });
};

/**
 * SETTINGS CONSTANTS
 * Use these exact values for all settings screens
 */
export const SETTINGS_CONSTANTS = {
  // Icon sizes
  ICON_SIZE: 24,               // Size of icon inside iconContainer
  CHEVRON_SIZE: 20,            // Size of right arrow chevron

  // Container sizes
  ICON_CONTAINER_SIZE: 48,     // Width/height of circular icon background (48px, not 40px!)
  MIN_ITEM_HEIGHT: 72,         // Minimum touch target height (72px, not 56px!)

  // Divider
  DIVIDER_HEIGHT: 1,
  DIVIDER_MARGIN_LEFT: 72,     // Icon (48) + gap (24) = 72px

  // Spacing
  SECTION_MARGIN_BOTTOM: 24,   // responsive.spacing[6]
  HORIZONTAL_PADDING: 16,      // responsive.spacing[4]
} as const;

/**
 * USAGE EXAMPLE:
 *
 * ```tsx
 * import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';
 *
 * export default function MySettingsScreen() {
 *   const { theme } = useTheme();
 *   const styles = getSettingsStyles(theme);
 *
 *   return (
 *     <View style={styles.section}>
 *       <Text style={styles.sectionTitle}>PREFERENCES</Text>
 *
 *       <View style={styles.card}>
 *         <TouchableOpacity style={styles.menuItem}>
 *           <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
 *             <Ionicons name="settings-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color="#2196F3" />
 *           </View>
 *           <Text style={styles.menuText}>Settings</Text>
 *           <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} />
 *         </TouchableOpacity>
 *
 *         <View style={styles.menuItemDivider} />
 *
 *         <TouchableOpacity style={styles.menuItem}>
 *           // ... next item
 *         </TouchableOpacity>
 *       </View>
 *     </View>
 *   );
 * }
 * ```
 */
