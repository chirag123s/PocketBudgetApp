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
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing[8],
    marginBottom: theme.spacing[6],
  },
  title: {
    ...theme.typography.styles.h1,
    fontSize: 32,
    textAlign: 'center',
  },
  illustrationContainer: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: 20,
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[8],
  },
  illustrationIcon: {
    fontSize: 64,
  },
  descriptionCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    marginBottom: theme.spacing[6],
    ...theme.shadows.sm,
  },
  descriptionText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing[4],
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
    marginHorizontal: theme.spacing[1],
  },
  timeText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  benefitsContainer: {
    gap: theme.spacing[2],
    marginBottom: theme.spacing[8],
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    ...theme.shadows.sm,
  },
  checkmarkContainer: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary[100],
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[2],
  },
  checkmark: {
    fontSize: 20,
    color: theme.colors.primary[600],
  },
  benefitText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  primaryButton: {
    marginBottom: theme.spacing[2],
  },
  secondaryButton: {
    marginBottom: theme.spacing[8],
  },
  templatesCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
  },
  templatesLabel: {
    ...theme.typography.styles.label,
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginBottom: theme.spacing[2],
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
  templateChip: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: 6,
  },
  templateChipText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
  },
});
