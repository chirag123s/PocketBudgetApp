import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
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

  const underBudgetCount = historyData.filter(p => p.status === 'under').length;
  const overBudgetCount = historyData.filter(p => p.status === 'over').length;
  const avgSpending = Math.round(historyData.reduce((sum, p) => sum + p.spent, 0) / historyData.length);

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
              <Text style={[styles.statValue, { color: theme.colors.danger.main }]}>
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
                <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
              </View>

              <View style={styles.periodStats}>
                <Text style={styles.periodAmount}>
                  ${period.spent.toLocaleString('en-AU')} / ${period.budget.toLocaleString('en-AU')}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: period.status === 'under' ? theme.colors.success.light : theme.colors.danger.light }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: period.status === 'under' ? theme.colors.success.dark : theme.colors.danger.dark }
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
                      backgroundColor: period.status === 'under' ? theme.colors.success.main : theme.colors.danger.main,
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  summaryCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[6],
    ...theme.shadows.sm,
  },
  summaryLabel: {
    ...theme.typography.styles.label,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: theme.spacing[2],
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
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.success.main,
  },
  statLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border.light,
  },
  historyList: {
    gap: theme.spacing[2],
  },
  periodCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    ...theme.shadows.sm,
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[2],
  },
  periodTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  periodStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[2],
  },
  periodAmount: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
  },
  statusBadge: {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: 4,
  },
  statusText: {
    ...theme.typography.styles.caption,
    fontSize: 12,
    fontWeight: '500',
  },
  miniProgressBar: {
    height: 6,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
  },
  loadMoreButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    alignItems: 'center',
    marginTop: theme.spacing[4],
  },
  loadMoreText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
});
