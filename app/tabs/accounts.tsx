import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { BottomButton } from '@/components/ui/BottomButton';
import { useTheme } from '@/contexts/ThemeContext';

interface Account {
  id: string;
  customName: string;
  bankName: string;
  balance: number;
  lastUpdated: string;
  logo: string;
  change?: string;
  isNegative?: boolean;
  dueDate?: string;
}

interface AccountTypeOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
}

const AccountsInsightsScreen: React.FC = () => {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [showAddModal, setShowAddModal] = useState(false);

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

  const accountTypeOptions: AccountTypeOption[] = [
    {
      id: 'bank',
      title: 'Bank Account',
      description: 'Connect your checking or savings account',
      icon: 'business',
      iconColor: colors.primary,
      iconBg: `${colors.primary}15`,
    },
    {
      id: 'investment',
      title: 'Investment Account',
      description: 'Add stocks, ETFs, or superannuation',
      icon: 'trending-up',
      iconColor: colors.functionalSuccess,
      iconBg: `${colors.functionalSuccess}15`,
    },
    {
      id: 'credit',
      title: 'Credit Card',
      description: 'Track your credit card balances',
      icon: 'card',
      iconColor: colors.functionalWarning,
      iconBg: `${colors.functionalWarning}15`,
    },
    {
      id: 'loan',
      title: 'Loan',
      description: 'Add mortgage, car loan, or personal loan',
      icon: 'home',
      iconColor: colors.functionalError,
      iconBg: `${colors.functionalError}15`,
    },
  ];

  const handleNavigateToConnectedAccounts = () => {
    router.push('/bank/connected');
  };

  const handleAddAccountType = (typeId: string) => {
    setShowAddModal(false);
    // TODO: Navigate to specific add screen based on type
    console.log('Add account type:', typeId);
  };

  const bankAccounts: Account[] = [
    {
      id: '1',
      customName: 'Everyday Spending',
      bankName: 'Commonwealth Bank',
      balance: 12345.67,
      lastUpdated: 'Just now',
      logo: 'https://via.placeholder.com/48/FFCC00/172B4D?text=CB',
    },
    {
      id: '2',
      customName: 'Emergency Fund',
      bankName: 'ANZ',
      balance: 8765.43,
      lastUpdated: '1h ago',
      logo: 'https://via.placeholder.com/48/1E40AF/FFFFFF?text=ANZ',
    },
  ];

  const investments: Account[] = [
    {
      id: '1',
      customName: 'Super - Growth',
      bankName: 'Vanguard',
      balance: 82987.12,
      lastUpdated: '3h ago',
      logo: 'https://via.placeholder.com/48/36B37E/FFFFFF?text=V',
      change: '+2.1%',
    },
  ];

  const creditCards: Account[] = [
    {
      id: '1',
      customName: 'Rewards Card',
      bankName: 'Commonwealth Bank',
      balance: 1234.56,
      isNegative: true,
      dueDate: 'Due in 5 days',
      logo: 'https://via.placeholder.com/48/FFCC00/172B4D?text=CB',
    },
  ];

  const renderAccountCard = (account: Account, isClickable: boolean = false) => (
    <TouchableOpacity
      key={account.id}
      style={styles.accountCard}
      activeOpacity={isClickable ? 0.7 : 1}
      onPress={isClickable ? handleNavigateToConnectedAccounts : undefined}
      disabled={!isClickable}
    >
      <View style={styles.accountLeft}>
        <Image source={{ uri: account.logo }} style={styles.accountLogo} />
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{account.customName}</Text>
          <Text style={styles.bankNameText}>{account.bankName}</Text>
          <Text style={styles.accountUpdate}>
            {account.dueDate || `Last updated: ${account.lastUpdated}`}
          </Text>
        </View>
      </View>
      <View style={styles.accountRight}>
        <View style={styles.balanceContainer}>
          <Text style={[styles.accountBalance, account.isNegative && styles.negativeBalance]}>
            {account.isNegative ? '-' : ''}${account.balance.toFixed(2)}
          </Text>
          {account.isNegative && <View style={styles.dueDot} />}
        </View>
        {account.change && (
          <Text style={styles.changePositive}>{account.change}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

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
    headerTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    headerButton: {
      width: ms(40),
      height: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: responsive.spacing[4],
    },
    netWorthCard: {
      padding: responsive.spacing[5],
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    netWorthLabel: {
      fontSize: responsive.fontSize.md,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    netWorthValue: {
      fontSize: responsive.fontSize.h2,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    netWorthChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
    },
    changeText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '500',
      color: colors.functionalSuccess,
    },
    section: {
      marginBottom: responsive.spacing[6],
    },
    sectionHeader: {
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
    viewAllText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
    },
    accountsList: {
      gap: responsive.spacing[3],
    },
    accountCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      minHeight: ms(80),
      padding: responsive.spacing[4],
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      gap: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    accountLeft: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: responsive.spacing[3],
      flex: 1,
      minWidth: 0,
    },
    accountLogo: {
      width: ms(48),
      height: ms(48),
      borderRadius: theme.borderRadius.md,
      flexShrink: 0,
    },
    accountInfo: {
      gap: responsive.spacing[1],
      flex: 1,
      minWidth: 0,
    },
    accountName: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
      flexWrap: 'wrap',
    },
    bankNameText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
      flexWrap: 'wrap',
    },
    accountUpdate: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
      flexWrap: 'wrap',
    },
    accountRight: {
      alignItems: 'flex-end',
      gap: responsive.spacing[1],
      minWidth: ms(100),
      flexShrink: 0,
    },
    balanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
    accountBalance: {
      fontSize: responsive.fontSize.md,
      fontWeight: '500',
      color: colors.neutralDarkest,
    },
    negativeBalance: {
      color: colors.functionalError,
    },
    dueDot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(5),
      backgroundColor: colors.functionalError,
    },
    changePositive: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.functionalSuccess,
    },
    chartCard: {
      marginTop: responsive.spacing[3],
      padding: responsive.spacing[4],
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.sm,
    },
    chartTitle: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[3],
    },
    chartContainer: {
      flexDirection: 'row',
      gap: responsive.spacing[4],
    },
    pieChart: {
      width: ms(96),
      height: ms(96),
    },
    legend: {
      flex: 1,
      gap: responsive.spacing[2],
      justifyContent: 'center',
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
    legendText: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.neutralWhite,
      borderTopLeftRadius: theme.borderRadius.xl * 2,
      borderTopRightRadius: theme.borderRadius.xl * 2,
      paddingBottom: responsive.spacing[6],
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[5],
      paddingVertical: responsive.spacing[4],
      borderBottomWidth: 1,
      borderBottomColor: `${colors.neutralMedium}20`,
    },
    modalTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    closeButton: {
      width: ms(40),
      height: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: ms(20),
    },
    modalOptions: {
      padding: responsive.spacing[5],
      gap: responsive.spacing[3],
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: responsive.spacing[4],
      backgroundColor: colors.neutralBg,
      borderRadius: theme.borderRadius.xl,
      gap: responsive.spacing[3],
    },
    optionIcon: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    optionText: {
      flex: 1,
      gap: responsive.spacing[1],
    },
    optionTitle: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    optionDescription: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accounts & Insights</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="settings-outline" size={24} color={colors.neutralDarkest} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Net Worth Summary */}
          <View style={styles.netWorthCard}>
            <Text style={styles.netWorthLabel}>Total Net Worth</Text>
            <Text style={styles.netWorthValue}>$125,430.50</Text>
            <View style={styles.netWorthChange}>
              <Ionicons name="arrow-up" size={18} color={colors.functionalSuccess} />
              <Text style={styles.changeText}>+$500 this month</Text>
            </View>
          </View>

          {/* Bank Accounts */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Bank Accounts</Text>
              <TouchableOpacity onPress={handleNavigateToConnectedAccounts}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accountsList}>
              {bankAccounts.map((account) => renderAccountCard(account, true))}
            </View>
          </View>

          {/* Investments */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Investments</Text>
            </View>
            <View style={styles.accountsList}>
              {investments.map((account) => renderAccountCard(account, false))}
            </View>

            {/* Asset Allocation Chart */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Asset Allocation</Text>
              <View style={styles.chartContainer}>
                <View style={styles.pieChart}>
                  <Svg width={ms(96)} height={ms(96)} viewBox="0 0 36 36">
                    <Circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke="#DBEAFE"
                      strokeWidth="3"
                      fill="none"
                    />
                    <Circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke={colors.primary}
                      strokeWidth="3"
                      strokeDasharray="70, 100"
                      strokeDashoffset="25"
                      fill="none"
                      rotation="-90"
                      origin="18, 18"
                    />
                    <Circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke={colors.functionalSuccess}
                      strokeWidth="3"
                      strokeDasharray="20, 100"
                      strokeDashoffset="-45"
                      fill="none"
                      rotation="-90"
                      origin="18, 18"
                    />
                  </Svg>
                </View>
                <View style={styles.legend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                    <Text style={styles.legendText}>Australian Stocks: 70%</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.functionalSuccess }]} />
                    <Text style={styles.legendText}>International Stocks: 20%</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#DBEAFE' }]} />
                    <Text style={styles.legendText}>Bonds: 10%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Credit Cards */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Credit Cards</Text>
            </View>
            <View style={styles.accountsList}>
              {creditCards.map((account) => renderAccountCard(account, false))}
            </View>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: responsive.spacing[20] }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <BottomButton
        text="Add Account"
        onPress={() => setShowAddModal(true)}
      />

      {/* Add Account Type Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowAddModal(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Account</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddModal(false)}
              >
                <Ionicons name="close" size={24} color={colors.neutralDark} />
              </TouchableOpacity>
            </View>

            {/* Modal Options */}
            <View style={styles.modalOptions}>
              {accountTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionCard}
                  activeOpacity={0.7}
                  onPress={() => handleAddAccountType(option.id)}
                >
                  <View style={[styles.optionIcon, { backgroundColor: option.iconBg }]}>
                    <Ionicons
                      name={option.icon}
                      size={24}
                      color={option.iconColor}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.neutralMedium}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
};

export default AccountsInsightsScreen;
