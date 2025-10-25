import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  emoji: string;
  type: 'expense' | 'income' | 'transfer';
}

// Sample data (will be replaced with actual data from context)
const sampleTransactions: Transaction[] = [
  { id: 1, name: 'Salary', amount: 3500, category: 'Income', date: 'Today', emoji: '💰', type: 'income' },
  { id: 2, name: 'Woolworths', amount: -87.32, category: 'Groceries', date: 'Today', emoji: '🛒', type: 'expense' },
  { id: 3, name: 'Uber', amount: -24.50, category: 'Transport', date: 'Yesterday', emoji: '🚗', type: 'expense' },
  { id: 4, name: 'Netflix', amount: -15.99, category: 'Entertainment', date: 'Yesterday', emoji: '🎬', type: 'expense' },
  { id: 5, name: 'Coles', amount: -63.45, category: 'Groceries', date: 'Jan 24', emoji: '🛒', type: 'expense' },
  { id: 6, name: 'The Coffee Club', amount: -12.80, category: 'Dining Out', date: 'Jan 24', emoji: '☕', type: 'expense' },
  { id: 7, name: 'Rent', amount: -1800, category: 'Bills', date: 'Jan 23', emoji: '🏠', type: 'expense' },
  { id: 8, name: 'Petrol', amount: -65.00, category: 'Transport', date: 'Jan 23', emoji: '⛽', type: 'expense' },
];

const filterOptions = ['All', 'Expenses', 'Income', 'This Month', 'Last Month'];

export default function TransactionsTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Group transactions by date
  const groupedTransactions = sampleTransactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="filter-outline" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search transactions..."
            placeholderTextColor={theme.colors.text.tertiary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filterOptions.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterChipText,
              selectedFilter === filter && styles.filterChipTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transactions List */}
      <ScrollView contentContainerStyle={styles.content}>
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{date}</Text>

            {transactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transactionCard}
                onPress={() => {}}
              >
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    {
                      backgroundColor: transaction.type === 'income'
                        ? theme.colors.success.light
                        : transaction.type === 'transfer'
                        ? theme.colors.info.light
                        : theme.colors.background.tertiary
                    }
                  ]}>
                    <Text style={styles.transactionEmoji}>{transaction.emoji}</Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>{transaction.name}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                </View>

                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    transaction.type === 'income' && styles.transactionAmountIncome,
                    transaction.type === 'expense' && styles.transactionAmountExpense,
                    transaction.type === 'transfer' && styles.transactionAmountTransfer
                  ]}>
                    {transaction.type === 'income' ? '+' : ''}
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={theme.colors.text.tertiary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Empty State */}
        {sampleTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={theme.colors.text.tertiary} />
            <Text style={styles.emptyStateTitle}>No transactions yet</Text>
            <Text style={styles.emptyStateText}>
              Start tracking your spending by adding your first transaction
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {}}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    ...theme.typography.styles.h2,
    fontSize: theme.responsive.fontSize.h3,
  },
  headerButton: {
    padding: theme.responsive.spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingTop: theme.responsive.spacing.md,
    paddingBottom: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    gap: theme.responsive.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
  filterContainer: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    gap: theme.responsive.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.tertiary,
    marginRight: theme.responsive.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary[600],
  },
  filterChipText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: 100, // Space for FAB
  },
  dateGroup: {
    marginBottom: theme.responsive.spacing.lg,
  },
  dateHeader: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.sm,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    ...theme.shadows.sm,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: theme.responsive.moderateScale(48),
    height: theme.responsive.moderateScale(48),
    borderRadius: theme.responsive.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  transactionEmoji: {
    fontSize: theme.responsive.fontSize.h3,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionCategory: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  transactionAmount: {
    ...theme.typography.styles.body,
    fontWeight: '700',
  },
  transactionAmountIncome: {
    color: theme.colors.success.main,
  },
  transactionAmountExpense: {
    color: theme.colors.text.primary,
  },
  transactionAmountTransfer: {
    color: theme.colors.info.main,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.responsive.spacing.xxl,
  },
  emptyStateTitle: {
    ...theme.typography.styles.h3,
    marginTop: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
  },
  emptyStateText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: theme.responsive.spacing.xl,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: theme.responsive.moderateScale(56),
    height: theme.responsive.moderateScale(56),
    borderRadius: theme.responsive.scale(28),
    backgroundColor: theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
});
