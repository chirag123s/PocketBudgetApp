import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RecurringItem {
  id: number;
  name: string;
  amount: number;
  frequency: string;
  nextDate: string;
  day?: string;
  isEstimate?: boolean;
}

const recurringItems: RecurringItem[] = [
  { id: 1, name: 'Netflix', amount: 16.99, frequency: 'Monthly', nextDate: 'Nov 25', day: '25th' },
  { id: 2, name: 'Spotify', amount: 11.99, frequency: 'Monthly', nextDate: 'Dec 1', day: '1st' },
  { id: 3, name: 'Origin Energy', amount: 120, frequency: 'Quarterly', nextDate: 'Dec 15 (est)', isEstimate: true },
  { id: 4, name: 'Adobe Creative Cloud', amount: 52.99, frequency: 'Monthly', nextDate: 'Nov 15', day: '15th' },
];

export default function RecurringTransactions() {
  const router = useRouter();

  const monthlyItems = recurringItems.filter(item => item.frequency === 'Monthly');
  const quarterlyItems = recurringItems.filter(item => item.frequency === 'Quarterly');

  const monthlyTotal = monthlyItems.reduce((sum, item) => sum + item.amount, 0);
  const yearlyTotal = monthlyTotal * 12;

  const renderRecurringItem = (item: RecurringItem) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemFrequency}>
            {item.day ? `Every ${item.day}` : item.frequency}
          </Text>
        </View>
        <Text style={styles.itemAmount}>
          {item.isEstimate && '~'}${item.amount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.itemFooter}>
        <Text style={styles.itemNextDate}>
          Next: <Text style={styles.itemNextDateValue}>{item.nextDate}</Text>
        </Text>
        <View style={styles.itemActions}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopButton}>
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recurring Transactions</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary Card */}
        <LinearGradient
          colors={[theme.colors.primary[600], theme.colors.primary[700]]}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryLabel}>Monthly Total</Text>
          <Text style={styles.summaryAmount}>${monthlyTotal.toFixed(2)}/month</Text>
          <Text style={styles.summaryYearly}>${yearlyTotal.toFixed(2)}/year</Text>
        </LinearGradient>

        {/* Monthly Subscriptions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Monthly (${monthlyTotal.toFixed(2)}/month)
          </Text>
          {monthlyItems.map(renderRecurringItem)}
        </View>

        {/* Quarterly */}
        {quarterlyItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quarterly</Text>
            {quarterlyItems.map(renderRecurringItem)}
          </View>
        )}

        {/* Add Recurring Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Recurring</Text>
        </TouchableOpacity>

        {/* Subscription Insights (Premium) */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={styles.insightsTitle}>Subscription Insights</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </View>

          <View style={styles.insightsTotals}>
            <View style={styles.insightRow}>
              <Text style={styles.insightLabel}>Total Monthly</Text>
              <Text style={styles.insightValue}>${monthlyTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.insightRow}>
              <Text style={styles.insightLabel}>Total Yearly</Text>
              <Text style={styles.insightValue}>${yearlyTotal.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              <Text style={styles.tipIcon}>💡 </Text>
              You haven't used Audible in 3 months. Consider canceling to save $16.45/month.
            </Text>
          </View>

          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={() => {
              // Navigate to subscription audit
            }}
          >
            Audit Subscriptions
          </Button>
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
    paddingHorizontal: theme.responsive.getScreenPadding(),
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
  summaryCard: {
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.lg,
  },
  summaryLabel: {
    ...theme.typography.styles.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.responsive.spacing.sm,
  },
  summaryAmount: {
    fontSize: theme.responsive.fontSize.h1,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: theme.responsive.spacing.xs,
  },
  summaryYearly: {
    ...theme.typography.styles.bodySmall,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  section: {
    marginBottom: theme.responsive.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  itemCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    ...theme.shadows.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...theme.typography.styles.h4,
    marginBottom: theme.responsive.spacing.xs,
  },
  itemFrequency: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  itemAmount: {
    fontSize: theme.responsive.fontSize.h4,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemNextDate: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  itemNextDateValue: {
    fontWeight: '500',
  },
  itemActions: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  editButton: {
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
  },
  editButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  stopButton: {
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.danger.light,
    borderRadius: theme.borderRadius.lg,
  },
  stopButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.danger.main,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  addButton: {
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.responsive.spacing.sm,
    borderRadius: theme.responsive.scale(20),
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  addButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  insightsCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.getScreenPadding(),
    borderWidth: 2,
    borderColor: theme.colors.warning.light,
    ...theme.shadows.sm,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.md,
  },
  insightsTitle: {
    ...theme.typography.styles.h4,
  },
  premiumBadge: {
    backgroundColor: theme.colors.warning.light,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontWeight: '600',
    fontSize: theme.responsive.fontSize.caption,
  },
  insightsTotals: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  insightLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  insightValue: {
    ...theme.typography.styles.h4,
  },
  tipBox: {
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
  },
  tipText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.warning.dark,
  },
  tipIcon: {
    marginRight: theme.responsive.spacing.sm,
  },
});
