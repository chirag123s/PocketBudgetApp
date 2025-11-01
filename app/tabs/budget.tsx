import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { Button, TabSelector } from '@/components/ui';
import { AdjustBudgetsModal } from '@/components/budget';
import { CircularProgress } from '@/components/charts';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'card-cycle'>('monthly');
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return 'Jan 27 - Feb 2, 2025';
      case 'monthly':
        return 'Jan 1 - Jan 31, 2025';
      case 'card-cycle':
        return 'Jan 15 - Feb 14, 2025'; // Card cycle example
      default:
        return 'Jan 1 - Jan 31, 2025';
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest budget data from API
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

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
      fontSize: responsive.fontSize.lg,
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
    // Total Budget Card
    totalCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[4],
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
      marginTop: responsive.spacing[3],
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
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    progressBar: {
      height: ms(8),
      backgroundColor: colors.neutralBg,
      borderRadius: ms(4),
      overflow: 'hidden',
      marginTop: responsive.spacing[3],
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
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[2],
    },
    sectionTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    viewHistoryText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
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
      fontSize: responsive.fontSize.sm,
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
    addCategoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      gap: responsive.spacing[2],
      borderWidth: 2,
      borderColor: colors.primary,
      borderStyle: 'dashed',
      ...theme.shadows.sm,
    },
    addCategoryText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <View style={{ flexDirection: 'row', gap: responsive.spacing[2] }}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/budget/savings-goals')}
          >
            <Ionicons name="trophy-outline" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/budget/edit')}
          >
            <Ionicons name="settings-outline" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <View style={styles.content}>
          {/* Period Selector */}
          <TabSelector
            options={[
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'card-cycle', label: 'Card Cycle' },
            ]}
            selectedId={selectedPeriod}
            onSelect={(id) => setSelectedPeriod(id as 'weekly' | 'monthly' | 'card-cycle')}
          />

          {/* Total Budget Card */}
          <View style={styles.totalCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardLabel}>Total Budget</Text>
                <Text style={styles.cardPeriod}>{getPeriodLabel()}</Text>
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
              onPress={() => router.push('/tabs/insights')}
              activeOpacity={0.7}
            >
              <Ionicons name="stats-chart" size={20} color={colors.primary} />
              <Text style={styles.actionBtnText}>View Spending</Text>
            </TouchableOpacity>
          </View>

          {/* Category Breakdown */}
          <View style={styles.categoryBreakdown}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Category Breakdown</Text>
              <TouchableOpacity onPress={() => router.push('/budget/history')}>
                <Text style={styles.viewHistoryText}>View History</Text>
              </TouchableOpacity>
            </View>

            {categories.map((category) => {
              const categoryPercentage = Math.round((category.spent / category.total) * 100);
              const progressColor = getProgressColor(category.spent, category.total);

              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => router.push({
                    pathname: '/budget/category-details',
                    params: {
                      category: category.name,
                      icon: category.icon,
                      budget: category.total.toString(),
                      spent: category.spent.toString(),
                    }
                  })}
                  activeOpacity={0.7}
                >
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

            {/* Add Category Button */}
            <TouchableOpacity
              style={styles.addCategoryButton}
              onPress={() => router.push('/budget/add-category')}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.addCategoryText}>Add Category</Text>
            </TouchableOpacity>
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