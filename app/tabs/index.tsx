import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data (will be replaced with actual data from context)
const sampleData = {
  totalBudget: 4500,
  totalSpent: 2847.32,
  categories: [
    { name: 'Groceries', spent: 487.23, budget: 600, emoji: '🛒', color: '#10B981' },
    { name: 'Transport', spent: 243.15, budget: 300, emoji: '🚗', color: '#3B82F6' },
    { name: 'Entertainment', spent: 189.45, budget: 200, emoji: '🎬', color: '#8B5CF6' },
  ],
  upcomingBills: [
    { name: 'Rent', amount: 1800, due: 'Feb 1', emoji: '🏠', color: '#EF4444' },
    { name: 'Internet', amount: 89, due: 'Feb 5', emoji: '📡', color: '#3B82F6' },
  ],
  recentTransactions: [
    { name: 'Woolworths', amount: -87.32, category: 'Groceries', date: 'Today', emoji: '🛒' },
    { name: 'Salary', amount: 3500, category: 'Income', date: 'Yesterday', emoji: '💰' },
    { name: 'Uber', amount: -24.50, category: 'Transport', date: 'Yesterday', emoji: '🚗' },
  ],
};

export default function HomeTab() {
  const router = useRouter();

  const budgetPercentage = (sampleData.totalSpent / sampleData.totalBudget) * 100;
  const remaining = sampleData.totalBudget - sampleData.totalSpent;

  return (
    <Screen edges={['top']} noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.userName}>John</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text.primary} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Quick Summary Card */}
        <LinearGradient
          colors={[theme.colors.primary[400], theme.colors.primary[600]]}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryTitle}>January Budget</Text>
          <Text style={styles.summaryAmount}>${remaining.toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Remaining of ${sampleData.totalBudget.toFixed(2)}</Text>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${budgetPercentage}%` }]} />
            </View>
            <Text style={styles.progressPercentage}>{budgetPercentage.toFixed(0)}%</Text>
          </View>

          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.statValue}>${sampleData.totalSpent.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Days left</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Top Spending Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Spending</Text>
            <TouchableOpacity onPress={() => router.push('/tabs/budget')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {sampleData.categories.map((category, index) => {
            const categoryPercentage = (category.spent / category.budget) * 100;
            return (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                    <View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryAmount}>
                        ${category.spent.toFixed(2)} of ${category.budget.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.categoryPercentage,
                    categoryPercentage >= 100 && styles.categoryPercentageOver
                  ]}>
                    {categoryPercentage.toFixed(0)}%
                  </Text>
                </View>
                <View style={styles.categoryProgressBackground}>
                  <View
                    style={[
                      styles.categoryProgressFill,
                      {
                        width: `${Math.min(categoryPercentage, 100)}%`,
                        backgroundColor: categoryPercentage >= 100
                          ? theme.colors.danger.main
                          : categoryPercentage >= 80
                          ? theme.colors.warning.main
                          : category.color
                      }
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upcoming Bills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bills</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {sampleData.upcomingBills.map((bill, index) => (
            <View key={index} style={styles.billCard}>
              <View style={styles.billInfo}>
                <Text style={styles.billEmoji}>{bill.emoji}</Text>
                <View>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billDue}>Due {bill.due}</Text>
                </View>
              </View>
              <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/tabs/transactions')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {sampleData.recentTransactions.map((transaction, index) => (
            <TouchableOpacity key={index} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionEmoji}>{transaction.emoji}</Text>
                <View>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  transaction.amount > 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative
                ]}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary[100] }]}>
              <Ionicons name="add" size={24} color={theme.colors.primary[600]} />
            </View>
            <Text style={styles.actionText}>Add Transaction</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="wallet" size={24} color="#2563EB" />
            </View>
            <Text style={styles.actionText}>Edit Budget</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="stats-chart" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.actionText}>View Charts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[4],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  greeting: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  userName: {
    ...theme.typography.styles.h2,
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
  },
  notificationButton: {
    position: 'relative',
    padding: responsive.spacing[2],
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.danger.main,
  },
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  summaryCard: {
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[6],
    ...theme.shadows.lg,
  },
  summaryTitle: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: responsive.spacing[2],
  },
  summaryAmount: {
    fontSize: responsive.fontSize.h3,
    lineHeight: responsive.fontSize.h3 * 1.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: responsive.spacing[4],
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing[4],
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: responsive.spacing[2],
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    fontWeight: '600',
    color: '#FFFFFF',
    width: 40,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: responsive.spacing[4],
  },
  statLabel: {
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: responsive.spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing[4],
  },
  sectionTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
  },
  seeAllText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.primary[600],
    fontWeight: '600',
  },
  categoryCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryEmoji: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  categoryName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryAmount: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  categoryPercentage: {
    ...theme.typography.styles.body,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  categoryPercentageOver: {
    color: theme.colors.danger.main,
  },
  categoryProgressBackground: {
    height: 6,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  billCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  billInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  billEmoji: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  billName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  billDue: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  billAmount: {
    ...theme.typography.styles.body,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionEmoji: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  transactionName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionCategory: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...theme.typography.styles.body,
    fontWeight: '700',
    marginBottom: 2,
  },
  transactionAmountPositive: {
    color: theme.colors.success.main,
  },
  transactionAmountNegative: {
    color: theme.colors.text.primary,
  },
  transactionDate: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsive.spacing[2],
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing[2],
  },
  actionText: {
    ...theme.typography.styles.bodySmall,
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
});
