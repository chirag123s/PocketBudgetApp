import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface Account {
  id: number;
  name: string;
  number: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit';
  selected: boolean;
}

const accountsData: Account[] = [
  { id: 1, name: 'Smart Access', number: '1234', balance: 2450.30, type: 'checking', selected: true },
  { id: 2, name: 'Complete Freedom', number: '5678', balance: 856.12, type: 'checking', selected: true },
  { id: 3, name: 'Goal Saver', number: '9012', balance: 15200.00, type: 'savings', selected: false },
  { id: 4, name: 'Credit Card', number: '3456', balance: -1240.50, type: 'credit', selected: false },
];

export default function AccountSelection() {
  const router = useRouter();
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>(
    accountsData.filter(a => a.selected).map(a => a.id)
  );

  const toggleAccount = (id: number) => {
    setSelectedAccounts(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedAccounts.length === accountsData.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(accountsData.map(a => a.id));
    }
  };

  const renderAccountItem = ({ item }: { item: Account }) => {
    const isSelected = selectedAccounts.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.accountItem}
        onPress={() => toggleAccount(item.id)}
      >
        <View style={styles.accountContent}>
          <View
            style={[
              styles.checkbox,
              isSelected && styles.checkboxChecked,
            ]}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>{item.name}</Text>
            <Text style={styles.accountNumber}>**** {item.number}</Text>
            <Text
              style={[
                styles.accountBalance,
                item.balance >= 0 ? styles.balancePositive : styles.balanceNegative,
              ]}
            >
              Balance: ${Math.abs(item.balance).toLocaleString('en-AU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerTitle}>Select Accounts</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Found Accounts Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            We found <Text style={styles.messageBold}>{accountsData.length} accounts</Text> at Commonwealth Bank
          </Text>
        </View>

        {/* Accounts List */}
        <FlatList
          data={accountsData}
          renderItem={renderAccountItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <TouchableOpacity onPress={toggleAll}>
                <Text style={styles.toggleAllText}>
                  {selectedAccounts.length === accountsData.length ? 'Deselect All' : 'Select All'}
                </Text>
              </TouchableOpacity>

              {/* Note */}
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                  <Text style={styles.noteBold}>Note:</Text> You can change this anytime in Settings
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Footer Button */}
      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          fullWidth
          size="large"
          disabled={selectedAccounts.length === 0}
          onPress={() => router.push('/bank/sync-settings')}
        >
          Continue ({selectedAccounts.length} selected)
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: responsive.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
  },
  content: {
    flex: 1,
  },
  messageContainer: {
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[4],
    alignItems: 'center',
  },
  messageText: {
    ...theme.typography.styles.body,
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  messageBold: {
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  listContent: {
    paddingHorizontal: responsive.spacing[6],
    paddingBottom: responsive.spacing[4],
  },
  accountItem: {
    backgroundColor: theme.colors.background.primary,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[2],
    borderRadius: 20,
    ...theme.shadows.sm,
  },
  accountContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsive.spacing[2],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary[600],
    borderColor: theme.colors.primary[600],
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    ...theme.typography.styles.body,
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
    marginBottom: responsive.spacing[1],
  },
  accountNumber: {
    ...theme.typography.styles.bodySmall,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[1],
  },
  accountBalance: {
    ...theme.typography.styles.bodySmall,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    fontWeight: '500',
  },
  balancePositive: {
    color: theme.colors.success.main,
  },
  balanceNegative: {
    color: theme.colors.danger.main,
  },
  footer: {
    marginTop: responsive.spacing[2],
  },
  toggleAllText: {
    ...theme.typography.styles.button,
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    color: theme.colors.primary[600],
    marginBottom: responsive.spacing[4],
  },
  noteContainer: {
    backgroundColor: theme.colors.info.light,
    padding: responsive.spacing[4],
    borderRadius: 20,
  },
  noteText: {
    ...theme.typography.styles.bodySmall,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    color: theme.colors.info.dark,
  },
  noteBold: {
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    padding: responsive.spacing[6],
  },
});
