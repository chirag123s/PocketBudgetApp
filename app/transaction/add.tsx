import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type TransactionType = 'expense' | 'income';

export default function AddManualTransaction() {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [account, setAccount] = useState('CBA Smart Access');
  const [date, setDate] = useState('Oct 25, 2025');
  const [notes, setNotes] = useState('');

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
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
              placeholderTextColor={theme.colors.text.tertiary}
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
            placeholderTextColor={theme.colors.text.tertiary}
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
            <Ionicons name="chevron-down" size={20} color={theme.colors.text.tertiary} />
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
            <Ionicons name="chevron-down" size={20} color={theme.colors.text.tertiary} />
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
            <Ionicons name="chevron-down" size={20} color={theme.colors.text.tertiary} />
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
            placeholderTextColor={theme.colors.text.tertiary}
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  label: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.md,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.md,
  },
  typeButton: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.md,
    borderRadius: theme.responsive.scale(20),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeButtonExpenseActive: {
    backgroundColor: theme.colors.danger.light,
    borderColor: theme.colors.danger.main,
  },
  typeButtonIncomeActive: {
    backgroundColor: theme.colors.success.light,
    borderColor: theme.colors.success.main,
  },
  typeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.responsive.spacing.sm,
  },
  radioCircle: {
    width: theme.responsive.scale(18),
    height: theme.responsive.scale(18),
    borderRadius: theme.responsive.scale(9),
    borderWidth: 2,
    borderColor: theme.colors.text.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleExpenseActive: {
    borderColor: theme.colors.danger.main,
  },
  radioCircleIncomeActive: {
    borderColor: theme.colors.success.main,
  },
  radioCircleInnerExpense: {
    width: theme.responsive.scale(10),
    height: theme.responsive.scale(10),
    borderRadius: theme.responsive.scale(5),
    backgroundColor: theme.colors.danger.main,
  },
  radioCircleInnerIncome: {
    width: theme.responsive.scale(10),
    height: theme.responsive.scale(10),
    borderRadius: theme.responsive.scale(5),
    backgroundColor: theme.colors.success.main,
  },
  typeButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  typeButtonTextExpenseActive: {
    color: theme.colors.danger.main,
  },
  typeButtonTextIncomeActive: {
    color: theme.colors.success.main,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: theme.responsive.fontSize.h3,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: theme.responsive.spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: theme.responsive.fontSize.h3,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  input: {
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
    minHeight: 40,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.responsive.spacing.sm,
    borderRadius: theme.responsive.scale(20),
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  selectorColumn: {
    gap: theme.responsive.spacing.xs,
  },
  selectorIcon: {
    fontSize: theme.responsive.fontSize.h4,
  },
  selectorText: {
    ...theme.typography.styles.body,
    fontWeight: '500',
  },
  selectorSubtext: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
  },
});
