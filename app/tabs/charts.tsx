import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Sample data (will be replaced with actual data from context)
const sampleChartData = {
  spendingByCategory: [
    { name: 'Bills', amount: 1368.31, color: '#6366F1', percentage: 48 },
    { name: 'Groceries', amount: 487.23, color: '#10B981', percentage: 17 },
    { name: 'Dining Out', amount: 312.78, color: '#F59E0B', percentage: 11 },
    { name: 'Transport', amount: 243.15, color: '#3B82F6', percentage: 9 },
    { name: 'Entertainment', amount: 189.45, color: '#8B5CF6', percentage: 7 },
    { name: 'Shopping', amount: 156.90, color: '#EC4899', percentage: 6 },
    { name: 'Health', amount: 89.50, color: '#EF4444', percentage: 3 },
  ],
  weeklySpending: [
    { week: 'Week 1', amount: 650 },
    { week: 'Week 2', amount: 890 },
    { week: 'Week 3', amount: 720 },
    { week: 'Week 4', amount: 587 },
  ],
  insights: [
    { icon: '💡', text: 'Your bills spending is 48% of your total budget', color: '#6366F1' },
    { icon: '📊', text: 'You spent 23% more on dining out this month', color: '#F59E0B' },
    { icon: '🎯', text: 'Great job! You saved $450 this month', color: '#10B981' },
  ],
};

export default function ChartsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const totalSpent = sampleChartData.spendingByCategory.reduce((sum, cat) => sum + cat.amount, 0);
  const maxWeeklyAmount = Math.max(...sampleChartData.weeklySpending.map(w => w.amount));

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Charts</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="download-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'year' && styles.periodTextActive]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Spending Breakdown - Pie Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spending Breakdown</Text>
          <Text style={styles.cardSubtitle}>Total: ${totalSpent.toFixed(2)}</Text>

          {/* Simplified Pie Chart Visualization */}
          <View style={styles.pieChartContainer}>
            <View style={styles.pieChart}>
              {sampleChartData.spendingByCategory.map((category, index) => {
                const previousPercentages = sampleChartData.spendingByCategory
                  .slice(0, index)
                  .reduce((sum, cat) => sum + cat.percentage, 0);

                return (
                  <View
                    key={index}
                    style={[
                      styles.pieSegment,
                      {
                        backgroundColor: category.color,
                        transform: [{ rotate: `${previousPercentages * 3.6}deg` }],
                        zIndex: sampleChartData.spendingByCategory.length - index,
                      }
                    ]}
                  />
                );
              })}
              <View style={styles.pieChartCenter}>
                <Text style={styles.pieChartCenterText}>${totalSpent.toFixed(0)}</Text>
                <Text style={styles.pieChartCenterLabel}>Total Spent</Text>
              </View>
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {sampleChartData.spendingByCategory.map((category, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: category.color }]} />
                <Text style={styles.legendName}>{category.name}</Text>
                <Text style={styles.legendAmount}>${category.amount.toFixed(2)}</Text>
                <Text style={styles.legendPercentage}>{category.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Spending Trends - Bar Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spending Trends</Text>
          <Text style={styles.cardSubtitle}>Weekly comparison</Text>

          <View style={styles.barChartContainer}>
            {sampleChartData.weeklySpending.map((week, index) => {
              const heightPercentage = (week.amount / maxWeeklyAmount) * 100;

              return (
                <View key={index} style={styles.barColumn}>
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${heightPercentage}%`,
                          backgroundColor: theme.colors.primary[500],
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.barAmount}>${week.amount}</Text>
                  <Text style={styles.barLabel}>{week.week}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Top Spending */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top Spending Categories</Text>

          {sampleChartData.spendingByCategory.slice(0, 5).map((category, index) => (
            <View key={index} style={styles.topSpendingItem}>
              <View style={styles.topSpendingRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.topSpendingInfo}>
                <Text style={styles.topSpendingName}>{category.name}</Text>
                <View style={styles.topSpendingBar}>
                  <View
                    style={[
                      styles.topSpendingBarFill,
                      {
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }
                    ]}
                  />
                </View>
              </View>
              <View style={styles.topSpendingAmount}>
                <Text style={styles.topSpendingValue}>${category.amount.toFixed(2)}</Text>
                <Text style={styles.topSpendingPercent}>{category.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Insights & Tips */}
        <View style={styles.card}>
          <View style={styles.insightsHeader}>
            <Ionicons name="bulb" size={20} color={theme.colors.warning.main} />
            <Text style={styles.cardTitle}>Insights & Tips</Text>
          </View>

          {sampleChartData.insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <Text style={styles.insightIcon}>{insight.icon}</Text>
              <Text style={styles.insightText}>{insight.text}</Text>
            </View>
          ))}
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[1],
    marginBottom: theme.spacing[6],
    ...theme.shadows.sm,
  },
  periodButton: {
    flex: 1,
    paddingVertical: theme.spacing[2],
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: theme.colors.primary[600],
  },
  periodText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    marginBottom: theme.spacing[6],
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: 18,
    marginBottom: theme.spacing[1],
  },
  cardSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[6],
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  pieChart: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  pieSegment: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    top: 0,
    left: '50%',
    transformOrigin: '0% 100%',
  },
  pieChartCenter: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.background.primary,
    top: 40,
    left: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChartCenterText: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  pieChartCenterLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  legend: {
    gap: theme.spacing[2],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing[2],
  },
  legendName: {
    ...theme.typography.styles.body,
    flex: 1,
  },
  legendAmount: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: theme.spacing[2],
  },
  legendPercentage: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    width: 40,
    textAlign: 'right',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: theme.spacing[4],
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing[1],
  },
  barWrapper: {
    width: '100%',
    height: 140,
    justifyContent: 'flex-end',
    marginBottom: theme.spacing[2],
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 20,
  },
  barAmount: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    marginBottom: 4,
  },
  barLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  topSpendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  topSpendingRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[2],
  },
  rankNumber: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  topSpendingInfo: {
    flex: 1,
    marginRight: theme.spacing[2],
  },
  topSpendingName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: theme.spacing[2],
  },
  topSpendingBar: {
    height: 8,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  topSpendingBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  topSpendingAmount: {
    alignItems: 'flex-end',
  },
  topSpendingValue: {
    ...theme.typography.styles.body,
    fontWeight: '700',
    marginBottom: 2,
  },
  topSpendingPercent: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[4],
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[2],
  },
  insightIcon: {
    fontSize: 24,
    marginRight: theme.spacing[2],
  },
  insightText: {
    ...theme.typography.styles.body,
    flex: 1,
    lineHeight: 20,
  },
});
