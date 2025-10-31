import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Linking,
  StatusBar,
} from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';

interface Feature {
  id: string;
  text: string;
  available: boolean;
}

interface Plan {
  id: string;
  name: string;
  price?: string;
  period?: string;
  description: string;
  features: Feature[];
  isCurrent?: boolean;
  isPopular?: boolean;
}

export default function SubscriptionPlanScreen() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  // Color Palette - Using theme colors
  const colors = {
    // Primary Palette
    primaryDark: theme.colors.info.dark,
    primary: theme.colors.info.main,
    primaryLight: theme.colors.info.light,

    // Neutral Palette
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,

    // Functional Palette
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,

    // Border
    border: theme.colors.border.light,
  };

  // Pricing
  const monthlyPrice = 6.99;
  const yearlyPrice = 69;
  const yearlySavings = (monthlyPrice * 12 - yearlyPrice).toFixed(2);

  const displayPrice = billingPeriod === 'monthly' ? `$${monthlyPrice.toFixed(2)}` : `$${yearlyPrice.toFixed(2)}`;
  const displayPeriod = billingPeriod === 'monthly' ? 'month' : 'year';

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'The essential tools to get your budget started.',
      isCurrent: true,
      features: [
        { id: '1', text: '2 bank accounts', available: true },
        { id: '2', text: '10 categories', available: true },
        { id: '3', text: '3 months history', available: true },
        { id: '4', text: 'Monthly budgets', available: true },
        { id: '5', text: 'Credit card cycles', available: false },
        { id: '6', text: 'Unlimited accounts', available: false },
        { id: '7', text: 'Subscription audit', available: false },
        { id: '8', text: 'Advanced analytics', available: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$6.99',
      period: 'month',
      description: 'Unlock all features and take full control of your budget.',
      isPopular: true,
      features: [
        { id: '1', text: 'All Free features, plus:', available: true },
        { id: '2', text: 'Credit card cycles', available: true },
        { id: '3', text: 'Unlimited accounts', available: true },
        { id: '4', text: 'Subscription audit', available: true },
        { id: '5', text: 'Advanced analytics', available: true },
        { id: '6', text: 'Full history access', available: true },
        { id: '7', text: 'Priority support', available: true },
      ],
    },
  ];

  const handleUpgrade = () => {
    // TODO: Implement payment processing (RevenueCat, Stripe, etc.)
    // This should trigger the App Store/Play Store in-app purchase flow
    console.log('Starting 7-day free trial for', billingPeriod, 'plan');
    // Example: await RevenueCat.purchasePackage(selectedPackage);
  };

  const handleRestorePurchase = () => {
    // Implement restore purchase logic
    console.log('Restore purchase');
  };

  const handleTerms = () => {
    // Open terms and conditions
    Linking.openURL('https://budgetmate.app/terms');
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: ms(160),
    },
    headline: {
      fontSize: settingsTypography.hero,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralDarkest,
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[4],
      paddingBottom: responsive.spacing[1],
      letterSpacing: -0.5,
    },
    subheadline: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.regular,
      color: colors.neutralDark,
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[1],
      paddingBottom: responsive.spacing[4],
      lineHeight: settingsTypography.primary * 1.5,
    },
    billingToggleContainer: {
      flexDirection: 'row',
      marginHorizontal: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[1],
      gap: responsive.spacing[2],
      ...theme.shadows.sm,
    },
    billingToggleButton: {
      flex: 1,
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    billingToggleButtonActive: {
      backgroundColor: colors.primary,
    },
    billingToggleText: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.semibold,
      color: colors.neutralDark,
    },
    billingToggleTextActive: {
      color: colors.neutralWhite,
    },
    savingsBadge: {
      position: 'absolute',
      top: ms(-8),
      right: ms(-12),
      backgroundColor: colors.functionalSuccess,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: responsive.spacing[0.5],
      borderRadius: theme.borderRadius.sm,
    },
    savingsBadgeText: {
      fontSize: settingsTypography.tertiary,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralWhite,
    },
    cardsContainer: {
      paddingHorizontal: responsive.spacing[4],
      gap: responsive.spacing[4],
    },
    planCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      padding: responsive.spacing[6],
      gap: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    premiumCard: {
      borderWidth: 2,
      borderColor: colors.primary,
      position: 'relative',
      marginTop: responsive.spacing[12],
    },
    planCardHeader: {
      gap: responsive.spacing[1],
    },
    planCardHeaderTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    planName: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralDarkest,
    },
    currentBadge: {
      backgroundColor: `${colors.functionalSuccess}15`,
      paddingHorizontal: responsive.spacing[3],
      paddingVertical: responsive.spacing[1],
      borderRadius: theme.borderRadius.lg,
    },
    currentBadgeText: {
      fontSize: settingsTypography.tertiary,
      fontWeight: settingsFontWeights.medium,
      color: colors.functionalSuccess,
      letterSpacing: 0.2,
    },
    planDescription: {
      fontSize: settingsTypography.secondary,
      color: colors.neutralDark,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: responsive.spacing[1],
    },
    priceAmount: {
      fontSize: settingsTypography.hero,
      fontWeight: settingsFontWeights.extrabold,
      color: colors.neutralDarkest,
      letterSpacing: -1,
    },
    pricePeriod: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralDark,
    },
    yearlyPrice: {
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDark,
      marginTop: responsive.spacing[1],
    },
    featuresList: {
      gap: responsive.spacing[3],
      paddingTop: responsive.spacing[2],
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
    },
    featureText: {
      flex: 1,
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDarkest,
    },
    featureTextUnavailable: {
      color: colors.neutralMedium,
    },
    popularBadge: {
      position: 'absolute',
      top: ms(-40),
      left: responsive.spacing[2],
      backgroundColor: `${colors.primary}15`,
      paddingHorizontal: responsive.spacing[3],
      paddingVertical: responsive.spacing[1],
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: `${colors.primary}30`,
    },
    popularBadgeText: {
      fontSize: settingsTypography.tertiary,
      fontWeight: settingsFontWeights.medium,
      color: colors.primary,
      letterSpacing: 0.2,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.neutralBg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[4],
    },
    upgradeButton: {
      height: ms(56),
      borderRadius: theme.borderRadius.lg,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: responsive.spacing[3],
      marginBottom: responsive.spacing[2],
      ...theme.shadows.md,
    },
    upgradeButtonPressed: {
      opacity: 0.9,
    },
    upgradeButtonText: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralWhite,
      letterSpacing: 0.2,
    },
    priceInfoText: {
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDark,
      textAlign: 'center',
      marginTop: responsive.spacing[2],
    },
    benefitsText: {
      fontSize: settingsTypography.tertiary,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDark,
      textAlign: 'center',
      marginTop: responsive.spacing[1],
    },
    footerLinks: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: responsive.spacing[6],
      paddingTop: responsive.spacing[2],
    },
    footerLinkText: {
      fontSize: settingsTypography.tertiary,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralMedium,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader
        title="Your Plan & Features"
        backgroundColor={colors.neutralBg}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Headline */}
        <Text style={styles.headline}>You are on the Free Plan</Text>

        {/* Subheadline */}
        <Text style={styles.subheadline}>
          Upgrade to Premium for credit card cycle budgeting and more premium features.
        </Text>

        {/* Billing Period Toggle */}
        <View style={styles.billingToggleContainer}>
          <Pressable
            style={[
              styles.billingToggleButton,
              billingPeriod === 'monthly' && styles.billingToggleButtonActive,
            ]}
            onPress={() => setBillingPeriod('monthly')}
          >
            <Text
              style={[
                styles.billingToggleText,
                billingPeriod === 'monthly' && styles.billingToggleTextActive,
              ]}
            >
              Monthly
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.billingToggleButton,
              billingPeriod === 'yearly' && styles.billingToggleButtonActive,
            ]}
            onPress={() => setBillingPeriod('yearly')}
          >
            <View>
              <Text
                style={[
                  styles.billingToggleText,
                  billingPeriod === 'yearly' && styles.billingToggleTextActive,
                ]}
              >
                Yearly
              </Text>
              {billingPeriod === 'yearly' && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsBadgeText}>Save ${yearlySavings}</Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        {/* Pricing Cards */}
        <View style={styles.cardsContainer}>
          {/* Free Plan Card */}
          <View style={styles.planCard}>
            {/* Header */}
            <View style={styles.planCardHeader}>
              <View style={styles.planCardHeaderTop}>
                <Text style={styles.planName}>{plans[0].name}</Text>
                {plans[0].isCurrent && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current Plan</Text>
                  </View>
                )}
              </View>
              <Text style={styles.planDescription}>{plans[0].description}</Text>
            </View>

            {/* Features */}
            <View style={styles.featuresList}>
              {plans[0].features.map((feature) => (
                <View key={feature.id} style={styles.featureRow}>
                  <Ionicons
                    name={feature.available ? 'checkmark-circle' : 'lock-closed'}
                    size={20}
                    color={feature.available ? colors.functionalSuccess : colors.neutralMedium}
                  />
                  <Text
                    style={[
                      styles.featureText,
                      !feature.available && styles.featureTextUnavailable,
                    ]}
                  >
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Premium Plan Card */}
          <View style={[styles.planCard, styles.premiumCard]}>
            {/* Popular Badge */}
            {plans[1].isPopular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Most Popular</Text>
              </View>
            )}

            {/* Header */}
            <View style={styles.planCardHeader}>
              <Text style={styles.planName}>{plans[1].name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceAmount}>{displayPrice}</Text>
                <Text style={styles.pricePeriod}>/ {displayPeriod}</Text>
              </View>
              {billingPeriod === 'yearly' && (
                <Text style={styles.yearlyPrice}>Save ${yearlySavings} vs monthly</Text>
              )}
            </View>

            {/* Features */}
            <View style={styles.featuresList}>
              {plans[1].features.map((feature) => (
                <View key={feature.id} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer / CTA Section */}
      <View style={styles.footer}>
        {/* Upgrade Button */}
        <Pressable
          onPress={handleUpgrade}
          style={({ pressed }) => [styles.upgradeButton, pressed && styles.upgradeButtonPressed]}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Text style={styles.upgradeButtonText}>
            Start 7-Day Free Trial
          </Text>
        </Pressable>

        {/* Pricing info */}
        <Text style={styles.priceInfoText}>
          Then {displayPrice}/{displayPeriod}
        </Text>

        {/* Benefits */}
        <Text style={styles.benefitsText}>
          7-day free trial • Cancel anytime • No commitments
        </Text>

        {/* Footer Links */}
        <View style={styles.footerLinks}>
          <Pressable onPress={handleRestorePurchase}>
            <Text style={styles.footerLinkText}>Restore Purchase</Text>
          </Pressable>
          <Pressable onPress={handleTerms}>
            <Text style={styles.footerLinkText}>Terms & Conditions</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
