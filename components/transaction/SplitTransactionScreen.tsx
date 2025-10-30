import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { darkColors } from '@/constants/colors';
import { responsive, ms, fs } from '@/constants/responsive';
import { CategorizeModal } from './CategorizeModal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SplitItem {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  amount: string;
}

interface SplitTransactionScreenProps {
  visible: boolean;
  onClose: () => void;
  transaction?: {
    id: string;
    merchant: string;
    date: string;
    amount: number;
  };
}

export const SplitTransactionScreen: React.FC<SplitTransactionScreenProps> = ({
  visible,
  onClose,
  transaction = {
    id: '1',
    merchant: 'Woolworths',
    date: '14 Oct, 2023',
    amount: 150.00,
  },
}) => {
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === 'dark';

  const [splitItems, setSplitItems] = useState<SplitItem[]>([]);
  const [showCategorizeModal, setShowCategorizeModal] = useState(false);

  // Use centralized theme with dark mode support
  const colors = {
    background: isDark ? darkColors.background.primary : theme.colors.background.secondary,
    surface: isDark ? darkColors.background.secondary : theme.colors.background.primary,
    surface2: isDark ? darkColors.background.tertiary : theme.colors.background.tertiary,
    textPrimary: isDark ? darkColors.text.primary : theme.colors.text.primary,
    textSecondary: isDark ? darkColors.text.secondary : theme.colors.text.secondary,
    border: isDark ? darkColors.border.light : theme.colors.border.light,
    primary: theme.colors.success.main,
    error: theme.colors.danger.main,
  };

  // Calculate total allocated
  const calculateAllocated = () => {
    return splitItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      return sum + amount;
    }, 0);
  };

  const allocated = calculateAllocated();
  const remaining = transaction.amount - allocated;
  const progress = Math.min((allocated / transaction.amount) * 100, 100);
  const isValid = splitItems.length >= 2 && Math.abs(remaining) < 0.01; // Minimum 2 splits and amounts must match

  // Update split amount
  const updateSplitAmount = (id: string, amount: string) => {
    // Allow empty, numbers, and decimal point
    if (amount === '' || /^\d*\.?\d*$/.test(amount)) {
      setSplitItems(
        splitItems.map((item) =>
          item.id === id ? { ...item, amount } : item
        )
      );
    }
  };

  // Remove split item
  const removeSplitItem = (id: string) => {
    setSplitItems(splitItems.filter((item) => item.id !== id));
  };

  // Add new split - show category modal
  const addNewSplit = () => {
    if (splitItems.length >= 5) {
      Alert.alert('Maximum Splits', 'You can split a transaction into a maximum of 5 categories.');
      return;
    }
    setShowCategorizeModal(true);
  };

  // Handle category selection from modal
  const handleCategorySelect = (categoryId: string) => {
    // You can customize these based on the actual category data
    const categoryMap: Record<string, { name: string; icon: string }> = {
      '1': { name: 'Groceries', icon: 'cart' },
      '2': { name: 'Eating Out', icon: 'restaurant' },
      '3': { name: 'Transport', icon: 'car' },
      '4': { name: 'Rent', icon: 'home' },
      '5': { name: 'Utilities', icon: 'receipt' },
      '6': { name: 'Shopping', icon: 'bag-handle' },
      '7': { name: 'Entertainment', icon: 'film' },
      '8': { name: 'Health', icon: 'medical' },
      '9': { name: 'Subscriptions', icon: 'repeat' },
      '10': { name: 'Income', icon: 'cash' },
    };

    const category = categoryMap[categoryId] || { name: 'Uncategorized', icon: 'help-circle' };
    const newId = Date.now().toString();
    const remainingAmount = transaction.amount - allocated;

    setSplitItems([
      ...splitItems,
      {
        id: newId,
        categoryId: categoryId,
        categoryName: category.name,
        categoryIcon: category.icon,
        amount: remainingAmount > 0 ? remainingAmount.toFixed(2) : '0.00',
      },
    ]);
  };

  // Save split
  const handleSave = () => {
    // Check minimum 2 splits
    if (splitItems.length < 2) {
      Alert.alert(
        'Minimum Splits Required',
        'You must split the transaction into at least 2 categories.'
      );
      return;
    }

    if (!isValid) {
      Alert.alert(
        'Invalid Split',
        `The split amounts must equal ${transaction.amount.toFixed(2)}. Currently: ${allocated.toFixed(2)}`
      );
      return;
    }

    Alert.alert('Success', 'Transaction split saved!', [
      { text: 'OK', onPress: () => onClose() },
    ]);
  };

  // Get validation message
  const getValidationMessage = () => {
    if (splitItems.length === 0) {
      return { text: 'Add at least 2 splits to continue', color: colors.textSecondary };
    } else if (splitItems.length === 1) {
      return { text: 'Add at least 1 more split', color: colors.textSecondary };
    } else if (isValid) {
      return { text: 'Totals match. Ready to save.', color: colors.primary };
    } else if (remaining > 0) {
      return { text: `${remaining.toFixed(2)} remaining`, color: colors.textSecondary };
    } else {
      return { text: `${Math.abs(remaining).toFixed(2)} over budget`, color: colors.error };
    }
  };

  const validationMessage = getValidationMessage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />

        <View style={[styles.bottomSheet, { backgroundColor: colors.background }]}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Split Transaction
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </Pressable>
          </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Original Transaction Card */}
          <View style={styles.transactionCard}>
            <View style={[styles.card, {
              backgroundColor: colors.surface,
              borderColor: colors.border
            }]}>
              <View style={styles.transactionInfo}>
                <View>
                  <Text style={[styles.merchantName, { color: colors.textPrimary }]}>
                    {transaction.merchant}
                  </Text>
                  <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                    {transaction.date}
                  </Text>
                </View>
                <Text style={[styles.totalAmount, { color: colors.textPrimary }]}>
                  ${transaction.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Split Items List */}
          {splitItems.length > 0 ? (
            <View style={styles.splitItemsContainer}>
              {splitItems.map((item, index) => (
              <View
                key={item.id}
                style={[styles.splitItem, {
                  backgroundColor: colors.surface,
                  borderColor: colors.border
                }]}
              >
                <View style={styles.splitItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.surface2 }]}>
                    <Ionicons
                      name={item.categoryIcon as any}
                      size={24}
                      color={colors.textPrimary}
                    />
                  </View>
                  <Text
                    style={[styles.categoryName, { color: colors.textPrimary }]}
                    numberOfLines={1}
                  >
                    {item.categoryName}
                  </Text>
                </View>

                <View style={styles.splitItemRight}>
                  <TextInput
                    style={[
                      styles.amountInput,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        color: colors.textPrimary,
                      },
                    ]}
                    value={item.amount}
                    onChangeText={(text) => updateSplitAmount(item.id, text)}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeSplitItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash" size={24} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="git-branch-outline" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                No splits added yet
              </Text>
              <Text style={[styles.emptyStateSubtext, { color: colors.textSecondary }]}>
                Add at least 2 categories to split this transaction
              </Text>
            </View>
          )}

          {/* Add Split Button */}
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              style={[styles.addButton, {
                backgroundColor: `${colors.primary}10`,
                borderColor: `${colors.primary}40`,
              }]}
              onPress={addNewSplit}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                {splitItems.length === 0 ? 'Add Split' : 'Add Another Split'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing for sticky footer */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Summary & Action */}
        <View
          style={[
            styles.footer,
            {
              backgroundColor: `${colors.surface}CC`,
              borderTopColor: colors.border,
            },
          ]}
        >
          {/* Running Total */}
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Allocated
            </Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>
              ${allocated.toFixed(2)} / ${transaction.amount.toFixed(2)}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={[styles.progressBarContainer, { backgroundColor: colors.surface2 }]}>
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: isValid ? colors.primary :
                    remaining > 0 ? colors.textSecondary : colors.error,
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          {/* Validation Message */}
          <Text style={[styles.validationMessage, { color: validationMessage.color }]}>
            {validationMessage.text}
          </Text>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor: isValid ? colors.primary : colors.border,
              },
            ]}
            onPress={handleSave}
            disabled={!isValid}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.saveButtonText,
                {
                  color: isValid ? '#FFFFFF' : colors.textSecondary,
                },
              ]}
            >
              Save Split
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
        </View>
      </View>

      {/* Categorize Modal */}
      <CategorizeModal
        visible={showCategorizeModal}
        onClose={() => setShowCategorizeModal(false)}
        onSelectCategory={handleCategorySelect}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    height: SCREEN_HEIGHT * 0.90,
    borderTopLeftRadius: theme.borderRadius.xl * 2,
    borderTopRightRadius: theme.borderRadius.xl * 2,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: responsive.spacing[3],
    paddingBottom: responsive.spacing[2],
  },
  handle: {
    width: ms(36),
    height: ms(4),
    borderRadius: ms(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
  },
  title: {
    fontSize: responsive.fontSize.h4,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: -0.3,
  },
  closeButton: {
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing[5],
  },
  transactionCard: {
    padding: theme.spacing[4],
  },
  card: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    padding: theme.spacing[4],
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  merchantName: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing[1],
    lineHeight: fs(20),
  },
  transactionDate: {
    fontSize: fs(14),
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: fs(18),
  },
  totalAmount: {
    fontSize: fs(24),
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: -0.5,
  },
  splitItemsContainer: {
    paddingHorizontal: theme.spacing[4],
    gap: theme.spacing[3],
  },
  splitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    gap: theme.spacing[3],
  },
  splitItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    flex: 1,
  },
  iconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.normal,
    flex: 1,
    lineHeight: fs(22),
  },
  splitItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  amountInput: {
    width: ms(96),
    height: ms(40),
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    paddingHorizontal: theme.spacing[3],
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'right',
  },
  deleteButton: {
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    marginTop: theme.spacing[1],
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    height: theme.layout.buttonHeight,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: fs(14),
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 0.3,
  },
  bottomSpacing: {
    height: ms(200),
  },
  footer: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[4],
    borderTopWidth: 1,
    gap: theme.spacing[3],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: fs(14),
    fontWeight: theme.typography.fontWeight.normal,
  },
  summaryValue: {
    fontSize: fs(14),
    fontWeight: theme.typography.fontWeight.semibold,
  },
  progressBarContainer: {
    width: '100%',
    height: ms(8),
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
  validationMessage: {
    fontSize: fs(14),
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  saveButton: {
    height: theme.layout.buttonHeight,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 0.3,
  },
  emptyState: {
    paddingVertical: responsive.spacing[8],
    paddingHorizontal: responsive.spacing[4],
    alignItems: 'center',
    gap: responsive.spacing[3],
  },
  emptyStateText: {
    fontSize: responsive.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: responsive.fontSize.md,
    fontWeight: theme.typography.fontWeight.normal,
    textAlign: 'center',
  },
});
