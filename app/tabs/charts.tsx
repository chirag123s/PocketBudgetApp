import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

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

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  amount: number;
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

interface IncomeSource {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  amount: number;
  percentage: number;
  lastDate: string;
}

interface Asset {
  id: string;
  name: string;
  amount: number;
  percentage: number;
}

interface Liability {
  id: string;
  name: string;
  amount: number;
  percentage: number;
}

interface PortfolioItem {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

export default function ChartsTab() {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'spending' | 'income' | 'networth'>('spending');

  const categories: Category[] = [
    { id: '1', name: 'Groceries', icon: 'cart-outline', amount: 450.20, percentage: 42, color: theme.colors.secondary.main },
    { id: '2', name: 'Transport', icon: 'car-outline', amount: 268.00, percentage: 25, color: colors.functionalSuccess },
    { id: '3', name: 'Bills', icon: 'receipt-outline', amount: 192.95, percentage: 18, color: colors.primary },
    { id: '4', name: 'Entertainment', icon: 'film-outline', amount: 160.75, percentage: 15, color: colors.functionalWarning },
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

  // Income data
  const currentIncome = 5120.00;

  const incomeSources: IncomeSource[] = [
    { id: '1', name: 'Salary - Acme Corp', icon: 'briefcase-outline', amount: 4500.00, percentage: 87.9, lastDate: '15 July' },
    { id: '2', name: 'Side Hustle', icon: 'laptop-outline', amount: 520.00, percentage: 10.2, lastDate: '12 July' },
    { id: '3', name: 'Interest Earned', icon: 'wallet-outline', amount: 100.00, percentage: 1.9, lastDate: '01 July' },
  ];

  // Income colors for chart
  const incomeColors = [colors.primary, colors.functionalSuccess, theme.colors.secondary.main];

  // Net Worth data and state
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '6M' | '1Y' | 'All'>('1Y');
  const [assetsExpanded, setAssetsExpanded] = useState(false);
  const [liabilitiesExpanded, setLiabilitiesExpanded] = useState(false);

  const currentNetWorth = 128500.00;
  const netWorthChange = 12.5;
  const totalAssets = 185000.00;
  const totalLiabilities = 56500.00;

  const assets: Asset[] = [
    { id: '1', name: 'Savings Account', amount: 42000.00, percentage: 22.7 },
    { id: '2', name: 'Investment Portfolio', amount: 85000.00, percentage: 45.9 },
    { id: '3', name: 'Superannuation', amount: 48000.00, percentage: 25.9 },
    { id: '4', name: 'Property Equity', amount: 10000.00, percentage: 5.4 },
  ];

  const liabilities: Liability[] = [
    { id: '1', name: 'Home Loan', amount: 45000.00, percentage: 79.6 },
    { id: '2', name: 'Car Loan', amount: 8500.00, percentage: 15.0 },
    { id: '3', name: 'HECS Debt', amount: 3000.00, percentage: 5.3 },
  ];

  const portfolioAllocation: PortfolioItem[] = [
    { id: '1', name: 'Stocks', percentage: 45, color: colors.primary },
    { id: '2', name: 'Bonds', percentage: 25, color: colors.functionalSuccess },
    { id: '3', name: 'Cash', percentage: 20, color: theme.colors.secondary.main },
    { id: '4', name: 'Real Estate', percentage: 10, color: colors.functionalWarning },
  ];

  // Net worth chart data points (mock data)
  const chartWidth = ms(280);
  const chartHeight = ms(120);
  const pathData = `M 0 ${chartHeight * 0.7} L ${chartWidth * 0.2} ${chartHeight * 0.6} L ${chartWidth * 0.4} ${chartHeight * 0.5} L ${chartWidth * 0.6} ${chartHeight * 0.3} L ${chartWidth * 0.8} ${chartHeight * 0.4} L ${chartWidth} ${chartHeight * 0.2}`;
  const pathDataFill = `${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="calendar-outline" size={24} color={colors.neutralDarkest} />
        </TouchableOpacity>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentedContainer}>
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segment, selectedView === 'spending' && styles.segmentActive]}
            onPress={() => setSelectedView('spending')}
          >
            <Text style={[styles.segmentText, selectedView === 'spending' && styles.segmentTextActive]}>
              Spending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, selectedView === 'income' && styles.segmentActive]}
            onPress={() => setSelectedView('income')}
          >
            <Text style={[styles.segmentText, selectedView === 'income' && styles.segmentTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, selectedView === 'networth' && styles.segmentActive]}
            onPress={() => setSelectedView('networth')}
          >
            <Text style={[styles.segmentText, selectedView === 'networth' && styles.segmentTextActive]}>
              Net Worth
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Spending View */}
          {selectedView === 'spending' && (
            <>
              {/* Donut Chart */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Spending by Category</Text>
              <Text style={styles.chartPeriod}>This Month</Text>
            </View>
            <View style={styles.chartContainer}>
              <Svg width={ms(192)} height={ms(192)} viewBox="0 0 36 36">
                <Circle cx="18" cy="18" r="15.9154943092" stroke={colors.neutralBg} strokeWidth="3" fill="none" />
                <Circle cx="18" cy="18" r="15.9154943092" stroke={theme.colors.secondary.main} strokeWidth="3" strokeDasharray="42, 100" fill="none" rotation="-90" origin="18, 18" />
                <Circle cx="18" cy="18" r="15.9154943092" stroke={colors.functionalSuccess} strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-42" fill="none" rotation="-90" origin="18, 18" />
                <Circle cx="18" cy="18" r="15.9154943092" stroke={colors.primary} strokeWidth="3" strokeDasharray="18, 100" strokeDashoffset="-67" fill="none" rotation="-90" origin="18, 18" />
                <Circle cx="18" cy="18" r="15.9154943092" stroke={colors.functionalWarning} strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-85" fill="none" rotation="-90" origin="18, 18" />
              </Svg>
              <View style={styles.chartCenter}>
                <Text style={styles.chartLabel}>Total Spent</Text>
                <Text style={styles.chartValue}>${totalSpent.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Top Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Top Spending Categories</Text>
            <View style={styles.categoriesList}>
              {categories.map((category) => (
                <View key={category.id} style={styles.categoryCard}>
                  <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                    <Ionicons name={category.icon} size={24} color={category.color} />
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryPercentage}>{category.percentage}% of spending</Text>
                  </View>
                  <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
                </View>
              ))}
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

            </>
          )}

          {/* Income View */}
          {selectedView === 'income' && (
            <>
              {/* Total Income Card */}
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>Total Income This Month</Text>
                <Text style={styles.totalAmount}>${currentIncome.toFixed(2)}</Text>
                <View style={styles.changeRow}>
                  <Ionicons name="arrow-up" size={16} color={colors.functionalSuccess} />
                  <Text style={styles.changeText}>+5% vs Last Month</Text>
                </View>
              </View>

              {/* Income Sources Chart */}
              <View style={styles.chartCard}>
                <View style={styles.chartHeader}>
                  <Text style={styles.sectionTitle}>Income by Source</Text>
                  <Text style={styles.chartPeriod}>This Month</Text>
                </View>
                <View style={styles.chartContainer}>
                  <Svg width={ms(192)} height={ms(192)} viewBox="0 0 36 36">
                    <Circle cx="18" cy="18" r="15.9154943092" stroke={colors.neutralBg} strokeWidth="3" fill="none" />
                    {incomeSources.map((source, index) => {
                      const previousPercentage = incomeSources
                        .slice(0, index)
                        .reduce((sum, s) => sum + s.percentage, 0);

                      return (
                        <Circle
                          key={source.id}
                          cx="18"
                          cy="18"
                          r="15.9154943092"
                          stroke={incomeColors[index]}
                          strokeWidth="3"
                          strokeDasharray={`${source.percentage}, 100`}
                          strokeDashoffset={-previousPercentage}
                          fill="none"
                          rotation="-90"
                          origin="18, 18"
                        />
                      );
                    })}
                  </Svg>
                  <View style={styles.chartCenter}>
                    <Text style={styles.chartLabel}>Total Income</Text>
                    <Text style={styles.chartValue}>${currentIncome.toFixed(2)}</Text>
                  </View>
                </View>

                {/* Legend */}
                <View style={styles.incomeLegend}>
                  {incomeSources.map((source, index) => (
                    <View key={source.id} style={styles.incomeLegendItem}>
                      <View style={styles.incomeLegendLeft}>
                        <View style={[styles.incomeLegendDot, { backgroundColor: incomeColors[index] }]} />
                        <View style={styles.incomeLegendInfo}>
                          <Text style={styles.incomeLegendName}>{source.name}</Text>
                          <Text style={styles.incomeLegendAmount}>${source.amount.toFixed(2)}</Text>
                        </View>
                      </View>
                      <Text style={styles.incomeLegendPercentage}>{source.percentage.toFixed(1)}%</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Income Sources */}
              <Text style={styles.sourcesTitle}>Income Sources</Text>
              <View style={styles.sourcesList}>
                {incomeSources.map((source) => (
                  <TouchableOpacity key={source.id} style={styles.sourceCard} activeOpacity={0.7}>
                    <View style={styles.sourceIcon}>
                      <Ionicons name={source.icon} size={24} color={colors.primary} />
                    </View>
                    <View style={styles.sourceInfo}>
                      <Text style={styles.sourceName}>{source.name}</Text>
                      <Text style={styles.sourceDate}>Last on: {source.lastDate}</Text>
                    </View>
                    <View style={styles.sourceAmount}>
                      <Text style={styles.sourceValue}>${source.amount.toFixed(2)}</Text>
                      <Text style={styles.sourcePercentage}>{source.percentage}% of total</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Net Worth View */}
          {selectedView === 'networth' && (
            <>
              {/* Net Worth Summary Card */}
              <View style={styles.netWorthCard}>
                <Text style={styles.netWorthLabel}>Current Net Worth</Text>
                <Text style={styles.netWorthValue}>${currentNetWorth.toLocaleString()}</Text>
                <View style={styles.changeRow}>
                  <Ionicons name="trending-up" size={16} color={colors.functionalSuccess} />
                  <Text style={[styles.changeText, { color: colors.functionalSuccess }]}>
                    +{netWorthChange}% YoY
                  </Text>
                </View>
              </View>

              {/* Timeframe Selector */}
              <View style={styles.timeframeContainer}>
                {(['1M', '6M', '1Y', 'All'] as const).map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.timeframeButton,
                      selectedTimeframe === period && styles.timeframeButtonActive,
                    ]}
                    onPress={() => setSelectedTimeframe(period)}
                  >
                    <Text
                      style={[
                        styles.timeframeText,
                        selectedTimeframe === period && styles.timeframeTextActive,
                      ]}
                    >
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Net Worth Chart */}
              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>Net Worth Trend</Text>
                <View style={styles.lineChartContainer}>
                  <Svg width={chartWidth} height={chartHeight}>
                    <Defs>
                      <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor={colors.primary} stopOpacity="0.3" />
                        <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
                      </LinearGradient>
                    </Defs>
                    <Path d={pathDataFill} fill="url(#gradient)" />
                    <Path
                      d={pathData}
                      stroke={colors.primary}
                      strokeWidth="2"
                      fill="none"
                    />
                  </Svg>
                </View>
              </View>

              {/* Assets and Liabilities Summary */}
              <View style={styles.summaryRow}>
                <View style={[styles.summaryCard, { flex: 1, marginRight: responsive.spacing[2] }]}>
                  <View style={styles.summaryHeader}>
                    <View style={[styles.summaryIcon, { backgroundColor: `${colors.functionalSuccess}20` }]}>
                      <Ionicons name="trending-up" size={20} color={colors.functionalSuccess} />
                    </View>
                    <Text style={styles.summaryLabel}>Assets</Text>
                  </View>
                  <Text style={styles.summaryValue}>${totalAssets.toLocaleString()}</Text>
                </View>
                <View style={[styles.summaryCard, { flex: 1, marginLeft: responsive.spacing[2] }]}>
                  <View style={styles.summaryHeader}>
                    <View style={[styles.summaryIcon, { backgroundColor: `${colors.functionalError}20` }]}>
                      <Ionicons name="trending-down" size={20} color={colors.functionalError} />
                    </View>
                    <Text style={styles.summaryLabel}>Liabilities</Text>
                  </View>
                  <Text style={styles.summaryValue}>${totalLiabilities.toLocaleString()}</Text>
                </View>
              </View>

              {/* Assets Breakdown */}
              <View style={styles.breakdownCard}>
                <TouchableOpacity
                  style={styles.breakdownHeader}
                  onPress={() => setAssetsExpanded(!assetsExpanded)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.breakdownTitle}>Assets Breakdown</Text>
                  <Ionicons
                    name={assetsExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.neutralDark}
                  />
                </TouchableOpacity>
                {assetsExpanded && (
                  <View style={styles.breakdownList}>
                    {assets.map((asset) => (
                      <View key={asset.id} style={styles.breakdownItem}>
                        <View style={styles.breakdownInfo}>
                          <Text style={styles.breakdownName}>{asset.name}</Text>
                          <View style={styles.progressBar}>
                            <View
                              style={[
                                styles.progressFill,
                                {
                                  width: `${asset.percentage}%`,
                                  backgroundColor: colors.functionalSuccess,
                                },
                              ]}
                            />
                          </View>
                        </View>
                        <View style={styles.breakdownRight}>
                          <Text style={styles.breakdownAmount}>${asset.amount.toLocaleString()}</Text>
                          <Text style={styles.breakdownPercentage}>{asset.percentage.toFixed(1)}%</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Liabilities Breakdown */}
              <View style={styles.breakdownCard}>
                <TouchableOpacity
                  style={styles.breakdownHeader}
                  onPress={() => setLiabilitiesExpanded(!liabilitiesExpanded)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.breakdownTitle}>Liabilities Breakdown</Text>
                  <Ionicons
                    name={liabilitiesExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.neutralDark}
                  />
                </TouchableOpacity>
                {liabilitiesExpanded && (
                  <View style={styles.breakdownList}>
                    {liabilities.map((liability) => (
                      <View key={liability.id} style={styles.breakdownItem}>
                        <View style={styles.breakdownInfo}>
                          <Text style={styles.breakdownName}>{liability.name}</Text>
                          <View style={styles.progressBar}>
                            <View
                              style={[
                                styles.progressFill,
                                {
                                  width: `${liability.percentage}%`,
                                  backgroundColor: colors.functionalError,
                                },
                              ]}
                            />
                          </View>
                        </View>
                        <View style={styles.breakdownRight}>
                          <Text style={styles.breakdownAmount}>${liability.amount.toLocaleString()}</Text>
                          <Text style={styles.breakdownPercentage}>{liability.percentage.toFixed(1)}%</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Portfolio Allocation */}
              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>Portfolio Allocation</Text>
                <View style={styles.chartContainer}>
                  <Svg width={ms(192)} height={ms(192)} viewBox="0 0 36 36">
                    <Circle cx="18" cy="18" r="15.9154943092" stroke={colors.neutralBg} strokeWidth="3" fill="none" />
                    {portfolioAllocation.map((item, index) => {
                      const previousPercentage = portfolioAllocation
                        .slice(0, index)
                        .reduce((sum, i) => sum + i.percentage, 0);

                      return (
                        <Circle
                          key={item.id}
                          cx="18"
                          cy="18"
                          r="15.9154943092"
                          stroke={item.color}
                          strokeWidth="3"
                          strokeDasharray={`${item.percentage}, 100`}
                          strokeDashoffset={-previousPercentage}
                          fill="none"
                          rotation="-90"
                          origin="18, 18"
                        />
                      );
                    })}
                  </Svg>
                  <View style={styles.chartCenter}>
                    <Text style={styles.chartLabel}>Portfolio</Text>
                    <Text style={styles.chartValue}>100%</Text>
                  </View>
                </View>

                {/* Portfolio Legend */}
                <View style={styles.portfolioLegend}>
                  {portfolioAllocation.map((item) => (
                    <View key={item.id} style={styles.portfolioLegendItem}>
                      <View style={[styles.portfolioLegendDot, { backgroundColor: item.color }]} />
                      <Text style={styles.portfolioLegendName}>{item.name}</Text>
                      <Text style={styles.portfolioLegendPercentage}>{item.percentage}%</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Bottom spacing */}
          <View style={{ height: responsive.spacing[4] }} />
        </View>
      </ScrollView>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    flex: 1,
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
  segmentedContainer: {
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl * 1.5,
    padding: responsive.spacing[1],
    height: ms(48),
    ...theme.shadows.sm,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
  },
  segmentTextActive: {
    color: colors.neutralWhite,
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
    marginBottom: responsive.spacing[4],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  chartPeriod: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  chartContainer: {
    height: ms(192),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: responsive.fontSize.xs,
    color: colors.neutralDark,
  },
  chartValue: {
    fontSize: responsive.fontSize.h3,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  section: {
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
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  categoryPercentage: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
  categoryAmount: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    color: colors.neutralDarkest,
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
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[1],
  },
  insightDescription: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  // Income View Styles
  totalCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  totalLabel: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    color: colors.neutralDark,
    marginBottom: responsive.spacing[2],
  },
  totalAmount: {
    fontSize: responsive.fontSize.h1,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
  },
  changeText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    color: colors.functionalSuccess,
  },
  sourcesTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
  },
  sourcesList: {
    gap: responsive.spacing[3],
  },
  sourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    gap: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  sourceIcon: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: `${colors.primary}1A`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceInfo: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  sourceName: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  sourceDate: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
  sourceAmount: {
    alignItems: 'flex-end',
    gap: responsive.spacing[1],
  },
  sourceValue: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.functionalSuccess,
  },
  sourcePercentage: {
    fontSize: responsive.fontSize.xs,
    color: colors.neutralMedium,
  },
  // Placeholder Styles
  placeholderCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[10],
    alignItems: 'center',
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  placeholderTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  placeholderText: {
    fontSize: responsive.fontSize.md,
    color: colors.neutralDark,
    textAlign: 'center',
  },
  // Income Legend Styles
  incomeLegend: {
    gap: responsive.spacing[3],
    marginTop: responsive.spacing[2],
  },
  incomeLegendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.neutralBg,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[3],
  },
  incomeLegendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    flex: 1,
  },
  incomeLegendDot: {
    width: ms(16),
    height: ms(16),
    borderRadius: ms(8),
  },
  incomeLegendInfo: {
    gap: responsive.spacing[1],
    flex: 1,
  },
  incomeLegendName: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  incomeLegendAmount: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
  incomeLegendPercentage: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  // Net Worth View Styles
  netWorthCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  netWorthLabel: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    color: colors.neutralDark,
    marginBottom: responsive.spacing[2],
  },
  netWorthValue: {
    fontSize: responsive.fontSize.h1,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
  },
  timeframeContainer: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[4],
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[3],
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  timeframeButtonActive: {
    backgroundColor: colors.primary,
  },
  timeframeText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
  },
  timeframeTextActive: {
    color: colors.neutralWhite,
  },
  lineChartContainer: {
    paddingVertical: responsive.spacing[4],
    alignItems: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: responsive.spacing[4],
  },
  summaryCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[3],
  },
  summaryIcon: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
  },
  summaryValue: {
    fontSize: responsive.fontSize.h3,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  breakdownCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  breakdownList: {
    marginTop: responsive.spacing[4],
    gap: responsive.spacing[4],
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
  },
  breakdownInfo: {
    flex: 1,
    gap: responsive.spacing[2],
  },
  breakdownName: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
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
  breakdownRight: {
    alignItems: 'flex-end',
    gap: responsive.spacing[1],
  },
  breakdownAmount: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  breakdownPercentage: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralMedium,
  },
  portfolioLegend: {
    gap: responsive.spacing[2],
    marginTop: responsive.spacing[4],
  },
  portfolioLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  portfolioLegendDot: {
    width: ms(12),
    height: ms(12),
    borderRadius: ms(6),
  },
  portfolioLegendName: {
    flex: 1,
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  portfolioLegendPercentage: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.neutralDark,
  },
});
