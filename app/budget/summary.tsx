import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const budgetData = {
  period: 'Nov 15 - Dec 14, 2025',
  periodType: 'Credit card cycle',
  income: 3200,
  budget: 2850,
  savings: 350,
  categories: [
    { name: 'Housing', icon: '🏠', amount: 1800 },
    { name: 'Groceries', icon: '🛒', amount: 500 },
    { name: 'Transport', icon: '🚗', amount: 200 },
    { name: 'Bills', icon: '💡', amount: 150 },
    { name: 'Dining', icon: '🍽️', amount: 100 },
    { name: 'Phone', icon: '📱', amount: 100 },
  ],
};

export default function BudgetSummary() {
  const router = useRouter();
  const savingsPercentage = Math.round((budgetData.savings / budgetData.income) * 100);

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
        <Text style={styles.headerTitle}>Review Budget</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Budget Period */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>BUDGET PERIOD</Text>
          <Text style={styles.periodText}>{budgetData.period}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{budgetData.periodType}</Text>
          </View>
        </View>

        {/* Income & Spending Summary */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>INCOME & SPENDING</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryValue}>${budgetData.income.toLocaleString('en-AU')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Budget</Text>
            <Text style={styles.summaryValue}>${budgetData.budget.toLocaleString('en-AU')}</Text>
          </View>
          <View style={[styles.summaryRow, styles.lastRow]}>
            <Text style={styles.savingsLabel}>Savings</Text>
            <Text style={styles.savingsValue}>${budgetData.savings.toLocaleString('en-AU')}</Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>CATEGORY BREAKDOWN</Text>
          <View style={styles.categoriesContainer}>
            {budgetData.categories.map((cat, index) => (
              <View key={index} style={styles.categoryRow}>
                <View style={styles.categoryLeft}>
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>${cat.amount.toLocaleString('en-AU')}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Visual Summary */}
        <View style={styles.savingsCard}>
          <Text style={styles.savingsIcon}>🎯</Text>
          <Text style={styles.savingsTitle}>
            You're saving ${budgetData.savings}
          </Text>
          <Text style={styles.savingsSubtitle}>
            That's {savingsPercentage}% of your income
          </Text>
        </View>

        {/* Edit Budget Button */}
        <Button
          variant="secondary"
          fullWidth
          size="large"
          onPress={() => router.back()}
          style={styles.editButton}
        >
          Edit Budget
        </Button>

        {/* Create Budget Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => {
            // Navigate to dashboard or show success
            router.replace('/tabs');
          }}
        >
          Create Budget
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
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  cardLabel: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  periodText: {
    ...theme.typography.styles.h4,
    marginBottom: theme.responsive.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.primary[700],
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.responsive.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  summaryLabel: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  savingsLabel: {
    ...theme.typography.styles.body,
    color: theme.colors.success.main,
    fontWeight: '500',
  },
  savingsValue: {
    ...theme.typography.styles.body,
    color: theme.colors.success.main,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: theme.responsive.spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: theme.responsive.fontSize.h4,
    marginRight: theme.responsive.spacing.sm,
  },
  categoryName: {
    ...theme.typography.styles.body,
    fontWeight: '500',
  },
  categoryAmount: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  savingsCard: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.lg,
    alignItems: 'center',
  },
  savingsIcon: {
    fontSize: theme.responsive.moderateScale(40),
    marginBottom: theme.responsive.spacing.sm,
  },
  savingsTitle: {
    ...theme.typography.styles.h3,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.xs,
  },
  savingsSubtitle: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  editButton: {
    marginBottom: theme.responsive.spacing.sm,
  },
});
