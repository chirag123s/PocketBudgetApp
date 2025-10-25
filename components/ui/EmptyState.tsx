import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { theme } from '@/constants/theme';

/**
 * EmptyState Component
 * Used when lists/screens have no data
 *
 * Features:
 * - Icon/illustration
 * - Title and description
 * - Optional action button
 */

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <Text style={styles.title}>{title}</Text>

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}

      {actionLabel && onAction && (
        <Button
          onPress={onAction}
          variant="primary"
          style={styles.button}
        >
          {actionLabel}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.responsive.spacing.lg,
  },
  iconContainer: {
    marginBottom: theme.responsive.spacing.md,
  },
  title: {
    ...theme.typography.styles.h3,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  description: {
    ...theme.typography.styles.body,
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.lg,
  },
  button: {
    minWidth: theme.responsive.moderateScale(200),
  },
});
