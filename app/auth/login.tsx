import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useScreenTracker } from '@/utils/screenTracker';

export default function LoginScreen() {
  useScreenTracker('LoginScreen');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const canSubmit = formData.email && formData.password;

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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log in to continue managing your budget</Text>
          </View>

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
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
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

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() =>
                setFormData({ ...formData, rememberMe: !formData.rememberMe })
              }
            >
              <View
                style={[
                  styles.checkbox,
                  formData.rememberMe && styles.checkboxChecked,
                ]}
              >
                {formData.rememberMe && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/auth/forgot-password')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Button
            variant="primary"
            fullWidth
            size="large"
            disabled={!canSubmit}
            onPress={() => {
              /* Handle login */
            }}
          >
            Login
          </Button>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Biometric Login */}
          <Button
            variant="secondary"
            fullWidth
            style={styles.biometricButton}
            onPress={() => {
              /* Handle biometric login */
            }}
          >
            <View style={styles.biometricContent}>
              <Ionicons name="finger-print" size={24} color={theme.colors.primary[600]} />
              <Text style={styles.biometricText}>Login with Face ID</Text>
            </View>
          </Button>

          {/* Social Login */}
          <Button variant="secondary" fullWidth style={styles.socialButton}>
            <View style={styles.socialContent}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Continue with Google</Text>
            </View>
          </Button>

          <Button variant="secondary" fullWidth style={styles.socialButton}>
            <View style={styles.socialContent}>
              <Ionicons name="logo-apple" size={20} color={theme.colors.text.primary} />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </View>
          </Button>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>New here? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: theme.responsive.spacing.md,
  },
  backButton: {
    width: theme.responsive.moderateScale(40),
    height: theme.responsive.moderateScale(40),
    borderRadius: theme.responsive.moderateScale(20),
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: theme.responsive.getScreenPadding(),
  },
  titleContainer: {
    marginBottom: theme.responsive.spacing.xl,
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
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  checkbox: {
    width: theme.responsive.scale(16),
    height: theme.responsive.scale(16),
    borderRadius: theme.responsive.scale(4),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  checkboxLabel: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.text.secondary,
  },
  forgotPassword: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.responsive.spacing.lg,
    gap: theme.responsive.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  dividerText: {
    ...theme.typography.styles.caption,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
  },
  biometricButton: {
    marginBottom: theme.responsive.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary[600],
  },
  biometricContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.md,
  },
  biometricText: {
    ...theme.typography.styles.button,
    fontSize: theme.responsive.fontSize.button,
    color: theme.colors.primary[600],
  },
  socialButton: {
    marginBottom: theme.responsive.spacing.md,
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.md,
  },
  socialIcon: {
    fontSize: theme.responsive.fontSize.large,
    fontWeight: 'bold',
  },
  socialText: {
    ...theme.typography.styles.button,
    fontSize: theme.responsive.fontSize.button,
    color: theme.colors.text.primary,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.responsive.spacing.md,
    paddingBottom: theme.responsive.spacing.xl,
  },
  signupText: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
  },
  signupLink: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
});
