import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data (will be replaced with actual data from context)
const sampleBudgetData = {
  totalBudget: 4500,
  totalSpent: 2847.32,
  categories: [
    { id: 1, name: 'Groceries', spent: 487.23, budget: 600, emoji: '🛒', color: '#10B981' },
    { id: 2, name: 'Transport', spent: 243.15, budget: 300, emoji: '🚗', color: '#3B82F6' },
    { id: 3, name: 'Entertainment', spent: 189.45, budget: 200, emoji: '🎬', color: '#8B5CF6' },
    { id: 4, name: 'Dining Out', spent: 312.78, budget: 400, emoji: '🍽️', color: '#F59E0B' },
    { id: 5, name: 'Shopping', spent: 156.90, budget: 300, emoji: '🛍️', color: '#EC4899' },
    { id: 6, name: 'Health', spent: 89.50, budget: 200, emoji: '🏥', color: '#EF4444' },
    { id: 7, name: 'Bills', spent: 1368.31, budget: 1500, emoji: '📄', color: '#6366F1' },
  ],
};

export default function BudgetTab() {
  const router = useRouter();

  const budgetPercentage = (sampleBudgetData.totalSpent / sampleBudgetData.totalBudget) * 100;
  const remaining = sampleBudgetData.totalBudget - sampleBudgetData.totalSpent;

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="settings-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary Card */}
        <LinearGradient
          colors={[theme.colors.primary[400], theme.colors.primary[600]]}
          style={styles.summaryCard}
        >
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryPeriod}>January 2025</Text>
              <Text style={styles.summaryAmount}>${remaining.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Remaining</Text>
            </View>
            <TouchableOpacity style={styles.periodButton}>
              <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${Math.min(budgetPercentage, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.summaryStats}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.statValue}>${sampleBudgetData.totalSpent.toFixed(2)}</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Budget</Text>
              <Text style={styles.statValue}>${sampleBudgetData.totalBudget.toFixed(2)}</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Progress</Text>
              <Text style={styles.statValue}>{budgetPercentage.toFixed(0)}%</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Categories</Text>
            <Text style={styles.categoryCount}>{sampleBudgetData.categories.length} categories</Text>
          </View>

          {sampleBudgetData.categories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            const remaining = category.budget - category.spent;
            const status = percentage >= 100 ? 'over' : percentage >= 80 ? 'warning' : 'good';

            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitleRow}>
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={[
                        styles.categoryRemaining,
                        status === 'over' && styles.categoryRemainingOver
                      ]}>
                        {status === 'over' ? 'Over by' : 'Remaining'}: ${Math.abs(remaining).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.categoryActions}>
                    <TouchableOpacity style={styles.actionIconButton}>
                      <Ionicons name="create-outline" size={20} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.categoryProgressBackground}>
                  <View
                    style={[
                      styles.categoryProgressFill,
                      {
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: status === 'over'
                          ? theme.colors.danger.main
                          : status === 'warning'
                          ? theme.colors.warning.main
                          : category.color
                      }
                    ]}
                  />
                </View>

                {/* Amounts */}
                <View style={styles.categoryAmounts}>
                  <Text style={styles.categorySpent}>
                    ${category.spent.toFixed(2)} spent
                  </Text>
                  <Text style={styles.categoryBudget}>
                    of ${category.budget.toFixed(2)}
                  </Text>
                  <Text style={[
                    styles.categoryPercentage,
                    status === 'over' && styles.categoryPercentageOver,
                    status === 'warning' && styles.categoryPercentageWarning
                  ]}>
                    {percentage.toFixed(0)}%
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.categoryButtons}>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Ionicons name="list-outline" size={16} color={theme.colors.primary[600]} />
                    <Text style={styles.categoryButtonText}>View Transactions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Ionicons name="create-outline" size={16} color={theme.colors.primary[600]} />
                    <Text style={styles.categoryButtonText}>Edit Budget</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={() => {}}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            Add Category
          </Button>

          <Button
            variant="secondary"
            fullWidth
            size="large"
            onPress={() => {}}
          >
            <Ionicons name="settings-outline" size={20} color={theme.colors.text.primary} style={{ marginRight: 8 }} />
            Budget Settings
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    ...theme.typography.styles.h2,
    fontSize: 24,
  },
  headerButton: {
    padding: theme.spacing[2],
  },
  content: {
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  summaryCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    marginBottom: theme.spacing[6],
    ...theme.shadows.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing[4],
  },
  summaryPeriod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: theme.spacing[2],
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  periodButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: theme.spacing[4],
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statColumn: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoriesSection: {
    marginBottom: theme.spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  sectionTitle: {
    ...theme.typography.styles.h3,
    fontSize: 18,
  },
  categoryCount: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  categoryCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    ...theme.shadows.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryEmoji: {
    fontSize: 28,
    marginRight: theme.spacing[2],
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    ...theme.typography.styles.body,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryRemaining: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  categoryRemainingOver: {
    color: theme.colors.danger.main,
    fontWeight: '600',
  },
  categoryActions: {
    flexDirection: 'row',
    gap: theme.spacing[2],
  },
  actionIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryProgressBackground: {
    height: 8,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing[2],
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryAmounts: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  categorySpent: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  categoryBudget: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginLeft: 4,
    flex: 1,
  },
  categoryPercentage: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  categoryPercentageOver: {
    color: theme.colors.danger.main,
  },
  categoryPercentageWarning: {
    color: theme.colors.warning.main,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: theme.spacing[2],
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing[2],
    paddingHorizontal: theme.spacing[2],
  },
  categoryButtonText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.primary[600],
    marginLeft: 4,
  },
  actionButtons: {
    gap: theme.spacing[2],
  },
});
