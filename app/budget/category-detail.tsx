import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const categoryData = {
  name: 'Groceries',
  icon: '🛒',
  spent: 420,
  budget: 500,
  remaining: 80,
  percentage: 84,
  avgMonthly: 450,
  variance: -7,
  topMerchants: [
    { name: 'Woolworths', amount: 245 },
    { name: 'Coles', amount: 132 },
    { name: 'Aldi', amount: 43 },
  ],
  recentTransactions: [
    { date: 'Today', merchant: 'Coles', amount: -45 },
    { date: 'Yesterday', merchant: 'Woolworths', amount: -89 },
    { date: 'Oct 20', merchant: 'Aldi', amount: -67 },
  ],
};

const monthlyData = [320, 450, 380, 420, 475, 420];
const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

export default function CategoryDetail() {
  const router = useRouter();

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerIcon}>{categoryData.icon}</Text>
          <Text style={styles.headerTitle}>{categoryData.name}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Current Period Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.periodText}>November 2025</Text>
          <Text style={styles.amountText}>
            ${categoryData.spent} / ${categoryData.budget}
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${categoryData.percentage}%`,
                  backgroundColor: categoryData.percentage > 80
                    ? theme.colors.warning.main
                    : theme.colors.success.main,
                },
              ]}
            />
          </View>

          <View style={styles.overviewFooter}>
            <Text style={styles.remainingText}>
              ${categoryData.remaining} remaining
            </Text>
            <Text style={styles.percentageText}>{categoryData.percentage}%</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Spending Trend */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Spending Trend</Text>

            {/* Simple Bar Chart */}
            <View style={styles.chartContainer}>
              {monthlyData.map((value, idx) => (
                <View key={idx} style={styles.chartBar}>
                  <View
                    style={[
                      styles.chartBarFill,
                      { height: `${(value / 500) * 100}%` },
                    ]}
                  />
                  <Text style={styles.chartLabel}>{months[idx]}</Text>
                </View>
              ))}
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>This month</Text>
                <Text style={styles.statValue}>${categoryData.spent}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Avg</Text>
                <Text style={styles.statValue}>${categoryData.avgMonthly}/month</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>vs average</Text>
                <Text style={[
                  styles.statValue,
                  { color: categoryData.variance < 0 ? theme.colors.success.main : theme.colors.danger.main }
                ]}>
                  {categoryData.variance > 0 ? '↑' : '↓'} {Math.abs(categoryData.variance)}%
                </Text>
              </View>
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.transactionsContainer}>
              {categoryData.recentTransactions.map((tx, idx) => (
                <View key={idx}>
                  {(idx === 0 || tx.date !== categoryData.recentTransactions[idx - 1].date) && (
                    <Text style={styles.dateLabel}>{tx.date}</Text>
                  )}
                  <View style={styles.transactionRow}>
                    <Text style={styles.merchantName}>{tx.merchant}</Text>
                    <Text style={styles.transactionAmount}>
                      ${Math.abs(tx.amount)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Top Merchants */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Merchants</Text>
            <View style={styles.merchantsContainer}>
              {categoryData.topMerchants.map((merchant, idx) => (
                <View key={idx} style={styles.merchantRow}>
                  <View style={styles.merchantLeft}>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.merchantName}>{merchant.name}</Text>
                  </View>
                  <Text style={styles.merchantAmount}>${merchant.amount}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <Button
              variant="primary"
              fullWidth
              size="large"
              onPress={() => router.push('/budget/edit')}
              style={styles.actionButton}
            >
              Edit Budget Amount
            </Button>

            <TouchableOpacity style={styles.premiumAction}>
              <Text style={styles.premiumActionText}>View Subcategories</Text>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>Premium</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>Set Alert at 90%</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: theme.responsive.fontSize.h4,
    marginRight: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  overviewCard: {
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  periodText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
    marginBottom: theme.responsive.spacing.sm,
  },
  amountText: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.responsive.spacing.sm,
  },
  progressFill: {
    height: '100%',
  },
  overviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remainingText: {
    ...theme.typography.styles.body,
    color: theme.colors.success.main,
    fontWeight: '600',
  },
  percentageText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.md,
  },
  viewAllText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.primary[600],
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: theme.responsive.moderateScale(128),
    marginBottom: theme.responsive.spacing.md,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: theme.colors.primary[500],
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  chartLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.responsive.spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    paddingTop: theme.responsive.spacing.sm,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginBottom: theme.responsive.spacing.xs,
  },
  statValue: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  transactionsContainer: {
    gap: theme.responsive.spacing.sm,
  },
  dateLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.responsive.spacing.sm,
  },
  merchantName: {
    ...theme.typography.styles.body,
    flex: 1,
  },
  transactionAmount: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.danger.main,
  },
  merchantsContainer: {
    gap: theme.responsive.spacing.sm,
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  merchantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankBadge: {
    width: theme.responsive.moderateScale(32),
    height: theme.responsive.moderateScale(32),
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.responsive.scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  rankText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  merchantAmount: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  actionsContainer: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  actionButton: {
    marginBottom: 0,
  },
  premiumAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
  },
  premiumActionText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
  },
  premiumBadge: {
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '500',
  },
  secondaryAction: {
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
  },
  secondaryActionText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
  },
});
