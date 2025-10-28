import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
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
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
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
  },
  headerSubtitle: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
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
  },
  optionsContainer: {
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[6],
  },
  periodOption: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    borderWidth: 2,
    borderColor: theme.colors.border.light,
  },
  periodOptionSelected: {
    borderColor: theme.colors.primary[500],
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
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing[2],
  },
  radioCircleSelected: {
    borderColor: theme.colors.primary[500],
  },
  radioCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary[500],
  },
  periodText: {
    flex: 1,
  },
  periodTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: responsive.spacing[1],
  },
  periodSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  badge: {
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 4,
  },
  badgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.primary[700],
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: theme.colors.primary[50],
    borderWidth: 1,
    borderColor: theme.colors.primary[200],
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
    color: theme.colors.primary[900],
    marginBottom: responsive.spacing[1],
  },
  infoDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.primary[800],
    lineHeight: 20,
  },
});
