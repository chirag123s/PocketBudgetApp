import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { GaugeChart, GaugeChartSegment } from '@/components/charts';
import { ChartTypeModal } from '@/components/ui';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  amount: number;
  budget: number;
  percentage: number;
  color: string;
}

interface Insight {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}

type ChartType = 'gauge' | 'bar';
type TimePeriod = 'week' | 'month' | 'year';

export default function SpendingScreen() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [chartType, setChartType] = useState<ChartType>('gauge');
  const [showChartModal, setShowChartModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [showPeriodModal, setShowPeriodModal] = useState(false);

  const colors = {
    primaryDark: theme.colors.info.dark,
    primary: theme.colors.info.main,
    primaryLight: theme.colors.info.light,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
  };

  const categories: Category[] = [
    { id: '1', name: 'Groceries', icon: 'cart-outline', amount: 650.20, budget: 800, percentage: 81, color: theme.colors.secondary.main },
    { id: '2', name: 'Rent', icon: 'home-outline', amount: 1800.00, budget: 1800, percentage: 100, color: '#8B5CF6' },
    { id: '3', name: 'Transport', icon: 'car-outline', amount: 268.00, budget: 350, percentage: 77, color: colors.functionalSuccess },
    { id: '4', name: 'Dining Out', icon: 'restaurant-outline', amount: 420.50, budget: 500, percentage: 84, color: '#F59E0B' },
    { id: '5', name: 'Bills & Utilities', icon: 'receipt-outline', amount: 385.95, budget: 400, percentage: 96, color: colors.primary },
    { id: '6', name: 'Entertainment', icon: 'film-outline', amount: 160.75, budget: 200, percentage: 80, color: colors.functionalWarning },
    { id: '7', name: 'Health & Fitness', icon: 'fitness-outline', amount: 125.00, budget: 150, percentage: 83, color: '#10B981' },
    { id: '8', name: 'Insurance', icon: 'shield-checkmark-outline', amount: 280.00, budget: 280, percentage: 100, color: '#3B82F6' },
    { id: '9', name: 'Subscriptions', icon: 'tv-outline', amount: 89.99, budget: 100, percentage: 90, color: '#EC4899' },
    { id: '10', name: 'Shopping', icon: 'bag-handle-outline', amount: 310.45, budget: 400, percentage: 78, color: '#F97316' },
    { id: '11', name: 'Personal Care', icon: 'brush-outline', amount: 95.50, budget: 120, percentage: 80, color: '#A855F7' },
    { id: '12', name: 'Education', icon: 'school-outline', amount: 150.00, budget: 200, percentage: 75, color: '#0EA5E9' },
    { id: '13', name: 'HECS/HELP', icon: 'document-text-outline', amount: 200.00, budget: 200, percentage: 100, color: '#6366F1' },
    { id: '14', name: 'Gifts', icon: 'gift-outline', amount: 85.00, budget: 150, percentage: 57, color: '#EF4444' },
    { id: '15', name: 'Pet Care', icon: 'paw-outline', amount: 120.75, budget: 150, percentage: 81, color: '#14B8A6' },
  ];

  const insights: Insight[] = [
    {
      id: '1',
      icon: 'wallet-outline',
      iconColor: colors.functionalSuccess,
      iconBg: `${colors.functionalSuccess}20`,
      title: 'Great Savings!',
      description: "You've spent less on dining out this month. Keep it up!",
    },
    {
      id: '2',
      icon: 'pricetag-outline',
      iconColor: colors.neutralDarkest,
      iconBg: `${colors.neutralWhite}4D`,
      title: 'Special Offer',
      description: 'Save 10% on your next grocery shop at Coles.',
      bgColor: colors.functionalWarning,
      textColor: colors.neutralDarkest,
    },
    {
      id: '3',
      icon: 'trending-up-outline',
      iconColor: colors.functionalError,
      iconBg: `${colors.functionalError}20`,
      title: 'Spending Alert',
      description: "Your 'Subscriptions' are up by 15% this month.",
    },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  const handleChartLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowChartModal(true);
  };

  const chartTypeOptions = [
    {
      value: 'gauge',
      label: 'Gauge Chart',
      icon: 'speedometer-outline' as keyof typeof Ionicons.glyphMap,
    },
    {
      value: 'bar',
      label: 'Bar Chart',
      icon: 'stats-chart-outline' as keyof typeof Ionicons.glyphMap,
    },
  ];

  const periodOptions = [
    {
      value: 'week',
      label: 'This Week',
      icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
    },
    {
      value: 'month',
      label: 'This Month',
      icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
    },
    {
      value: 'year',
      label: 'This Year',
      icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
    },
  ];

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: colors.neutralBg,
    },
    content: {
      paddingHorizontal: responsive.spacing[4],
    },
    chartCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
      ...theme.shadows.sm,
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[1],
    },
    sectionTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    chartPeriod: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    chartLabel: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralDark,
    },
    chartValue: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    section: {
      marginTop: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
    },
    sectionHeading: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    categoriesList: {
      gap: responsive.spacing[2],
    },
    categoryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: ms(72),
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[3],
      gap: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    categoryIcon: {
      width: ms(48),
      height: ms(48),
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryInfo: {
      flex: 1,
      gap: responsive.spacing[1],
    },
    categoryName: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    categoryPercentage: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    categoryAmount: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDarkest,
    },
    progressBar: {
      height: ms(8),
      backgroundColor: colors.neutralBg,
      borderRadius: ms(4),
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: ms(4),
    },
    insightsScroll: {
      marginTop: responsive.spacing[2],
    },
    insightCard: {
      width: ms(280),
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginRight: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    insightIcon: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: responsive.spacing[2],
    },
    insightTitle: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[1],
    },
    insightDescription: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Chart Display */}
        <Pressable style={styles.chartCard} onLongPress={handleChartLongPress}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Spending by Category</Text>
            <Pressable onPress={() => setShowPeriodModal(true)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsive.spacing[1] }}>
                <Text style={styles.chartPeriod}>{getPeriodLabel()}</Text>
                <Ionicons name="chevron-down" size={16} color={colors.neutralDark} />
              </View>
            </Pressable>
          </View>
          <Text style={{ fontSize: responsive.fontSize.xs, color: colors.neutralMedium, marginBottom: responsive.spacing[2] }}>
            Long press to change chart type
          </Text>

          {/* Gauge Chart */}
          {chartType === 'gauge' && (() => {
            const chartSize = responsive.layout.chartSizeLarge;
            return (
              <GaugeChart
                data={[
                  ...categories.map((cat): GaugeChartSegment => ({
                    label: cat.name,
                    value: cat.amount,
                    color: cat.color,
                  })),
                  {
                    label: 'Remaining',
                    value: totalBudget - totalSpent,
                    color: colors.neutralBg,
                  }
                ]}
                sizeScale={chartSize}
                strokeWidthScale={chartSize * 0.104}
                showLegend={false}
                legendPosition="bottom"
                legendDotSize={chartSize * 0.0625}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.chartValue}>${totalSpent.toFixed(0)}</Text>
                  <Text style={styles.chartLabel}>of ${totalBudget.toFixed(0)}</Text>
                </View>
              </GaugeChart>
            );
          })()}

          {/* Bar Chart */}
          {chartType === 'bar' && (
            <View style={{ gap: responsive.spacing[2], marginTop: responsive.spacing[2] }}>
              {categories.slice(0, 10).map((category) => {
                const maxValue = Math.max(...categories.map(c => c.amount));
                const barPercentage = (category.amount / maxValue) * 100;

                return (
                  <View key={category.id} style={{ gap: responsive.spacing[1] }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: responsive.fontSize.sm, color: colors.neutralDark }}>{category.name}</Text>
                      <Text style={{ fontSize: responsive.fontSize.sm, fontWeight: '600', color: colors.neutralDarkest }}>${category.amount.toFixed(0)}</Text>
                    </View>
                    <View style={{ height: ms(8), backgroundColor: colors.neutralBg, borderRadius: ms(4), overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${barPercentage}%`, backgroundColor: category.color, borderRadius: ms(4) }} />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </Pressable>

        {/* Top Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Top Spending Categories</Text>
          <View style={styles.categoriesList}>
            {categories.map((category) => {
              const budgetPercentage = Math.round((category.amount / category.budget) * 100);
              const progressColor = category.amount > category.budget
                ? colors.functionalError
                : budgetPercentage >= 95
                ? colors.functionalWarning
                : colors.functionalSuccess;

              return (
                <View key={category.id} style={styles.categoryCard}>
                  <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                    <Ionicons name={category.icon} size={24} color={category.color} />
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryPercentage}>
                      ${category.amount.toFixed(2)} of ${category.budget.toFixed(2)}
                    </Text>
                    {/* Progress Bar */}
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.min(budgetPercentage, 100)}%`,
                            backgroundColor: progressColor,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <Text style={[styles.categoryAmount, { color: progressColor }]}>
                    {budgetPercentage}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Insights Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Personalised Insights</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightsScroll}>
            {insights.map((insight, index) => (
              <View
                key={insight.id}
                style={[
                  styles.insightCard,
                  insight.bgColor && { backgroundColor: insight.bgColor },
                  index === 0 && { marginLeft: 0 },
                ]}
              >
                <View style={[styles.insightIcon, { backgroundColor: insight.iconBg }]}>
                  <Ionicons name={insight.icon} size={24} color={insight.iconColor} />
                </View>
                <Text style={[styles.insightTitle, insight.textColor && { color: insight.textColor }]}>
                  {insight.title}
                </Text>
                <Text style={[styles.insightDescription, insight.textColor && { color: colors.neutralDark }]}>
                  {insight.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[4] }} />
      </View>

      {/* Chart Type Modal */}
      <ChartTypeModal
        visible={showChartModal}
        onClose={() => setShowChartModal(false)}
        currentType={chartType}
        options={chartTypeOptions}
        onSelectType={(type) => setChartType(type as ChartType)}
      />

      {/* Period Selector Modal */}
      <ChartTypeModal
        visible={showPeriodModal}
        onClose={() => setShowPeriodModal(false)}
        currentType={timePeriod}
        options={periodOptions}
        onSelectType={(type) => setTimePeriod(type as TimePeriod)}
      />
    </ScrollView>
  );
}
