import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    neutralBg: theme.colors.background.secondary,
  };

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
    headerButton: {
      padding: responsive.spacing[2],
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
    },
    placeholder: {
      width: 40,
    },
    alertBanner: {
      backgroundColor: theme.colors.warning.light,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.warning.main,
      paddingVertical: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[6],
    },
    alertContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    alertText: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.warning.dark,
      fontWeight: '600',
      marginLeft: responsive.spacing[2],
    },
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    summaryCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
      ...theme.shadows.sm,
    },
    summaryLabel: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: theme.colors.text.tertiary,
      fontWeight: '600',
      marginBottom: responsive.spacing[2],
    },
    periodText: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      marginBottom: responsive.spacing[4],
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
      marginBottom: responsive.spacing[1],
    },
    summaryStatValue: {
      ...theme.typography.styles.body,
      fontWeight: '600',
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: theme.colors.border.light,
    },
    questionText: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
      marginBottom: responsive.spacing[4],
    },
    optionsContainer: {
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[6],
    },
    optionCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
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
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border.main,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[2],
      marginTop: 2,
    },
    radioCircleInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary[600],
    },
    optionContent: {
      flex: 1,
    },
    optionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsive.spacing[1],
    },
    optionIcon: {
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      marginRight: responsive.spacing[2],
    },
    optionTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
    },
    optionSubtitle: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.text.secondary,
      marginBottom: responsive.spacing[2],
    },
    previewBox: {
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[2],
      marginTop: responsive.spacing[2],
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
      padding: responsive.spacing[2],
      marginBottom: responsive.spacing[6],
    },
    infoText: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.info.dark,
      marginLeft: responsive.spacing[2],
      flex: 1,
    },
    createButton: {
      marginBottom: responsive.spacing[2],
    },
    remindButton: {
      borderWidth: 2,
      borderColor: theme.colors.border.main,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      alignItems: 'center',
    },
    remindButtonText: {
      ...theme.typography.styles.button,
      color: theme.colors.text.secondary,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.neutralBg}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
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