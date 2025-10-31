import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { formatCurrencyCompact } from '@/utils/currency';

const colors = {
  primary: theme.colors.info.main,
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,
  functionalSuccess: theme.colors.success.main,
  functionalWarning: theme.colors.warning.main,
  functionalError: theme.colors.danger.main,
};

export interface CategoryData {
  id?: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap | string;
  spent: number;
  budget: number;
  color: string;
}

export interface CategoryBreakdownWidgetProps {
  categories: CategoryData[];
  onCategoryPress?: (category: CategoryData) => void;
  onPeriodSelect?: (period: 'week' | 'month' | 'year') => void;
}

export const CategoryBreakdownWidget: React.FC<CategoryBreakdownWidgetProps> = ({
  categories,
  onCategoryPress,
  onPeriodSelect,
}) => {
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const handlePeriodSelect = (period: 'week' | 'month' | 'year') => {
    setSelectedPeriod(period);
    setShowPeriodSelector(false);
    onPeriodSelect?.(period);
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };

  // Map icon strings to Ionicons names
  const getIconName = (icon: string): keyof typeof Ionicons.glyphMap => {
    const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
      '🛒': 'cart-outline',
      '🛍️': 'bag-outline',
      '🚗': 'car-outline',
      '📦': 'cube-outline',
    };

    // If it's an emoji, map it, otherwise use it directly
    return iconMap[icon] || (icon as keyof typeof Ionicons.glyphMap);
  };

  // Sort by spending amount (highest first) and take top 3
  const topCategories = [...categories]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 3);

  return (
    <>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Top Spending</Text>
          <TouchableOpacity
            style={styles.periodButton}
            onPress={() => setShowPeriodSelector(true)}
          >
            <Text style={styles.periodText}>{getPeriodLabel()}</Text>
            <Ionicons name="chevron-down" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        <View style={styles.categoriesList}>
          {topCategories.map((category, index) => {
            const maxSpent = Math.max(...topCategories.map(c => c.spent));
            const widthPercentage = (category.spent / maxSpent) * 100;

            return (
              <TouchableOpacity
                key={category.id || index}
                style={styles.categoryItem}
                onPress={() => onCategoryPress?.(category)}
                disabled={!onCategoryPress}
              >
                {/* Category Info Row */}
                <View style={styles.categoryRow}>
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${category.color}1A` },
                      ]}
                    >
                      <Ionicons
                        name={getIconName(category.icon)}
                        size={16}
                        color={category.color}
                      />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryAmount}>
                    {formatCurrencyCompact(category.spent)}
                  </Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(widthPercentage, 100)}%`,
                        backgroundColor: category.color,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Period Selector Modal */}
      <Modal
        visible={showPeriodSelector}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPeriodSelector(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPeriodSelector(false)}
        >
          <View style={styles.periodModal}>
            <Text style={styles.modalTitle}>Select Period</Text>
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'week' && styles.periodOptionActive,
              ]}
              onPress={() => handlePeriodSelect('week')}
            >
              <Text
                style={[
                  styles.periodOptionText,
                  selectedPeriod === 'week' && styles.periodOptionTextActive,
                ]}
              >
                This Week
              </Text>
              {selectedPeriod === 'week' && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'month' && styles.periodOptionActive,
              ]}
              onPress={() => handlePeriodSelect('month')}
            >
              <Text
                style={[
                  styles.periodOptionText,
                  selectedPeriod === 'month' && styles.periodOptionTextActive,
                ]}
              >
                This Month
              </Text>
              {selectedPeriod === 'month' && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'year' && styles.periodOptionActive,
              ]}
              onPress={() => handlePeriodSelect('year')}
            >
              <Text
                style={[
                  styles.periodOptionText,
                  selectedPeriod === 'year' && styles.periodOptionTextActive,
                ]}
              >
                This Year
              </Text>
              {selectedPeriod === 'year' && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    gap: responsive.spacing[4],
    ...theme.shadows.sm,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
  },
  periodText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.primary,
  },

  // Categories List
  categoriesList: {
    gap: responsive.spacing[4],
    marginTop: responsive.spacing[2],
  },
  categoryItem: {
    gap: responsive.spacing[2],
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  iconContainer: {
    width: ms(24),
    height: ms(24),
    borderRadius: ms(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDarkest,
  },
  categoryAmount: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },

  // Progress Bar
  progressBar: {
    width: '100%',
    height: ms(8),
    backgroundColor: colors.neutralBg,
    borderRadius: ms(4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: ms(4),
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.spacing[4],
  },
  periodModal: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    width: '100%',
    maxWidth: 320,
    ...theme.shadows.md,
  },
  modalTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[4],
    textAlign: 'center',
  },
  periodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.spacing[4],
    paddingHorizontal: responsive.spacing[4],
    borderRadius: theme.borderRadius.lg,
    marginBottom: responsive.spacing[2],
    backgroundColor: colors.neutralBg,
  },
  periodOptionActive: {
    backgroundColor: `${colors.primary}15`,
  },
  periodOptionText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  periodOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
