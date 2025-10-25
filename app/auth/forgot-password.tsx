import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

type Step = 1 | 2 | 3; // 1: Email Entry, 2: Check Email, 3: New Password

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength({
      length: value.length >= 8,
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const isPasswordStrong = passwordStrength.length && passwordStrength.number && passwordStrength.special;
  const passwordsMatch = newPassword === confirmPassword;

  // Step 1: Email Entry
  if (step === 1) {
    return (
      <Screen scrollable={false}>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we'll send a reset link
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <Button
              variant="primary"
              fullWidth
              size="large"
              onPress={() => setStep(2)}
              disabled={!email}
            >
              Send Reset Link
            </Button>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.back()}
            >
              <Text style={styles.secondaryButtonText}>← Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    );
  }

  // Step 2: Check Email
  if (step === 2) {
    return (
      <Screen scrollable={false}>
        <View style={styles.centerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail" size={48} color={theme.colors.primary[600]} />
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We sent a reset link to</Text>
          <Text style={styles.emailText}>{email}</Text>

          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={() => setStep(3)}
            style={styles.button}
          >
            Open Email App
          </Button>

          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>
              Didn't receive email?{' '}
              <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>← Back to Login</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  // Step 3: New Password
  return (
    <Screen>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep(2)}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>

        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previous passwords
        </Text>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={handlePasswordChange}
              placeholder="Min 8 characters"
              placeholderTextColor={theme.colors.text.tertiary}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.text.tertiary}
              />
            </TouchableOpacity>
          </View>

          {/* Password Strength Indicator */}
          {newPassword.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthRow}>
                <View
                  style={[
                    styles.checkCircle,
                    passwordStrength.length && styles.checkCircleActive,
                  ]}
                >
                  <Ionicons
                    name={passwordStrength.length ? 'checkmark' : 'close'}
                    size={12}
                    color={
                      passwordStrength.length
                        ? theme.colors.success.main
                        : theme.colors.text.tertiary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.strengthText,
                    passwordStrength.length && styles.strengthTextActive,
                  ]}
                >
                  At least 8 characters
                </Text>
              </View>
              <View style={styles.strengthRow}>
                <View
                  style={[
                    styles.checkCircle,
                    passwordStrength.number && styles.checkCircleActive,
                  ]}
                >
                  <Ionicons
                    name={passwordStrength.number ? 'checkmark' : 'close'}
                    size={12}
                    color={
                      passwordStrength.number
                        ? theme.colors.success.main
                        : theme.colors.text.tertiary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.strengthText,
                    passwordStrength.number && styles.strengthTextActive,
                  ]}
                >
                  Contains a number
                </Text>
              </View>
              <View style={styles.strengthRow}>
                <View
                  style={[
                    styles.checkCircle,
                    passwordStrength.special && styles.checkCircleActive,
                  ]}
                >
                  <Ionicons
                    name={passwordStrength.special ? 'checkmark' : 'close'}
                    size={12}
                    color={
                      passwordStrength.special
                        ? theme.colors.success.main
                        : theme.colors.text.tertiary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.strengthText,
                    passwordStrength.special && styles.strengthTextActive,
                  ]}
                >
                  Contains special character
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter password"
              placeholderTextColor={theme.colors.text.tertiary}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.text.tertiary}
              />
            </TouchableOpacity>
          </View>
          {confirmPassword.length > 0 && !passwordsMatch && (
            <Text style={styles.errorText}>Passwords don't match</Text>
          )}
        </View>

        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => router.replace('/auth/login')}
          disabled={!isPasswordStrong || !passwordsMatch}
        >
          Reset Password
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.responsive.getScreenPadding(),
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.responsive.getScreenPadding(),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    width: theme.responsive.moderateScale(40),
    height: theme.responsive.moderateScale(40),
    borderRadius: theme.responsive.moderateScale(20),
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: theme.responsive.fontSize.h1,
    marginBottom: theme.responsive.spacing.sm,
  },
  subtitle: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.responsive.spacing.lg,
  },
  label: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.label,
    marginBottom: theme.responsive.spacing.sm,
  },
  input: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    padding: theme.responsive.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.responsive.scale(12),
    backgroundColor: theme.colors.background.primary,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.responsive.scale(12),
    backgroundColor: theme.colors.background.primary,
  },
  passwordInput: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    flex: 1,
    padding: theme.responsive.spacing.md,
  },
  eyeButton: {
    padding: theme.responsive.spacing.md,
  },
  button: {
    marginBottom: theme.responsive.spacing.md,
  },
  secondaryButton: {
    padding: theme.responsive.spacing.sm,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
  },
  iconCircle: {
    width: theme.responsive.moderateScale(96),
    height: theme.responsive.moderateScale(96),
    borderRadius: theme.responsive.moderateScale(48),
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  emailText: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.xl,
  },
  resendButton: {
    marginTop: theme.responsive.spacing.md,
  },
  resendText: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
  },
  resendLink: {
    color: theme.colors.primary[600],
    fontWeight: '600',
  },
  strengthContainer: {
    marginTop: theme.responsive.spacing.sm,
    gap: theme.responsive.spacing.sm,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  checkCircle: {
    width: theme.responsive.scale(16),
    height: theme.responsive.scale(16),
    borderRadius: theme.responsive.scale(8),
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: {
    backgroundColor: theme.colors.success.light,
  },
  strengthText: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.text.secondary,
  },
  strengthTextActive: {
    color: theme.colors.success.main,
  },
  errorText: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.danger.main,
    marginTop: theme.responsive.spacing.sm,
  },
});
