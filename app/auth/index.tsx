import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Pulse animation for the logo
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

    // Navigate to welcome screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/auth/welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[theme.colors.primary[500], theme.colors.primary[700]]}
      style={styles.container}
    >
      {/* Logo */}
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>$</Text>
        </View>
      </Animated.View>

      {/* App Name */}
      <Text style={styles.appName}>PocketBudget</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>
        The Aussie budgeting app{'\n'}you've been waiting for
      </Text>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
          <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
          <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
        </View>
      </View>

      {/* Version */}
      <Text style={styles.version}>v1.0.0</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: theme.responsive.spacing.xl,
  },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: theme.colors.primary[500],
  },
  appName: {
    ...theme.typography.styles.h1,
    fontSize: 36,
    color: theme.colors.text.inverse,
    marginBottom: theme.responsive.spacing.sm,
  },
  tagline: {
    ...theme.typography.styles.body,
    color: theme.colors.text.inverse,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: theme.responsive.spacing.xxl,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background.primary,
  },
  version: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    ...theme.typography.styles.caption,
    color: theme.colors.text.inverse,
    opacity: 0.6,
  },
});
