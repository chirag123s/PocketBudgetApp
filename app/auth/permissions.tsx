import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

type PermissionScreen = 'notifications' | 'biometric';

export default function PermissionsScreen() {
  const router = useRouter();
  const [screen, setScreen] = useState<PermissionScreen>('notifications');

  const handleEnableNotifications = () => {
    // TODO: Request notification permissions
    setScreen('biometric');
  };

  const handleEnableBiometrics = () => {
    // TODO: Request biometric permissions
    router.replace('/bank/intro');
  };

  const handleSkip = () => {
    if (screen === 'notifications') {
      setScreen('biometric');
    } else {
      router.replace('/bank/intro');
    }
  };

  // Notifications Permission Screen
  if (screen === 'notifications') {
    return (
      <Screen scrollable={false}>
        <View style={styles.container}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, styles.progressBarActive]} />
            <View style={styles.progressBar} />
          </View>

          <View style={styles.content}>
            {/* Icon with Badge */}
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[theme.colors.primary[400], theme.colors.primary[600]]}
                style={styles.gradientCircle}
              >
                <Ionicons name="notifications" size={64} color="white" />
              </LinearGradient>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>

            <Text style={styles.title}>Stay on top of bills</Text>
            <Text style={styles.description}>
              Get reminders when bills are due and budgets hit limits so you never miss a payment
            </Text>

            <Button
              variant="primary"
              fullWidth
              size="large"
              onPress={handleEnableNotifications}
            >
              Enable Notifications
            </Button>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>Skip for Now</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoText}>
            You can change this anytime in Settings
          </Text>
        </View>
      </Screen>
    );
  }

  // Biometric Permission Screen
  return (
    <Screen scrollable={false}>
      <View style={styles.container}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={[styles.progressBar, styles.progressBarActive]} />
        </View>

        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[theme.colors.info.light, theme.colors.info.main]}
              style={styles.gradientCircle}
            >
              <Ionicons name="finger-print" size={64} color="white" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Quick & secure login</Text>
          <Text style={styles.description}>
            Use Face ID or Touch ID to access your budget instantly without typing passwords
          </Text>

          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={handleEnableBiometrics}
          >
            Enable Biometrics
          </Button>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipText}>Use Password Instead</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          Your biometric data never leaves your device
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.responsive.getScreenPadding(),
  },
  progressContainer: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: theme.responsive.scale(4),
    backgroundColor: theme.colors.neutral[200],
    borderRadius: theme.responsive.scale(2),
  },
  progressBarActive: {
    backgroundColor: theme.colors.primary[600],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: theme.responsive.spacing.xl,
    position: 'relative',
  },
  gradientCircle: {
    width: theme.responsive.moderateScale(128),
    height: theme.responsive.moderateScale(128),
    borderRadius: theme.responsive.moderateScale(64),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: theme.responsive.scale(-8),
    right: theme.responsive.scale(-8),
    width: theme.responsive.moderateScale(32),
    height: theme.responsive.moderateScale(32),
    borderRadius: theme.responsive.moderateScale(16),
    backgroundColor: theme.colors.danger.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...theme.typography.styles.caption,
    fontSize: theme.responsive.fontSize.caption,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: theme.responsive.fontSize.h1,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  description: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.xxl,
    maxWidth: theme.responsive.moderateScale(320),
  },
  skipButton: {
    marginTop: theme.responsive.spacing.md,
    padding: theme.responsive.spacing.sm,
  },
  skipText: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
  },
  infoText: {
    ...theme.typography.styles.caption,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
});
