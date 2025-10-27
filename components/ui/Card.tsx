import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

/**
 * Card Component
 * Used throughout all 50 screens
 *
 * Provides consistent card styling with:
 * - Rounded corners (2xl radius)
 * - Shadow
 * - Padding
 * - Background color
 */

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  noShadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  noPadding = false,
  noShadow = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        !noPadding && styles.cardWithPadding,
        !noShadow && theme.shadows.base,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardWithPadding: {
    padding: theme.spacing[4],
  },
});
