import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { formatCurrencyCompact } from '@/utils/currency';
import { useTheme } from '@/contexts/ThemeContext';
import { InlineDropdown, DropdownOption } from '@/components/ui';

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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

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

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const handlePeriodChange = (period: string) => {
    const typedPeriod = period as 'week' | 'month' | 'year';
    setSelectedPeriod(typedPeriod);
    onPeriodSelect?.(typedPeriod);
  };

  const periodOptions: DropdownOption[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

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
  });

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Top Spending</Text>
        <InlineDropdown
          options={periodOptions}
          selectedValue={selectedPeriod}
          onSelect={handlePeriodChange}
          align="right"
        />
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
  );
};
