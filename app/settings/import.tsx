import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';

interface ImportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function ImportData() {
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

  const importOptions: ImportOption[] = [
    {
      id: 'csv',
      title: 'Import from CSV',
      description: 'Map columns and detect duplicates automatically',
      icon: 'document-text-outline',
      color: colors.functionalSuccess,
    },
    {
      id: 'pocketbook',
      title: 'Import from Pocketbook',
      description: 'Use our migration wizard to transfer data',
      icon: 'swap-horizontal-outline',
      color: colors.primary,
    },
    {
      id: 'other',
      title: 'Import from Other Apps',
      description: 'YNAB, Mint, or other budgeting apps',
      icon: 'arrow-down-circle-outline',
      color: colors.functionalWarning,
    },
  ];

  const handleImport = (optionId: string, title: string) => {
    Alert.alert(title, 'Import feature coming soon');
  };

  const styles = StyleSheet.create({
    optionContent: {
      flex: 1,
    },
    guidelinesCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      ...theme.shadows.sm,
      gap: responsive.spacing[4],
    },
    guidelineItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: responsive.spacing[3],
    },
    guidelineBullet: {
      width: ms(24),
      height: ms(24),
      borderRadius: ms(12),
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    guidelineBulletText: {
      fontSize: settingsTypography.tertiary,
      lineHeight: settingsTypography.tertiary * 1.5,
      fontWeight: settingsFontWeights.bold,
      color: colors.primary,
    },
    guidelineText: {
      flex: 1,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.6,
      color: colors.neutralDark,
    },
    infoBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: responsive.spacing[3],
      padding: responsive.spacing[4],
      borderRadius: theme.borderRadius.xl,
      backgroundColor: `${colors.functionalSuccess}15`,
      borderWidth: 1,
      borderColor: `${colors.functionalSuccess}40`,
    },
    infoText: {
      flex: 1,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: colors.neutralDarkest,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader
        title="Import Data"
        backgroundColor={colors.neutralBg}
      />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Import Options */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>IMPORT FROM</Text>
          <View style={settingsStyles.card}>
            {importOptions.map((option, index) => (
              <React.Fragment key={option.id}>
                <TouchableOpacity
                  style={settingsStyles.menuItem}
                  onPress={() => handleImport(option.id, option.title)}
                  activeOpacity={0.7}
                >
                  <View style={settingsStyles.iconContainer}>
                    <Ionicons
                      name={option.icon as any}
                      size={SETTINGS_CONSTANTS.ICON_SIZE}
                      color={colors.neutralDarkest}
                    />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={settingsStyles.menuText}>{option.title}</Text>
                    <Text style={settingsStyles.menuSubtitle}>{option.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
                </TouchableOpacity>
                {index < importOptions.length - 1 && <View style={settingsStyles.menuItemDivider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Import Guidelines Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>IMPORT GUIDELINES</Text>
          <View style={styles.guidelinesCard}>
            <View style={styles.guidelineItem}>
              <View style={styles.guidelineBullet}>
                <Text style={styles.guidelineBulletText}>1</Text>
              </View>
              <Text style={styles.guidelineText}>
                Choose your source and follow the step-by-step instructions
              </Text>
            </View>

            <View style={styles.guidelineItem}>
              <View style={styles.guidelineBullet}>
                <Text style={styles.guidelineBulletText}>2</Text>
              </View>
              <Text style={styles.guidelineText}>
                We'll automatically detect duplicates and ask you to confirm
              </Text>
            </View>

            <View style={styles.guidelineItem}>
              <View style={styles.guidelineBullet}>
                <Text style={styles.guidelineBulletText}>3</Text>
              </View>
              <Text style={styles.guidelineText}>
                Review your imported data before finalizing
              </Text>
            </View>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons
            name="shield-checkmark"
            size={ms(20)}
            color={colors.functionalSuccess}
          />
          <Text style={styles.infoText}>
            Your data is processed securely on your device. We never send your financial information to external servers during import.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
