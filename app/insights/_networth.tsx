import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { TabSelector, ChartTypeModal } from '@/components/ui';
import { DonutChart, DonutChartSegment } from '@/components/charts';

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

type TimePeriod = 'week' | 'month' | 'year';

export default function NetWorthScreen() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '6M' | '1Y' | 'All'>('1Y');
  const [assetsExpanded, setAssetsExpanded] = useState(false);
  const [liabilitiesExpanded, setLiabilitiesExpanded] = useState(false);
  const [chartType, setChartType] = useState<'donut' | 'bar'>('donut');
  const [showChartModal, setShowChartModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [showPeriodModal, setShowPeriodModal] = useState(false);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
  };

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

  const handleChartLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowChartModal(true);
  };

  const chartTypeOptions = [
    {
      value: 'donut',
      label: 'Donut Chart',
      icon: 'pie-chart-outline' as keyof typeof Ionicons.glyphMap,
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

  // Net worth chart data points (mock data)
  const chartWidth = ms(280);
  const chartHeight = ms(120);
  const pathData = `M 0 ${chartHeight * 0.7} L ${chartWidth * 0.2} ${chartHeight * 0.6} L ${chartWidth * 0.4} ${chartHeight * 0.5} L ${chartWidth * 0.6} ${chartHeight * 0.3} L ${chartWidth * 0.8} ${chartHeight * 0.4} L ${chartWidth} ${chartHeight * 0.2}`;

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: colors.neutralBg,
    },
    content: {
      paddingHorizontal: responsive.spacing[4],
    },
    netWorthCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    netWorthLabel: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDark,
      marginBottom: responsive.spacing[2],
    },
    netWorthValue: {
      fontSize: responsive.fontSize.xl,
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
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.functionalSuccess,
    },
    chartCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[4],
    },
    sectionTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
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
      fontSize: responsive.fontSize.lg,
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
      fontSize: responsive.fontSize.lg,
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
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    breakdownPercentage: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '500',
      color: colors.neutralMedium,
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
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
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
        <TabSelector
          options={[
            { id: '1M', label: '1M' },
            { id: '6M', label: '6M' },
            { id: '1Y', label: '1Y' },
            { id: 'All', label: 'All' },
          ]}
          selectedId={selectedTimeframe}
          onSelect={(id) => setSelectedTimeframe(id as '1M' | '6M' | '1Y' | 'All')}
        />

        {/* Net Worth Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Net Worth Trend</Text>
          </View>

          {/* Line Chart */}
          <View style={styles.lineChartContainer}>
            <Svg width={chartWidth} height={chartHeight}>
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
        <Pressable style={styles.chartCard} onLongPress={handleChartLongPress}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Portfolio Allocation</Text>
            <Pressable onPress={() => setShowPeriodModal(true)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsive.spacing[1] }}>
                <Text style={{ fontSize: responsive.fontSize.sm, fontWeight: '500', color: colors.neutralDark }}>{getPeriodLabel()}</Text>
                <Ionicons name="chevron-down" size={16} color={colors.neutralDark} />
              </View>
            </Pressable>
          </View>
          <Text style={{ fontSize: responsive.fontSize.xs, color: colors.neutralMedium, marginBottom: responsive.spacing[2] }}>
            Long press to change chart type
          </Text>

          {/* Donut Chart */}
          {chartType === 'donut' && (() => {
            const chartSize = responsive.layout.chartSizeLarge;
            return (
              <DonutChart
                data={portfolioAllocation.map((item): DonutChartSegment => ({
                  label: item.name,
                  value: item.percentage,
                  color: item.color,
                }))}
                sizeScale={chartSize}
                strokeWidthScale={chartSize * 0.083}
                showLegend={false}
                legendPosition="bottom"
                legendDotSize={chartSize * 0.0625}
              >
                <Text style={styles.chartLabel}>Portfolio</Text>
                <Text style={styles.chartValue}>100%</Text>
              </DonutChart>
            );
          })()}

          {/* Bar Chart */}
          {chartType === 'bar' && (
            <View style={{ gap: responsive.spacing[3], marginTop: responsive.spacing[2] }}>
              {portfolioAllocation.map((item) => {
                const maxValue = Math.max(...portfolioAllocation.map(i => i.percentage));
                const barPercentage = (item.percentage / maxValue) * 100;

                return (
                  <View key={item.id} style={{ gap: responsive.spacing[1] }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: responsive.fontSize.sm, color: colors.neutralDark }}>{item.name}</Text>
                      <Text style={{ fontSize: responsive.fontSize.sm, fontWeight: '600', color: colors.neutralDarkest }}>{item.percentage}%</Text>
                    </View>
                    <View style={{ height: ms(10), backgroundColor: colors.neutralBg, borderRadius: ms(5), overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${barPercentage}%`, backgroundColor: item.color, borderRadius: ms(5) }} />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </Pressable>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[4] }} />
      </View>

      {/* Chart Type Modal */}
      <ChartTypeModal
        visible={showChartModal}
        onClose={() => setShowChartModal(false)}
        currentType={chartType}
        options={chartTypeOptions}
        onSelectType={(type) => setChartType(type as 'donut' | 'bar')}
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
