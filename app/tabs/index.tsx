import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

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
            <View style={styles.profilePic}>
              <Text style={styles.profileInitial}>A</Text>
            </View>
            <Text style={styles.greeting}>Good morning, Alex</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.neutralDark} />
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
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>This Month</Text>
              <Ionicons name="chevron-down" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            {/* Simplified Circle Progress */}
            <View style={styles.circleProgress}>
              <View style={styles.circleOuter}>
                <View style={styles.circleInner}>
                  <Text style={styles.circleAmount}>$1.8k</Text>
                </View>
              </View>
            </View>

            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={styles.legendLabel}>Groceries</Text>
                <Text style={styles.legendAmount}>$840</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.secondaryRed }]} />
                <Text style={styles.legendLabel}>Shopping</Text>
                <Text style={styles.legendAmount}>$550</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.secondaryYellow }]} />
                <Text style={styles.legendLabel}>Transport</Text>
                <Text style={styles.legendAmount}>$210</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primaryLight }]} />
                <Text style={styles.legendLabel}>Other</Text>
                <Text style={styles.legendAmount}>$250.75</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Budget Progress */}
        <Text style={styles.sectionHeading}>Budget Progress</Text>
        <View style={styles.budgetContainer}>
          {budgetItems.map((item, index) => (
            <View key={index} style={[styles.budgetCard, styles.cardShadow]}>
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
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionHeading}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.transactionsCard, styles.cardShadow]}>
          {transactions.map((transaction, index) => (
            <View key={transaction.id}>
              <TouchableOpacity style={styles.transactionItem}>
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
    backgroundColor: colors.primary,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: ms(96),
    height: ms(96),
    borderRadius: ms(48),
    borderWidth: ms(8),
    borderColor: colors.neutralBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: colors.primary,
    borderTopColor: colors.primary,
    transform: [{ rotate: '135deg' }],
  },
  circleInner: {
    transform: [{ rotate: '-135deg' }],
  },
  circleAmount: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
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
  legendAmount: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  sectionHeading: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[6],
    paddingBottom: responsive.spacing[3],
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
});

export default DashboardScreen;
