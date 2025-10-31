import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme, useTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
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
  const { currentTheme, isDark } = useTheme();
  const theme = getTheme(currentTheme);
  const savingsPercentage = Math.round((budgetData.savings / budgetData.income) * 100);

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    backgroundTertiary: theme.colors.background.tertiary,
    text: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[600],
    primaryBg: theme.colors.primary[50],
    primaryBorder: theme.colors.primary[700],
    border: theme.colors.border.light,
    success: theme.colors.success.main,
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
    card: {
      backgroundColor: colors.background,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    cardLabel: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: colors.textTertiary,
      fontWeight: '600',
      marginBottom: responsive.spacing[2],
    },
    periodText: {
      ...theme.typography.styles.h4,
      color: colors.text,
      marginBottom: responsive.spacing[2],
    },
    badge: {
      backgroundColor: theme.colors.primary[100],
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    badgeText: {
      ...theme.typography.styles.caption,
      color: colors.primaryBorder,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      fontWeight: '500',
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[2],
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    summaryLabel: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
    },
    summaryValue: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '600',
    },
    savingsLabel: {
      ...theme.typography.styles.body,
      color: colors.success,
      fontWeight: '500',
    },
    savingsValue: {
      ...theme.typography.styles.body,
      color: colors.success,
      fontWeight: '600',
    },
    categoriesContainer: {
      gap: responsive.spacing[2],
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
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      marginRight: responsive.spacing[2],
    },
    categoryName: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '500',
    },
    categoryAmount: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '600',
    },
    savingsCard: {
      backgroundColor: colors.primaryBg,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[6],
      alignItems: 'center',
    },
    savingsIcon: {
      fontSize: responsive.fontSize.display,
      lineHeight: responsive.fontSize.display * 1.5,
      marginBottom: responsive.spacing[2],
    },
    savingsTitle: {
      ...theme.typography.styles.h3,
      color: colors.text,
      textAlign: 'center',
      marginBottom: responsive.spacing[1],
    },
    savingsSubtitle: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    editButton: {
      marginBottom: responsive.spacing[2],
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