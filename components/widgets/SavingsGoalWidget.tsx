import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

const colors = {
  primary: theme.colors.info.main,
  secondaryYellow: theme.colors.warning.main,
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
};

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: Date;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

export interface SavingsGoalWidgetProps {
  goals: SavingsGoal[];
  onViewAll?: () => void;
  onGoalPress?: (goal: SavingsGoal) => void;
}

/**
 * Format date as "Due Oct 2024"
 */
const formatDueDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `Due ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const SavingsGoalWidget: React.FC<SavingsGoalWidgetProps> = ({
  goals,
  onViewAll,
  onGoalPress,
}) => {
  // Show only the first goal (or most prioritized)
  const displayGoal = goals.length > 0 ? goals[0] : null;

  if (!displayGoal) {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Savings Goal</Text>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="flag-outline" size={64} color={colors.neutralDark} />
          <Text style={styles.emptyTitle}>No Savings Goals</Text>
          <Text style={styles.emptySubtitle}>
            Set a savings goal to track your progress
          </Text>
        </View>
      </View>
    );
  }

  const progress = (displayGoal.currentAmount / displayGoal.targetAmount) * 100;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Savings Goal</Text>
        {onViewAll && goals.length > 1 && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.goalCard}
        onPress={() => onGoalPress?.(displayGoal)}
        disabled={!onGoalPress}
        activeOpacity={0.7}
      >
        {/* Goal Header with Icon */}
        <View style={styles.goalHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${displayGoal.iconColor}33` },
            ]}
          >
            <Ionicons
              name={displayGoal.icon}
              size={24}
              color={displayGoal.iconColor}
            />
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalName}>{displayGoal.name}</Text>
            <Text style={styles.goalTarget}>
              Goal: ${displayGoal.targetAmount.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.currentAmount}>
              ${displayGoal.currentAmount.toLocaleString()}{' '}
              <Text style={styles.savedLabel}>saved</Text>
            </Text>
            <Text style={styles.dueDate}>
              {formatDueDate(displayGoal.dueDate)}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: displayGoal.iconColor,
                },
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: responsive.spacing[3],
  },
  headerTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  viewAllButton: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },

  // Goal Card
  goalCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
    gap: responsive.spacing[4],
    ...theme.shadows.sm,
  },

  // Goal Header
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
  },
  iconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: 2,
  },
  goalTarget: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
  },

  // Progress Section
  progressSection: {
    gap: responsive.spacing[1],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: responsive.spacing[1],
  },
  currentAmount: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  savedLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },
  dueDate: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDark,
  },

  // Progress Bar
  progressBarContainer: {
    width: '100%',
    height: ms(10),
    backgroundColor: colors.neutralBg,
    borderRadius: ms(5),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: ms(5),
  },

  // Empty State
  emptyState: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[8],
    alignItems: 'center',
    gap: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  emptyTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  emptySubtitle: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: colors.neutralDark,
    textAlign: 'center',
  },
});
