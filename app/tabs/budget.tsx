import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { AdjustBudgetsModal } from '@/components/budget';
import { CircularProgress } from '@/components/charts';

// Color Palette - Using theme colors
const colors = {
  // Primary Palette
  primaryDark: theme.colors.info.dark,
  primary: theme.colors.info.main,
  primaryLight: theme.colors.info.light,

  // Neutral Palette
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,

  // Functional Palette
  functionalSuccess: theme.colors.success.main,
  functionalWarning: theme.colors.warning.main,
  functionalError: theme.colors.danger.main,
};

interface BudgetCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  spent: number;
  total: number;
  color: string;
}

export default function BudgetTab() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'custom'>('monthly');
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Sample budget data
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Groceries', icon: 'cart-outline', spent: 450.20, total: 600, color: colors.functionalSuccess },
    { id: '2', name: 'Transport', icon: 'bus-outline', spent: 195, total: 200, color: colors.functionalWarning },
    { id: '3', name: 'Entertainment', icon: 'film-outline', spent: 315.50, total: 250, color: colors.functionalError },
    { id: '4', name: 'Utilities', icon: 'bulb-outline', spent: 230, total: 300, color: colors.primary },
  ]);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.total, 0);
  const remaining = totalBudget - totalSpent;
  const percentage = Math.round((totalSpent / totalBudget) * 100);

  const getProgressColor = (spent: number, total: number) => {
    const percent = (spent / total) * 100;
    if (spent > total) return colors.functionalError;
    if (percent >= 95) return colors.functionalWarning;
    return colors.functionalSuccess;
  };

  const handleSaveBudgets = (updatedCategories: BudgetCategory[]) => {
    setCategories(updatedCategories);
    // TODO: Save to backend/database
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="settings-outline" size={24} color={colors.neutralDarkest} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Period Selector */}
          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'weekly' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('weekly')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'weekly' && styles.periodTextActive]}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'monthly' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('monthly')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'monthly' && styles.periodTextActive]}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'custom' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('custom')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'custom' && styles.periodTextActive]}>
                Custom
              </Text>
            </TouchableOpacity>
          </View>

          {/* Total Budget Card */}
          <View style={styles.totalCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardLabel}>Total Budget</Text>
                <Text style={styles.cardPeriod}>Jan 1 - Jan 31, 2025</Text>
              </View>
              <View style={styles.circularProgress}>
                <CircularProgress
                  percentage={percentage}
                  sizeScale={120}
                  strokeWidthScale={12}
                  showPercentage={true}
                  autoColor={true}
                />
              </View>
            </View>

            <View style={styles.budgetStats}>
              <View style={styles.budgetStat}>
                <Text style={styles.budgetStatLabel}>Spent</Text>
                <Text style={styles.budgetStatValue}>${totalSpent.toFixed(2)}</Text>
              </View>
              <View style={styles.budgetStat}>
                <Text style={styles.budgetStatLabel}>Budget</Text>
                <Text style={styles.budgetStatValue}>${totalBudget.toFixed(2)}</Text>
              </View>
              <View style={styles.budgetStat}>
                <Text style={styles.budgetStatLabel}>Remaining</Text>
                <Text style={[styles.budgetStatValue, { color: remaining >= 0 ? colors.functionalSuccess : colors.functionalError }]}>
                  ${Math.abs(remaining).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: percentage >= 100 ? colors.functionalError : percentage >= 80 ? colors.functionalWarning : colors.functionalSuccess
                  }
                ]}
              />
            </View>
          </View>

          {/* Alerts Card */}
          <View style={styles.alertsCard}>
            <View style={styles.alertItem}>
              <Ionicons name="alert-circle" size={20} color={colors.functionalError} />
              <Text style={styles.alertText}>
                <Text style={styles.alertBold}>Entertainment</Text> is over budget by $65.50
              </Text>
            </View>
            <View style={styles.alertItem}>
              <Ionicons name="warning" size={20} color={colors.functionalWarning} />
              <Text style={styles.alertText}>
                <Text style={styles.alertBold}>Transport</Text> is at 97% of budget
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setShowAdjustModal(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color={colors.primary} />
              <Text style={styles.actionBtnText}>Adjust Budgets</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/tabs/charts')}
              activeOpacity={0.7}
            >
              <Ionicons name="stats-chart" size={20} color={colors.primary} />
              <Text style={styles.actionBtnText}>View Spending</Text>
            </TouchableOpacity>
          </View>

          {/* Category Breakdown */}
          <View style={styles.categoryBreakdown}>
            <Text style={styles.sectionTitle}>Category Breakdown</Text>

            {categories.map((category) => {
              const categoryPercentage = Math.round((category.spent / category.total) * 100);
              const progressColor = getProgressColor(category.spent, category.total);

              return (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryTop}>
                    <View style={styles.categoryLeft}>
                      <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}20` }]}>
                        <Ionicons name={category.icon} size={24} color={category.color} />
                      </View>
                      <View style={styles.categoryInfo}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.categoryAmount}>
                          ${category.spent.toFixed(2)} <Text style={styles.categoryTotal}>of ${category.total.toFixed(2)}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.categoryRight}>
                      <Text style={[styles.categoryPercentage, { color: progressColor }]}>
                        {categoryPercentage}%
                      </Text>
                    </View>
                  </View>

                  {/* Category Progress Bar */}
                  <View style={styles.categoryProgress}>
                    <View
                      style={[
                        styles.categoryProgressFill,
                        {
                          width: `${Math.min(categoryPercentage, 100)}%`,
                          backgroundColor: progressColor
                        }
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bottom spacing */}
          <View style={{ height: responsive.spacing[20] }} />
        </View>
      </ScrollView>

      {/* Adjust Budgets Modal */}
      <AdjustBudgetsModal
        visible={showAdjustModal}
        onClose={() => setShowAdjustModal(false)}
        categories={categories}
        onSave={handleSaveBudgets}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
    backgroundColor: colors.neutralBg,
  },
  headerTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  headerButton: {
    width: ms(40),
    height: ms(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: responsive.spacing[4],
    gap: responsive.spacing[4],
  },
  // Period Selector
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[1],
    gap: responsive.spacing[1],
    ...theme.shadows.sm,
  },
  periodButton: {
    flex: 1,
    paddingVertical: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[3],
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
  },
  periodTextActive: {
    color: colors.neutralWhite,
  },
  // Total Budget Card
  totalCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    gap: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
    marginBottom: responsive.spacing[1],
  },
  cardPeriod: {
    fontSize: responsive.fontSize.xs,
    color: colors.neutralMedium,
  },
  circularProgress: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsive.spacing[3],
    borderTopWidth: 1,
    borderTopColor: `${colors.neutralMedium}20`,
  },
  budgetStat: {
    flex: 1,
    alignItems: 'center',
  },
  budgetStatLabel: {
    fontSize: responsive.fontSize.xs,
    color: colors.neutralMedium,
    marginBottom: responsive.spacing[1],
  },
  budgetStatValue: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  progressBar: {
    height: ms(8),
    backgroundColor: colors.neutralBg,
    borderRadius: ms(4),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: ms(4),
  },
  // Alerts Card
  alertsCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  alertText: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
    flex: 1,
  },
  alertBold: {
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  // Action Buttons
  actionButtonsRow: {
    flexDirection: 'row',
    gap: responsive.spacing[3],
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[3],
    gap: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  actionBtnText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  // Category Breakdown
  categoryBreakdown: {
    gap: responsive.spacing[3],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
  },
  categoryCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  categoryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    flex: 1,
  },
  categoryIconContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[1],
  },
  categoryAmount: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  categoryTotal: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryPercentage: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
  },
  categoryProgress: {
    height: ms(8),
    backgroundColor: colors.neutralBg,
    borderRadius: ms(4),
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: ms(4),
  },
});
