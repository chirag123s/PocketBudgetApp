import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { useTheme } from '@/contexts/ThemeContext';
import { TabSelector } from '@/components/ui';
import { AddCategoryModal, AddGoalModal } from '@/components/budget';
import PagerView from 'react-native-pager-view';

// Types
type TabType = 'goals' | 'categories';

const TAB_ORDER: TabType[] = ['goals', 'categories'];

interface Goal {
  id: string;
  name: string;
  icon: string;
  current: number;
  target: number;
  deadline: string;
  status: 'on-track' | 'behind';
  behindAmount?: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  spent: number;
  budget: number | null;
  color: 'success' | 'warning' | 'danger';
}

export default function BudgetTab() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [activeTab, setActiveTab] = useState<TabType>('goals');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const pagerRef = useRef<PagerView>(null);

  // Handle tab selection from TabSelector
  const handleTabSelect = (id: string) => {
    const newTab = id as TabType;
    setActiveTab(newTab);
    const pageIndex = TAB_ORDER.indexOf(newTab);
    pagerRef.current?.setPage(pageIndex);
  };

  // Handle page change from swipe gesture
  const handlePageSelected = (e: any) => {
    const pageIndex = e.nativeEvent.position;
    setActiveTab(TAB_ORDER[pageIndex]);
  };

  const handleAddGoal = () => {
    setShowGoalModal(true);
  };

  const handleSaveGoal = (goal: {
    name: string;
    icon: string;
    current: number;
    target: number;
    deadline: string;
  }) => {
    console.log('Saving goal:', goal);
    // TODO: Add goal to the list
    Alert.alert('Success', `Goal "${goal.name}" created successfully!`);
  };

  const handleAddCategory = () => {
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (category: { name: string; icon: string; color: string }) => {
    console.log('Saving category:', category);
    // TODO: Add category to the list
    Alert.alert('Success', `Category "${category.name}" created successfully!`);
  };

  // Color Palette - Using theme colors
  const colors = {
    primary: theme.colors.primary[500],
    secondary: theme.colors.primary[700],
    accent: theme.colors.secondary.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    borderLight: theme.colors.border.light,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
    functionalInfo: theme.colors.info.main,
  };

  // Sample data
  const goals: Goal[] = [
    {
      id: '1',
      name: 'Europe Trip',
      icon: 'airplane-outline',
      current: 3750,
      target: 5000,
      deadline: 'Dec 2025',
      status: 'on-track',
    },
    {
      id: '2',
      name: 'House Deposit',
      icon: 'home-outline',
      current: 8000,
      target: 20000,
      deadline: 'Jun 2026',
      status: 'behind',
      behindAmount: 50,
    },
    {
      id: '3',
      name: 'New Console',
      icon: 'game-controller-outline',
      current: 760,
      target: 800,
      deadline: 'Nov 2024',
      status: 'on-track',
    },
  ];

  const categories: Category[] = [
    {
      id: '1',
      name: 'Groceries',
      icon: 'shopping-cart',
      spent: 450.20,
      budget: 600,
      color: 'success',
    },
    {
      id: '2',
      name: 'Dining Out',
      icon: 'restaurant',
      spent: 380.50,
      budget: 400,
      color: 'warning',
    },
    {
      id: '3',
      name: 'Transport',
      icon: 'directions-car',
      spent: 210.00,
      budget: 200,
      color: 'danger',
    },
    {
      id: '4',
      name: 'Bills',
      icon: 'receipt-long',
      spent: 850.75,
      budget: 900,
      color: 'warning',
    },
    {
      id: '5',
      name: 'Shopping',
      icon: 'local-mall',
      spent: 0,
      budget: null,
      color: 'success',
    },
  ];

  const getProgressColor = (spent: number, budget: number): string => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 95) return colors.functionalError;
    if (percentage >= 80) return colors.functionalWarning;
    return colors.functionalSuccess;
  };

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  // Render Goal Card
  const renderGoalCard = (goal: Goal) => {
    const progressPercentage = getProgressPercentage(goal.current, goal.target);
    const progressColor =
      goal.status === 'on-track' ? colors.functionalSuccess : colors.functionalWarning;

    return (
      <TouchableOpacity
        key={goal.id}
        style={styles.goalCard}
        activeOpacity={0.7}
      >
        <View style={styles.goalHeader}>
          <View style={styles.goalIcon}>
            <Ionicons name={goal.icon as any} size={ms(24)} color={colors.primary} />
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalName}>{goal.name}</Text>
            <Text style={styles.goalDeadline}>by {goal.deadline}</Text>
          </View>
        </View>

        <View style={styles.goalAmounts}>
          <Text style={styles.goalCurrentAmount}>
            ${goal.current.toLocaleString()}
          </Text>
          <Text style={styles.goalTargetAmount}>
            of ${goal.target.toLocaleString()}
          </Text>
        </View>

        <View style={styles.goalProgressBarContainer}>
          <View
            style={[
              styles.goalProgressBar,
              {
                backgroundColor: progressColor,
                width: `${progressPercentage}%`,
              },
            ]}
          />
        </View>

        <View style={styles.goalStatus}>
          <Ionicons
            name={goal.status === 'on-track' ? 'checkmark-circle' : 'alert-circle'}
            size={ms(16)}
            color={goal.status === 'on-track' ? colors.functionalSuccess : colors.functionalError}
          />
          <Text
            style={[
              styles.goalStatusText,
              {
                color:
                  goal.status === 'on-track' ? colors.functionalSuccess : colors.functionalError,
              },
            ]}
          >
            {goal.status === 'on-track'
              ? 'On track'
              : `Behind by $${goal.behindAmount}/month`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render Empty State
  const renderEmptyState = (
    icon: string,
    title: string,
    description: string,
    buttonText: string,
    onPress: () => void
  ) => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.emptyStateIcon}>
          <Ionicons name={icon as any} size={ms(48)} color={colors.primary} />
        </View>
        <Text style={styles.emptyStateTitle}>{title}</Text>
        <Text style={styles.emptyStateDescription}>{description}</Text>
        <TouchableOpacity
          style={styles.emptyStateButton}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle" size={ms(24)} color={colors.primary} />
          <Text style={styles.emptyStateButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render Category Item
  const renderCategoryItem = (category: Category) => {
    const hasNoBudget = category.budget === null;
    const percentage = hasNoBudget ? 0 : (category.spent / category.budget!) * 100;
    const progressColor = hasNoBudget ? colors.neutralMedium : getProgressColor(category.spent, category.budget!);

    return (
      <TouchableOpacity
        key={category.id}
        style={styles.categoryCard}
        activeOpacity={0.7}
      >
        <View style={styles.categoryHeader}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name={category.icon as any} size={ms(24)} color={colors.primary} />
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{category.name}</Text>
            {hasNoBudget ? (
              <Text style={styles.setBudgetText}>Set Budget</Text>
            ) : (
              <Text style={styles.categoryAmounts}>
                <Text
                  style={[
                    styles.categorySpent,
                    percentage > 100 && styles.categorySpentOver,
                  ]}
                >
                  ${category.spent.toFixed(2)}
                </Text>
                <Text style={styles.categoryAmountsLabel}> spent of </Text>
                <Text style={styles.categoryBudget}>
                  ${category.budget!.toFixed(2)}
                </Text>
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.categoryEditButton}>
            <MaterialIcons name="edit" size={ms(20)} color={colors.neutralMedium} />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryProgressContainer}>
          <View
            style={[
              styles.categoryProgressBar,
              {
                backgroundColor: progressColor,
                width: hasNoBudget ? '0%' : `${Math.min(percentage, 100)}%`,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    header: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[3],
      paddingBottom: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },

    // Tab Navigation
    tabContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },

    // Content
    content: {
      paddingBottom: responsive.spacing[20],
    },

    // Goals Section
    goalsSection: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[4],
      gap: responsive.spacing[3],
    },
    goalCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: colors.borderLight,
      padding: responsive.spacing[4],
      gap: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    goalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    goalIcon: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      backgroundColor: `${colors.primary}1A`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    goalInfo: {
      flex: 1,
    },
    goalName: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: 2,
    },
    goalDeadline: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralDark,
    },
    goalAmounts: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: responsive.spacing[1],
    },
    goalCurrentAmount: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    goalTargetAmount: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralDark,
    },
    goalProgressBarContainer: {
      height: ms(8),
      borderRadius: ms(4),
      backgroundColor: colors.neutralBg,
      overflow: 'hidden',
    },
    goalProgressBar: {
      height: '100%',
      borderRadius: ms(4),
    },
    goalStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    goalStatusText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '500',
      flex: 1,
    },

    // Empty State
    emptyStateContainer: {
      flex: 1,
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[8],
      alignItems: 'center',
    },
    emptyStateCard: {
      width: '100%',
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.md,
      borderWidth: 2,
      borderColor: colors.borderLight,
      borderStyle: 'dashed',
      padding: responsive.spacing[6],
      alignItems: 'center',
      gap: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    emptyStateIcon: {
      width: ms(80),
      height: ms(80),
      borderRadius: ms(40),
      backgroundColor: `${colors.primary}1A`,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsive.spacing[2],
    },
    emptyStateTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      textAlign: 'center',
    },
    emptyStateDescription: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      textAlign: 'center',
      lineHeight: responsive.fontSize.sm * 1.5,
      marginBottom: responsive.spacing[2],
    },
    emptyStateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
      backgroundColor: `${colors.primary}1A`,
      paddingHorizontal: responsive.spacing[5],
      paddingVertical: responsive.spacing[3],
      borderRadius: theme.borderRadius.xl,
    },
    emptyStateButtonText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.primary,
    },

    // Categories List
    categoriesList: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[4],
      gap: responsive.spacing[3],
    },
    categoryCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: colors.borderLight,
      padding: responsive.spacing[4],
      gap: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[4],
    },
    categoryIcon: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      backgroundColor: `${colors.primary}1A`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[1],
    },
    categoryAmounts: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    categorySpent: {
      fontWeight: '500',
      color: colors.neutralDarkest,
    },
    categorySpentOver: {
      color: colors.functionalError,
    },
    categoryAmountsLabel: {
      color: colors.neutralDark,
    },
    categoryBudget: {
      fontWeight: '500',
      color: colors.neutralDarkest,
    },
    setBudgetText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.primary,
    },
    categoryEditButton: {
      padding: responsive.spacing[2],
    },
    categoryProgressContainer: {
      height: ms(10),
      borderRadius: ms(5),
      backgroundColor: colors.neutralBg,
      overflow: 'hidden',
    },
    categoryProgressBar: {
      height: '100%',
      borderRadius: ms(5),
    },

    // FAB
    fab: {
      position: 'absolute',
      bottom: responsive.spacing[6],
      right: responsive.spacing[6],
      width: ms(56),
      height: ms(56),
      borderRadius: ms(28),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.primary,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budgets</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabSelector
          options={[
            { id: 'goals', label: 'Goals' },
            { id: 'categories', label: 'Categories' },
          ]}
          selectedId={activeTab}
          onSelect={handleTabSelect}
        />
      </View>

      {/* Swipeable Content */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        {/* Goals Tab */}
        <View key="goals" style={{ flex: 1 }}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {goals.length === 0 ? (
              renderEmptyState(
                'trophy-outline',
                'No Savings Goals',
                'Set savings goals to track your progress toward your dreams',
                'Add Savings Goal',
                handleAddGoal
              )
            ) : (
              <View style={styles.goalsSection}>
                {goals.map(renderGoalCard)}
              </View>
            )}
          </ScrollView>
        </View>

        {/* Categories Tab */}
        <View key="categories" style={{ flex: 1 }}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {categories.length === 0 ? (
              renderEmptyState(
                'pricetags-outline',
                'No Categories',
                'Create budget categories to organize your spending',
                'Add Category',
                handleAddCategory
              )
            ) : (
              <View style={styles.categoriesList}>
                {categories.map(renderCategoryItem)}
              </View>
            )}
          </ScrollView>
        </View>
      </PagerView>

      {/* Context-Aware FAB */}
      {activeTab === 'goals' && goals.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={handleAddGoal} activeOpacity={0.8}>
          <Ionicons name="add" size={ms(28)} color="#ffffff" />
        </TouchableOpacity>
      )}
      {activeTab === 'categories' && categories.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={handleAddCategory} activeOpacity={0.8}>
          <Ionicons name="add" size={ms(28)} color="#ffffff" />
        </TouchableOpacity>
      )}

      {/* Add Goal Modal */}
      <AddGoalModal
        visible={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onSave={handleSaveGoal}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSave={handleSaveCategory}
      />
    </Screen>
  );
}
