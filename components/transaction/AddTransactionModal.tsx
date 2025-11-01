import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { BottomSheetModal } from '@/components/ui/BottomSheetModal';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type TransactionType = 'expense' | 'income' | 'transfer';

interface Category {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface Account {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (transaction: {
    type: TransactionType;
    amount: number;
    merchant: string;
    category: string;
    categoryIcon: string;
    date: Date;
    accountId: string;
    notes?: string;
  }) => void;
}

export function AddTransactionModal({ visible, onClose, onSave }: AddTransactionModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  // Form state
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('groceries');
  const [selectedAccount, setSelectedAccount] = useState('1');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    success: theme.colors.success.main,
    danger: theme.colors.danger.main,
    info: theme.colors.info.main,
    border: theme.colors.border.light,
  };

  // Categories by type
  const expenseCategories: Category[] = [
    { id: 'groceries', label: 'Groceries', icon: 'cart-outline' },
    { id: 'dining', label: 'Dining Out', icon: 'restaurant-outline' },
    { id: 'transport', label: 'Transport', icon: 'car-outline' },
    { id: 'utilities', label: 'Utilities', icon: 'bulb-outline' },
    { id: 'entertainment', label: 'Entertainment', icon: 'film-outline' },
    { id: 'shopping', label: 'Shopping', icon: 'bag-outline' },
    { id: 'health', label: 'Health & Fitness', icon: 'fitness-outline' },
    { id: 'bills', label: 'Bills', icon: 'receipt-outline' },
  ];

  const incomeCategories: Category[] = [
    { id: 'salary', label: 'Salary', icon: 'briefcase-outline' },
    { id: 'freelance', label: 'Freelance', icon: 'laptop-outline' },
    { id: 'investment', label: 'Investment', icon: 'trending-up-outline' },
    { id: 'gift', label: 'Gift', icon: 'gift-outline' },
    { id: 'refund', label: 'Refund', icon: 'return-up-back-outline' },
    { id: 'other-income', label: 'Other', icon: 'cash-outline' },
  ];

  const transferCategories: Category[] = [
    { id: 'transfer', label: 'Transfer', icon: 'swap-horizontal-outline' },
    { id: 'savings', label: 'Savings', icon: 'wallet-outline' },
  ];

  // Sample accounts
  const accounts: Account[] = [
    { id: '1', name: 'Commonwealth Everyday', icon: 'card-outline' },
    { id: '2', name: 'ANZ Savings', icon: 'wallet-outline' },
    { id: '3', name: 'Westpac Credit', icon: 'card-outline' },
  ];

  const getCurrentCategories = () => {
    switch (transactionType) {
      case 'income':
        return incomeCategories;
      case 'transfer':
        return transferCategories;
      default:
        return expenseCategories;
    }
  };

  const getTypeColor = (type: TransactionType) => {
    switch (type) {
      case 'income':
        return colors.success;
      case 'transfer':
        return colors.info;
      default:
        return colors.danger;
    }
  };

