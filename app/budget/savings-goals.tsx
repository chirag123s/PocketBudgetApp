import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: Date;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

export default function SavingsGoalsScreen() {
  const router = useRouter();
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
  };

  const savingsGoals: SavingsGoal[] = [
    {
      id: '1',
      name: 'Trip to Japan',
      targetAmount: 8000,
      currentAmount: 5250,
      dueDate: new Date(2024, 9, 1),
      icon: 'airplane-outline',
      iconColor: colors.functionalWarning,
    },
    {
      id: '2',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      dueDate: new Date(2024, 11, 31),
      icon: 'shield-checkmark-outline',
      iconColor: colors.functionalSuccess,
    },
    {
      id: '3',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 8500,
      dueDate: new Date(2025, 5, 1),
      icon: 'car-outline',
      iconColor: colors.primary,
    },
  ];

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const diff = dueDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  const styles = StyleSheet.create({
    content: {
      padding: responsive.spacing[4],
      gap: responsive.spacing[4],
    },
    goalCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      gap: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    goalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
    },
    iconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    goalInfo: {
      flex: 1,
    },
    goalName: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[1],
    },
    daysRemaining: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    amounts: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: responsive.spacing[2],
    },
    currentAmount: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    targetAmount: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    progressBar: {
      height: ms(10),
      backgroundColor: colors.neutralBg,
      borderRadius: ms(5),
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: ms(5),
    },
    progressText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDark,
      marginTop: responsive.spacing[2],
      textAlign: 'center',
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: responsive.spacing[12],
    },
    emptyIcon: {
      marginBottom: responsive.spacing[4],
      opacity: 0.3,
    },
    emptyText: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '600',
      color: colors.neutralDark,
      textAlign: 'center',
      marginBottom: responsive.spacing[2],
    },
    emptySubtext: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralMedium,
      textAlign: 'center',
    },
    fab: {
      position: 'absolute',
      bottom: responsive.spacing[6],
      right: responsive.spacing[4],
      width: ms(56),
      height: ms(56),
      borderRadius: ms(28),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.lg,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
      <ScreenHeader
        title="Savings Goals"
        backgroundColor={colors.neutralBg}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {savingsGoals.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="trophy-outline"
              size={64}
              color={colors.neutralMedium}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No Savings Goals Yet</Text>
            <Text style={styles.emptySubtext}>
              Create a goal to start saving for what matters to you
            </Text>
          </View>
        ) : (
          savingsGoals.map((goal) => {
            const percentage = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysLeft = getDaysRemaining(goal.dueDate);
            const remaining = goal.targetAmount - goal.currentAmount;

            return (
              <TouchableOpacity
                key={goal.id}
                style={styles.goalCard}
                onPress={() => console.log('Goal pressed:', goal.id)}
              >
                <View style={styles.goalHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${goal.iconColor}20` }]}>
                    <Ionicons
                      name={goal.icon}
                      size={24}
                      color={goal.iconColor}
                    />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalName}>{goal.name}</Text>
                    <Text style={styles.daysRemaining}>
                      {daysLeft > 0 ? `${daysLeft} days remaining` : 'Due today'}
                    </Text>
                  </View>
                </View>

                <View style={styles.amounts}>
                  <Text style={styles.currentAmount}>
                    ${goal.currentAmount.toLocaleString()}
                  </Text>
                  <Text style={styles.targetAmount}>
                    of ${goal.targetAmount.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: goal.iconColor,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>
                  {percentage}% complete • ${remaining.toLocaleString()} to go
                </Text>
              </TouchableOpacity>
            );
          })
        )}

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[20] }} />
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { transform: [{ scale: pressed ? 0.95 : 1 }] },
        ]}
        onPress={() => console.log('Add new goal')}
      >
        <Ionicons name="add" size={ms(32)} color={colors.neutralWhite} />
      </Pressable>
    </Screen>
  );
}
