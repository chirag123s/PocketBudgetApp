import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

const colors = {
  primary: theme.colors.info.main,
  secondaryRed: '#FF6B6B',
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,
};

export interface CardCycle {
  id: string;
  cardName: string;
  spent: number;
  limit: number;
  cycleEndDate: Date;
  paymentDueDate: Date;
}

export interface CardCycleWidgetProps {
  cardCycle: CardCycle;
  onMorePress?: () => void;
  onCardPress?: () => void;
}

/**
 * Format date as "25 Aug"
 */
const formatDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

export const CardCycleWidget: React.FC<CardCycleWidgetProps> = ({
  cardCycle,
  onMorePress,
  onCardPress,
}) => {
  const usagePercentage = (cardCycle.spent / cardCycle.limit) * 100;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onCardPress}
      disabled={!onCardPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="card" size={20} color={colors.neutralDarkest} />
          <Text style={styles.title}>Card Cycle</Text>
        </View>
        {onMorePress && (
          <TouchableOpacity onPress={onMorePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.neutralDark} />
          </TouchableOpacity>
        )}
      </View>

      {/* Spending Section */}
      <View style={styles.spendingSection}>
        {/* Labels */}
        <View style={styles.labelsRow}>
          <Text style={styles.label}>Spent</Text>
          <Text style={styles.label}>Limit</Text>
        </View>

        {/* Amounts */}
        <View style={styles.amountsRow}>
          <Text style={styles.spentAmount}>
            ${cardCycle.spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text style={styles.limitAmount}>
            ${cardCycle.limit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(usagePercentage, 100)}%`,
                backgroundColor: colors.secondaryRed,
              },
            ]}
          />
        </View>
      </View>

      {/* Dates Section */}
      <View style={styles.datesSection}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Cycle ends</Text>
          <Text style={styles.dateValue}>{formatDate(cardCycle.cycleEndDate)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Min. payment due</Text>
          <Text style={styles.dateValue}>{formatDate(cardCycle.paymentDueDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  title: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },

  // Spending Section
  spendingSection: {
    gap: responsive.spacing[2],
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  spentAmount: {
    fontSize: responsive.fontSize.xxl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  limitAmount: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },

  // Progress Bar
  progressBar: {
    width: '100%',
    height: ms(10),
    backgroundColor: colors.neutralBg,
    borderRadius: ms(5),
    overflow: 'hidden',
    marginTop: responsive.spacing[2],
  },
  progressFill: {
    height: '100%',
    borderRadius: ms(5),
  },

  // Dates Section
  datesSection: {
    flexDirection: 'row',
    backgroundColor: colors.neutralBg,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[3],
    justifyContent: 'space-between',
  },
  dateItem: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  divider: {
    width: 1,
    backgroundColor: `${colors.neutralMedium}33`,
    marginHorizontal: responsive.spacing[3],
  },
  dateLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  dateValue: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
});
