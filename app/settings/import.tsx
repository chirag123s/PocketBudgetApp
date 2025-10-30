import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

interface ImportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function ImportData() {
  const importOptions: ImportOption[] = [
    {
      id: 'csv',
      title: 'Import from CSV',
      description: 'Map columns and detect duplicates automatically',
      icon: 'file-delimited',
      color: colors.functionalSuccess,
    },
    {
      id: 'pocketbook',
      title: 'Import from Pocketbook',
      description: 'Use our migration wizard to transfer data',
      icon: 'swap-horizontal',
      color: colors.primary,
    },
    {
      id: 'other',
      title: 'Import from Other Apps',
      description: 'YNAB, Mint, or other budgeting apps',
      icon: 'application-import',
      color: colors.functionalWarning,
    },
  ];

  const handleImport = (optionId: string) => {
    console.log('Import from:', optionId);
    // Navigate to specific import flow
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <ScreenHeader
        title="Import Data"
        backgroundColor={colors.neutralBg}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headline}>Import Your Data</Text>
          <Text style={styles.subheadline}>
            Bring your financial data from other sources into PocketBudget
          </Text>
        </View>

        {/* Import Options */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>IMPORT FROM</Text>
          {importOptions.map((option) => (
            <Pressable
              key={option.id}
              style={({ pressed }) => [
                styles.importOption,
                pressed && styles.importOptionPressed,
              ]}
              onPress={() => handleImport(option.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${option.color}20` }]}>
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={ms(24)}
                  color={option.color}
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
            </Pressable>
          ))}
        </View>

        {/* Guidelines Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={ms(24)} color={colors.primary} />
            <Text style={styles.cardTitle}>Import Guidelines</Text>
          </View>

          <View style={styles.guidelinesList}>
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

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[4],
    paddingBottom: responsive.spacing[8],
  },
  headerSection: {
    paddingHorizontal: responsive.spacing[2],
    marginBottom: responsive.spacing[6],
  },
  headline: {
    fontSize: responsive.fontSize.h1,
    lineHeight: responsive.fontSize.h1 * 1.3,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
  },
  subheadline: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    color: colors.neutralDark,
  },
  section: {
    marginBottom: responsive.spacing[6],
  },
  sectionHeader: {
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.neutralMedium,
    marginBottom: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[2],
  },
  importOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  importOptionPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing[3],
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  optionDescription: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    color: colors.neutralDark,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    marginBottom: responsive.spacing[4],
  },
  cardTitle: {
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  guidelinesList: {
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
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '700',
    color: colors.primary,
  },
  guidelineText: {
    flex: 1,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.6,
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
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.6,
    color: colors.neutralDarkest,
  },
});
