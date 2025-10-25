import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type PlanType = 'monthly' | 'annual';

const features = [
  'Unlimited accounts',
  'Custom budget periods',
  'Subscription audit',
  'Advanced analytics',
  'Goal tracking',
  'Shared budgets',
  '2+ years history',
  'Priority support',
];

export default function UpgradeToPremium() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('annual');

  const handleStartTrial = () => {
    // Handle trial start
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.placeholder} />
        <Text style={styles.headerTitle}>Upgrade to Premium ⭐</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={28} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Illustration */}
        <LinearGradient
          colors={[theme.colors.primary[100], '#DBEAFE']}
          style={styles.heroCard}
        >
          <Text style={styles.heroEmoji}>⭐</Text>
          <Text style={styles.heroTitle}>Go Premium</Text>
          <Text style={styles.heroSubtitle}>Unlock the full power of PocketBudget</Text>
        </LinearGradient>

        {/* Features List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Everything in Premium:</Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark" size={16} color={theme.colors.success.main} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Plan Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose Your Plan</Text>

          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planOption,
              selectedPlan === 'monthly' && styles.planOptionSelected,
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planLeft}>
              <View style={styles.radioCircle}>
                {selectedPlan === 'monthly' && <View style={styles.radioCircleInner} />}
              </View>
              <View>
                <Text style={styles.planName}>Monthly</Text>
                <Text style={styles.planSubtitle}>Flexible billing</Text>
              </View>
            </View>
            <View style={styles.planRight}>
              <Text style={styles.planPrice}>$6.99</Text>
              <Text style={styles.planPeriod}>per month</Text>
            </View>
          </TouchableOpacity>

          {/* Annual Plan */}
          <TouchableOpacity
            style={[
              styles.planOption,
              selectedPlan === 'annual' && styles.planOptionSelected,
            ]}
            onPress={() => setSelectedPlan('annual')}
          >
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsBadgeText}>Save $14! 🏷️</Text>
            </View>
            <View style={styles.planLeft}>
              <View style={styles.radioCircle}>
                {selectedPlan === 'annual' && <View style={styles.radioCircleInner} />}
              </View>
              <View>
                <Text style={styles.planName}>Annual</Text>
                <Text style={styles.planSubtitle}>Best value</Text>
              </View>
            </View>
            <View style={styles.planRight}>
              <Text style={styles.planPrice}>$69</Text>
              <Text style={styles.planPeriod}>per year</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CTA Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={handleStartTrial}
          style={styles.ctaButton}
        >
          Start Free 7-Day Trial
        </Button>

        <Text style={styles.priceInfo}>
          Then ${selectedPlan === 'monthly' ? '6.99/month' : '69/year'}
        </Text>

        {/* Fine Print */}
        <Text style={styles.finePrint}>
          Cancel anytime • No commitment • Secure payment
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  heroCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.xl,
    marginBottom: theme.responsive.spacing.lg,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: theme.responsive.moderateScale(64),
    marginBottom: theme.responsive.spacing.md,
  },
  heroTitle: {
    fontSize: theme.responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.sm,
  },
  heroSubtitle: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.md,
  },
  featuresContainer: {
    gap: theme.responsive.spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: theme.responsive.scale(24),
    height: theme.responsive.scale(24),
    backgroundColor: theme.colors.success.light,
    borderRadius: theme.responsive.scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  featureText: {
    ...theme.typography.styles.body,
  },
  planOption: {
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  planOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[600],
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioCircle: {
    width: theme.responsive.scale(20),
    height: theme.responsive.scale(20),
    borderRadius: theme.responsive.scale(10),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  radioCircleInner: {
    width: theme.responsive.scale(12),
    height: theme.responsive.scale(12),
    borderRadius: theme.responsive.scale(6),
    backgroundColor: theme.colors.primary[600],
  },
  planName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  planSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: theme.responsive.fontSize.h4,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  planPeriod: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
  savingsBadge: {
    position: 'absolute',
    top: -8,
    right: theme.responsive.spacing.md,
    backgroundColor: theme.colors.warning.main,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
  },
  savingsBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '700',
  },
  ctaButton: {
    marginBottom: theme.responsive.spacing.sm,
  },
  priceInfo: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  finePrint: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});
