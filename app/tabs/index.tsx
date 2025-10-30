import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { loadAvatarColor, getAvatarGradientSync } from '@/utils/avatar';
import { getInitials } from '@/utils/helpers';
import { GaugeChart, GaugeChartSegment } from '@/components/charts';

// Color Palette - Using theme colors
const colors = {
  // Primary Palette
  primaryDark: theme.colors.info.dark,
  primary: theme.colors.info.main,
  primaryLight: theme.colors.info.light,

  // Secondary Palette
  secondaryGreen: theme.colors.success.main,
  secondaryRed: '#FF6B6B',
  secondaryYellow: theme.colors.warning.main,

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

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: 'groceries' | 'dining' | 'fuel' | 'other';
  icon: string;
  color: string;
}

interface BudgetItem {
  category: string;
  spent: number;
  total: number;
  status: 'good' | 'warning' | 'over';
}

const DashboardScreen: React.FC = () => {
  const router = useRouter();
  const [avatarColorId, setAvatarColorId] = useState('blue');
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [unreadNotifications, setUnreadNotifications] = useState(2); // TODO: Get from context/state

  // User data (in real app, this would come from auth context)
  const userName = 'Alex Johnson';

  // Load saved avatar color when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedColor();
    }, [])
  );

  const loadSavedColor = async () => {
    const colorId = await loadAvatarColor();
    setAvatarColorId(colorId);
  };

  // Handler functions
  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handlePeriodSelect = (period: 'week' | 'month' | 'year') => {
    setSelectedPeriod(period);
    setShowPeriodSelector(false);
    // TODO: Fetch data for selected period
  };

  const handleViewAllTransactions = () => {
    router.push('/tabs/transactions');
  };

  const handleTransactionPress = (transactionId: string) => {
    // TODO: Navigate to transaction detail screen
    console.log('Transaction pressed:', transactionId);
  };

  const handleBudgetCardPress = (item: BudgetItem) => {
    // Navigate to category details with params
    router.push({
      pathname: '/budget/category-details',
      params: {
        category: item.category,
        budget: item.total.toString(),
        spent: item.spent.toString(),
        icon: 'cart-outline', // TODO: Add icon to BudgetItem type
      },
    });
  };

  const handleViewAllBudgets = () => {
    router.push('/tabs/budget');
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
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

  const transactions: Transaction[] = [
    {
      id: '1',
      merchant: 'Woolworths',
      amount: 84.50,
      date: 'Today',
      category: 'groceries',
      icon: 'cart-outline',
      color: colors.primary,
    },
    {
      id: '2',
      merchant: "Grill'd",
      amount: 42.10,
      date: 'Yesterday',
      category: 'dining',
      icon: 'restaurant-outline',
      color: colors.secondaryYellow,
    },
    {
      id: '3',
      merchant: 'BP Connect',
      amount: 65.30,
      date: '2 days ago',
      category: 'fuel',
      icon: 'car-outline',
      color: colors.secondaryRed,
    },
  ];

  const budgetItems: BudgetItem[] = [
    { category: 'Groceries', spent: 190, total: 500, status: 'good' },
    { category: 'Shopping', spent: 550, total: 500, status: 'over' },
    { category: 'Entertainment', spent: 80, total: 200, status: 'warning' },
  ];

  // Spending categories for the chart (with budgets)
  const spendingCategories = [
    { label: 'Groceries', spent: 840, budget: 1000, color: colors.primary },
    { label: 'Shopping', spent: 550, budget: 700, color: colors.secondaryRed },
    { label: 'Transport', spent: 210, budget: 400, color: colors.secondaryYellow },
    { label: 'Other', spent: 250.75, budget: 300, color: colors.primaryLight },
  ];

  const totalSpending = spendingCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = spendingCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const remainingBudget = totalBudget - totalSpending;

  // Gauge chart data with remaining budget
  const gaugeChartData: GaugeChartSegment[] = [
    ...spendingCategories.map((cat) => ({
      label: cat.label,
      value: cat.spent,
      color: cat.color,
    })),
    {
      label: 'Remaining',
      value: remainingBudget,
      color: colors.neutralBg,
    },
  ];

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return colors.functionalSuccess;
      case 'warning':
        return colors.functionalWarning;
      case 'over':
        return colors.functionalError;
      default:
        return colors.primary;
    }
  };

  const getIconBackgroundColor = (color: string) => {
    if (color === colors.primary) return `${colors.primary}1A`;
    if (color === colors.secondaryYellow) return `${colors.secondaryYellow}33`;
    if (color === colors.secondaryRed) return `${colors.secondaryRed}33`;
    return `${colors.primary}1A`;
  };

  return (
    <Screen
      scrollable={false}
      noPadding
      backgroundColor={colors.neutralBg}
      edges={['top']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={getAvatarGradientSync(avatarColorId)}
              style={styles.profilePic}
            >
              <Text style={styles.profileInitial}>{getInitials(userName)}</Text>
            </LinearGradient>
            <Text style={styles.greeting}>Good morning, {userName.split(' ')[0]}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color={colors.neutralDark} />
            {unreadNotifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.cardShadow]}>
            <Text style={styles.statLabel}>Net Worth</Text>
            <Text style={styles.statValue}>$42,831.50</Text>
            <Text style={styles.statChange}>+2.1%</Text>
          </View>
          <View style={[styles.statCard, styles.cardShadow]}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>$1,850.75</Text>
            <Text style={[styles.statChange, { color: colors.functionalError }]}>
              +5.0%
            </Text>
          </View>
        </View>

        {/* Spending Chart Card */}
        <View style={[styles.spendingCard, styles.cardShadow]}>
          <View style={styles.spendingHeader}>
            <Text style={styles.sectionTitle}>Spending</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowPeriodSelector(true)}
            >
              <Text style={styles.dropdownText}>{getPeriodLabel()}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {(() => {
            const chartSize = responsive.layout.chartSizeCompact;
            return (
              <GaugeChart
                data={gaugeChartData}
                sizeScale={chartSize}
                strokeWidthScale={chartSize * 0.1}
                showLegend={true}
                legendPosition="right"
                legendDotSize={chartSize * 0.083}
                showNavigation={false}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.circleAmount}>
                    ${(totalSpending / 1000).toFixed(1)}k
                  </Text>
                  <Text style={styles.circleLabel}>
                    of ${(totalBudget / 1000).toFixed(1)}k
                  </Text>
                </View>
              </GaugeChart>
            );
          })()}
        </View>

        {/* Budget Progress */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionHeading}>Budget Progress</Text>
          <TouchableOpacity onPress={handleViewAllBudgets}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.budgetContainer}>
          {budgetItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.budgetCard, styles.cardShadow]}
              onPress={() => handleBudgetCardPress(item)}
            >
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetCategory}>{item.category}</Text>
                {item.status === 'over' ? (
                  <Text style={styles.budgetOverText}>
                    ${item.spent - item.total} over budget!
                  </Text>
                ) : (
                  <Text style={styles.budgetRemaining}>
                    ${item.total - item.spent} left of ${item.total}
                  </Text>
                )}
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min((item.spent / item.total) * 100, 100)}%`,
                      backgroundColor: getProgressColor(item.status),
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionHeading}>Recent Transactions</Text>
          <TouchableOpacity onPress={handleViewAllTransactions}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.transactionsCard, styles.cardShadow]}>
          {transactions.map((transaction, index) => (
            <View key={transaction.id}>
              <TouchableOpacity
                style={styles.transactionItem}
                onPress={() => handleTransactionPress(transaction.id)}
              >
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: getIconBackgroundColor(transaction.color) },
                  ]}
                >
                  <Ionicons
                    name={transaction.icon as any}
                    size={20}
                    color={transaction.color}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={styles.transactionAmount}>
                  -${transaction.amount.toFixed(2)}
                </Text>
              </TouchableOpacity>
              {index < transactions.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[4] }} />
      </ScrollView>

      {/* Period Selector Modal */}
      <Modal
        visible={showPeriodSelector}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPeriodSelector(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPeriodSelector(false)}
        >
          <View style={styles.periodModal}>
            <Text style={styles.modalTitle}>Select Period</Text>
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'week' && styles.periodOptionActive,
              ]}
              onPress={() => handlePeriodSelect('week')}
            >
              <Text
                style={[
                  styles.periodOptionText,
                  selectedPeriod === 'week' && styles.periodOptionTextActive,
                ]}
              >
                This Week
              </Text>
              {selectedPeriod === 'week' && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'month' && styles.periodOptionActive,
              ]}
              onPress={() => handlePeriodSelect('month')}
            >
              <Text
                style={[
                  styles.periodOptionText,
                  selectedPeriod === 'month' && styles.periodOptionTextActive,
                ]}
              >
                This Month
              </Text>
              {selectedPeriod === 'month' && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'year' && styles.periodOptionActive,
              ]}
              onPress={() => handlePeriodSelect('year')}
            >
              <Text
                style={[
                  styles.periodOptionText,
                  selectedPeriod === 'year' && styles.periodOptionTextActive,
                ]}
              >
                This Year
              </Text>
              {selectedPeriod === 'year' && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
  },
  profilePic: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: colors.neutralWhite,
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
  },
  greeting: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  notificationButton: {
    padding: responsive.spacing[2],
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: responsive.spacing[1],
    right: responsive.spacing[1],
    backgroundColor: colors.functionalError,
    borderRadius: ms(10),
    minWidth: ms(18),
    height: ms(18),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[1],
    borderWidth: 2,
    borderColor: colors.neutralBg,
  },
  notificationBadgeText: {
    color: colors.neutralWhite,
    fontSize: responsive.fontSize.xs,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[4],
    marginTop: responsive.spacing[1],
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    gap: responsive.spacing[2],
  },
  cardShadow: {
    ...theme.shadows.sm,
  },
  statLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  statValue: {
    fontSize: responsive.fontSize.h4,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  statChange: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.functionalSuccess,
  },
  spendingCard: {
    marginHorizontal: responsive.spacing[4],
    marginTop: responsive.spacing[4],
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
  },
  spendingHeader: {
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
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
  },
  dropdownText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.primary,
  },
  chartContainer: {
    flexDirection: 'row',
    gap: responsive.spacing[4],
  },
  circleProgress: {
    width: ms(96),
    height: ms(96),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleAmount: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  circleLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralDark,
    marginTop: responsive.spacing[1],
  },
  categoryLegend: {
    gap: responsive.spacing[2],
    marginTop: responsive.spacing[4],
  },
  legend: {
    flex: 1,
    gap: responsive.spacing[2],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  legendDot: {
    width: ms(10),
    height: ms(10),
    borderRadius: ms(5),
  },
  legendLabel: {
    flex: 1,
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
  legendValue: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  legendAmount: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  sectionHeading: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  budgetContainer: {
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[3],
  },
  budgetCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    gap: responsive.spacing[2],
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  budgetCategory: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  budgetRemaining: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  budgetOverText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.functionalError,
  },
  progressBar: {
    width: '100%',
    height: ms(10),
    backgroundColor: colors.neutralBg,
    borderRadius: ms(5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: ms(5),
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[6],
    paddingBottom: responsive.spacing[3],
  },
  viewAllButton: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  transactionsCard: {
    marginHorizontal: responsive.spacing[4],
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
  },
  transactionIcon: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  transactionMerchant: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  transactionDate: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
  transactionAmount: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutralBg,
  },
  // Period Selector Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.spacing[4],
  },
  periodModal: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    width: '100%',
    maxWidth: ms(320),
    ...theme.shadows.lg,
  },
  modalTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[4],
    textAlign: 'center',
  },
  periodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsive.spacing[4],
    paddingHorizontal: responsive.spacing[4],
    borderRadius: theme.borderRadius.lg,
    marginBottom: responsive.spacing[2],
    backgroundColor: colors.neutralBg,
  },
  periodOptionActive: {
    backgroundColor: `${colors.primary}15`,
  },
  periodOptionText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  periodOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default DashboardScreen;
