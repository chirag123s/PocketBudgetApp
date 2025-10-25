import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function BankConnectionIntro() {
  const router = useRouter();

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

  return (
    <Screen scrollable={false} backgroundColor={theme.colors.background.primary}>
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.mainIllustration}>
            <Ionicons name="business" size={80} color="white" />
          </View>
          <View style={styles.shieldBadge}>
            <Ionicons name="shield-checkmark" size={32} color={theme.colors.primary[600]} />
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
          <Ionicons name="lock-closed" size={12} color={theme.colors.text.tertiary} />
          <Text style={styles.securityText}>
            Your data is encrypted and never sold
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.responsive.getScreenPadding(),
    justifyContent: 'space-between',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: theme.responsive.spacing.xl,
    position: 'relative',
  },
  mainIllustration: {
    width: theme.responsive.moderateScale(160),
    height: theme.responsive.moderateScale(160),
    borderRadius: theme.responsive.scale(24),
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  shieldBadge: {
    position: 'absolute',
    bottom: theme.responsive.scale(-12),
    right: theme.responsive.scale(-12),
    width: theme.responsive.moderateScale(64),
    height: theme.responsive.moderateScale(64),
    borderRadius: theme.responsive.scale(16),
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: theme.responsive.fontSize.h1,
    textAlign: 'center',
    marginTop: theme.responsive.spacing.xl,
  },
  featuresList: {
    gap: theme.responsive.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  checkmark: {
    fontSize: theme.responsive.fontSize.large,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.xs,
  },
  featureDescription: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.text.secondary,
  },
  buttonContainer: {
    gap: theme.responsive.spacing.md,
  },
  learnMore: {
    ...theme.typography.styles.button,
    fontSize: theme.responsive.fontSize.button,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    paddingVertical: theme.responsive.spacing.sm,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.responsive.spacing.xs,
    paddingBottom: theme.responsive.spacing.md,
  },
  securityText: {
    ...theme.typography.styles.caption,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
  },
});
