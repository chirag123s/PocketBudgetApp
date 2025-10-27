import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useScreenTracker } from '@/utils/screenTracker';

interface PasswordStrength {
  length: boolean;
  number: boolean;
  special: boolean;
}

export default function SignUpScreen() {
  useScreenTracker('SignUpScreen');
  const router = useRouter();
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

  return (
    <Screen scrollable={false} backgroundColor={theme.colors.background.primary}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
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
                  size={20}
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
                  size={20}
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
                <Ionicons name="checkmark" size={16} color="white" />
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
              <Ionicons name="logo-apple" size={20} color={theme.colors.text.primary} />
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
          size={12}
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

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing[4],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: theme.spacing[6],
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: 32,
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    ...theme.typography.styles.body,
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[8],
  },
  strengthContainer: {
    marginTop: -theme.spacing[2],
    marginBottom: theme.spacing[4],
    gap: theme.spacing[2],
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  strengthIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
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
    fontSize: 14,
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
    marginBottom: theme.spacing[6],
    gap: theme.spacing[4],
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
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
    fontSize: 14,
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
    marginVertical: theme.spacing[6],
    gap: theme.spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  dividerText: {
    ...theme.typography.styles.caption,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  socialButton: {
    marginBottom: theme.spacing[4],
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    ...theme.typography.styles.button,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing[4],
    paddingBottom: theme.spacing[8],
  },
  loginText: {
    ...theme.typography.styles.body,
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  loginLink: {
    ...theme.typography.styles.body,
    fontSize: 16,
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
});
