import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';

const templates = ['Single person', 'Couple', 'Family', 'Student', 'Homeowner'];

const benefits = [
  'Track spending by category',
  'Stay within your limits',
  'Achieve your financial goals',
];

export default function BudgetSetupWelcome() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    background: theme.colors.background.secondary,
    backgroundPrimary: theme.colors.background.primary,
    backgroundTertiary: theme.colors.background.tertiary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    primary50: theme.colors.primary[50],
    primary100: theme.colors.primary[100],
    primary600: theme.colors.primary[600],
    borderLight: theme.colors.border.light,
  };

  const styles = StyleSheet.create({
    content: {
      padding: responsive.spacing[6],
      paddingBottom: responsive.spacing[8],
    },
    header: {
      alignItems: 'center',
      marginTop: responsive.spacing[8],
      marginBottom: responsive.spacing[6],
    },
    title: {
      ...theme.typography.styles.h1,
      fontSize: responsive.fontSize.h2,
      lineHeight: responsive.fontSize.h2 * 1.5,
      textAlign: 'center',
      color: colors.textPrimary,
    },
    illustrationContainer: {
      backgroundColor: colors.primary50,
      borderRadius: 20,
      height: 192,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsive.spacing[8],
    },
    illustrationIcon: {
      fontSize: 64,
    },
    descriptionCard: {
      backgroundColor: colors.backgroundPrimary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[6],
      ...theme.shadows.sm,
    },
    descriptionText: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: responsive.spacing[4],
    },
    timeIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.primary,
      marginHorizontal: responsive.spacing[1],
    },
    timeText: {
      ...theme.typography.styles.bodySmall,
      color: colors.textTertiary,
    },
    benefitsContainer: {
      gap: responsive.spacing[2],
      marginBottom: responsive.spacing[8],
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundPrimary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    checkmarkContainer: {
      width: 40,
      height: 40,
      backgroundColor: colors.primary100,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[2],
    },
    checkmark: {
      fontSize: responsive.fontSize.xl,
      lineHeight: responsive.fontSize.xl * 1.5,
      color: colors.primary600,
    },
    benefitText: {
      ...theme.typography.styles.body,
      color: colors.textSecondary,
      flex: 1,
    },
    primaryButton: {
      marginBottom: responsive.spacing[2],
    },
    secondaryButton: {
      marginBottom: responsive.spacing[8],
    },
    templatesCard: {
      backgroundColor: colors.backgroundTertiary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
    },
    templatesLabel: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: colors.textSecondary,
      fontWeight: '600',
      marginBottom: responsive.spacing[2],
    },
    templatesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsive.spacing[2],
    },
    templateChip: {
      backgroundColor: colors.backgroundPrimary,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 6,
    },
    templateChipText: {
      ...theme.typography.styles.caption,
      color: colors.textSecondary,
    },
  });

  return (
    <Screen scrollable={false} backgroundColor={colors.background}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Let's Create Your{'\n'}First Budget 💰
          </Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationIcon}>📊</Text>
        </View>

        {/* Description Card */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>
            A budget helps you understand where your money goes and stay on track
          </Text>
          <View style={styles.timeIndicator}>
            <View style={styles.dot} />
            <Text style={styles.timeText}>This takes 3 minutes</Text>
            <View style={styles.dot} />
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Primary CTA */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => router.push('/budget/period')}
          style={styles.primaryButton}
        >
          Get Started
        </Button>

        {/* Secondary CTA */}
        <Button
          variant="secondary"
          fullWidth
          size="large"
          onPress={() => router.push('/budget/templates')}
          style={styles.secondaryButton}
        >
          Use Template
        </Button>

        {/* Template Options */}
        <View style={styles.templatesCard}>
          <Text style={styles.templatesLabel}>QUICK START TEMPLATES</Text>
          <View style={styles.templatesGrid}>
            {templates.map((template, index) => (
              <View key={index} style={styles.templateChip}>
                <Text style={styles.templateChipText}>{template}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
