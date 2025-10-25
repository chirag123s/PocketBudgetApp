import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SyncingInProgress() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Spinning animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Pulse animation
  useEffect(() => {
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

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to success screen after completion
          setTimeout(() => {
            router.push('/bank/success');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Complete in ~5 seconds

    return () => clearInterval(interval);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Screen backgroundColor={theme.colors.background.primary}>
      <View style={styles.container}>
        {/* Animated Icon */}
        <View style={styles.iconContainer}>
          <Animated.View
            style={[
              styles.pulseCircle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />
          <View style={styles.iconCircle}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="sync" size={64} color="white" />
            </Animated.View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Importing your{'\n'}transactions...
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        {/* Status Messages */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Finding transactions from the last 3 months
          </Text>
          <Text style={styles.statusSubtext}>
            This usually takes 30-60 seconds
          </Text>
        </View>
      </View>

      {/* Footer Text */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Keep this screen open until the import completes
        </Text>
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
    marginBottom: theme.responsive.spacing.xl,
    color: theme.colors.text.primary,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: theme.responsive.spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.responsive.spacing.sm,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  statusSubtext: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});
