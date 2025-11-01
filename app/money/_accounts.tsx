import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface Account {
  id: string;
  type: 'bank' | 'credit' | 'investment' | 'loan';
  customName: string;
  institutionName: string;
  accountNumber: string; // last 4 digits
  balance: number;
  availableBalance?: number;
  lastUpdated: string;
  logo?: string;
  // Credit card specific
  creditLimit?: number;
  dueDate?: string;
  // Investment specific
  change?: string;
  changePercent?: number;
  // Loan specific
  interestRate?: number;
}

export default function AccountsScreen() {
  const router = useRouter();
  const { theme: themeMode, customBackgroundColor } = useTheme();
  const theme = getTheme(themeMode, customBackgroundColor);

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

  // Sample data
  const bankAccounts: Account[] = [
    {
      id: '1',
      type: 'bank',
      customName: 'Everyday Account',
      institutionName: 'Commonwealth Bank',
      accountNumber: '2847',
      balance: 12345.67,
      availableBalance: 12345.67,
      lastUpdated: 'Just now',
      logo: 'https://logo.clearbit.com/commbank.com.au',
    },
    {
      id: '2',
      type: 'bank',
      customName: 'Savings',
      institutionName: 'ANZ',
      accountNumber: '1234',
      balance: 25000.00,
      lastUpdated: '2 mins ago',
      logo: 'https://logo.clearbit.com/anz.com.au',
    },
  ];

  const creditCards: Account[] = [
    {
      id: '3',
      type: 'credit',
      customName: 'Rewards Card',
      institutionName: 'Westpac',
      accountNumber: '5678',
      balance: 1234.56,
      creditLimit: 10000,
      dueDate: 'Due 5 Oct',
      lastUpdated: '1 hour ago',
      logo: 'https://logo.clearbit.com/westpac.com.au',
    },
  ];

  const investments: Account[] = [
    {
      id: '4',
      type: 'investment',
      customName: 'Superannuation',
      institutionName: 'Australian Super',
      accountNumber: '9012',
      balance: 85420.50,
      change: '$1,234.56',
      changePercent: 2.3,
      lastUpdated: '1 day ago',
      logo: 'https://logo.clearbit.com/australiansuper.com',
    },
  ];

  const totalAssets = [...bankAccounts, ...investments].reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = creditCards.reduce((sum, acc) => sum + acc.balance, 0);
  const netWorth = totalAssets - totalLiabilities;

  const renderAccountCard = (account: Account) => {
    const isCredit = account.type === 'credit';
    const isInvestment = account.type === 'investment';
    const utilization = isCredit && account.creditLimit
      ? (account.balance / account.creditLimit) * 100
      : 0;

    return (
      <TouchableOpacity
        key={account.id}
        style={styles.accountCard}
        activeOpacity={0.7}
      >
        <View style={styles.accountHeader}>
          <View style={styles.logoContainer}>
            {account.logo ? (
              <Image
                source={{ uri: account.logo }}
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.logoPlaceholder, { backgroundColor: `${colors.primary}20` }]}>
                <Ionicons name="business" size={20} color={colors.primary} />
              </View>
            )}
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>{account.customName}</Text>
            <Text style={styles.institutionName}>
              {account.institutionName} •• {account.accountNumber}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
        </View>

        <View style={styles.accountBody}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>
              {isCredit ? 'Balance Owed' : 'Balance'}
            </Text>
            <Text style={[
              styles.balanceAmount,
              isCredit && { color: colors.functionalError }
            ]}>
              ${account.balance.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>

          {isCredit && account.creditLimit && (
            <>
              <View style={styles.creditInfo}>
                <Text style={styles.creditLimit}>
                  ${(account.creditLimit - account.balance).toLocaleString('en-AU', { minimumFractionDigits: 2 })} available
                </Text>
                <Text style={styles.creditLimit}>
                  of ${account.creditLimit.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${utilization}%`,
                      backgroundColor: utilization > 80 ? colors.functionalError : colors.functionalWarning
                    }
                  ]}
                />
              </View>
              {account.dueDate && (
                <Text style={styles.dueDate}>{account.dueDate}</Text>
              )}
            </>
          )}

          {isInvestment && account.change && (
            <View style={styles.changeRow}>
              <Ionicons
                name={account.changePercent && account.changePercent > 0 ? 'trending-up' : 'trending-down'}
                size={16}
                color={account.changePercent && account.changePercent > 0 ? colors.functionalSuccess : colors.functionalError}
              />
              <Text style={[
                styles.changeText,
                { color: account.changePercent && account.changePercent > 0 ? colors.functionalSuccess : colors.functionalError }
              ]}>
                {account.change} ({account.changePercent?.toFixed(1)}%)
              </Text>
            </View>
          )}

          <Text style={styles.lastUpdated}>Updated {account.lastUpdated}</Text>
        </View>
      </TouchableOpacity>
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

    // Net Worth Summary
    summaryCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      marginBottom: responsive.spacing[4],
      minHeight: ms(150),
      ...theme.shadows.sm,
    },
    summaryLabel: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      marginBottom: responsive.spacing[2],
    },
    netWorthValue: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.5,
      marginBottom: responsive.spacing[2],
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: responsive.spacing[3],
    },
    summaryItem: {
      flex: 1,
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
    divider: {
      width: 1,
      backgroundColor: theme.colors.border.light,
      marginHorizontal: responsive.spacing[4],
    },

    // Section
    sectionHeader: {
      marginTop: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
    },
    sectionTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.3,
    },

    // Account Card
    accountCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    accountHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsive.spacing[3],
    },
    logoContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      marginRight: responsive.spacing[3],
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    logoPlaceholder: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountInfo: {
      flex: 1,
    },
    accountName: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[1],
    },
    institutionName: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    accountBody: {
      gap: responsive.spacing[2],
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    balanceLabel: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralMedium,
    },
    balanceAmount: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.3,
    },
    creditInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    creditLimit: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
    },
    progressBar: {
      height: ms(4),
      backgroundColor: colors.neutralBg,
      borderRadius: ms(2),
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: ms(2),
    },
    dueDate: {
      fontSize: responsive.fontSize.sm,
      color: colors.functionalWarning,
      fontWeight: '600',
    },
    changeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
    },
    changeText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
    },
    lastUpdated: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
    },
  });

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Net Worth Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Net Worth</Text>
        <Text style={styles.netWorthValue}>
          ${netWorth.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>Assets</Text>
            <Text style={[styles.summaryItemValue, { color: colors.functionalSuccess }]}>
              ${totalAssets.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>Liabilities</Text>
            <Text style={[styles.summaryItemValue, { color: colors.functionalError }]}>
              ${totalLiabilities.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
      </View>

      {/* Bank Accounts */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bank Accounts</Text>
      </View>
      {bankAccounts.map(renderAccountCard)}

      {/* Credit Cards */}
      {creditCards.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Credit Cards</Text>
          </View>
          {creditCards.map(renderAccountCard)}
        </>
      )}

      {/* Investments */}
      {investments.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Investments</Text>
          </View>
          {investments.map(renderAccountCard)}
        </>
      )}
    </ScrollView>
  );
}
