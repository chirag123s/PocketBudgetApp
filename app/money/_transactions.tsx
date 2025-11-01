import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { CategorizeModal, AddReceiptModal } from '@/components/transaction';
import { useTheme } from '@/contexts/ThemeContext';

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  isIncome: boolean;
  hasLogo?: boolean;
  logoInitial?: string;
  hasActions?: boolean;
}

interface TransactionGroup {
  date: string;
  total: number;
  transactions: Transaction[];
}

type FilterTab = 'all' | 'income' | 'expense';

export default function TransactionsScreen() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

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

  // Modal states
  const [showCategorizeModal, setShowCategorizeModal] = useState(false);
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sample data
  const transactionGroups: TransactionGroup[] = [
    {
      date: 'Today',
      total: -129.00,
      transactions: [
        {
          id: '1',
          merchant: 'Woolworths',
          category: 'Groceries',
          amount: 124.50,
          time: '9:41 AM',
          icon: 'cart-outline',
          isIncome: false,
          hasActions: true,
        },
        {
          id: '2',
          merchant: 'Bills Beans Cafe',
          category: 'Coffee',
          amount: 4.50,
          time: '8:15 AM',
          icon: 'cafe-outline',
          isIncome: false,
          hasActions: true,
        },
      ],
    },
    {
      date: 'Yesterday',
      total: -20.00,
      transactions: [
        {
          id: '3',
          merchant: 'Opal Card Top Up',
          category: 'Transport',
          amount: 20.00,
          time: '5:30 PM',
          icon: 'bus-outline',
          isIncome: false,
          hasActions: true,
        },
      ],
    },
    {
      date: 'Friday, 19 July',
      total: 2421.00,
      transactions: [
        {
          id: '4',
          merchant: 'Salary',
          category: 'Income',
          amount: 2500.00,
          time: '19 Jul',
          icon: 'briefcase-outline',
          isIncome: true,
          hasActions: true,
        },
        {
          id: '5',
          merchant: 'Telstra Bill',
          category: 'Utilities',
          amount: 79.00,
          time: '19 Jul',
          icon: 'receipt-outline',
          isIncome: false,
          hasActions: true,
        },
      ],
    },
  ];

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'income', label: 'Income' },
    { key: 'expense', label: 'Expenses' },
  ];

  // Calculate totals
  const totalIncome = transactionGroups.reduce((sum, group) =>
    sum + group.transactions.filter(t => t.isIncome).reduce((s, t) => s + t.amount, 0), 0
  );
  const totalExpense = transactionGroups.reduce((sum, group) =>
    sum + group.transactions.filter(t => !t.isIncome).reduce((s, t) => s + t.amount, 0), 0
  );
  const netCashFlow = totalIncome - totalExpense;

  // KEEP ALL EXISTING FUNCTIONS
  const toggleExpanded = (id: string) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const handleNavigateToCharts = () => {
    router.push('/tabs/insights');
  };

  const handleAddTransaction = () => {
    console.log('Add transaction');
  };

  const handleCategorize = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowCategorizeModal(true);
  };

  const handleCategorySelected = (categoryId: string) => {
    console.log('Category selected:', categoryId, 'for transaction:', selectedTransaction?.id);
    // TODO: Update transaction category in database
  };

  const handleSplit = (transaction: Transaction) => {
    router.push({
      pathname: '/money/transaction/split',
      params: {
        transactionId: transaction.id,
        merchant: transaction.merchant,
        date: 'Today',
        amount: transaction.amount.toString(),
      },
    });
  };

  const handleAttach = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowAddReceiptModal(true);
  };

  const handleReceiptSelected = (uri: string) => {
    router.push({
      pathname: '/money/transaction/receipt-preview',
      params: {
        uri,
        transactionId: selectedTransaction?.id,
      },
    });
  };

  const renderTransaction = (transaction: Transaction) => {
    const isExpanded = expandedTransaction === transaction.id;

    return (
      <View key={transaction.id} style={styles.transactionWrapper}>
        <TouchableOpacity
          style={styles.transactionCard}
          activeOpacity={0.7}
          onPress={() => transaction.hasActions && toggleExpanded(transaction.id)}
        >
          <View style={styles.transactionLeft}>
            <View style={[
              styles.iconContainer,
              { backgroundColor: transaction.isIncome ? `${colors.functionalSuccess}20` : `${colors.neutralDark}15` }
            ]}>
              <Ionicons
                name={transaction.icon}
                size={20}
                color={transaction.isIncome ? colors.functionalSuccess : colors.neutralDark}
              />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.merchantName}>{transaction.merchant}</Text>
              <Text style={styles.category}>{transaction.category}</Text>
            </View>
          </View>

          <View style={styles.transactionRight}>
            <Text style={[
              styles.amount,
              { color: transaction.isIncome ? colors.functionalSuccess : colors.functionalError }
            ]}>
              ${transaction.amount.toFixed(2)}
            </Text>
            <Text style={styles.time}>{transaction.time}</Text>
          </View>
        </TouchableOpacity>

        {/* Expanded Actions */}
        {isExpanded && transaction.hasActions && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCategorize(transaction)}
              activeOpacity={0.7}
            >
              <Ionicons name="pricetags-outline" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Categorize</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSplit(transaction)}
              activeOpacity={0.7}
            >
              <Ionicons name="git-branch-outline" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Split</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleAttach(transaction)}
              activeOpacity={0.7}
            >
              <Ionicons name="camera-outline" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color={colors.primary} />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: colors.neutralBg,
    },
    contentContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingBottom: responsive.spacing[20],
    },

    // Summary Card
    summaryCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      marginBottom: responsive.spacing[4],
      minHeight: ms(150),
      ...theme.shadows.sm,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: responsive.spacing[3],
    },
    summaryItem: {
      flex: 1,
    },
    summaryLabel: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      marginBottom: responsive.spacing[2],
    },
    summaryItemLabel: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
      marginBottom: responsive.spacing[1],
    },
    summaryItemValue: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    netCashFlowValue: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.5,
      marginBottom: responsive.spacing[2],
    },
    divider: {
      width: 1,
      backgroundColor: theme.colors.border.light,
      marginHorizontal: responsive.spacing[4],
    },

    // Filter Tabs
    filterContainer: {
      marginVertical: responsive.spacing[3],
    },
    filterContent: {
      gap: responsive.spacing[2],
    },
    filterTab: {
      height: ms(36),
      paddingHorizontal: responsive.spacing[4],
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterTabActive: {
      backgroundColor: colors.primary,
    },
    filterTabInactive: {
      backgroundColor: theme.colors.border.light,
    },
    filterTabText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
    },
    filterTabTextActive: {
      color: '#ffffff',
    },
    filterTabTextInactive: {
      color: colors.neutralDarkest,
    },

    // Transaction Group
    groupHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
    },
    groupDate: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralMedium,
      textTransform: 'uppercase',
    },
    groupTotal: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
    },

    // Transaction Card
    transactionWrapper: {
      marginBottom: responsive.spacing[2],
    },
    transactionCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[3],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...theme.shadows.sm,
    },
    transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: ms(40),
      height: ms(40),
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[3],
    },
    transactionInfo: {
      flex: 1,
    },
    merchantName: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[0.5],
    },
    category: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    amount: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      marginBottom: responsive.spacing[0.5],
    },
    time: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralMedium,
    },

    // Actions Container
    actionsContainer: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[3],
      marginTop: responsive.spacing[2],
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsive.spacing[2],
      ...theme.shadows.sm,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[3],
      borderRadius: theme.borderRadius.md,
      backgroundColor: `${colors.primary}10`,
      gap: responsive.spacing[2],
    },
    actionText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
    },
  });

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Net Cash Flow</Text>
          <Text style={[
            styles.netCashFlowValue,
            { color: netCashFlow >= 0 ? colors.functionalSuccess : colors.functionalError }
          ]}>
            ${Math.abs(netCashFlow).toFixed(2)}
          </Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Income</Text>
              <Text style={[styles.summaryItemValue, { color: colors.functionalSuccess }]}>
                ${totalIncome.toFixed(2)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Expenses</Text>
              <Text style={[styles.summaryItemValue, { color: colors.functionalError }]}>
                ${totalExpense.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                activeFilter === filter.key
                  ? styles.filterTabActive
                  : styles.filterTabInactive,
              ]}
              onPress={() => setActiveFilter(filter.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === filter.key
                    ? styles.filterTabTextActive
                    : styles.filterTabTextInactive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transaction Groups */}
        {transactionGroups.map((group) => (
          <View key={group.date}>
            <View style={styles.groupHeader}>
              <Text style={styles.groupDate}>{group.date}</Text>
              <Text style={[
                styles.groupTotal,
                { color: group.total >= 0 ? colors.functionalSuccess : colors.functionalError }
              ]}>
                ${Math.abs(group.total).toFixed(2)}
              </Text>
            </View>
            {group.transactions.map(renderTransaction)}
          </View>
        ))}
      </ScrollView>

      {/* Modals - KEEP EXISTING MODAL COMPONENTS */}
      <CategorizeModal
        visible={showCategorizeModal}
        onClose={() => setShowCategorizeModal(false)}
        onSelectCategory={handleCategorySelected}
      />

      <AddReceiptModal
        visible={showAddReceiptModal}
        onClose={() => setShowAddReceiptModal(false)}
        onReceiptSelected={handleReceiptSelected}
      />
    </>
  );
}
