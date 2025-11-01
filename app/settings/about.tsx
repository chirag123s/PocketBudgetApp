import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, StatusBar } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { BudgetMateLogo } from '@/app/auth/BudgetMateLogo';
import { settingsTypography, settingsFontWeights } from './typography';
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';

interface SettingRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightIcon?: 'chevron' | 'external';
  isLast?: boolean;
}

export default function AboutApp() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const settingsStyles = getSettingsStyles(themeMode);

  // Color Palette - Using theme colors
  const colors = {
    // Primary Palette
    primaryDark: theme.colors.info.dark,
    primary: theme.colors.info.main,
    primaryLight: theme.colors.info.light,

    // Neutral Palette
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,

    // Functional Palette
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,

    // Border
    border: theme.colors.border.light,
    iconBg: theme.colors.background.tertiary,
  };

  const SettingRow: React.FC<SettingRowProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    rightIcon = 'chevron',
    isLast = false,
  }) => (
    <React.Fragment>
      <TouchableOpacity
        style={settingsStyles.menuItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={settingsStyles.iconContainer}>
          <Ionicons name={icon as any} size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
        </View>
        <View style={styles.textContainer}>
          <Text style={settingsStyles.menuText}>
            {title}
          </Text>
          {subtitle && (
            <Text style={settingsStyles.menuSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>

        {rightIcon === 'chevron' && (
          <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
        )}
        {rightIcon === 'external' && (
          <Ionicons name="open-outline" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
        )}
      </TouchableOpacity>
      {!isLast && <View style={settingsStyles.menuItemDivider} />}
    </React.Fragment>
  );

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
    },
    // App Info Card
    appInfoCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[8],
      marginTop: responsive.spacing[6],
      marginBottom: responsive.spacing[4],
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    appIcon: {
      width: ms(96),
      height: ms(96),
      borderRadius: ms(48),
      backgroundColor: colors.neutralWhite,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsive.spacing[4],
      ...theme.shadows.md,
    },
    appName: {
      fontSize: settingsTypography.pageHeading,
      lineHeight: settingsTypography.pageHeading * 1.5,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[1],
    },
    appVersion: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: colors.neutralMedium,
      marginBottom: responsive.spacing[3],
    },
    appTagline: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.6,
      color: colors.neutralDark,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    // Social Grid
    socialGrid: {
      flexDirection: 'row',
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      gap: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    socialItem: {
      flex: 1,
      alignItems: 'center',
      gap: responsive.spacing[2],
      padding: responsive.spacing[2],
      borderRadius: theme.borderRadius.lg,
    },
    socialIconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      backgroundColor: colors.iconBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsive.spacing[1],
    },
    socialLabel: {
      fontSize: settingsTypography.tertiary,
      lineHeight: settingsTypography.tertiary * 1.5,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDark,
      textAlign: 'center',
    },
    // Footer
    footerCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[6],
      marginTop: responsive.spacing[6],
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    footerCopyright: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    footerMadeWith: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsive.spacing[2],
    },
    footerText: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: colors.neutralDark,
    },
    footerHeart: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      marginHorizontal: responsive.spacing[1],
    },
    footerLegal: {
      fontSize: settingsTypography.tertiary,
      lineHeight: settingsTypography.tertiary * 1.5,
      color: colors.neutralMedium,
      textAlign: 'center',
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="About" backgroundColor={colors.neutralBg} />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Info Card */}
        <View style={styles.appInfoCard}>
          <View style={styles.appIcon}>
            <BudgetMateLogo
              iconOnly
              size={ms(80)}
              color={theme.colors.info.main}
              backgroundColor="white"
            />
          </View>
          <Text style={styles.appName}>PocketBudget</Text>
          <Text style={styles.appVersion}>Version 1.0.0 (Build 23)</Text>
          <Text style={styles.appTagline}>
            "The Australian budgeting app you've been waiting for"
          </Text>
        </View>

        {/* Legal */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>LEGAL</Text>
          <View style={settingsStyles.card}>
            <SettingRow
              icon="document-text-outline"
              title="Terms of Service"
              onPress={() => {}}
            />
            <SettingRow
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              onPress={() => {}}
            />
            <SettingRow
              icon="document-outline"
              title="Open Source Licenses"
              onPress={() => {}}
              isLast
            />
          </View>
        </View>

        {/* Community */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>COMMUNITY</Text>
          <View style={settingsStyles.card}>
            <SettingRow
              icon="star"
              title="Rate PocketBudget"
              subtitle="Share your feedback"
              onPress={() => {}}
            />
            <SettingRow
              icon="share-social-outline"
              title="Share with Friends"
              subtitle="Help others save money"
              onPress={() => {}}
              isLast
            />
          </View>
        </View>

        {/* Get in Touch */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>GET IN TOUCH</Text>
          <View style={styles.socialGrid}>
            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleOpenURL('https://twitter.com/pocketbudgetau')}
              activeOpacity={0.7}
            >
              <View style={styles.socialIconContainer}>
                <Ionicons name="logo-twitter" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <Text style={styles.socialLabel}>Twitter/X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleOpenURL('https://pocketbudget.com.au')}
              activeOpacity={0.7}
            >
              <View style={styles.socialIconContainer}>
                <Ionicons name="globe-outline" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <Text style={styles.socialLabel}>Website</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleOpenURL('mailto:support@pocketbudget.com.au')}
              activeOpacity={0.7}
            >
              <View style={styles.socialIconContainer}>
                <Ionicons name="mail-outline" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <Text style={styles.socialLabel}>Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => handleOpenURL('https://community.pocketbudget.com.au')}
              activeOpacity={0.7}
            >
              <View style={styles.socialIconContainer}>
                <Ionicons name="chatbubbles-outline" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <Text style={styles.socialLabel}>Forum</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerCard}>
          <Text style={styles.footerCopyright}>© 2025 PocketBudget</Text>
          <View style={styles.footerMadeWith}>
            <Text style={styles.footerText}>Made with</Text>
            <Text style={styles.footerHeart}>❤️</Text>
            <Text style={styles.footerText}>in Australia</Text>
          </View>
          <Text style={styles.footerLegal}>
            All rights reserved. ABN 12 345 678 901
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}
