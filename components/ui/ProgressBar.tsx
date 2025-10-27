import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

/**
 * ProgressBar Component
 * Used for budget progress indicators
 *
 * Features:
 * - Percentage-based progress (0-100)
 * - Color variants (success, warning, danger)
 * - Animated option
 * - Height variants
 */

export interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'success' | 'warning' | 'danger' | 'primary';
  height?: number;
  backgroundColor?: string;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'primary',
  height = 8,
  backgroundColor = theme.colors.neutral[200],
  style,
}) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const colorMap = {
    primary: theme.colors.primary[500],
    success: theme.colors.success.main,
    warning: theme.colors.warning.main,
    danger: theme.colors.danger.main,
  };

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor },
        style,
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress}%`,
            backgroundColor: colorMap[variant],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 999,
  },
});
