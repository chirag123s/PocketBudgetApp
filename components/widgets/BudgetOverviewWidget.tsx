import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { formatCurrencyCompact } from '@/utils/currency';
import { useTheme } from '@/contexts/ThemeContext';

export interface BudgetItem {
  category: string;
  spent: number;
  total: number;
  status: 'good' | 'warning' | 'over';
}

export interface BudgetOverviewWidgetProps {
  budgetItems: BudgetItem[];
  onViewAll?: () => void;
  onBudgetPress?: (item: BudgetItem) => void;
}

export const BudgetOverviewWidget: React.FC<BudgetOverviewWidgetProps> = ({
  budgetItems,
  onViewAll,
  onBudgetPress,
}) => {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return colors.functionalSuccess;
      case 'warning':
        return colors.functionalWarning;
      case 'over':
        return colors.functionalError;
      default:
        return colors.primary;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      ...theme.shadows.sm,
    },
    transactionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[3],
    },
    sectionHeading: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    viewAllButton: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.primary,
    },
    budgetContainer: {
      gap: responsive.spacing[3],
    },
    budgetCard: {
      backgroundColor: colors.neutralBg,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[4],
      gap: responsive.spacing[2],
    },
    budgetHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    budgetCategory: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    budgetRemaining: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    budgetOverText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.functionalError,
    },
    progressBar: {
      width: '100%',
      height: ms(10),
      backgroundColor: colors.neutralBg,
      borderRadius: ms(5),
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: ms(5),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionHeading}>Budget Progress</Text>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.budgetContainer}>
        {budgetItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.budgetCard}
            onPress={() => onBudgetPress?.(item)}
            disabled={!onBudgetPress}
          >
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetCategory}>{item.category}</Text>
              {item.status === 'over' ? (
                <Text style={styles.budgetOverText}>
                  {formatCurrencyCompact(item.spent - item.total)} over budget!
                </Text>
              ) : (
                <Text style={styles.budgetRemaining}>
                  {formatCurrencyCompact(item.total - item.spent)} left of {formatCurrencyCompact(item.total)}
                </Text>
              )}
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((item.spent / item.total) * 100, 100)}%`,
                    backgroundColor: getProgressColor(item.status),
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
