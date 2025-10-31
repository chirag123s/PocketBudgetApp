import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import DraggableFlatList, {
  ScaleDecorator,
  OpacityDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { loadAvatarColor, getAvatarGradientSync } from '@/utils/avatar';
import { getInitials } from '@/utils/helpers';
import { GaugeChart, GaugeChartSegment } from '@/components/charts';
import { useWidgets } from '@/contexts/WidgetContext';
import {
  WIDGET_REGISTRY,
  WidgetContainer,
  BudgetOverviewWidget,
  SpendingSummaryWidget,
  RecentTransactionsWidget,
  CategoryBreakdownWidget,
  BankAccountsWidget,
  UpcomingBillsWidget,
  SavingsGoalWidget,
  CardCycleWidget,
  BankAccount,
  Bill,
  SavingsGoal,
  CardCycle,
} from '@/components/widgets';
import { Transaction as TransactionType } from '@/types/models';

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
  const [isEditMode, setIsEditMode] = useState(false);

  // Widget system
  const { enabledWidgets, widgetOrder, widgetConfig, updateWidgetOrder } = useWidgets();

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

  const bankAccounts: BankAccount[] = [
    {
      id: '1',
      name: 'CBA Smart Access',
      balance: 15280.14,
      icon: 'business-outline',
      iconColor: colors.primary,
      type: 'bank',
    },
    {
      id: '2',
      name: 'ING Savings',
      balance: 25051.36,
      icon: 'wallet-outline',
      iconColor: colors.primary,
      type: 'savings',
    },
    {
      id: '3',
      name: 'Amex Platinum',
      balance: -2500.00,
      icon: 'card-outline',
      iconColor: colors.secondaryRed,
      type: 'credit',
    },
    {
      id: '4',
      name: 'Raiz Investment',
      balance: 5000.00,
      icon: 'trending-up-outline',
      iconColor: colors.secondaryGreen,
      type: 'investment',
    },
  ];

  const today = new Date();
  const upcomingBills: Bill[] = [
    {
      id: '1',
      companyName: 'Netflix',
      companyLogo: 'https://logo.clearbit.com/netflix.com',
      amount: 16.99,
      dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      isPaid: false,
      category: 'Entertainment',
    },
    {
      id: '2',
      companyName: 'AGL Energy',
      companyLogo: 'https://logo.clearbit.com/agl.com.au',
      amount: 85.50,
      dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      isPaid: false,
      category: 'Bills & Utilities',
    },
    {
      id: '3',
      companyName: 'Telstra',
      companyLogo: 'https://logo.clearbit.com/telstra.com.au',
      amount: 60.00,
      dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
      isPaid: false,
      category: 'Bills & Utilities',
    },
    {
      id: '4',
      companyName: 'Spotify',
      companyLogo: 'https://logo.clearbit.com/spotify.com',
      amount: 11.99,
      dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
      isPaid: false,
      category: 'Entertainment',
    },
    {
      id: '5',
      companyName: 'Private Health',
      amount: 89.00,
      dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20),
      isPaid: false,
      category: 'Healthcare',
    },
  ];

  const savingsGoals: SavingsGoal[] = [
    {
      id: '1',
      name: 'Trip to Japan',
      targetAmount: 8000,
      currentAmount: 5250,
      dueDate: new Date(2024, 9, 1), // Oct 2024
      icon: 'airplane-outline',
      iconColor: colors.secondaryYellow,
    },
    {
      id: '2',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      dueDate: new Date(2024, 11, 31), // Dec 2024
      icon: 'shield-checkmark-outline',
      iconColor: colors.functionalSuccess,
    },
  ];

  const cardCycle: CardCycle = {
    id: '1',
    cardName: 'Amex Platinum',
    spent: 1850.75,
    limit: 5000,
    cycleEndDate: new Date(2024, 7, 25), // 25 Aug
    paymentDueDate: new Date(2024, 8, 15), // 15 Sep
  };

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

  // Render widget based on ID
  const renderWidget = (widgetId: string) => {
    const widget = WIDGET_REGISTRY[widgetId];
    if (!widget) return null;

    switch (widgetId) {
      case 'budget-overview':
        return (
          <BudgetOverviewWidget
            budgetItems={budgetItems}
            onViewAll={handleViewAllBudgets}
            onBudgetPress={handleBudgetCardPress}
          />
        );

      case 'spending-summary':
        return (
          <SpendingSummaryWidget
            gaugeChartData={gaugeChartData}
            totalSpending={totalSpending}
            totalBudget={totalBudget}
            onPeriodSelect={() => setShowPeriodSelector(true)}
          />
        );

      case 'recent-transactions':
        return (
          <RecentTransactionsWidget
            transactions={transactions}
            onViewAll={handleViewAllTransactions}
            onTransactionPress={handleTransactionPress}
          />
        );

      case 'category-breakdown':
        return (
          <CategoryBreakdownWidget
            categories={spendingCategories.map(cat => ({
              name: cat.label,
              icon: cat.label === 'Groceries' ? '🛒' : cat.label === 'Shopping' ? '🛍️' : cat.label === 'Transport' ? '🚗' : '📦',
              spent: cat.spent,
              budget: cat.budget,
              color: cat.color,
            }))}
            onPeriodSelect={(period) => {
              console.log('Period selected:', period);
              // TODO: Fetch data for selected period
            }}
            onCategoryPress={(category) => {
              console.log('Category pressed:', category);
              // TODO: Navigate to category details
            }}
          />
        );

      case 'bank-accounts':
        return (
          <BankAccountsWidget
            accounts={bankAccounts}
            onViewAll={() => router.push('/accounts')}
            onAccountPress={(account) => {
              console.log('Account pressed:', account);
              // TODO: Navigate to account details
            }}
          />
        );

      case 'upcoming-bills':
        return (
          <UpcomingBillsWidget
            bills={upcomingBills}
            onSeeAllBills={() => router.push('/bills')}
            onBillPress={(bill) => {
              console.log('Bill pressed:', bill);
              // TODO: Navigate to bill details
            }}
          />
        );

      case 'savings-goal':
        return (
          <SavingsGoalWidget
            goals={savingsGoals}
            onViewAll={() => router.push('/savings-goals')}
            onGoalPress={(goal) => {
              console.log('Goal pressed:', goal);
              // TODO: Navigate to goal details
            }}
          />
        );

      case 'card-cycle':
        return (
          <CardCycleWidget
            cardCycle={cardCycle}
            onMorePress={() => {
              console.log('More pressed');
              // TODO: Show options menu
            }}
            onCardPress={() => {
              console.log('Card pressed');
              // TODO: Navigate to card details
            }}
          />
        );

      default:
        return null;
    }
  };

  // Header component to be used in ListHeaderComponent
  const renderHeader = () => (
    <>
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

      {/* Widgets Header with Edit Button */}
      {enabledWidgets.length > 0 && (
        <View style={styles.widgetsHeader}>
          <Text style={styles.widgetsHeaderTitle}>Your Widgets</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditMode(!isEditMode)}
          >
            <Text style={[styles.editButtonText, isEditMode && styles.editButtonTextActive]}>
              {isEditMode ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  // Render normal widget item
  const renderWidgetItem: ListRenderItem<string> = ({ item: widgetId }) => (
    <WidgetContainer>
      {renderWidget(widgetId)}
    </WidgetContainer>
  );

  // Render draggable widget item
  const renderDraggableWidgetItem = ({ item: widgetId, drag, isActive }: RenderItemParams<string>) => (
    <ScaleDecorator>
      <OpacityDecorator activeOpacity={0.9}>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          delayLongPress={200}
          style={[
            styles.draggableWidget,
            isActive && styles.draggingWidget,
          ]}
          activeOpacity={1}
        >
          <View style={styles.dragHandleLeft}>
            <Ionicons
              name="reorder-three-outline"
              size={24}
              color={colors.neutralMedium}
            />
          </View>
          <View style={{ flex: 1 }}>
            <WidgetContainer>
              {renderWidget(widgetId)}
            </WidgetContainer>
          </View>
        </TouchableOpacity>
      </OpacityDecorator>
    </ScaleDecorator>
  );

  // Footer component (bottom spacing)
  const renderFooter = () => <View style={{ height: responsive.spacing[4] }} />;

  // Empty state component
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateIcon}>
        <Ionicons name="cube-outline" size={64} color={colors.neutralMedium} />
      </View>
      <Text style={styles.emptyStateTitle}>No Widgets Added</Text>
      <Text style={styles.emptyStateDescription}>
        Add widgets to customize your dashboard and view your financial data
      </Text>
      <TouchableOpacity
        style={styles.addWidgetsButton}
        onPress={() => router.push('/settings/appearance')}
      >
        <Ionicons name="add-circle-outline" size={20} color={colors.neutralWhite} />
        <Text style={styles.addWidgetsButtonText}>Add Widgets</Text>
      </TouchableOpacity>
    </View>
  );

  const widgetData = widgetOrder.filter((widgetId) => enabledWidgets.includes(widgetId));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Screen
        scrollable={false}
        noPadding
        backgroundColor={colors.neutralBg}
        edges={['top']}
      >
        <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

        {enabledWidgets.length === 0 ? (
          <FlatList
            data={[]}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyState}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        ) : isEditMode ? (
          <DraggableFlatList
            data={widgetData}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            onDragEnd={({ data }) => {
              const disabledWidgets = widgetOrder.filter(id => !enabledWidgets.includes(id));
              const newOrder = [...data, ...disabledWidgets];
              updateWidgetOrder(newOrder);
            }}
            keyExtractor={(item) => item}
            renderItem={renderDraggableWidgetItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: responsive.spacing[4] }}
          />
        ) : (
          <FlatList
            data={widgetData}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            renderItem={renderWidgetItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: responsive.spacing[4] }}
          />
        )}

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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  widgetsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[4],
    paddingBottom: responsive.spacing[2],
  },
  widgetsHeaderTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  editButton: {
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    borderRadius: theme.borderRadius.lg,
    backgroundColor: colors.neutralBg,
  },
  editButtonText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  editButtonTextActive: {
    color: colors.functionalSuccess,
  },
  widgetsSection: {
    paddingHorizontal: responsive.spacing[4],
    marginTop: responsive.spacing[2],
  },
  draggableWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing[4],
    gap: responsive.spacing[2],
  },
  draggingWidget: {
    opacity: 0.9,
    transform: [{ scale: 1.02 }],
  },
  dragHandleLeft: {
    paddingRight: responsive.spacing[2],
    paddingVertical: responsive.spacing[2],
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
  emptyStateContainer: {
    marginHorizontal: responsive.spacing[4],
    marginTop: responsive.spacing[6],
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[8],
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  emptyStateIcon: {
    marginBottom: responsive.spacing[4],
    opacity: 0.5,
  },
  emptyStateTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: responsive.fontSize.md,
    fontWeight: '400',
    color: colors.neutralDark,
    textAlign: 'center',
    marginBottom: responsive.spacing[6],
    paddingHorizontal: responsive.spacing[4],
  },
  addWidgetsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    backgroundColor: colors.primary,
    paddingVertical: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[6],
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.sm,
  },
  addWidgetsButtonText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralWhite,
  },
});

export default DashboardScreen;
