import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

const templates = ['Single person', 'Couple', 'Family', 'Student', 'Homeowner'];

const benefits = [
  'Track spending by category',
  'Stay within your limits',
  'Achieve your financial goals',
];

export default function BudgetSetupWelcome() {
  const router = useRouter();

  return (
    <Screen scrollable={false} backgroundColor={theme.colors.background.secondary}>
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

const styles = StyleSheet.create({
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.responsive.spacing.xl,
    marginBottom: theme.responsive.spacing.lg,
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: theme.responsive.fontSize.h1,
    textAlign: 'center',
  },
  illustrationContainer: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.responsive.scale(20),
    height: theme.responsive.moderateScale(192),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.responsive.spacing.xl,
  },
  illustrationIcon: {
    fontSize: theme.responsive.moderateScale(64),
  },
  descriptionCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.sm,
  },
  descriptionText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.responsive.spacing.md,
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
    backgroundColor: theme.colors.primary[500],
    marginHorizontal: theme.responsive.spacing.xs,
  },
  timeText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  benefitsContainer: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.xl,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  checkmarkContainer: {
    width: theme.responsive.moderateScale(40),
    height: theme.responsive.moderateScale(40),
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.responsive.scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  checkmark: {
    fontSize: theme.responsive.fontSize.h4,
    color: theme.colors.primary[600],
  },
  benefitText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  primaryButton: {
    marginBottom: theme.responsive.spacing.sm,
  },
  secondaryButton: {
    marginBottom: theme.responsive.spacing.xl,
  },
  templatesCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
  },
  templatesLabel: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.responsive.spacing.sm,
  },
  templateChip: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 6,
  },
  templateChipText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
  },
});
