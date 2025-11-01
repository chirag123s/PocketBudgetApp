import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { TabSelector } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { AddAccountModal, AddBillModal } from '@/components/money';
import { AddTransactionModal } from '@/components/transaction';
import AccountsScreen from '@/app/money/_accounts';
import TransactionsScreen from '@/app/money/_transactions';
import BillsScreen from '@/app/money/_bills';

type MoneyTab = 'accounts' | 'transactions' | 'bills';

export default function MoneyTab() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [selectedTab, setSelectedTab] = useState<MoneyTab>('accounts');
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showAddBillModal, setShowAddBillModal] = useState(false);

  // Handlers for add actions
  const handleAddAccount = () => {
    setShowAddAccountModal(true);
  };

  const handleAddTransaction = () => {
    setShowAddTransactionModal(true);
  };

  const handleAddBill = () => {
    setShowAddBillModal(true);
  };

  const handleAccountAdded = (accountData: any) => {
    console.log('Account added:', accountData);
    // TODO: Save account to state/backend
  };

  const handleTransactionAdded = (transaction: {
    type: string;
    amount: number;
    merchant: string;
    category: string;
    categoryIcon: string;
    date: Date;
    accountId: string;
    notes?: string;
  }) => {
    console.log('Transaction added:', transaction);
    // TODO: Save transaction to state/backend
    Alert.alert('Success', `${transaction.type === 'income' ? 'Income' : 'Transaction'} of $${transaction.amount} added successfully!`);
  };

  const handleBillAdded = (bill: {
    name: string;
    amount: number;
    isRecurring: boolean;
    frequency?: string;
    dueDate: Date;
    category: string;
    categoryIcon: string;
    accountId: string;
    notes?: string;
    reminderEnabled: boolean;
  }) => {
    console.log('Bill added:', bill);
    // TODO: Save bill to state/backend
    const billType = bill.isRecurring ? `Recurring ${bill.frequency} bill` : 'One-time bill';
    Alert.alert('Success', `${billType} "${bill.name}" for $${bill.amount} added successfully!`);
  };

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    primary: theme.colors.primary[500],
  };

  const renderScreen = () => {
    switch (selectedTab) {
      case 'accounts':
        return <AccountsScreen />;
      case 'transactions':
        return <TransactionsScreen />;
      case 'bills':
        return <BillsScreen />;
      default:
        return <AccountsScreen />;
    }
  };

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    tabContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    fab: {
      position: 'absolute',
      bottom: responsive.spacing[6],
      right: responsive.spacing[6],
      width: ms(56),
      height: ms(56),
      borderRadius: ms(28),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.primary,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Money</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TabSelector
          options={[
            { id: 'accounts', label: 'Accounts' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'bills', label: 'Bills' },
          ]}
          selectedId={selectedTab}
          onSelect={(id) => setSelectedTab(id as MoneyTab)}
        />
      </View>

      {/* Render Selected Screen */}
      {renderScreen()}

      {/* Context-Aware FAB */}
      {selectedTab === 'accounts' && (
        <TouchableOpacity style={styles.fab} onPress={handleAddAccount} activeOpacity={0.8}>
          <Ionicons name="add" size={ms(28)} color="#ffffff" />
        </TouchableOpacity>
      )}
      {selectedTab === 'transactions' && (
        <TouchableOpacity style={styles.fab} onPress={handleAddTransaction} activeOpacity={0.8}>
          <Ionicons name="add" size={ms(28)} color="#ffffff" />
        </TouchableOpacity>
      )}
      {selectedTab === 'bills' && (
        <TouchableOpacity style={styles.fab} onPress={handleAddBill} activeOpacity={0.8}>
          <Ionicons name="add" size={ms(28)} color="#ffffff" />
        </TouchableOpacity>
      )}

      {/* Add Account Modal */}
      <AddAccountModal
        visible={showAddAccountModal}
        onClose={() => setShowAddAccountModal(false)}
        onAddAccount={handleAccountAdded}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        visible={showAddTransactionModal}
        onClose={() => setShowAddTransactionModal(false)}
        onSave={handleTransactionAdded}
      />

      {/* Add Bill Modal */}
      <AddBillModal
        visible={showAddBillModal}
        onClose={() => setShowAddBillModal(false)}
        onSave={handleBillAdded}
      />
    </Screen>
  );
}
