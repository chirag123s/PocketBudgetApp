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
import { responsive } from '@/constants/responsive';

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
  // 🔍 Check for string-to-boolean issues
  if (typeof secureTextEntry !== 'boolean') {
    console.error('❌ Input prop ERROR: secureTextEntry is', typeof secureTextEntry, '- value:', secureTextEntry);
  }

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
    marginBottom: responsive.spacing[4],
  },
  label: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    lineHeight: responsive.fontSize.sm * 1.5,
    color: theme.colors.text.primary,
    marginBottom: responsive.spacing[2],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsive.layout.inputHeight,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: responsive.layout.cardRadius,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: responsive.spacing[4],
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
    fontSize: responsive.fontSize.base,
    fontWeight: '400',
    lineHeight: responsive.fontSize.base * 1.5,
    color: theme.colors.text.primary,
    paddingVertical: 0, // Remove default padding
  },
  inputWithLeftIcon: {
    paddingLeft: responsive.spacing[2],
  },
  inputWithRightIcon: {
    paddingRight: responsive.spacing[2],
  },
  leftIcon: {
    marginRight: responsive.spacing[2],
  },
  rightIcon: {
    marginLeft: responsive.spacing[2],
  },
  iconText: {
    fontSize: responsive.fontSize.lg,
  },
  error: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '400',
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.danger.main,
    marginTop: responsive.spacing[1],
  },
  hint: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '400',
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.tertiary,
    marginTop: responsive.spacing[1],
  },
});
