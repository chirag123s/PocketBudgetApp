import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

const colors = {
  primary: theme.colors.info.main,
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  secondaryYellow: theme.colors.warning.main,
  secondaryRed: '#FF6B6B',
};

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  color: string;
}

export interface RecentTransactionsWidgetProps {
  transactions: Transaction[];
  onViewAll?: () => void;
  onTransactionPress?: (transactionId: string) => void;
}

export const RecentTransactionsWidget: React.FC<RecentTransactionsWidgetProps> = ({
  transactions,
  onViewAll,
  onTransactionPress,
}) => {
  const getIconBackgroundColor = (color: string) => {
    if (color === colors.primary) return `${colors.primary}1A`;
    if (color === colors.secondaryYellow) return `${colors.secondaryYellow}33`;
    if (color === colors.secondaryRed) return `${colors.secondaryRed}33`;
    return `${colors.primary}1A`;
  };

  return (
    <>
      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionHeading}>Recent Transactions</Text>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.transactionsCard, styles.cardShadow]}>
        {transactions.map((transaction, index) => (
          <View key={transaction.id}>
            <TouchableOpacity
              style={styles.transactionItem}
              onPress={() => onTransactionPress?.(transaction.id)}
              disabled={!onTransactionPress}
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
    </>
  );
};

const styles = StyleSheet.create({
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: responsive.spacing[3],
  },
  sectionHeading: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  viewAllButton: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  transactionsCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
  },
  cardShadow: {
    ...theme.shadows.sm,
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
