import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { theme } from '@/constants/theme';
import { responsive } from '@/constants/responsive';

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
    padding: responsive.spacing[6],
  },
  iconContainer: {
    marginBottom: responsive.spacing[4],
  },
  title: {
    fontSize: responsive.fontSize.h3,
    lineHeight: responsive.fontSize.h3 * 1.4,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: responsive.spacing[2],
  },
  description: {
    fontSize: responsive.fontSize.base,
    lineHeight: responsive.fontSize.base * 1.5,
    fontWeight: '400',
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: responsive.spacing[6],
  },
  button: {
    minWidth: 200,
  },
});
