import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { CategorizeModal, AddReceiptModal } from '@/components/transaction';

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

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  time: string;
  icon: string;
  isIncome: boolean;
  hasLogo?: boolean;
  logoInitial?: string;
  hasActions?: boolean;
}

interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}

// Sample data (will be replaced with actual data from context)
const transactionGroups: TransactionGroup[] = [
  {
    date: 'TODAY, 24 JULY 2024',
    transactions: [
      {
        id: '1',
        merchant: 'Woolworths',
        category: 'Groceries',
        amount: 124.50,
        time: '9:41 AM',
        icon: 'cart-outline',
        isIncome: false,
        hasLogo: true,
        logoInitial: 'W',
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
    date: 'YESTERDAY, 23 JULY 2024',
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
    date: 'FRIDAY, 19 JULY 2024',
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

const filterOptions = [
  { id: 'all', label: 'All', hasDropdown: false },
  { id: 'month', label: 'This Month', hasDropdown: true },
  { id: 'category', label: 'Category', hasDropdown: true },
  { id: 'account', label: 'Account', hasDropdown: true },
];

export default function TransactionsTab() {
  const router = useRouter();
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Modal states
  const [showCategorizeModal, setShowCategorizeModal] = useState(false);
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const handleNavigateToCharts = () => {
    router.push('/tabs/charts');
  };

  const handleAddTransaction = () => {
    // TODO: Navigate to add transaction screen or open modal
    console.log('Add transaction');
  };

  // Categorize handler
  const handleCategorize = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowCategorizeModal(true);
  };

  const handleCategorySelected = (categoryId: string) => {
    console.log('Category selected:', categoryId, 'for transaction:', selectedTransaction?.id);
    // TODO: Update transaction category in database
  };

  // Split handler
  const handleSplit = (transaction: Transaction) => {
    router.push({
      pathname: '/transaction/split',
      params: {
        transactionId: transaction.id,
        merchant: transaction.merchant,
        date: 'Today',
        amount: transaction.amount.toString(),
      },
    });
  };

  // Attach receipt handler
  const handleAttach = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowAddReceiptModal(true);
  };

  const handleReceiptSelected = (uri: string) => {
    router.push({
      pathname: '/transaction/receipt-preview',
      params: {
        uri,
        transactionId: selectedTransaction?.id,
      },
    });
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleAddTransaction}>
            <Ionicons name="add-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search-outline" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="filter-outline" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
          style={styles.filterScrollView}
        >
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.label && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.label)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === filter.label && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
              {filter.hasDropdown && (
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={activeFilter === filter.label ? theme.colors.text.inverse : theme.colors.text.secondary}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          {transactionGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.transactionGroup}>
              {/* Date Header */}
              <Text style={styles.dateHeader}>{group.date}</Text>

              {/* Transactions */}
              {group.transactions.map((transaction) => (
                <View key={transaction.id}>
                  <TouchableOpacity
                    style={[
                      styles.transactionCard,
                      transaction.hasActions && expandedTransaction === transaction.id && styles.transactionCardExpanded,
                    ]}
                    onPress={() => transaction.hasActions && toggleExpanded(transaction.id)}
                    activeOpacity={transaction.hasActions ? 0.7 : 1}
                  >
                    {/* Transaction Main Content */}
                    <View style={styles.transactionMain}>
                      {/* Icon/Logo */}
                      {transaction.hasLogo ? (
                        <View style={styles.transactionLogo}>
                          <View style={styles.logoPlaceholder}>
                            <Text style={styles.logoText}>{transaction.logoInitial}</Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.transactionIcon}>
                          <Ionicons
                            name={transaction.icon as any}
                            size={20}
                            color={transaction.isIncome ? theme.colors.success.main : theme.colors.primary[500]}
                          />
                        </View>
                      )}

                      {/* Details */}
                      <View style={styles.transactionDetails}>
                        <Text style={styles.transactionMerchant}>
                          {transaction.merchant}
                        </Text>
                        <View style={styles.categoryRow}>
                          {transaction.hasLogo && (
                            <Ionicons
                              name="pricetag-outline"
                              size={14}
                              color={theme.colors.primary[500]}
                            />
                          )}
                          <Text style={styles.transactionCategory}>
                            {transaction.category}
                          </Text>
                        </View>
                      </View>

                      {/* Amount */}
                      <View style={styles.transactionAmount}>
                        <Text
                          style={[
                            styles.amount,
                            transaction.isIncome
                              ? styles.amountIncome
                              : styles.amountExpense,
                          ]}
                        >
                          {transaction.isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </Text>
                        <Text style={styles.transactionTime}>{transaction.time}</Text>
                      </View>
                    </View>

                    {/* Quick Actions (Expandable) */}
                    {transaction.hasActions && expandedTransaction === transaction.id && (
                      <View style={styles.actionsContainer}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleAttach(transaction)}
                        >
                          <Ionicons
                            name="receipt-outline"
                            size={24}
                            color={theme.colors.text.secondary}
                          />
                          <Text style={styles.actionText}>Attach</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleCategorize(transaction)}
                        >
                          <Ionicons
                            name="pricetag-outline"
                            size={24}
                            color={theme.colors.text.secondary}
                          />
                          <Text style={styles.actionText}>Categorize</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleSplit(transaction)}
                        >
                          <Ionicons
                            name="git-branch-outline"
                            size={24}
                            color={theme.colors.text.secondary}
                          />
                          <Text style={styles.actionText}>Split</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}

          {/* Bottom spacing */}
          <View style={{ height: responsive.spacing[4] }} />
        </View>
      </ScrollView>

      {/* Floating Action Button - Navigate to Charts */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} onPress={handleNavigateToCharts}>
          <Ionicons name="bar-chart" size={28} color={colors.neutralWhite} />
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <CategorizeModal
        visible={showCategorizeModal}
        onClose={() => setShowCategorizeModal(false)}
        onSelectCategory={handleCategorySelected}
        selectedCategoryId={selectedTransaction?.category}
      />

      <AddReceiptModal
        visible={showAddReceiptModal}
        onClose={() => setShowAddReceiptModal(false)}
        onReceiptSelected={handleReceiptSelected}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
    backgroundColor: colors.neutralBg,
  },
  headerTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  headerActions: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
  },
  headerButton: {
    width: ms(40),
    height: ms(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  filterScrollView: {
    flexGrow: 0,
    paddingVertical: responsive.spacing[4],
  },
  filterScrollContent: {
    paddingLeft: responsive.spacing[4],
    paddingRight: responsive.spacing[4],
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(36),
    paddingHorizontal: responsive.spacing[4],
    borderRadius: ms(18),
    borderWidth: 1,
    borderColor: `${theme.colors.text.tertiary}66`,
    backgroundColor: theme.colors.background.primary,
    gap: responsive.spacing[2],
    marginRight: responsive.spacing[2],
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  filterChipText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: theme.colors.text.inverse,
  },
  transactionsContainer: {
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[4],
  },
  transactionGroup: {
    marginBottom: responsive.spacing[4],
  },
  dateHeader: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: theme.colors.text.tertiary,
    marginBottom: responsive.spacing[4],
  },
  transactionCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: responsive.spacing[3],
    borderWidth: 1,
    borderColor: `${theme.colors.text.tertiary}33`,
    ...theme.shadows.sm,
    overflow: 'hidden',
  },
  transactionCardExpanded: {
    // Additional styling if needed
  },
  transactionMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: responsive.spacing[4],
    gap: responsive.spacing[4],
  },
  transactionLogo: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    overflow: 'hidden',
  },
  logoPlaceholder: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: theme.colors.success.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text.inverse,
  },
  transactionIcon: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  transactionMerchant: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  transactionCategory: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
  },
  amountIncome: {
    color: theme.colors.success.main,
  },
  amountExpense: {
    color: theme.colors.danger.main,
  },
  transactionTime: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: theme.colors.text.tertiary,
    marginTop: responsive.spacing[1],
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.text.tertiary}33`,
    paddingVertical: responsive.spacing[2],
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsive.spacing[1],
    gap: responsive.spacing[1],
  },
  actionText: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  fabContainer: {
    position: 'absolute',
    bottom: responsive.spacing[6],
    right: responsive.spacing[6],
  },
  fab: {
    width: ms(64),
    height: ms(64),
    borderRadius: ms(32),
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
