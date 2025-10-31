import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export default function SyncingInProgress() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    background: theme.colors.background.primary,
    backgroundTertiary: theme.colors.background.tertiary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    primaryDark: theme.colors.primary[600],
    primaryLight: theme.colors.primary[200],
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[6],
    },
    iconContainer: {
      position: 'relative',
      marginBottom: responsive.spacing[8],
      alignItems: 'center',
      justifyContent: 'center',
    },
    pulseCircle: {
      position: 'absolute',
      width: 128,
      height: 128,
      borderRadius: 64,
      borderWidth: 4,
      borderColor: colors.primaryLight,
    },
    iconCircle: {
      width: 128,
      height: 128,
      borderRadius: 64,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.lg,
    },
    title: {
      ...theme.typography.styles.h1,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      textAlign: 'center',
      marginBottom: responsive.spacing[8],
      color: colors.textPrimary,
    },
    progressContainer: {
      width: '100%',
      maxWidth: 300,
      marginBottom: responsive.spacing[6],
    },
    progressBar: {
      width: '100%',
      height: 12,
      backgroundColor: colors.backgroundTertiary,
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primaryDark,
      borderRadius: theme.borderRadius.full,
    },
    progressText: {
      ...theme.typography.styles.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: responsive.spacing[2],
    },
    statusContainer: {
      alignItems: 'center',
    },
    statusText: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: responsive.spacing[2],
    },
    statusSubtext: {
      ...theme.typography.styles.bodySmall,
      color: colors.textTertiary,
      textAlign: 'center',
    },
    footer: {
      paddingHorizontal: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
      alignItems: 'center',
    },
    footerText: {
      ...theme.typography.styles.caption,
      color: colors.textTertiary,
      textAlign: 'center',
    },
  });

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
    <Screen backgroundColor={colors.background}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
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
