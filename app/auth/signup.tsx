import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useScreenTracker } from '@/utils/screenTracker';
import { responsive, wp, hp, ms } from '@/constants/responsive';
import { useTheme } from '@/contexts/ThemeContext';

interface PasswordStrength {
  length: boolean;
  number: boolean;
  special: boolean;
}

export default function SignUpScreen() {
  useScreenTracker('SignUpScreen');
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    length: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    setPasswordStrength({
      length: value.length >= 8,
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const isPasswordStrong =
    passwordStrength.length && passwordStrength.number && passwordStrength.special;

  const passwordsMatch = formData.password === formData.confirmPassword;
  const canSubmit =
    formData.email && isPasswordStrong && passwordsMatch && formData.agreeToTerms;

  const styles = StyleSheet.create({
    header: {
      padding: responsive.spacing[4],
    },
    backButton: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      backgroundColor: theme.colors.background.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      padding: responsive.spacing[6],
      maxWidth: responsive.layout.maxContentWidth,
      width: '100%',
      alignSelf: 'center',
    },
    title: {
      ...theme.typography.styles.h1,
      fontSize: responsive.fontSize.h2,
      lineHeight: responsive.fontSize.h2 * 1.3,
      marginBottom: responsive.spacing[2],
    },
    subtitle: {
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.base,
      lineHeight: responsive.fontSize.base * 1.5,
      color: theme.colors.text.secondary,
      marginBottom: responsive.device.isShortDevice ? responsive.spacing[6] : responsive.spacing[8],
    },
    strengthContainer: {
      marginTop: -responsive.spacing[2],
      marginBottom: responsive.spacing[4],
      gap: responsive.spacing[2],
    },
    strengthItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    strengthIcon: {
      width: ms(16),
      height: ms(16),
      borderRadius: ms(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    strengthIconValid: {
      backgroundColor: theme.colors.success.light,
    },
    strengthIconInvalid: {
      backgroundColor: theme.colors.background.tertiary,
    },
    strengthLabel: {
      ...theme.typography.styles.bodySmall,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    strengthLabelValid: {
      color: theme.colors.success.main,
    },
    strengthLabelInvalid: {
      color: theme.colors.text.secondary,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: responsive.spacing[6],
      gap: responsive.spacing[4],
    },
    checkbox: {
      width: ms(20),
      height: ms(20),
      borderRadius: ms(4),
      borderWidth: 2,
      borderColor: theme.colors.border.main,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary[500],
      borderColor: theme.colors.primary[500],
    },
    checkboxLabel: {
      ...theme.typography.styles.bodySmall,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
      color: theme.colors.text.secondary,
      flex: 1,
    },
    link: {
      color: theme.colors.primary[500],
      fontWeight: '600',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: responsive.spacing[6],
      gap: responsive.spacing[4],
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border.light,
    },
    dividerText: {
      ...theme.typography.styles.caption,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.4,
      color: theme.colors.text.tertiary,
    },
    socialButton: {
      marginBottom: responsive.spacing[4],
    },
    socialContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[4],
    },
    socialIcon: {
      fontSize: responsive.fontSize.md,
      fontWeight: 'bold',
    },
    socialText: {
      ...theme.typography.styles.button,
      fontSize: responsive.fontSize.base,
      lineHeight: responsive.fontSize.base * 1.5,
      color: theme.colors.text.primary,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: responsive.spacing[4],
      paddingBottom: responsive.spacing[8],
    },
    loginText: {
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.base,
      lineHeight: responsive.fontSize.base * 1.5,
      color: theme.colors.text.secondary,
    },
    loginLink: {
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.base,
      lineHeight: responsive.fontSize.base * 1.5,
      color: theme.colors.primary[500],
      fontWeight: '600',
    },
  });

  return (
    <Screen scrollable={false} backgroundColor={theme.colors.background.primary}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={responsive.layout.iconMd} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Start budgeting smarter in minutes</Text>

          {/* Email Input */}
          <Input
            label="Email Address"
            placeholder="your@email.com"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {/* Password Input */}
          <Input
            label="Password"
            placeholder="Min 8 characters"
            value={formData.password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={responsive.layout.iconSm}
                  color={theme.colors.text.tertiary}
                />
              </TouchableOpacity>
            }
          />

          {/* Password Strength Indicator */}
          {formData.password && (
            <View style={styles.strengthContainer}>
              <StrengthItem
                label="At least 8 characters"
                valid={passwordStrength.length}
              />
              <StrengthItem
                label="Contains a number"
                valid={passwordStrength.number}
              />
              <StrengthItem
                label="Contains special character"
                valid={passwordStrength.special}
              />
            </View>
          )}

          {/* Confirm Password Input */}
          <Input
            label="Confirm Password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChangeText={(value) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            secureTextEntry={!showConfirmPassword}
            error={
              formData.confirmPassword && !passwordsMatch
                ? "Passwords don't match"
                : undefined
            }
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={responsive.layout.iconSm}
                  color={theme.colors.text.tertiary}
                />
              </TouchableOpacity>
            }
          />

          {/* Terms Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() =>
              setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })
            }
          >
            <View
              style={[
                styles.checkbox,
                formData.agreeToTerms && styles.checkboxChecked,
              ]}
            >
              {formData.agreeToTerms && (
                <Ionicons name="checkmark" size={ms(16)} color="white" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the{' '}
              <Text style={styles.link}>Terms of Service</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <Button
            variant="primary"
            fullWidth
            size="large"
            disabled={!canSubmit}
            onPress={() => {
              // TODO: Handle signup API call
              router.push('/auth/tutorial');
            }}
          >
            Create Account
          </Button>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Sign Up */}
          <Button variant="secondary" fullWidth style={styles.socialButton}>
            <View style={styles.socialContent}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Sign up with Google</Text>
            </View>
          </Button>

          <Button variant="secondary" fullWidth style={styles.socialButton}>
            <View style={styles.socialContent}>
              <Ionicons name="logo-apple" size={responsive.layout.iconSm} color={theme.colors.text.primary} />
              <Text style={styles.socialText}>Sign up with Apple</Text>
            </View>
          </Button>

          {/* Already Have Account */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already a member? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

// Password Strength Item Component
function StrengthItem({ label, valid }: { label: string; valid: boolean }) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const styles = StyleSheet.create({
    strengthItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    strengthIcon: {
      width: ms(16),
      height: ms(16),
      borderRadius: ms(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    strengthIconValid: {
      backgroundColor: theme.colors.success.light,
    },
    strengthIconInvalid: {
      backgroundColor: theme.colors.background.tertiary,
    },
    strengthLabel: {
      ...theme.typography.styles.bodySmall,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
    },
    strengthLabelValid: {
      color: theme.colors.success.main,
    },
    strengthLabelInvalid: {
      color: theme.colors.text.secondary,
    },
  });

  return (
    <View style={styles.strengthItem}>
      <View
        style={[
          styles.strengthIcon,
          valid ? styles.strengthIconValid : styles.strengthIconInvalid,
        ]}
      >
        <Ionicons
          name={valid ? 'checkmark' : 'close'}
          size={ms(12)}
          color={valid ? theme.colors.success.main : theme.colors.text.tertiary}
        />
      </View>
      <Text
        style={[
          styles.strengthLabel,
          valid ? styles.strengthLabelValid : styles.strengthLabelInvalid,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}