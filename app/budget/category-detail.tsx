import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme, useTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
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
  const { currentTheme, isDark } = useTheme();
  const theme = getTheme(currentTheme);

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    backgroundTertiary: theme.colors.background.tertiary,
    text: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[600],
    primaryColor: theme.colors.primary[500],
    border: theme.colors.border.light,
    success: theme.colors.success.main,
    danger: theme.colors.danger.main,
    warning: theme.colors.warning.main,
    warningLight: theme.colors.warning.light,
    warningDark: theme.colors.warning.dark,
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
    headerButton: {
      padding: responsive.spacing[2],
    },
    headerCenter: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIcon: {
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      marginRight: responsive.spacing[2],
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
      color: colors.text,
    },
    overviewCard: {
      backgroundColor: colors.background,
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[8],
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    periodText: {
      ...theme.typography.styles.bodySmall,
      color: colors.textTertiary,
      marginBottom: responsive.spacing[2],
    },
    amountText: {
      fontSize: responsive.fontSize.h1,
      lineHeight: responsive.fontSize.h1 * 1.5,
      fontWeight: '700',
      color: colors.text,
      marginBottom: responsive.spacing[2],
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.backgroundTertiary,
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
      marginBottom: responsive.spacing[2],
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
      color: colors.success,
      fontWeight: '600',
    },
    percentageText: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
    },
    content: {
      padding: responsive.spacing[6],
    },
    card: {
      backgroundColor: colors.background,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    cardTitle: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: responsive.spacing[4],
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[4],
    },
    viewAllText: {
      ...theme.typography.styles.bodySmall,
      color: colors.primary,
      fontWeight: '500',
    },
    chartContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 128,
      marginBottom: responsive.spacing[4],
    },
    chartBar: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 2,
    },
    chartBarFill: {
      width: '100%',
      backgroundColor: colors.primaryColor,
      borderTopLeftRadius: theme.borderRadius.md,
      borderTopRightRadius: theme.borderRadius.md,
    },
    chartLabel: {
      ...theme.typography.styles.caption,
      color: colors.textTertiary,
      marginTop: responsive.spacing[1],
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: responsive.spacing[2],
    },
    statItem: {
      flex: 1,
    },
    statLabel: {
      ...theme.typography.styles.caption,
      color: colors.textTertiary,
      marginBottom: responsive.spacing[1],
    },
    statValue: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '600',
    },
    transactionsContainer: {
      gap: responsive.spacing[2],
    },
    dateLabel: {
      ...theme.typography.styles.caption,
      color: colors.textTertiary,
      fontWeight: '600',
      marginBottom: responsive.spacing[2],
    },
    transactionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[2],
    },
    merchantName: {
      ...theme.typography.styles.body,
      color: colors.text,
      flex: 1,
    },
    transactionAmount: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: colors.danger,
    },
    merchantsContainer: {
      gap: responsive.spacing[2],
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
      width: 32,
      height: 32,
      backgroundColor: colors.backgroundTertiary,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[2],
    },
    rankText: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    merchantAmount: {
      ...theme.typography.styles.body,
      color: colors.text,
      fontWeight: '600',
    },
    actionsContainer: {
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[6],
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
      padding: responsive.spacing[4],
    },
    premiumActionText: {
      ...theme.typography.styles.button,
      color: colors.textSecondary,
    },
    premiumBadge: {
      backgroundColor: colors.warningLight,
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 4,
    },
    premiumBadgeText: {
      ...theme.typography.styles.caption,
      color: colors.warningDark,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      fontWeight: '500',
    },
    secondaryAction: {
      borderWidth: 2,
      borderColor: theme.colors.border.main,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      alignItems: 'center',
    },
    secondaryActionText: {
      ...theme.typography.styles.button,
      color: colors.textSecondary,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.backgroundSecondary}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerIcon}>{categoryData.icon}</Text>
          <Text style={styles.headerTitle}>{categoryData.name}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.textSecondary} />
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
                    ? colors.warning
                    : colors.success,
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
                  { color: categoryData.variance < 0 ? colors.success : colors.danger }
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
