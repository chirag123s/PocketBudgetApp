import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

const colors = {
  primary: theme.colors.info.main,
  secondaryRed: '#FF6B6B',
  secondaryGreen: theme.colors.success.main,
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  functionalError: theme.colors.danger.main,
};

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  type: 'bank' | 'savings' | 'credit' | 'investment';
}

export interface BankAccountsWidgetProps {
  accounts: BankAccount[];
  onViewAll?: () => void;
  onAccountPress?: (account: BankAccount) => void;
}

export const BankAccountsWidget: React.FC<BankAccountsWidgetProps> = ({
  accounts,
  onViewAll,
  onAccountPress,
}) => {
  const formatBalance = (balance: number) => {
    const formatted = Math.abs(balance).toFixed(2);
    return balance < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  const getBalanceColor = (balance: number) => {
    return balance < 0 ? colors.functionalError : colors.neutralDarkest;
  };

  return (
    <>
      <View style={styles.accountsHeader}>
        <Text style={styles.sectionHeading}>Accounts</Text>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.accountsGrid}>
        {accounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[styles.accountCard, styles.cardShadow]}
            onPress={() => onAccountPress?.(account)}
            disabled={!onAccountPress}
          >
            <View style={styles.accountHeader}>
              <View
                style={[
                  styles.accountIconContainer,
                  { backgroundColor: `${account.iconColor}1A` },
                ]}
              >
                <Ionicons
                  name={account.icon}
                  size={20}
                  color={account.iconColor}
                />
              </View>
              <Text style={styles.accountName} numberOfLines={1}>
                {account.name}
              </Text>
            </View>
            <Text style={[styles.accountBalance, { color: getBalanceColor(account.balance) }]}>
              {formatBalance(account.balance)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  accountsHeader: {
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
  accountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing[4],
  },
  accountCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[3],
    gap: responsive.spacing[2],
  },
  cardShadow: {
    ...theme.shadows.sm,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  accountIconContainer: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  accountName: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
    flex: 1,
  },
  accountBalance: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
  },
});
