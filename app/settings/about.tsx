import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, StatusBar } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { BudgetMateLogo } from '@/app/auth/BudgetMateLogo';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';

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
    <TouchableOpacity
      style={[
        styles.settingRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={ms(24)} color={colors.neutralDarkest} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightIcon === 'chevron' && (
        <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
      )}
      {rightIcon === 'external' && (
        <Ionicons name="open-outline" size={20} color={colors.neutralMedium} />
      )}
    </TouchableOpacity>
  );

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const styles = StyleSheet.create({
    content: {
      paddingHorizontal: responsive.spacing[6],
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
    // Section
    section: {
      marginTop: responsive.spacing[4],
    },
    sectionHeader: {
      fontSize: settingsTypography.tertiary,
      lineHeight: settingsTypography.tertiary * 1.5,
      fontWeight: settingsFontWeights.bold,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.neutralMedium,
      paddingBottom: responsive.spacing[2],
      paddingTop: responsive.spacing[4],
    },
    card: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.sm,
    },
    // Setting Row
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      minHeight: ms(64),
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[4],
      flex: 1,
    },
    iconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.iconBg,
    },
    settingTitle: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDarkest,
    },
    settingSubtitle: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: colors.neutralDark,
      marginTop: 2,
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
    <Screen noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="About" />

      <ScrollView
        contentContainerStyle={styles.content}
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
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>LEGAL</Text>
          <View style={styles.card}>
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
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>COMMUNITY</Text>
          <View style={styles.card}>
            <SettingRow
              icon="star"
              title="Rate PocketBudget"
              subtitle="Share your feedback"
              onPress={() => {}}
            />
            <SettingRow
              icon="share-variant"
              title="Share with Friends"
              subtitle="Help others save money"
              onPress={() => {}}
              isLast
            />
          </View>
        </View>

        {/* Get in Touch */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>GET IN TOUCH</Text>
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
