import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  selected: boolean;
}

const sampleTransactions: Transaction[] = [
  {
    id: 1,
    name: 'Coles',
    category: 'Groceries',
    amount: -45.3,
    date: 'Today',
    selected: true,
  },
  {
    id: 2,
    name: 'Shell',
    category: 'Transport',
    amount: -67.0,
    date: 'Today',
    selected: true,
  },
  {
    id: 3,
    name: 'Woolworths',
    category: 'Groceries',
    amount: -89.2,
    date: 'Yesterday',
    selected: false,
  },
  {
    id: 4,
    name: 'Netflix',
    category: 'Entertainment',
    amount: -16.99,
    date: 'Yesterday',
    selected: true,
  },
  {
    id: 5,
    name: 'Uber',
    category: 'Transport',
    amount: -24.5,
    date: 'Yesterday',
    selected: true,
  },
  {
    id: 6,
    name: 'Menulog',
    category: 'Dining Out',
    amount: -38.0,
    date: 'Yesterday',
    selected: true,
  },
  {
    id: 7,
    name: 'Chemist Warehouse',
    category: 'Healthcare',
    amount: -45.8,
    date: 'Oct 23',
    selected: false,
  },
];

export default function BulkActions() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);

  const selectedCount = transactions.filter((t) => t.selected).length;

  const toggleSelection = (id: number) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  const handleDone = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  const colors = {
    neutralBg: theme.colors.background.secondary,
    cardBg: theme.colors.background.primary,
    primaryText: theme.colors.text.primary,
    secondaryText: theme.colors.text.secondary,
    borderColor: theme.colors.border.light,
    borderMain: theme.colors.border.main,
    inputBg: theme.colors.background.tertiary,
    dangerMain: theme.colors.danger.main,
    primaryColor: theme.colors.primary[600],
    primary50: theme.colors.primary[50],
    dangerLight: '#FEF2F2',
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.primaryColor,
    },
    headerButton: {
      padding: responsive.spacing[2],
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    doneText: {
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    content: {
      padding: responsive.spacing[4],
      paddingBottom: 180,
    },
    dateGroup: {
      marginBottom: responsive.spacing[4],
    },
    dateHeader: {
      ...theme.typography.styles.bodySmall,
      fontWeight: '700',
      color: colors.secondaryText,
      marginBottom: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[2],
    },
    transactionCard: {
      backgroundColor: colors.cardBg,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
      borderWidth: 2,
      borderColor: 'transparent',
      ...theme.shadows.sm,
    },
    transactionCardSelected: {
      backgroundColor: colors.primary50,
      borderColor: colors.primaryColor,
    },
    transactionContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.borderMain,
      backgroundColor: colors.cardBg,
      marginRight: responsive.spacing[4],
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxSelected: {
      backgroundColor: colors.primaryColor,
      borderColor: colors.primaryColor,
    },
    transactionInfo: {
      flex: 1,
    },
    transactionName: {
      ...theme.typography.styles.body,
      fontWeight: '700',
      marginBottom: 4,
    },
    transactionCategory: {
      ...theme.typography.styles.bodySmall,
      color: colors.secondaryText,
    },
    transactionAmount: {
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
      fontWeight: '700',
      color: colors.dangerMain,
    },
    actionBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.cardBg,
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
      padding: responsive.spacing[6],
      gap: responsive.spacing[2],
    },
    actionRow: {
      flexDirection: 'row',
      gap: responsive.spacing[2],
    },
    actionButtonPrimary: {
      flex: 1,
      paddingVertical: responsive.spacing[4],
      backgroundColor: colors.primaryColor,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      ...theme.shadows.lg,
    },
    actionButtonPrimaryText: {
      ...theme.typography.styles.button,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    actionButtonSecondary: {
      flex: 1,
      paddingVertical: responsive.spacing[4],
      backgroundColor: colors.inputBg,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
    },
    actionButtonSecondaryText: {
      ...theme.typography.styles.button,
      fontWeight: '700',
      color: colors.secondaryText,
    },
    actionButtonDanger: {
      flex: 1,
      paddingVertical: responsive.spacing[4],
      backgroundColor: colors.dangerLight,
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
    },
    actionButtonDangerText: {
      ...theme.typography.styles.button,
      fontWeight: '700',
      color: colors.dangerMain,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.neutralBg}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
      {/* Header - Multi-Select Mode */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedCount} selected</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <ScrollView contentContainerStyle={styles.content}>
        {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{date}</Text>

            {dateTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={[
                  styles.transactionCard,
                  transaction.selected && styles.transactionCardSelected,
                ]}
                onPress={() => toggleSelection(transaction.id)}
                activeOpacity={0.7}
              >
                <View style={styles.transactionContent}>
                  <View
                    style={[
                      styles.checkbox,
                      transaction.selected && styles.checkboxSelected,
                    ]}
                  >
                    {transaction.selected && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>{transaction.name}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>

                  <Text style={styles.transactionAmount}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Action Buttons - Fixed at Bottom */}
      <View style={styles.actionBar}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButtonPrimary}>
            <Text style={styles.actionButtonPrimaryText}>Categorize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Export</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Mark as...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonDanger}>
            <Text style={styles.actionButtonDangerText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
