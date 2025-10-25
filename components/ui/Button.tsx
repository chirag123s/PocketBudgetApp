import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

/**
 * Button Component
 * Matches the design from all 50 screens
 *
 * Variants:
 * - primary: Green filled button (default)
 * - secondary: Outlined button
 * - tertiary: Text-only button
 * - danger: Red filled button
 *
 * Sizes:
 * - small: 40px height
 * - medium: 48px height (default)
 * - large: 56px height
 */

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}` as keyof typeof styles],
    styles[`text_${size}` as keyof typeof styles],
    isDisabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : theme.colors.primary[500]}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={textStyles}>{children}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.responsive.scale(20),
    gap: theme.responsive.spacing.sm,
  },

  // Sizes
  small: {
    height: theme.responsive.moderateScale(40),
    paddingHorizontal: theme.responsive.spacing.md,
  },
  medium: {
    height: theme.responsive.moderateScale(48),
    paddingHorizontal: theme.responsive.spacing.lg,
  },
  large: {
    height: theme.responsive.moderateScale(56),
    paddingHorizontal: theme.responsive.spacing.xl,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary[500],
    ...theme.shadows.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
  },
  tertiary: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: theme.colors.danger.main,
    ...theme.shadows.lg,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },

  // Disabled
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    ...theme.typography.styles.button,
  },
  text_primary: {
    color: theme.colors.text.inverse,
  },
  text_secondary: {
    color: theme.colors.primary[500],
  },
  text_tertiary: {
    color: theme.colors.primary[500],
  },
  text_danger: {
    color: theme.colors.text.inverse,
  },
  text_small: {
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  text_medium: {
    fontSize: theme.responsive.fontSize.button,
  },
  text_large: {
    fontSize: theme.responsive.fontSize.large,
  },
  textDisabled: {
    color: theme.colors.neutral[400],
  },
});