  const handleSave = () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!merchant.trim()) {
      Alert.alert('Error', 'Please enter a merchant or description');
      return;
    }

    const selectedCat = getCurrentCategories().find(c => c.id === selectedCategory);
    if (!selectedCat) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    // Call onSave callback if provided
    if (onSave) {
      onSave({
        type: transactionType,
        amount: parseFloat(amount),
        merchant,
        category: selectedCat.label,
        categoryIcon: selectedCat.icon,
        date,
        accountId: selectedAccount,
        notes: notes.trim() || undefined,
      });
    }

    // Reset form
    resetForm();

    // Close modal
    onClose();
  };

  const resetForm = () => {
    setTransactionType('expense');
    setAmount('');
    setMerchant('');
    setSelectedCategory('groceries');
    setSelectedAccount('1');
    setDate(new Date());
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatCurrencyInput = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  };

  const handleAmountChange = (value: string) => {
    setAmount(formatCurrencyInput(value));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Reset category when type changes
  const handleTypeChange = (type: TransactionType) => {
    setTransactionType(type);
    // Reset to first category of new type
    const newCategories = type === 'income' ? incomeCategories :
                          type === 'transfer' ? transferCategories : expenseCategories;
    setSelectedCategory(newCategories[0].id);
  };

  return (
    <BottomSheetModal
      visible={visible}
      onClose={handleClose}
      title="Add Transaction"
      maxHeight="90%"
      footer={
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => ({
            height: ms(48),
            borderRadius: theme.borderRadius.lg,
            backgroundColor: getTypeColor(transactionType),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
            ...theme.shadows.md,
          })}
        >
          <Text
            style={{
              fontSize: responsive.fontSize.md,
              fontWeight: '700',
              color: colors.neutralWhite,
              letterSpacing: 0.2,
            }}
          >
            Add Transaction
          </Text>
        </Pressable>
      }
    >
      {/* Transaction Type Selector */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Transaction Type
        </Text>
        <View style={{ flexDirection: 'row', gap: responsive.spacing[2] }}>
          <Pressable
            onPress={() => handleTypeChange('expense')}
            style={({ pressed }) => ({
              flex: 1,
              height: ms(48),
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              borderColor: transactionType === 'expense' ? colors.danger : colors.border,
              backgroundColor: transactionType === 'expense' ? `${colors.danger}10` : colors.neutralWhite,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.sm,
                fontWeight: '600',
                color: transactionType === 'expense' ? colors.danger : colors.neutralDark,
              }}
            >
              Expense
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTypeChange('income')}
            style={({ pressed }) => ({
              flex: 1,
              height: ms(48),
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              borderColor: transactionType === 'income' ? colors.success : colors.border,
              backgroundColor: transactionType === 'income' ? `${colors.success}10` : colors.neutralWhite,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.sm,
                fontWeight: '600',
                color: transactionType === 'income' ? colors.success : colors.neutralDark,
              }}
            >
              Income
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleTypeChange('transfer')}
            style={({ pressed }) => ({
              flex: 1,
              height: ms(48),
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              borderColor: transactionType === 'transfer' ? colors.info : colors.border,
              backgroundColor: transactionType === 'transfer' ? `${colors.info}10` : colors.neutralWhite,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.sm,
                fontWeight: '600',
                color: transactionType === 'transfer' ? colors.info : colors.neutralDark,
              }}
            >
              Transfer
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Amount */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Amount *
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.neutralWhite,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: responsive.spacing[4],
            height: ms(56),
          }}
        >
          <Text
            style={{
              fontSize: responsive.fontSize.xl,
              fontWeight: '700',
              color: getTypeColor(transactionType),
              marginRight: responsive.spacing[2],
            }}
          >
            $
          </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: responsive.fontSize.xl,
              fontWeight: '700',
              color: colors.neutralDarkest,
              padding: 0,
            }}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            autoFocus
          />
        </View>
      </View>

      {/* Merchant/Description */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          {transactionType === 'income' ? 'Source' : 'Merchant'} *
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.neutralWhite,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: responsive.spacing[4],
            height: ms(48),
            fontSize: responsive.fontSize.md,
            color: colors.neutralDarkest,
          }}
          placeholder={
            transactionType === 'income'
              ? 'e.g., Salary, Freelance Client'
              : 'e.g., Woolworths, Bills Beans Cafe'
          }
          placeholderTextColor={colors.neutralMedium}
          value={merchant}
          onChangeText={setMerchant}
        />
      </View>

      {/* Category */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[3],
          }}
        >
          Category
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: responsive.spacing[2],
          }}
        >
          {getCurrentCategories().map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: responsive.spacing[2],
                paddingHorizontal: responsive.spacing[3],
                borderRadius: theme.borderRadius.full,
                borderWidth: 2,
                borderColor: selectedCategory === category.id ? getTypeColor(transactionType) : colors.border,
                backgroundColor: selectedCategory === category.id
                  ? `${getTypeColor(transactionType)}10`
                  : colors.neutralWhite,
                gap: responsive.spacing[1.5],
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Ionicons
                name={category.icon}
                size={ms(18)}
                color={selectedCategory === category.id ? getTypeColor(transactionType) : colors.neutralDark}
              />
              <Text
                style={{
                  fontSize: responsive.fontSize.sm,
                  fontWeight: '600',
                  color: selectedCategory === category.id ? getTypeColor(transactionType) : colors.neutralDark,
                }}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Account */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Account
        </Text>
        <View style={{ gap: responsive.spacing[2] }}>
          {accounts.map((account) => (
            <Pressable
              key={account.id}
              onPress={() => setSelectedAccount(account.id)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                padding: responsive.spacing[3],
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: selectedAccount === account.id ? colors.primary : colors.border,
                backgroundColor: selectedAccount === account.id
                  ? `${colors.primary}10`
                  : colors.neutralWhite,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                style={{
                  width: ms(40),
                  height: ms(40),
                  borderRadius: ms(20),
                  backgroundColor: selectedAccount === account.id
                    ? `${colors.primary}20`
                    : colors.neutralBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: responsive.spacing[3],
                }}
              >
                <Ionicons
                  name={account.icon}
                  size={ms(20)}
                  color={selectedAccount === account.id ? colors.primary : colors.neutralDark}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: responsive.fontSize.md,
                  fontWeight: '600',
                  color: selectedAccount === account.id ? colors.primary : colors.neutralDarkest,
                }}
              >
                {account.name}
              </Text>
              {selectedAccount === account.id && (
                <Ionicons name="checkmark-circle" size={ms(24)} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Date */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Date
        </Text>
        <Pressable
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.neutralWhite,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: responsive.spacing[4],
            height: ms(48),
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Ionicons name="calendar-outline" size={ms(20)} color={colors.neutralDark} />
          <Text
            style={{
              flex: 1,
              fontSize: responsive.fontSize.md,
              color: colors.neutralDarkest,
              marginLeft: responsive.spacing[3],
            }}
          >
            {formatDate(date)}
          </Text>
          <Ionicons name="chevron-down" size={ms(20)} color={colors.neutralMedium} />
        </Pressable>
      </View>

      {/* Notes (Optional) */}
      <View style={{ marginBottom: responsive.spacing[2] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Notes (Optional)
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.neutralWhite,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: responsive.spacing[4],
            paddingVertical: responsive.spacing[3],
            fontSize: responsive.fontSize.md,
            color: colors.neutralDarkest,
            minHeight: ms(80),
            textAlignVertical: 'top',
          }}
          placeholder="Add notes or details..."
          placeholderTextColor={colors.neutralMedium}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />
      </View>
    </BottomSheetModal>
  );
}
