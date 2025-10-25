import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type RolloverOption = 'copy' | 'adjust' | 'fresh';

interface RolloverChoice {
  id: RolloverOption;
  icon: string;
  title: string;
  subtitle: string;
  preview: string;
}

const rolloverOptions: RolloverChoice[] = [
  {
    id: 'copy',
    icon: '📋',
    title: 'Copy Current Budget',
    subtitle: 'Keep everything the same',
    preview: 'All categories and amounts stay identical',
  },
  {
    id: 'adjust',
    icon: '✏️',
    title: 'Adjust for Changes',
    subtitle: 'Update before creating',
    preview: 'Review and modify categories/amounts',
  },
  {
    id: 'fresh',
    icon: '✨',
    title: 'Start Fresh',
    subtitle: 'Create from scratch',
    preview: 'New budget setup wizard',
  },
];

const currentBudgetSummary = {
  period: 'Nov 15 - Dec 14, 2025',
  income: 3200,
  allocated: 2850,
  categories: 8,
};

export default function RollOverBudget() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<RolloverOption>('copy');

  const handleCreateBudget = () => {
    // Logic to create new budget based on selected option
    if (selectedOption === 'copy') {
      // Copy current budget and navigate to summary
      router.push('/budget/summary');
    } else if (selectedOption === 'adjust') {
      // Navigate to edit screen
      router.push('/budget/edit');
    } else {
      // Start fresh wizard
      router.push('/budget/welcome');
    }
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Roll Over Budget</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Alert Banner */}
      <View style={styles.alertBanner}>
        <View style={styles.alertContent}>
          <Ionicons name="time-outline" size={20} color={theme.colors.warning.dark} />
          <Text style={styles.alertText}>
            Current budget period ends in 3 days
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Current Budget Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>CURRENT BUDGET</Text>
          <Text style={styles.periodText}>{currentBudgetSummary.period}</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatLabel}>Income</Text>
              <Text style={styles.summaryStatValue}>
                ${currentBudgetSummary.income.toLocaleString('en-AU')}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatLabel}>Allocated</Text>
              <Text style={styles.summaryStatValue}>
                ${currentBudgetSummary.allocated.toLocaleString('en-AU')}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatLabel}>Categories</Text>
              <Text style={styles.summaryStatValue}>{currentBudgetSummary.categories}</Text>
            </View>
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>
          How would you like to create your next budget?
        </Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {rolloverOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption === option.id && styles.optionCardSelected,
              ]}
              onPress={() => setSelectedOption(option.id)}
            >
              <View style={styles.radioCircle}>
                {selectedOption === option.id && <View style={styles.radioCircleInner} />}
              </View>
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                </View>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                {selectedOption === option.id && (
                  <View style={styles.previewBox}>
                    <Text style={styles.previewText}>{option.preview}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={theme.colors.info.main} />
          <Text style={styles.infoText}>
            You can always edit your budget after creating it
          </Text>
        </View>

        {/* Action Buttons */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={handleCreateBudget}
          style={styles.createButton}
        >
          Create Budget for Next Period
        </Button>

        <TouchableOpacity style={styles.remindButton}>
          <Text style={styles.remindButtonText}>Remind Me Later</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  alertBanner: {
    backgroundColor: theme.colors.warning.light,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.warning.main,
    paddingVertical: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.getScreenPadding(),
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.warning.dark,
    fontWeight: '600',
    marginLeft: theme.responsive.spacing.sm,
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  summaryCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.sm,
  },
  summaryLabel: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  periodText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginBottom: theme.responsive.spacing.xs,
  },
  summaryStatValue: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: theme.responsive.moderateScale(40),
    backgroundColor: theme.colors.border.light,
  },
  questionText: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.md,
  },
  optionsContainer: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  optionCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...theme.shadows.sm,
  },
  optionCardSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
  },
  radioCircle: {
    width: theme.responsive.scale(20),
    height: theme.responsive.scale(20),
    borderRadius: theme.responsive.scale(10),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
    marginTop: 2,
  },
  radioCircleInner: {
    width: theme.responsive.scale(10),
    height: theme.responsive.scale(10),
    borderRadius: theme.responsive.scale(5),
    backgroundColor: theme.colors.primary[600],
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.xs,
  },
  optionIcon: {
    fontSize: theme.responsive.fontSize.h4,
    marginRight: theme.responsive.spacing.sm,
  },
  optionTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  optionSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.sm,
  },
  previewBox: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.responsive.spacing.sm,
    marginTop: theme.responsive.spacing.sm,
  },
  previewText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.info.light,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  infoText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
    marginLeft: theme.responsive.spacing.sm,
    flex: 1,
  },
  createButton: {
    marginBottom: theme.responsive.spacing.sm,
  },
  remindButton: {
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
  },
  remindButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
  },
});
