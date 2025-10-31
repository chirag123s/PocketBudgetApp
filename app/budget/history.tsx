import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme, useTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface HistoryPeriod {
  period: string;
  spent: number;
  budget: number;
  status: 'under' | 'over';
  variance: number;
}

const historyData: HistoryPeriod[] = [
  { period: 'November 2025', spent: 2750, budget: 2850, status: 'under', variance: -100 },
  { period: 'October 2025', spent: 3100, budget: 2850, status: 'over', variance: 250 },
  { period: 'September 2025', spent: 2700, budget: 2850, status: 'under', variance: -150 },
  { period: 'August 2025', spent: 2900, budget: 2850, status: 'over', variance: 50 },
  { period: 'July 2025', spent: 2650, budget: 2850, status: 'under', variance: -200 },
  { period: 'June 2025', spent: 2800, budget: 2850, status: 'under', variance: -50 },
];

export default function BudgetHistory() {
  const router = useRouter();
  const { currentTheme, isDark } = useTheme();
  const theme = getTheme(currentTheme);

  const underBudgetCount = historyData.filter(p => p.status === 'under').length;
  const overBudgetCount = historyData.filter(p => p.status === 'over').length;
  const avgSpending = Math.round(historyData.reduce((sum, p) => sum + p.spent, 0) / historyData.length);

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    backgroundTertiary: theme.colors.background.tertiary,
    text: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[600],
    border: theme.colors.border.light,
    borderMain: theme.colors.border.main,
    success: theme.colors.success.main,
    successLight: theme.colors.success.light,
    successDark: theme.colors.success.dark,
    danger: theme.colors.danger.main,
    dangerLight: theme.colors.danger.light,
    dangerDark: theme.colors.danger.dark,
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: responsive.spacing[2],
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
      color: colors.text,
    },
    placeholder: {
      width: 40,
    },
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    summaryCard: {
      backgroundColor: colors.background,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
      ...theme.shadows.sm,
    },
    summaryLabel: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: colors.textTertiary,
      fontWeight: '600',
      marginBottom: responsive.spacing[2],
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontSize: responsive.fontSize.h3,
      lineHeight: responsive.fontSize.h3 * 1.5,
      fontWeight: '700',
      color: colors.success,
    },
    statLabel: {
      ...theme.typography.styles.caption,
      color: colors.textSecondary,
      marginTop: responsive.spacing[1],
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },
    historyList: {
      gap: responsive.spacing[2],
    },
    periodCard: {
      backgroundColor: colors.background,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    periodHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[2],
    },
    periodTitle: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '600',
    },
    periodStats: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[2],
    },
    periodAmount: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
    },
    statusBadge: {
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 4,
    },
    statusText: {
      ...theme.typography.styles.caption,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      fontWeight: '500',
    },
    miniProgressBar: {
      height: 6,
      backgroundColor: colors.backgroundTertiary,
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
    },
    miniProgressFill: {
      height: '100%',
    },
    loadMoreButton: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: colors.borderMain,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      alignItems: 'center',
      marginTop: responsive.spacing[4],
    },
    loadMoreText: {
      ...theme.typography.styles.button,
      color: colors.textSecondary,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.backgroundSecondary}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary Stats */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>LAST 6 MONTHS</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{underBudgetCount}</Text>
              <Text style={styles.statLabel}>Under Budget</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.danger }]}>
                {overBudgetCount}
              </Text>
              <Text style={styles.statLabel}>Over Budget</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${avgSpending.toLocaleString('en-AU')}</Text>
              <Text style={styles.statLabel}>Avg Spending</Text>
            </View>
          </View>
        </View>

        {/* History List */}
        <View style={styles.historyList}>
          {historyData.map((period, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.periodCard}
              onPress={() => {
                // Navigate to period detail
              }}
            >
              <View style={styles.periodHeader}>
                <Text style={styles.periodTitle}>{period.period}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
              </View>

              <View style={styles.periodStats}>
                <Text style={styles.periodAmount}>
                  ${period.spent.toLocaleString('en-AU')} / ${period.budget.toLocaleString('en-AU')}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: period.status === 'under' ? colors.successLight : colors.dangerLight }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: period.status === 'under' ? colors.successDark : colors.dangerDark }
                  ]}>
                    {period.status === 'under' ? '✓' : '⚠'} ${Math.abs(period.variance)} {period.status === 'under' ? 'under' : 'over'}
                  </Text>
                </View>
              </View>

              {/* Mini Progress Bar */}
              <View style={styles.miniProgressBar}>
                <View
                  style={[
                    styles.miniProgressFill,
                    {
                      width: `${Math.min((period.spent / period.budget) * 100, 100)}%`,
                      backgroundColor: period.status === 'under' ? colors.success : colors.danger,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load More */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load Older Budgets</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}
