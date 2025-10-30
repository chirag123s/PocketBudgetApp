import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { darkColors } from '@/constants/colors';
import { responsive, ms, fs } from '@/constants/responsive';

interface BudgetCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  spent: number;
  total: number;
  color: string;
}

interface AdjustBudgetsModalProps {
  visible: boolean;
  onClose: () => void;
  categories: BudgetCategory[];
  onSave: (updatedCategories: BudgetCategory[]) => void;
}

export const AdjustBudgetsModal: React.FC<AdjustBudgetsModalProps> = ({
  visible,
  onClose,
  categories,
  onSave,
}) => {
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === 'dark';

  // Use centralized theme with dark mode support
  const colors = {
    background: isDark ? darkColors.background.primary : theme.colors.background.secondary,
    surface: isDark ? darkColors.background.secondary : theme.colors.background.primary,
    textPrimary: isDark ? darkColors.text.primary : theme.colors.text.primary,
    textSecondary: isDark ? darkColors.text.secondary : theme.colors.text.secondary,
    border: isDark ? darkColors.border.light : theme.colors.border.light,
    primary: theme.colors.info.main,
  };

  const [editedCategories, setEditedCategories] = useState<BudgetCategory[]>(categories);

  // Update local state when categories prop changes
  React.useEffect(() => {
    setEditedCategories(categories);
  }, [categories]);

  const handleBudgetChange = (id: string, value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');

    setEditedCategories(prev =>
      prev.map(cat =>
        cat.id === id
          ? { ...cat, total: numericValue === '' ? 0 : parseFloat(numericValue) || 0 }
          : cat
      )
    );
  };

  const handleSave = () => {
    // Validate that all budgets have values
    const hasInvalidBudgets = editedCategories.some(cat => cat.total <= 0);

    if (hasInvalidBudgets) {
      Alert.alert(
        'Invalid Budget',
        'All budget amounts must be greater than zero.',
        [{ text: 'OK' }]
      );
      return;
    }

    onSave(editedCategories);
    onClose();
  };

  const handleCancel = () => {
    // Reset to original categories
    setEditedCategories(categories);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleCancel}
        />

        <View style={[styles.bottomSheet, { backgroundColor: colors.surface }]}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Adjust Budgets
            </Text>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Update your monthly budget for each category
          </Text>

          {/* Categories List */}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.categoriesList}>
              {editedCategories.map((category) => (
                <View key={category.id} style={styles.categoryItem}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryIconContainer,
                        { backgroundColor: `${category.color}15` },
                      ]}
                    >
                      <Ionicons
                        name={category.icon}
                        size={24}
                        color={category.color}
                      />
                    </View>
                    <View style={styles.categoryInfo}>
                      <Text style={[styles.categoryName, { color: colors.textPrimary }]}>
                        {category.name}
                      </Text>
                      <Text style={[styles.categorySpent, { color: colors.textSecondary }]}>
                        Spent: ${category.spent.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={[styles.currencySymbol, { color: colors.textSecondary }]}>
                      $
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: colors.textPrimary,
                          borderColor: colors.border,
                        },
                      ]}
                      value={category.total > 0 ? category.total.toString() : ''}
                      onChangeText={(value) => handleBudgetChange(category.id, value)}
                      keyboardType="decimal-pad"
                      placeholder="0"
                      placeholderTextColor={colors.textSecondary}
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textPrimary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheet: {
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingBottom: theme.spacing[5],
    maxHeight: '90%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[2],
  },
  handle: {
    width: ms(36),
    height: ms(4),
    borderRadius: theme.borderRadius.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[2],
  },
  title: {
    fontSize: fs(24),
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: -0.5,
  },
  closeButton: {
    width: ms(32),
    height: ms(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(16),
  },
  subtitle: {
    fontSize: fs(14),
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[3],
  },
  scrollView: {
    maxHeight: ms(400),
  },
  categoriesList: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[3],
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[3],
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    flex: 1,
  },
  categoryIconContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    flex: 1,
    gap: theme.spacing[1],
  },
  categoryName: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.semibold,
  },
  categorySpent: {
    fontSize: fs(13),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  currencySymbol: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.medium,
  },
  input: {
    width: ms(100),
    height: ms(44),
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[3],
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    gap: theme.spacing[3],
  },
  button: {
    flex: 1,
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.semibold,
  },
  saveButton: {},
  saveButtonText: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#FFFFFF',
  },
});
