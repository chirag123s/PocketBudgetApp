import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type TransactionType = 'expense' | 'income';

export default function AddManualTransaction() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [account, setAccount] = useState('CBA Smart Access');
  const [date, setDate] = useState('Oct 25, 2025');
  const [notes, setNotes] = useState('');

  const colors = {
    neutralBg: theme.colors.background.secondary,
    cardBg: theme.colors.background.primary,
    primaryText: theme.colors.text.primary,
    secondaryText: theme.colors.text.secondary,
    tertiaryText: theme.colors.text.tertiary,
    borderColor: theme.colors.border.light,
    inputBg: theme.colors.background.tertiary,
    dangerLight: theme.colors.danger.light,
    dangerMain: theme.colors.danger.main,
    successLight: theme.colors.success.light,
    successMain: theme.colors.success.main,
    inputSecondaryBg: theme.colors.background.secondary,
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.cardBg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },
    backButton: {
      padding: responsive.spacing[2],
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
    },
    placeholder: {
      width: 40,
    },
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: 20,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    label: {
      ...theme.typography.styles.body,
      color: colors.secondaryText,
      marginBottom: responsive.spacing[4],
    },
    typeButtons: {
      flexDirection: 'row',
      gap: responsive.spacing[4],
    },
    typeButton: {
      flex: 1,
      backgroundColor: colors.inputBg,
      paddingVertical: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[4],
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    typeButtonExpenseActive: {
      backgroundColor: colors.dangerLight,
      borderColor: colors.dangerMain,
    },
    typeButtonIncomeActive: {
      backgroundColor: colors.successLight,
      borderColor: colors.successMain,
    },
    typeButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: responsive.spacing[2],
    },
    radioCircle: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: colors.tertiaryText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioCircleExpenseActive: {
      borderColor: colors.dangerMain,
    },
    radioCircleIncomeActive: {
      borderColor: colors.successMain,
    },
    radioCircleInnerExpense: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.dangerMain,
    },
    radioCircleInnerIncome: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.successMain,
    },
    typeButtonText: {
      ...theme.typography.styles.button,
      color: colors.secondaryText,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    typeButtonTextExpenseActive: {
      color: colors.dangerMain,
    },
    typeButtonTextIncomeActive: {
      color: colors.successMain,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencySymbol: {
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
      fontWeight: '600',
      color: colors.primaryText,
      marginRight: responsive.spacing[2],
    },
    amountInput: {
      flex: 1,
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
      fontWeight: '600',
      color: colors.primaryText,
    },
    input: {
      ...theme.typography.styles.body,
      color: colors.primaryText,
      minHeight: 40,
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.inputSecondaryBg,
      padding: responsive.spacing[2],
      borderRadius: 20,
    },
    selectorContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    selectorColumn: {
      gap: responsive.spacing[1],
    },
    selectorIcon: {
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
    },
    selectorText: {
      ...theme.typography.styles.body,
      fontWeight: '500',
    },
    selectorSubtext: {
      ...theme.typography.styles.caption,
      color: colors.secondaryText,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.neutralBg}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Transaction Type */}
        <View style={styles.card}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'expense' && styles.typeButtonExpenseActive,
              ]}
              onPress={() => setTransactionType('expense')}
            >
              <View style={styles.typeButtonContent}>
                <View
                  style={[
                    styles.radioCircle,
                    transactionType === 'expense' && styles.radioCircleExpenseActive,
                  ]}
                >
                  {transactionType === 'expense' && (
                    <View style={styles.radioCircleInnerExpense} />
                  )}
                </View>
                <Text
                  style={[
                    styles.typeButtonText,
                    transactionType === 'expense' && styles.typeButtonTextExpenseActive,
                  ]}
                >
                  Expense
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'income' && styles.typeButtonIncomeActive,
              ]}
              onPress={() => setTransactionType('income')}
            >
              <View style={styles.typeButtonContent}>
                <View
                  style={[
                    styles.radioCircle,
                    transactionType === 'income' && styles.radioCircleIncomeActive,
                  ]}
                >
                  {transactionType === 'income' && (
                    <View style={styles.radioCircleInnerIncome} />
                  )}
                </View>
                <Text
                  style={[
                    styles.typeButtonText,
                    transactionType === 'income' && styles.typeButtonTextIncomeActive,
                  ]}
                >
                  Income
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.card}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.tertiaryText}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Merchant/Description */}
        <View style={styles.card}>
          <Text style={styles.label}>Merchant/Description</Text>
          <TextInput
            style={styles.input}
            value={merchant}
            onChangeText={setMerchant}
            placeholder="e.g., Coles Supermarket"
            placeholderTextColor={colors.tertiaryText}
          />
        </View>

        {/* Category */}
        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.selector}>
            <View style={styles.selectorContent}>
              <Text style={styles.selectorIcon}>🛒</Text>
              <Text style={styles.selectorText}>{category}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={colors.tertiaryText} />
          </TouchableOpacity>
        </View>

        {/* Account */}
        <View style={styles.card}>
          <Text style={styles.label}>Account</Text>
          <TouchableOpacity style={styles.selector}>
            <View style={styles.selectorColumn}>
              <Text style={styles.selectorText}>{account}</Text>
              <Text style={styles.selectorSubtext}>**** 1234</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={colors.tertiaryText} />
          </TouchableOpacity>
        </View>

        {/* Date */}
        <View style={styles.card}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.selector}>
            <View style={styles.selectorContent}>
              <Text style={styles.selectorIcon}>📅</Text>
              <Text style={styles.selectorText}>{date}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={colors.tertiaryText} />
          </TouchableOpacity>
        </View>

        {/* Notes (Optional) */}
        <View style={styles.card}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note..."
            placeholderTextColor={colors.tertiaryText}
            multiline
          />
        </View>

        {/* Add Transaction Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => {
            // Handle add transaction
            router.back();
          }}
        >
          Add Transaction
        </Button>
      </ScrollView>
    </Screen>
  );
}