import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { BottomSheetModal } from '@/components/ui/BottomSheetModal';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type BillFrequency = 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly';

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

interface AddBillModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (bill: {
    name: string;
    amount: number;
    isRecurring: boolean;
    frequency?: BillFrequency;
    dueDate: Date;
    category: string;
    categoryIcon: string;
    accountId: string;
    notes?: string;
    reminderEnabled: boolean;
  }) => void;
}

export function AddBillModal({ visible, onClose, onSave }: AddBillModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  // Form state
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(true);
  const [frequency, setFrequency] = useState<BillFrequency>('monthly');
  const [selectedCategory, setSelectedCategory] = useState('utilities');
  const [selectedAccount, setSelectedAccount] = useState('1');
  const [dueDate, setDueDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    warning: theme.colors.warning.main,
    border: theme.colors.border.light,
  };

  // Bill categories
  const billCategories: Category[] = [
    { id: 'utilities', label: 'Utilities', icon: 'bulb-outline' },
    { id: 'internet', label: 'Internet', icon: 'wifi-outline' },
    { id: 'phone', label: 'Phone', icon: 'phone-portrait-outline' },
    { id: 'rent', label: 'Rent/Mortgage', icon: 'home-outline' },
    { id: 'insurance', label: 'Insurance', icon: 'shield-checkmark-outline' },
    { id: 'subscription', label: 'Subscription', icon: 'calendar-outline' },
    { id: 'car', label: 'Car/Rego', icon: 'car-outline' },
    { id: 'health', label: 'Health', icon: 'fitness-outline' },
    { id: 'loan', label: 'Loan', icon: 'card-outline' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal-outline' },
  ];

  // Frequency options
  const frequencies: { key: BillFrequency; label: string }[] = [
    { key: 'weekly', label: 'Weekly' },
    { key: 'fortnightly', label: 'Fortnightly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'quarterly', label: 'Quarterly' },
    { key: 'yearly', label: 'Yearly' },
  ];

  // Sample accounts
  const accounts: Account[] = [
    { id: '1', name: 'Commonwealth Everyday', icon: 'card-outline' },
    { id: '2', name: 'ANZ Savings', icon: 'wallet-outline' },
    { id: '3', name: 'Westpac Credit', icon: 'card-outline' },
  ];

  const handleSave = () => {
    // Validation
    if (!billName.trim()) {
      Alert.alert('Error', 'Please enter a bill name');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const selectedCat = billCategories.find(c => c.id === selectedCategory);
    if (!selectedCat) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    // Call onSave callback if provided
    if (onSave) {
      onSave({
        name: billName,
        amount: parseFloat(amount),
        isRecurring,
        frequency: isRecurring ? frequency : undefined,
        dueDate,
        category: selectedCat.label,
        categoryIcon: selectedCat.icon,
        accountId: selectedAccount,
        notes: notes.trim() || undefined,
        reminderEnabled,
      });
    }

    // Reset form
    resetForm();

    // Close modal
    onClose();
  };

  const resetForm = () => {
    setBillName('');
    setAmount('');
    setIsRecurring(true);
    setFrequency('monthly');
    setSelectedCategory('utilities');
    setSelectedAccount('1');
    setDueDate(new Date());
    setNotes('');
    setReminderEnabled(true);
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

  return (
    <BottomSheetModal
      visible={visible}
      onClose={handleClose}
      title="Add Bill"
      maxHeight="90%"
      footer={
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => ({
            height: ms(48),
            borderRadius: theme.borderRadius.lg,
            backgroundColor: colors.warning,
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
            Add Bill
          </Text>
        </Pressable>
      }
    >
      {/* Bill Type Toggle */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Bill Type
        </Text>
        <View style={{ flexDirection: 'row', gap: responsive.spacing[2] }}>
          <Pressable
            onPress={() => setIsRecurring(true)}
            style={({ pressed }) => ({
              flex: 1,
              height: ms(48),
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              borderColor: isRecurring ? colors.warning : colors.border,
              backgroundColor: isRecurring ? `${colors.warning}10` : colors.neutralWhite,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.sm,
                fontWeight: '600',
                color: isRecurring ? colors.warning : colors.neutralDark,
              }}
            >
              Recurring
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setIsRecurring(false)}
            style={({ pressed }) => ({
              flex: 1,
              height: ms(48),
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              borderColor: !isRecurring ? colors.warning : colors.border,
              backgroundColor: !isRecurring ? `${colors.warning}10` : colors.neutralWhite,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.sm,
                fontWeight: '600',
                color: !isRecurring ? colors.warning : colors.neutralDark,
              }}
            >
              One-Time
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Bill Name */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Bill Name *
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
          placeholder="e.g., Netflix, Electricity, Rent"
          placeholderTextColor={colors.neutralMedium}
          value={billName}
          onChangeText={setBillName}
          autoFocus
        />
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
            height: ms(48),
          }}
        >
          <Text
            style={{
              fontSize: responsive.fontSize.md,
              fontWeight: '600',
              color: colors.neutralDark,
              marginRight: responsive.spacing[1],
            }}
          >
            $
          </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: responsive.fontSize.md,
              color: colors.neutralDarkest,
              padding: 0,
            }}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      {/* Frequency (if recurring) */}
      {isRecurring && (
        <View style={{ marginBottom: responsive.spacing[4] }}>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[2],
            }}
          >
            Frequency
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: responsive.spacing[2],
            }}
          >
            {frequencies.map((freq) => (
              <Pressable
                key={freq.key}
                onPress={() => setFrequency(freq.key)}
                style={({ pressed }) => ({
                  paddingVertical: responsive.spacing[2],
                  paddingHorizontal: responsive.spacing[4],
                  borderRadius: theme.borderRadius.full,
                  borderWidth: 2,
                  borderColor: frequency === freq.key ? colors.warning : colors.border,
                  backgroundColor: frequency === freq.key
                    ? `${colors.warning}10`
                    : colors.neutralWhite,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: responsive.fontSize.sm,
                    fontWeight: '600',
                    color: frequency === freq.key ? colors.warning : colors.neutralDark,
                  }}
                >
                  {freq.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

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
          {billCategories.map((category) => (
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
                borderColor: selectedCategory === category.id ? colors.primary : colors.border,
                backgroundColor: selectedCategory === category.id
                  ? `${colors.primary}10`
                  : colors.neutralWhite,
                gap: responsive.spacing[1.5],
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Ionicons
                name={category.icon}
                size={ms(18)}
                color={selectedCategory === category.id ? colors.primary : colors.neutralDark}
              />
              <Text
                style={{
                  fontSize: responsive.fontSize.sm,
                  fontWeight: '600',
                  color: selectedCategory === category.id ? colors.primary : colors.neutralDark,
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
          Pay From
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

      {/* Due Date */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          {isRecurring ? 'Next Due Date' : 'Due Date'}
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
            {formatDate(dueDate)}
          </Text>
          <Ionicons name="chevron-down" size={ms(20)} color={colors.neutralMedium} />
        </Pressable>
      </View>

      {/* Reminder Toggle */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.neutralBg,
          borderRadius: theme.borderRadius.lg,
          padding: responsive.spacing[4],
          marginBottom: responsive.spacing[4],
        }}
      >
        <View style={{ flex: 1, marginRight: responsive.spacing[3] }}>
          <Text
            style={{
              fontSize: responsive.fontSize.md,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[1],
            }}
          >
            Reminder
          </Text>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              color: colors.neutralDark,
            }}
          >
            Get notified before bill is due
          </Text>
        </View>
        <Switch
          value={reminderEnabled}
          onValueChange={setReminderEnabled}
          trackColor={{ false: colors.border, true: `${colors.primary}40` }}
          thumbColor={reminderEnabled ? colors.primary : colors.neutralMedium}
        />
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
          placeholder="Add notes or account number..."
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
