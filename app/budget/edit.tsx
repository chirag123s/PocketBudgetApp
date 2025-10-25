import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface BudgetItem {
  id: string;
  name: string;
  icon: string;
  amount: string;
  original: number;
}

const TOTAL_INCOME = 3200;

export default function EditBudget() {
  const router = useRouter();
  const [budgets, setBudgets] = useState<BudgetItem[]>([
    { id: 'housing', name: 'Housing', icon: '🏠', amount: '1800', original: 1800 },
    { id: 'groceries', name: 'Groceries', icon: '🛒', amount: '500', original: 500 },
    { id: 'transport', name: 'Transport', icon: '🚗', amount: '200', original: 200 },
    { id: 'bills', name: 'Bills', icon: '💡', amount: '300', original: 300 },
    { id: 'dining', name: 'Dining', icon: '🍽️', amount: '250', original: 250 },
  ]);
  const [applyToFuture, setApplyToFuture] = useState(false);

  const calculateTotal = () => budgets.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const allocated = calculateTotal();
  const remaining = TOTAL_INCOME - allocated;
  const percentage = Math.round((allocated / TOTAL_INCOME) * 100);

  const updateAmount = (id: string, amount: string) => {
    setBudgets(budgets.map(item =>
      item.id === id ? { ...item, amount } : item
    ));
  };

  const resetToOriginal = () => {
    setBudgets(budgets.map(b => ({ ...b, amount: b.original.toString() })));
  };

  const handleSave = () => {
    // Save logic here
    router.back();
  };

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
        <Text style={styles.headerTitle}>Edit Budget</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Warning Banner */}
      <View style={styles.warningBanner}>
        <Text style={styles.warningTitle}>⚠️ Warning</Text>
        <Text style={styles.warningText}>
          Changes apply to current period only
        </Text>
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
                  backgroundColor: allocated > TOTAL_INCOME ? theme.colors.danger.main : theme.colors.success.main,
                },
              ]}
            />
          </View>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Budget Items */}
        <View style={styles.itemsContainer}>
          {budgets.map((item) => {
            const isModified = item.amount !== item.original.toString();
            return (
              <View key={item.id} style={styles.budgetItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                  {isModified && (
                    <View style={styles.modifiedBadge}>
                      <Text style={styles.modifiedBadgeText}>Modified</Text>
                    </View>
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

                {isModified && (
                  <Text style={styles.originalText}>
                    Original: ${item.original}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Apply Options */}
        <View style={styles.applyCard}>
          <Text style={styles.applyTitle}>Apply changes to:</Text>
          <TouchableOpacity
            style={[
              styles.applyOption,
              !applyToFuture && styles.applyOptionSelected,
            ]}
            onPress={() => setApplyToFuture(false)}
          >
            <View style={styles.radioCircle}>
              {!applyToFuture && <View style={styles.radioCircleInner} />}
            </View>
            <View style={styles.applyOptionText}>
              <Text style={styles.applyOptionTitle}>This Period Only</Text>
              <Text style={styles.applyOptionSubtitle}>Nov 15 - Dec 14, 2025</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.applyOption,
              applyToFuture && styles.applyOptionSelected,
            ]}
            onPress={() => setApplyToFuture(true)}
          >
            <View style={styles.radioCircle}>
              {applyToFuture && <View style={styles.radioCircleInner} />}
            </View>
            <View style={styles.applyOptionText}>
              <Text style={styles.applyOptionTitle}>Future Periods</Text>
              <Text style={styles.applyOptionSubtitle}>Starting from next period</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetToOriginal}
        >
          <Text style={styles.resetButtonText}>Reset to Original</Text>
        </TouchableOpacity>

        {/* Save Changes Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={handleSave}
        >
          Save Changes
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
  headerButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  saveText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
  },
  warningBanner: {
    backgroundColor: theme.colors.warning.light,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.warning.main,
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
  },
  warningTitle: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.warning.dark,
    marginBottom: 4,
  },
  warningText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
  },
  summaryCard: {
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
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
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginRight: theme.responsive.spacing.sm,
  },
  progressFill: {
    height: '100%',
  },
  percentage: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  itemsContainer: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  budgetItem: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    fontSize: theme.responsive.fontSize.h3,
    marginRight: theme.responsive.spacing.sm,
  },
  itemName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  modifiedBadge: {
    backgroundColor: theme.colors.info.light,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
  },
  modifiedBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.info.dark,
    fontSize: theme.responsive.fontSize.caption,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: theme.responsive.fontSize.h4,
    color: theme.colors.text.tertiary,
    marginRight: theme.responsive.spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: theme.responsive.fontSize.h3,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  originalText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.responsive.spacing.sm,
  },
  applyCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.sm,
  },
  applyTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  applyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.responsive.spacing.md,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    marginBottom: theme.responsive.spacing.sm,
  },
  applyOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
  },
  radioCircle: {
    width: theme.responsive.scale(20),
    height: theme.responsive.scale(20),
    borderRadius: theme.responsive.scale(10),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  radioCircleInner: {
    width: theme.responsive.scale(10),
    height: theme.responsive.scale(10),
    borderRadius: theme.responsive.scale(5),
    backgroundColor: theme.colors.primary[600],
  },
  applyOptionText: {
    flex: 1,
  },
  applyOptionTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  applyOptionSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.responsive.spacing.sm,
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  resetButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
});
