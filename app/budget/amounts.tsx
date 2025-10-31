import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface BudgetItem {
  id: string;
  name: string;
  icon: string;
  amount: string;
  suggested?: number;
  avg?: number;
}

const TOTAL_INCOME = 3200;

export default function SetBudgetAmounts() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    neutralBg: theme.colors.background.secondary,
  };

  const [budgets, setBudgets] = useState<BudgetItem[]>([
    { id: 'housing', name: 'Housing', icon: '🏠', amount: '1800', suggested: 1800 },
    { id: 'groceries', name: 'Groceries', icon: '🛒', amount: '500', suggested: 450, avg: 475 },
    { id: 'transport', name: 'Transport', icon: '🚗', amount: '200', suggested: 180 },
    { id: 'bills', name: 'Bills', icon: '💡', amount: '300' },
    { id: 'dining', name: 'Dining', icon: '🍽️', amount: '250' },
    { id: 'phone', name: 'Phone & Internet', icon: '📱', amount: '100' },
  ]);

  const calculateAllocated = () => {
    return budgets.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const allocated = calculateAllocated();
  const remaining = TOTAL_INCOME - allocated;
  const percentage = Math.round((allocated / TOTAL_INCOME) * 100);

  const updateAmount = (id: string, amount: string) => {
    setBudgets(budgets.map(item =>
      item.id === id ? { ...item, amount } : item
    ));
  };

  const applySuggestion = (id: string) => {
    const item = budgets.find(b => b.id === id);
    if (item?.suggested) {
      updateAmount(id, item.suggested.toString());
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
    backButton: {
      padding: responsive.spacing[2],
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
    },
    headerSubtitle: {
      ...theme.typography.styles.caption,
      color: theme.colors.text.tertiary,
      marginTop: responsive.spacing[1],
    },
    placeholder: {
      width: 40,
    },
    summaryCard: {
      backgroundColor: theme.colors.background.primary,
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[2],
    },
    summaryLabel: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.text.secondary,
    },
    summaryRemaining: {
      ...theme.typography.styles.bodySmall,
      fontWeight: '600',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsive.spacing[1],
    },
    progressBar: {
      flex: 1,
      height: 8,
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
      marginRight: responsive.spacing[2],
    },
    progressFill: {
      height: '100%',
    },
    percentage: {
      ...theme.typography.styles.bodySmall,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    allocated: {
      ...theme.typography.styles.caption,
      color: theme.colors.text.tertiary,
    },
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    itemsContainer: {
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[6],
    },
    budgetItem: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: responsive.spacing[2],
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    itemIcon: {
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
      marginRight: responsive.spacing[2],
    },
    itemName: {
      ...theme.typography.styles.body,
      fontWeight: '600',
    },
    suggestButton: {
      backgroundColor: theme.colors.info.light,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 4,
    },
    suggestButtonText: {
      ...theme.typography.styles.caption,
      color: theme.colors.info.dark,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      fontWeight: '500',
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencySymbol: {
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      color: theme.colors.text.tertiary,
      marginRight: responsive.spacing[2],
    },
    amountInput: {
      flex: 1,
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    avgText: {
      ...theme.typography.styles.caption,
      color: theme.colors.text.tertiary,
      marginTop: responsive.spacing[2],
    },
    suggestionsCard: {
      backgroundColor: theme.colors.info.light,
      borderWidth: 1,
      borderColor: theme.colors.info.main,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
    },
    suggestionsTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: theme.colors.info.dark,
      marginBottom: responsive.spacing[2],
    },
    suggestionsText: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.info.dark,
      marginBottom: responsive.spacing[2],
    },
    applyAllButton: {
      backgroundColor: theme.colors.info.main,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: responsive.spacing[2],
      alignItems: 'center',
    },
    applyAllButtonText: {
      ...theme.typography.styles.button,
      color: '#FFFFFF',
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    warningCard: {
      backgroundColor: theme.colors.danger.light,
      borderWidth: 1,
      borderColor: theme.colors.danger.main,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
    },
    warningTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: theme.colors.danger.dark,
      marginBottom: responsive.spacing[1],
    },
    warningText: {
      ...theme.typography.styles.bodySmall,
      color: theme.colors.danger.dark,
      marginBottom: responsive.spacing[2],
    },
    warningActions: {
      flexDirection: 'row',
      gap: responsive.spacing[2],
    },
    adjustButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.danger.main,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: responsive.spacing[2],
      alignItems: 'center',
    },
    adjustButtonText: {
      ...theme.typography.styles.button,
      color: theme.colors.danger.main,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    continueAnywayButton: {
      flex: 1,
      backgroundColor: theme.colors.danger.main,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: responsive.spacing[2],
      alignItems: 'center',
    },
    continueAnywayButtonText: {
      ...theme.typography.styles.button,
      color: '#FFFFFF',
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    quickActions: {
      flexDirection: 'row',
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[6],
    },
    quickActionButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border.main,
      borderRadius: theme.borderRadius.xl,
      paddingVertical: responsive.spacing[2],
      alignItems: 'center',
    },
    quickActionText: {
      ...theme.typography.styles.button,
      color: theme.colors.text.secondary,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    finishButton: {
      marginBottom: 0,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.neutralBg}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Budget Amounts</Text>
          <Text style={styles.headerSubtitle}>Step 4 of 4</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Sticky Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Income: ${TOTAL_INCOME.toLocaleString('en-AU')}</Text>
          <Text style={[
            styles.summaryRemaining,
            { color: remaining >= 0 ? theme.colors.success.main : theme.colors.danger.main }
          ]}>
            {remaining >= 0 ? 'Remaining' : 'Over'}: ${Math.abs(remaining).toLocaleString('en-AU')}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: percentage > 100 ? theme.colors.danger.main : theme.colors.success.main,
                },
              ]}
            />
          </View>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
        <Text style={styles.allocated}>Allocated: ${allocated.toLocaleString('en-AU')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Budget Items */}
        <View style={styles.itemsContainer}>
          {budgets.map((item) => (
            <View key={item.id} style={styles.budgetItem}>
              <View style={styles.itemHeader}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemIcon}>{item.icon}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                {item.suggested && (
                  <TouchableOpacity
                    style={styles.suggestButton}
                    onPress={() => applySuggestion(item.id)}
                  >
                    <Text style={styles.suggestButtonText}>
                      Suggest: ${item.suggested} ↻
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  value={item.amount}
                  onChangeText={(value) => updateAmount(item.id, value)}
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.text.tertiary}
                />
              </View>

              {item.avg && (
                <Text style={styles.avgText}>
                  📊 Avg last 3mo: ${item.avg}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Smart Suggestions */}
        <View style={styles.suggestionsCard}>
          <Text style={styles.suggestionsTitle}>💡 Smart Suggestions</Text>
          <Text style={styles.suggestionsText}>
            We've suggested amounts based on your transaction history and the 50/30/20 rule.
          </Text>
          <TouchableOpacity style={styles.applyAllButton}>
            <Text style={styles.applyAllButtonText}>Apply All Suggestions</Text>
          </TouchableOpacity>
        </View>

        {/* Warning if over budget */}
        {remaining < 0 && (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>
              ⚠️ You're ${Math.abs(remaining)} over budget
            </Text>
            <Text style={styles.warningText}>
              Consider adjusting amounts to match your income.
            </Text>
            <View style={styles.warningActions}>
              <TouchableOpacity style={styles.adjustButton}>
                <Text style={styles.adjustButtonText}>Adjust Budget</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueAnywayButton}>
                <Text style={styles.continueAnywayButtonText}>Continue Anyway</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>Distribute Evenly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Finish Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => router.push('/budget/summary')}
          style={[
            styles.finishButton,
            remaining < 0 && { backgroundColor: theme.colors.danger.main }
          ]}
        >
          Finish Setup
        </Button>
      </ScrollView>
    </Screen>
  );
}
