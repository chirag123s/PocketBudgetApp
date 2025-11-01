import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const monthlyItems = recurringItems.filter(item => item.frequency === 'Monthly');
  const quarterlyItems = recurringItems.filter(item => item.frequency === 'Quarterly');

  const monthlyTotal = monthlyItems.reduce((sum, item) => sum + item.amount, 0);
  const yearlyTotal = monthlyTotal * 12;

  const colors = {
    neutralBg: theme.colors.background.secondary,
    cardBg: theme.colors.background.primary,
    primaryText: theme.colors.text.primary,
    secondaryText: theme.colors.text.secondary,
    tertiaryText: theme.colors.text.tertiary,
    borderColor: theme.colors.border.light,
    inputBg: theme.colors.background.tertiary,
    dangerLight: theme.colors.danger.light,
    dangerMain: theme.colors.danger.main,
    primaryColor: theme.colors.primary[600],
    primary700: theme.colors.primary[700],
    warningLight: theme.colors.warning.light,
    warningDark: theme.colors.warning.dark,
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.cardBg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },
    backButton: {
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
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    summaryCard: {
      borderRadius: 20,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[6],
      ...theme.shadows.lg,
    },
    summaryLabel: {
      ...theme.typography.styles.bodySmall,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: responsive.spacing[2],
    },
    summaryAmount: {
      fontSize: responsive.fontSize.h2,
      lineHeight: responsive.fontSize.h2 * 1.5,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: responsive.spacing[1],
    },
    summaryYearly: {
      ...theme.typography.styles.bodySmall,
      color: 'rgba(255, 255, 255, 0.75)',
    },
    section: {
      marginBottom: responsive.spacing[6],
    },
    sectionTitle: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: colors.secondaryText,
      fontWeight: '600',
      marginBottom: responsive.spacing[2],
    },
    itemCard: {
      backgroundColor: colors.cardBg,
      borderRadius: 20,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
      ...theme.shadows.sm,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[2],
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      ...theme.typography.styles.h4,
      marginBottom: responsive.spacing[1],
    },
    itemFrequency: {
      ...theme.typography.styles.bodySmall,
      color: colors.secondaryText,
    },
    itemAmount: {
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      fontWeight: '700',
      color: colors.primaryText,
    },
    itemFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemNextDate: {
      ...theme.typography.styles.bodySmall,
      color: colors.secondaryText,
    },
    itemNextDateValue: {
      fontWeight: '500',
    },
    itemActions: {
      flexDirection: 'row',
      gap: responsive.spacing[2],
    },
    editButton: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.inputBg,
      borderRadius: theme.borderRadius.lg,
    },
    editButtonText: {
      ...theme.typography.styles.button,
      color: colors.secondaryText,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    stopButton: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.dangerLight,
      borderRadius: theme.borderRadius.lg,
    },
    stopButtonText: {
      ...theme.typography.styles.button,
      color: colors.dangerMain,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    addButton: {
      backgroundColor: colors.inputBg,
      paddingVertical: responsive.spacing[2],
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: responsive.spacing[6],
    },
    addButtonText: {
      ...theme.typography.styles.button,
      color: colors.secondaryText,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    insightsCard: {
      backgroundColor: colors.cardBg,
      borderRadius: 20,
      padding: responsive.spacing[6],
      borderWidth: 2,
      borderColor: colors.warningLight,
      ...theme.shadows.sm,
    },
    insightsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[4],
    },
    insightsTitle: {
      ...theme.typography.styles.h4,
    },
    premiumBadge: {
      backgroundColor: colors.warningLight,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 4,
      borderRadius: theme.borderRadius.full,
    },
    premiumBadgeText: {
      ...theme.typography.styles.caption,
      color: colors.warningDark,
      fontWeight: '600',
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
    },
    insightsTotals: {
      backgroundColor: colors.neutralBg,
      borderRadius: 20,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
    },
    insightRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[2],
    },
    insightLabel: {
      ...theme.typography.styles.bodySmall,
      color: colors.secondaryText,
    },
    insightValue: {
      ...theme.typography.styles.h4,
    },
    tipBox: {
      backgroundColor: colors.warningLight,
      borderRadius: 20,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
    },
    tipText: {
      ...theme.typography.styles.bodySmall,
      color: colors.warningDark,
    },
    tipIcon: {
      marginRight: responsive.spacing[2],
    },
  });

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
    <Screen noPadding backgroundColor={colors.neutralBg}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primaryText} />
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
