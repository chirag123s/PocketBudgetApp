import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Split {
  id: number;
  category: string;
  icon: string;
  amount: string;
}

export default function SplitTransaction() {
  const router = useRouter();
  const [splits, setSplits] = useState<Split[]>([
    { id: 1, category: 'Groceries', icon: '🛒', amount: '30.00' },
    { id: 2, category: 'Household Items', icon: '🏠', amount: '15.30' },
  ]);

  const totalTarget = 45.30;
  const currentTotal = splits.reduce((sum, split) => sum + parseFloat(split.amount || '0'), 0);
  const remaining = totalTarget - currentTotal;

  const addSplit = () => {
    if (splits.length < 5) {
      setSplits([...splits, {
        id: splits.length + 1,
        category: 'Select Category',
        icon: '📦',
        amount: '',
      }]);
    }
  };

  const removeSplit = (id: number) => {
    if (splits.length > 2) {
      setSplits(splits.filter(split => split.id !== id));
    }
  };

  const updateSplitAmount = (id: number, amount: string) => {
    setSplits(splits.map(split =>
      split.id === id ? { ...split, amount } : split
    ));
  };

  const getStatusColor = () => {
    if (remaining === 0) return {
      bg: theme.colors.success.light,
      text: theme.colors.success.dark,
      icon: '✅',
    };
    if (remaining > 0) return {
      bg: theme.colors.warning.light,
      text: theme.colors.warning.dark,
      icon: '⚠️',
    };
    return {
      bg: theme.colors.danger.light,
      text: theme.colors.danger.dark,
      icon: '❌',
    };
  };

  const status = getStatusColor();

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
        <Text style={styles.headerTitle}>Split Transaction</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Target Amount Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Target</Text>
          <Text style={styles.targetAmount}>${totalTarget.toFixed(2)} total</Text>

          <View style={[styles.statusBox, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.text }]}>
              Remaining: ${Math.abs(remaining).toFixed(2)}
            </Text>
            <Text style={styles.statusIcon}>{status.icon}</Text>
          </View>
        </View>

        {/* Splits */}
        {splits.map((split, index) => (
          <View key={split.id} style={styles.card}>
            <View style={styles.splitHeader}>
              <Text style={styles.splitLabel}>Split {index + 1}</Text>
              {splits.length > 2 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeSplit(split.id)}
                >
                  <Ionicons name="close" size={20} color={theme.colors.danger.main} />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Selection */}
            <TouchableOpacity style={styles.selector}>
              <View style={styles.selectorContent}>
                <Text style={styles.selectorIcon}>{split.icon}</Text>
                <Text style={styles.selectorText}>{split.category}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={theme.colors.text.tertiary} />
            </TouchableOpacity>

            {/* Amount Input */}
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={split.amount}
                onChangeText={(value) => updateSplitAmount(split.id, value)}
                placeholder="0.00"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        ))}

        {/* Add Split Button */}
        {splits.length < 5 ? (
          <TouchableOpacity
            style={styles.addSplitButton}
            onPress={addSplit}
          >
            <Text style={styles.addSplitText}>+ Add Split</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Maximum 5 splits allowed</Text>
          </View>
        )}

        {/* Validation Message */}
        {remaining !== 0 && (
          <View style={[styles.validationBox, {
            backgroundColor: remaining > 0 ? theme.colors.warning.light : theme.colors.danger.light,
          }]}>
            <Text style={[styles.validationText, {
              color: remaining > 0 ? theme.colors.warning.dark : theme.colors.danger.dark,
            }]}>
              {remaining > 0
                ? `You still need to allocate $${remaining.toFixed(2)}`
                : `You're over by $${Math.abs(remaining).toFixed(2)}`
              }
            </Text>
          </View>
        )}

        {/* Save Split Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          disabled={remaining !== 0}
          onPress={() => router.back()}
        >
          Save Split
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
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: 20,
    padding: theme.spacing[6],
    marginBottom: theme.spacing[4],
    ...theme.shadows.sm,
  },
  label: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
  },
  targetAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.xl,
  },
  statusText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '600',
  },
  statusIcon: {
    fontSize: 16,
  },
  splitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[4],
  },
  splitLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.danger.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing[2],
    borderRadius: 20,
    marginBottom: theme.spacing[4],
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  selectorIcon: {
    fontSize: 20,
  },
  selectorText: {
    ...theme.typography.styles.body,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing[2],
    borderRadius: 20,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: theme.spacing[2],
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  addSplitButton: {
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.spacing[2],
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  addSplitText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  warningBox: {
    backgroundColor: theme.colors.warning.light,
    padding: theme.spacing[4],
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  },
  warningText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.warning.dark,
    textAlign: 'center',
  },
  validationBox: {
    padding: theme.spacing[4],
    borderRadius: 20,
    marginBottom: theme.spacing[6],
  },
  validationText: {
    ...theme.typography.styles.bodySmall,
    textAlign: 'center',
  },
});
