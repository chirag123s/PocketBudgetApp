import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export default function BankConnectionIntro() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const features = [
    {
      title: 'We never see your bank password',
      description: 'Your credentials stay with your bank',
    },
    {
      title: 'Read-only access',
      description: "We can't move money or make changes",
    },
    {
      title: 'Powered by Australian CDR',
      description: 'Government-backed Open Banking',
    },
    {
      title: 'Bank-grade encryption',
      description: 'Your data is always protected',
    },
  ];

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    primaryDark: theme.colors.primary[600],
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: responsive.spacing[6],
      justifyContent: 'space-between',
    },
    illustrationContainer: {
      alignItems: 'center',
      marginTop: responsive.spacing[8],
      position: 'relative',
    },
    mainIllustration: {
      width: 160,
      height: 160,
      borderRadius: 24,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.lg,
    },
    shieldBadge: {
      position: 'absolute',
      bottom: -12,
      right: -12,
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.lg,
    },
    title: {
      ...theme.typography.styles.h1,
      fontSize: responsive.fontSize.h2,
      lineHeight: responsive.fontSize.h2 * 1.5,
      textAlign: 'center',
      marginTop: responsive.spacing[8],
      color: colors.textPrimary,
    },
    featuresList: {
      gap: responsive.spacing[4],
    },
    featureItem: {
      flexDirection: 'row',
      gap: responsive.spacing[2],
    },
    checkmark: {
      fontSize: responsive.fontSize.lg,
      lineHeight: responsive.fontSize.lg * 1.5,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: responsive.spacing[1],
    },
    featureDescription: {
      ...theme.typography.styles.bodySmall,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
      color: colors.textSecondary,
    },
    buttonContainer: {
      gap: responsive.spacing[4],
    },
    learnMore: {
      ...theme.typography.styles.button,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      color: colors.textSecondary,
      textAlign: 'center',
      paddingVertical: responsive.spacing[2],
    },
    securityNotice: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: responsive.spacing[1],
      paddingBottom: responsive.spacing[4],
    },
    securityText: {
      ...theme.typography.styles.caption,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: colors.textTertiary,
    },
  });

  return (
    <Screen scrollable={false} backgroundColor={colors.background}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.mainIllustration}>
            <Ionicons name="business" size={80} color="white" />
          </View>
          <View style={styles.shieldBadge}>
            <Ionicons name="shield-checkmark" size={32} color={colors.primaryDark} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Safe & Secure{'\n'}Bank Connection
        </Text>

        {/* Features List */}
        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.checkmark}>✅</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={() => router.push('/bank/select')}
          >
            Continue
          </Button>

          <TouchableOpacity onPress={() => {/* Show learn more modal */}}>
            <Text style={styles.learnMore}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Ionicons name="lock-closed" size={12} color={colors.textTertiary} />
          <Text style={styles.securityText}>
            Your data is encrypted and never sold
          </Text>
        </View>
      </View>
    </Screen>
  );
}
