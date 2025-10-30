import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, LineChartDataPoint } from '@/components/charts';

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

type TabType = 'Overview' | 'Trends' | 'Settings';

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function CategoryDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  // Get category data from params or use defaults
  const categoryName = (params.category as string) || 'Groceries';
  const categoryIcon = (params.icon as keyof typeof Ionicons.glyphMap) || 'cart-outline';
  const budgetAmount = parseFloat((params.budget as string) || '500');
  const spentAmount = parseFloat((params.spent as string) || '350.5');

  // Calculate stats
  const remainingAmount = budgetAmount - spentAmount;
  const percentageSpent = (spentAmount / budgetAmount) * 100;
  const avgDailySpend = 12.5;
  const transactionCount = 24;

  // Chart data for 3-month trend (Overview tab)
  const shortTermData: LineChartDataPoint[] = [
    { label: 'Oct', value: 420, compareValue: budgetAmount },
    { label: 'Nov', value: 385, compareValue: budgetAmount },
    { label: 'Dec', value: spentAmount, compareValue: budgetAmount },
  ];

  // Chart data for 6-month trend (Trends tab)
  const longTermData: LineChartDataPoint[] = [
    { label: 'Jul', value: 445, compareValue: budgetAmount },
    { label: 'Aug', value: 390, compareValue: budgetAmount },
    { label: 'Sep', value: 465, compareValue: budgetAmount },
    { label: 'Oct', value: 420, compareValue: budgetAmount },
    { label: 'Nov', value: 385, compareValue: budgetAmount },
    { label: 'Dec', value: spentAmount, compareValue: budgetAmount },
  ];

  // Sample transaction data
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      merchant: 'Woolworths',
      category: 'Groceries',
      amount: 75.4,
      date: 'Today',
      time: '10:30 AM',
      icon: 'storefront-outline',
    },
    {
      id: '2',
      merchant: 'The Coffee Club',
      category: 'Dining',
      amount: 4.5,
      date: 'Yesterday',
      time: '09:00 AM',
      icon: 'cafe-outline',
    },
    {
      id: '3',
      merchant: "Farmer's Market",
      category: 'Produce',
      amount: 22.8,
      date: '3 days ago',
      time: '03:00 PM',
      icon: 'leaf-outline',
    },
  ];

  const handleMoreOptions = () => {
    Alert.alert(
      'Category Options',
      'Choose an action',
      [
        { text: 'Edit Budget', onPress: () => {} },
        { text: 'Edit Category', onPress: () => {} },
        { text: 'Delete Category', style: 'destructive', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Amount Card - Full Width */}
      <View style={styles.amountCard}>
        <View style={styles.amountHeader}>
          <View style={styles.amountIconContainer}>
            <Ionicons
              name={remainingAmount >= 0 ? "wallet-outline" : "alert-circle-outline"}
              size={ms(32)}
              color={remainingAmount >= 0 ? colors.functionalSuccess : colors.functionalError}
            />
          </View>
          <View style={styles.amountContent}>
            <Text style={styles.amountLabel}>
              {remainingAmount >= 0 ? 'Budget Remaining' : 'Over Budget'}
            </Text>
            <Text style={[
              styles.amountValue,
              { color: remainingAmount >= 0 ? colors.functionalSuccess : colors.functionalError }
            ]}>
              ${Math.abs(remainingAmount).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Secondary Stats - Two Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <View style={styles.statIconContainer}>
            <Ionicons name="calendar-outline" size={ms(24)} color={colors.primary} />
          </View>
          <Text style={styles.statBoxValue}>15</Text>
          <Text style={styles.statBoxLabel}>Days Left</Text>
        </View>

        <View style={styles.statBox}>
          <View style={styles.statIconContainer}>
            <Ionicons name="receipt-outline" size={ms(24)} color={colors.primary} />
          </View>
          <Text style={styles.statBoxValue}>{transactionCount}</Text>
          <Text style={styles.statBoxLabel}>Transactions</Text>
        </View>
      </View>

      {/* Spending Breakdown */}
      <View style={styles.breakdownCard}>
        <Text style={styles.sectionTitle}>Spending Breakdown</Text>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownLeft}>
            <Ionicons name="trending-down" size={ms(18)} color={colors.functionalSuccess} />
            <Text style={styles.breakdownLabel}>Daily Allowance</Text>
          </View>
          <Text style={styles.breakdownValue}>${(remainingAmount / 15).toFixed(2)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownLeft}>
            <Ionicons name="calculator-outline" size={ms(18)} color={colors.primary} />
            <Text style={styles.breakdownLabel}>Average per Transaction</Text>
          </View>
          <Text style={styles.breakdownValue}>${(spentAmount / transactionCount).toFixed(2)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownLeft}>
            <Ionicons name="storefront-outline" size={ms(18)} color={colors.primary} />
            <Text style={styles.breakdownLabel}>Most Frequent Merchant</Text>
          </View>
          <Text style={styles.breakdownValue}>Woolworths</Text>
        </View>
      </View>

      {/* Spending Trend Card */}
      <View style={styles.trendCard}>
        <View style={styles.trendHeader}>
          <Text style={styles.trendTitle}>Spending Pattern</Text>
          <View style={styles.trendBadge}>
            <Ionicons name="trending-down" size={ms(14)} color={colors.functionalSuccess} />
            <Text style={styles.trendBadgeText}>-8.3%</Text>
          </View>
        </View>

        {/* 3-Month Line Chart */}
        <LineChart
          data={shortTermData}
          heightScale={100}
          widthScale={280}
          showGrid={true}
          showLabels={true}
          showLegend={false}
          showCompare={true}
          primaryColor={colors.primary}
          compareColor={colors.neutralMedium}
        />
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {recentTransactions.map((transaction, index) => (
            <View
              key={transaction.id}
              style={[
                styles.activityItem,
                index < recentTransactions.length - 1 && styles.activityItemBorder,
              ]}
            >
              <View style={styles.activityLeft}>
                <View style={styles.activityIcon}>
                  <Ionicons name={transaction.icon} size={ms(18)} color={colors.primary} />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityMerchant}>{transaction.merchant}</Text>
                  <Text style={styles.activityDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={styles.activityAmount}>-${transaction.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => {
            router.push({
              pathname: '/tabs/transactions',
              params: { category: categoryName },
            });
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>View All Transactions</Text>
          <Ionicons name="arrow-forward" size={ms(16)} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTrendsTab = () => (
    <View style={styles.tabContent}>
      {/* Budget Performance Card */}
      <View style={styles.performanceCard}>
        <Text style={styles.sectionTitle}>Budget Performance</Text>
        <View style={styles.performanceStats}>
          <View style={styles.performanceItem}>
            <Ionicons name="checkmark-circle" size={ms(24)} color={colors.functionalSuccess} />
            <Text style={styles.performanceValue}>67%</Text>
            <Text style={styles.performanceLabel}>Months Under Budget</Text>
          </View>
          <View style={styles.performanceDivider} />
          <View style={styles.performanceItem}>
            <Ionicons name="stats-chart" size={ms(24)} color={colors.primary} />
            <Text style={styles.performanceValue}>78%</Text>
            <Text style={styles.performanceLabel}>Avg. Budget Used</Text>
          </View>
        </View>
      </View>

      {/* Historical Spending Chart */}
      <View style={[styles.trendCard, styles.largeTrendCard]}>
        <View style={styles.trendHeader}>
          <Text style={styles.trendTitle}>Spending Over Time</Text>
          <TouchableOpacity>
            <Text style={styles.viewReportText}>6 Months</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.trendAmountLarge}>$418</Text>
        <View style={styles.trendStats}>
          <Text style={styles.trendLabel}>Monthly Average</Text>
          <Ionicons name="trending-down" size={ms(16)} color={colors.functionalSuccess} />
          <Text style={[styles.trendChange, { color: colors.functionalSuccess }]}>-6.4%</Text>
        </View>

        {/* 6-Month Line Chart */}
        <LineChart
          data={longTermData}
          heightScale={180}
          widthScale={280}
          showGrid={true}
          showLabels={true}
          showLegend={false}
          showCompare={true}
          primaryColor={colors.primary}
          compareColor={colors.neutralMedium}
          primaryLabel="Actual Spending"
          compareLabel="Budget Limit"
        />
      </View>

      {/* Spending Insights */}
      <View style={styles.insightsCard}>
        <Text style={styles.sectionTitle}>Insights & Patterns</Text>
        <View style={styles.insightsList}>
          <View style={styles.insightItem}>
            <View style={styles.insightIconContainer}>
              <Ionicons name="calendar" size={ms(20)} color={colors.primary} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Peak Spending Day</Text>
              <Text style={styles.insightDescription}>You spend most on Saturdays (avg. $85)</Text>
            </View>
          </View>
          <View style={styles.insightItem}>
            <View style={styles.insightIconContainer}>
              <Ionicons name="time" size={ms(20)} color={colors.functionalWarning} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Spending Spike Detected</Text>
              <Text style={styles.insightDescription}>This month is 15% higher than usual</Text>
            </View>
          </View>
          <View style={styles.insightItem}>
            <View style={styles.insightIconContainer}>
              <Ionicons name="sunny" size={ms(20)} color={colors.functionalSuccess} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Seasonal Pattern</Text>
              <Text style={styles.insightDescription}>Spending increases in December</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      {/* Budget Configuration */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Budget Configuration</Text>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="cash-outline" size={ms(24)} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Budget Amount</Text>
                <Text style={styles.settingValue}>${budgetAmount.toFixed(2)} / month</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="calendar-outline" size={ms(24)} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Budget Period</Text>
                <Text style={styles.settingValue}>Monthly</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="repeat-outline" size={ms(24)} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Rollover Unused Budget</Text>
                <Text style={styles.settingValue}>Disabled</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Management */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Category Management</Text>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="create-outline" size={ms(24)} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Edit Category Name</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="color-palette-outline" size={ms(24)} color={colors.primary} />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Change Icon & Color</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.dangerItem]}>
            <View style={styles.settingLeft}>
              <Ionicons name="trash-outline" size={ms(24)} color={colors.functionalError} />
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.functionalError }]}>
                  Delete Category
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={ms(20)} color={colors.functionalError} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={ms(24)} color={colors.neutralDarkest} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{categoryName}</Text>

        <TouchableOpacity
          onPress={handleMoreOptions}
          style={styles.headerButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="ellipsis-vertical" size={ms(24)} color={colors.neutralDarkest} />
        </TouchableOpacity>
      </View>

      {/* Category Summary (Sticky) */}
      <View style={styles.categorySummary}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryIconLarge}>
            <Ionicons name={categoryIcon} size={ms(32)} color={colors.primary} />
          </View>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName} numberOfLines={1}>{categoryName}</Text>
            <Text style={styles.categoryStats} numberOfLines={1}>
              ${spentAmount.toFixed(2)} of ${budgetAmount.toFixed(2)} spent
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentageSpent}%`,
                backgroundColor:
                  percentageSpent >= 100
                    ? colors.functionalError
                    : percentageSpent >= 80
                    ? colors.functionalWarning
                    : colors.functionalSuccess,
              },
            ]}
          />
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          <View style={styles.tabs}>
            {(['Overview', 'Trends', 'Settings'] as TabType[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.tabActive,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.tabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'Overview' && renderOverviewTab()}
        {activeTab === 'Trends' && renderTrendsTab()}
        {activeTab === 'Settings' && renderSettingsTab()}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
    backgroundColor: colors.neutralBg,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.neutralMedium}30`,
  },
  headerButton: {
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
    flex: 1,
    textAlign: 'center',
  },
  categorySummary: {
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[2],
    backgroundColor: colors.neutralBg,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.neutralMedium}30`,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    marginBottom: responsive.spacing[2],
  },
  categoryIconLarge: {
    width: ms(48),
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}20`,
  },
  categoryInfo: {
    flex: 1,
    gap: responsive.spacing[0],
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  categoryStats: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralDark,
    marginTop: responsive.spacing[0],
  },
  progressBarContainer: {
    width: '100%',
    height: ms(6),
    borderRadius: ms(3),
    marginBottom: responsive.spacing[2],
    overflow: 'hidden',
    backgroundColor: colors.neutralBg,
  },
  progressBar: {
    height: '100%',
    borderRadius: ms(3),
  },
  tabsScroll: {
    marginHorizontal: -responsive.spacing[4],
    paddingHorizontal: responsive.spacing[4],
  },
  tabs: {
    flexDirection: 'row',
    gap: responsive.spacing[4],
  },
  tab: {
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
  },
  tabTextActive: {
    fontWeight: '700',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: responsive.spacing[4],
    gap: responsive.spacing[4],
  },
  trendCard: {
    padding: responsive.spacing[4],
    borderRadius: theme.borderRadius.xl,
    backgroundColor: colors.neutralWhite,
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  largeTrendCard: {
    gap: responsive.spacing[4],
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
    backgroundColor: `${colors.functionalSuccess}20`,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: responsive.spacing[1],
    borderRadius: theme.borderRadius.full,
  },
  trendBadgeText: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '700',
    color: colors.functionalSuccess,
  },
  viewReportText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  trendAmount: {
    fontSize: responsive.fontSize.h2,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  trendAmountLarge: {
    fontSize: responsive.fontSize.h1,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  trendStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
  },
  trendLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
  },
  trendChange: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
  },
  // Activity Section
  activitySection: {
    gap: responsive.spacing[3],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  activityList: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsive.spacing[3],
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutralBg,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    flex: 1,
  },
  activityIcon: {
    width: ms(32),
    height: ms(32),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}15`,
  },
  activityInfo: {
    flex: 1,
  },
  activityMerchant: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[0],
  },
  activityDate: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '400',
    color: colors.neutralDark,
  },
  activityAmount: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[2],
    padding: responsive.spacing[3],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.neutralWhite,
  },
  viewAllText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[4],
    paddingVertical: responsive.spacing[16],
  },
  emptyText: {
    fontSize: responsive.fontSize.h3,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  emptySubtext: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
    textAlign: 'center',
  },
  // Amount Card
  amountCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    ...theme.shadows.sm,
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[4],
  },
  amountIconContainer: {
    width: ms(64),
    height: ms(64),
    borderRadius: ms(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.functionalSuccess}15`,
  },
  amountContent: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  amountLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDark,
  },
  amountValue: {
    fontSize: responsive.fontSize.h1,
    fontWeight: '700',
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: responsive.spacing[3],
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[4],
    alignItems: 'center',
    gap: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  statIconContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBoxValue: {
    fontSize: responsive.fontSize.h3,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  statBoxLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralDark,
    textAlign: 'center',
  },
  // Breakdown Card
  breakdownCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsive.spacing[2],
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    flex: 1,
  },
  breakdownLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  breakdownValue: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  // Performance Card
  performanceCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    gap: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  performanceItem: {
    flex: 1,
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  performanceValue: {
    fontSize: responsive.fontSize.h2,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  performanceLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralDark,
    textAlign: 'center',
  },
  performanceDivider: {
    width: 1,
    height: ms(60),
    backgroundColor: `${colors.neutralMedium}30`,
  },
  // Insights Card
  insightsCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  insightsList: {
    gap: responsive.spacing[3],
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsive.spacing[3],
  },
  insightIconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: theme.borderRadius.lg,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  insightTitle: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  insightDescription: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
  },
  // Settings Section
  settingsSection: {
    gap: responsive.spacing[3],
  },
  settingsList: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsive.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutralBg,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    flex: 1,
  },
  settingInfo: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  settingLabel: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  settingValue: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
});
