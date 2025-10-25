import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Feature {
  icon: string;
  text: string;
  available: boolean;
}

const freeFeatures: Feature[] = [
  { icon: 'checkmark-circle', text: '2 bank accounts', available: true },
  { icon: 'checkmark-circle', text: '10 categories', available: true },
  { icon: 'checkmark-circle', text: '3 months history', available: true },
  { icon: 'checkmark-circle', text: 'Monthly budgets', available: true },
];

const premiumFeatures: Feature[] = [
  { icon: 'close-circle', text: 'Credit card cycles', available: false },
  { icon: 'close-circle', text: 'Unlimited accounts', available: false },
  { icon: 'close-circle', text: 'Subscription audit', available: false },
  { icon: 'close-circle', text: 'Advanced analytics', available: false },
];

export default function SubscriptionManagement() {
  const router = useRouter();

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Current Plan */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Current Plan</Text>
          <View style={styles.planHeader}>
            <Text style={styles.planEmoji}>🆓</Text>
            <Text style={styles.planName}>Free</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Upgrade to unlock credit card cycle budgeting and more premium features
            </Text>
          </View>
        </View>

        {/* What You Get */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you get:</Text>

          {freeFeatures.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Ionicons
                name={feature.icon as any}
                size={20}
                color={theme.colors.success.main}
              />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Premium Features (Locked) */}
        <View style={styles.card}>
          <View style={styles.premiumHeader}>
            <Text style={styles.cardTitle}>Premium features:</Text>
            <View style={styles.lockedBadge}>
              <Text style={styles.lockedBadgeText}>Locked</Text>
            </View>
          </View>

          {premiumFeatures.map((feature, index) => (
            <View key={index} style={[styles.featureRow, styles.featureRowLocked]}>
              <Ionicons
                name={feature.icon as any}
                size={20}
                color={theme.colors.text.tertiary}
              />
              <Text style={styles.featureTextLocked}>{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Upgrade CTA */}
        <LinearGradient
          colors={[theme.colors.primary[600], theme.colors.primary[700]]}
          style={styles.upgradeCard}
        >
          <Text style={styles.upgradeTitle}>Upgrade to Premium ⭐</Text>
          <Text style={styles.upgradeSubtitle}>
            Unlock all features and take full control of your budget
          </Text>

          <View style={styles.pricingBox}>
            <Text style={styles.priceMain}>$6.99/month</Text>
            <Text style={styles.priceSub}>or $69/year (save $14)</Text>
          </View>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => router.push('/settings/upgrade')}
          >
            <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Benefits Highlight */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsText}>
            ✨ 7-day free trial • Cancel anytime • No commitments
          </Text>
        </View>
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
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  sectionLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.sm,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  planEmoji: {
    fontSize: theme.responsive.fontSize.h1,
    marginRight: theme.responsive.spacing.sm,
  },
  planName: {
    fontSize: theme.responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  infoBox: {
    backgroundColor: theme.colors.info.light,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
  },
  infoText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  featureRowLocked: {
    opacity: 0.6,
  },
  featureText: {
    ...theme.typography.styles.body,
    marginLeft: theme.responsive.spacing.sm,
  },
  featureTextLocked: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    marginLeft: theme.responsive.spacing.sm,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.md,
  },
  lockedBadge: {
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
  },
  lockedBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '600',
  },
  upgradeCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.lg,
  },
  upgradeTitle: {
    fontSize: theme.responsive.fontSize.h4,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: theme.responsive.spacing.sm,
  },
  upgradeSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.responsive.spacing.md,
  },
  pricingBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.md,
  },
  priceMain: {
    fontSize: theme.responsive.fontSize.h3,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  priceSub: {
    ...theme.typography.styles.bodySmall,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  upgradeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
  },
  upgradeButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontWeight: '700',
  },
  benefitsCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    ...theme.shadows.sm,
  },
  benefitsText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
