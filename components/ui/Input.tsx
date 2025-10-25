import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { theme } from '@/constants/theme';

/**
 * Input Component
 * Matches design from all 50 screens
 *
 * Features:
 * - Label and placeholder
 * - Error state with message
 * - Icon support (left/right)
 * - Secure text entry with toggle
 * - Focus states
 */

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  containerStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          hasError && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={theme.colors.neutral[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure}
          {...textInputProps}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.rightIcon}
          >
            <Text style={styles.iconText}>{isSecure ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}

        {!secureTextEntry && rightIcon && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.responsive.spacing.md,
  },
  label: {
    ...theme.typography.styles.label,
    marginBottom: theme.responsive.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.responsive.moderateScale(48),
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.responsive.scale(12),
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.responsive.spacing.md,
  },
  inputContainerFocused: {
    borderColor: theme.colors.primary[500],
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: theme.colors.danger.main,
  },
  input: {
    flex: 1,
    ...theme.typography.styles.body,
    paddingVertical: 0, // Remove default padding
  },
  inputWithLeftIcon: {
    paddingLeft: theme.responsive.spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: theme.responsive.spacing.sm,
  },
  leftIcon: {
    marginRight: theme.responsive.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.responsive.spacing.sm,
  },
  iconText: {
    fontSize: theme.responsive.fontSize.large,
  },
  error: {
    ...theme.typography.styles.caption,
    color: theme.colors.danger.main,
    marginTop: theme.responsive.spacing.xs,
  },
  hint: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.responsive.spacing.xs,
  },
});
