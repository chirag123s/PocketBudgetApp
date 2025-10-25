import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ImportSuccess() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial scale animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Screen backgroundColor={theme.colors.background.primary}>
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Animated.View
            style={[
              styles.pulseCircle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <Animated.View
            style={[
              styles.iconCircle,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Ionicons name="checkmark-circle" size={64} color="white" />
          </Animated.View>
        </View>

        {/* Title */}
        <Text style={styles.title}>All Set! 🎉</Text>

        {/* Transaction Count */}
        <Text style={styles.message}>
          We imported <Text style={styles.messageHighlight}>234 transactions</Text> from your accounts
        </Text>

        {/* Connected Accounts Card */}
        <View style={styles.accountsCard}>
          <View style={styles.bankHeader}>
            <View style={styles.bankLogo}>
              <Text style={styles.bankLogoText}>🏦</Text>
            </View>
            <Text style={styles.bankName}>Commonwealth Bank</Text>
          </View>
          <View style={styles.accountsList}>
            <View style={styles.accountItem}>
              <Ionicons name="checkmark" size={16} color={theme.colors.success.main} />
              <Text style={styles.accountName}>Smart Access</Text>
            </View>
            <View style={styles.accountItem}>
              <Ionicons name="checkmark" size={16} color={theme.colors.success.main} />
              <Text style={styles.accountName}>Complete Freedom</Text>
            </View>
          </View>
        </View>

        {/* Next Step Card */}
        <View style={styles.nextStepCard}>
          <Text style={styles.nextStepTitle}>Next Step</Text>
          <Text style={styles.nextStepDescription}>
            Let's set up your budget categories
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={() => {
              /* Navigate to budget setup */
            }}
          >
            Create Budget
          </Button>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              /* Navigate to dashboard */
            }}
          >
            <Text style={styles.skipButtonText}>Skip for Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.responsive.getScreenPadding(),
  },
  iconContainer: {
    position: 'relative',
    marginBottom: theme.responsive.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: theme.responsive.moderateScale(128),
    height: theme.responsive.moderateScale(128),
    borderRadius: theme.responsive.moderateScale(64),
    borderWidth: 4,
    borderColor: theme.colors.primary[200],
  },
  iconCircle: {
    width: theme.responsive.moderateScale(128),
    height: theme.responsive.moderateScale(128),
    borderRadius: theme.responsive.moderateScale(64),
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: theme.responsive.fontSize.body,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.sm,
    color: theme.colors.text.primary,
  },
  message: {
    ...theme.typography.styles.h4,
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.xl,
  },
  messageHighlight: {
    fontWeight: '600',
    color: theme.colors.primary[600],
  },
  accountsCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.xl,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.sm,
  },
  bankLogo: {
    width: theme.responsive.moderateScale(40),
    height: theme.responsive.moderateScale(40),
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.responsive.scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankLogoText: {
    fontSize: theme.responsive.fontSize.body,
  },
  bankName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  accountsList: {
    gap: theme.responsive.spacing.xs,
    marginLeft: 48,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  accountName: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  nextStepCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.info.light,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
  },
  nextStepTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
    marginBottom: theme.responsive.spacing.xs,
  },
  nextStepDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  skipButton: {
    paddingVertical: theme.responsive.spacing.sm,
    alignItems: 'center',
    marginTop: theme.responsive.spacing.sm,
  },
  skipButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
  },
});
