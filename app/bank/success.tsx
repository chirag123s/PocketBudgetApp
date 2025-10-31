import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export default function ImportSuccess() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    backgroundTertiary: theme.colors.background.tertiary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    primary: theme.colors.primary[500],
    primaryDark: theme.colors.primary[600],
    primaryLight: theme.colors.primary[200],
    success: theme.colors.success.main,
    infoLight: theme.colors.info.light,
    infoDark: theme.colors.info.dark,
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
      marginBottom: responsive.spacing[2],
      color: colors.textPrimary,
    },
    message: {
      ...theme.typography.styles.h4,
      textAlign: 'center',
      color: colors.textSecondary,
      marginBottom: responsive.spacing[8],
    },
    messageHighlight: {
      fontWeight: '600',
      color: colors.primaryDark,
    },
    accountsCard: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 20,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[8],
    },
    bankHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[2],
    },
    bankLogo: {
      width: 40,
      height: 40,
      backgroundColor: colors.backgroundTertiary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bankLogoText: {
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
    },
    bankName: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    accountsList: {
      gap: responsive.spacing[1],
      marginLeft: 48,
    },
    accountItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    accountName: {
      ...theme.typography.styles.bodySmall,
      color: colors.textSecondary,
    },
    nextStepCard: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: colors.infoLight,
      borderRadius: 20,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
    },
    nextStepTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: colors.infoDark,
      marginBottom: responsive.spacing[1],
    },
    nextStepDescription: {
      ...theme.typography.styles.bodySmall,
      color: colors.infoDark,
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 400,
    },
    skipButton: {
      paddingVertical: responsive.spacing[2],
      alignItems: 'center',
      marginTop: responsive.spacing[2],
    },
    skipButtonText: {
      ...theme.typography.styles.button,
      color: colors.textSecondary,
    },
  });

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
    <Screen backgroundColor={colors.background}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
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
              <Ionicons name="checkmark" size={16} color={colors.success} />
              <Text style={styles.accountName}>Smart Access</Text>
            </View>
            <View style={styles.accountItem}>
              <Ionicons name="checkmark" size={16} color={colors.success} />
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
