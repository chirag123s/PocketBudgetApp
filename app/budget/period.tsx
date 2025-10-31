import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface Period {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const periods: Period[] = [
  { id: 'monthly', title: 'Monthly (Calendar)', subtitle: '1st to last day', badge: 'Most common' },
  { id: 'credit', title: 'Credit Card Cycle ⭐', subtitle: 'Match your card statement dates', badge: 'Popular' },
  { id: 'fortnightly', title: 'Fortnightly', subtitle: 'Payday to payday' },
  { id: 'weekly', title: 'Weekly', subtitle: 'Week-by-week' },
  { id: 'custom', title: 'Custom Dates', subtitle: 'You choose' },
];

export default function BudgetPeriodSelection() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    background: theme.colors.background.secondary,
    backgroundPrimary: theme.colors.background.primary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    primary50: theme.colors.primary[50],
    primary100: theme.colors.primary[100],
    primary200: theme.colors.primary[200],
    primary600: theme.colors.primary[600],
    primary700: theme.colors.primary[700],
    primary800: theme.colors.primary[800],
    primary900: theme.colors.primary[900],
    borderLight: theme.colors.border.light,
    borderMain: theme.colors.border.main,
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.backgroundPrimary,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    backButton: {
      padding: responsive.spacing[2],
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
      color: colors.textPrimary,
    },
    headerSubtitle: {
      ...theme.typography.styles.caption,
      color: colors.textTertiary,
      marginTop: responsive.spacing[1],
    },
    placeholder: {
      width: 40,
    },
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    question: {
      ...theme.typography.styles.h2,
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      textAlign: 'center',
      marginBottom: responsive.spacing[6],
      color: colors.textPrimary,
    },
    optionsContainer: {
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[6],
    },
    periodOption: {
      backgroundColor: colors.backgroundPrimary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      borderWidth: 2,
      borderColor: colors.borderLight,
    },
    periodOptionSelected: {
      borderColor: colors.primary,
    },
    periodContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    periodLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.borderMain,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[2],
    },
    radioCircleSelected: {
      borderColor: colors.primary,
    },
    radioCircleInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
    },
    periodText: {
      flex: 1,
    },
    periodTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      marginBottom: responsive.spacing[1],
      color: colors.textPrimary,
    },
    periodSubtitle: {
      ...theme.typography.styles.bodySmall,
      color: colors.textSecondary,
    },
    badge: {
      backgroundColor: colors.primary100,
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 4,
    },
    badgeText: {
      ...theme.typography.styles.caption,
      color: colors.primary700,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      fontWeight: '500',
    },
    infoBox: {
      backgroundColor: colors.primary50,
      borderWidth: 1,
      borderColor: colors.primary200,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
    },
    infoContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    infoIcon: {
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
      marginRight: responsive.spacing[2],
    },
    infoTextContainer: {
      flex: 1,
    },
    infoTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: colors.primary900,
      marginBottom: responsive.spacing[1],
    },
    infoDescription: {
      ...theme.typography.styles.bodySmall,
      color: colors.primary800,
      lineHeight: 20,
    },
  });

  const handleContinue = () => {
    if (selectedPeriod === 'credit') {
      // Navigate to credit card cycle setup
      router.push('/budget/income');
    } else if (selectedPeriod === 'fortnightly') {
      // Navigate to fortnightly setup
      router.push('/budget/income');
    } else {
      router.push('/budget/income');
    }
  };

  return (
    <Screen noPadding backgroundColor={colors.background}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary600} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Budget Period</Text>
          <Text style={styles.headerSubtitle}>Step 1 of 4</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Question */}
        <Text style={styles.question}>
          When does your budget{'\n'}start and end?
        </Text>

        {/* Period Options */}
        <View style={styles.optionsContainer}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodOption,
                selectedPeriod === period.id && styles.periodOptionSelected,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <View style={styles.periodContent}>
                <View style={styles.periodLeft}>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedPeriod === period.id && styles.radioCircleSelected,
                    ]}
                  >
                    {selectedPeriod === period.id && (
                      <View style={styles.radioCircleInner} />
                    )}
                  </View>
                  <View style={styles.periodText}>
                    <Text style={styles.periodTitle}>{period.title}</Text>
                    <Text style={styles.periodSubtitle}>{period.subtitle}</Text>
                  </View>
                </View>
                {period.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{period.badge}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box for Credit Card Cycle */}
        {selectedPeriod === 'credit' && (
          <View style={styles.infoBox}>
            <View style={styles.infoContent}>
              <Text style={styles.infoIcon}>💡</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Why this is unique</Text>
                <Text style={styles.infoDescription}>
                  Most budgeting apps only support monthly budgets. We let you align your budget with your credit card statement cycle, making it easier to track spending and avoid interest charges.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Continue Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={handleContinue}
        >
          Continue
        </Button>
      </ScrollView>
    </Screen>
  );
}
