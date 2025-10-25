import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: '💰',
    title: 'Track Spending',
    description: 'See exactly where your money goes with automatic categorization',
  },
  {
    icon: '🏦',
    title: 'Connect Banks',
    description: 'Securely link your Australian banks with Open Banking',
  },
  {
    icon: '📈',
    title: 'Budget Your Way',
    description: 'Credit card cycles, fortnightly, or monthly - you choose',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const { enableGuestMode } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleGuestMode = async () => {
    try {
      await enableGuestMode();
      // Small delay to ensure state update propagates
      setTimeout(() => {
        router.replace('/tabs');
      }, 100);
    } catch (error) {
      console.error('Failed to enable guest mode:', error);
    }
  };

  return (
    <Screen scrollable backgroundColor={theme.colors.background.primary}>
      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Hero Illustration */}
          <View style={styles.heroContainer}>
            <View style={styles.mainIllustration}>
              <View style={styles.illustrationBackground}>
                <Text style={styles.illustrationIcon}>$</Text>
              </View>
              <View style={styles.floatingBadge}>
                <Text style={styles.badgeIcon}>💰</Text>
              </View>
            </View>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>
            Budget the way you{'\n'}actually get paid
          </Text>

          {/* Subheadline */}
          <Text style={styles.subheadline}>
            Built for Australians, by an Australian
          </Text>

          {/* Feature Display - Current Slide Only */}
          <View style={styles.carouselContainer}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>{features[currentSlide].icon}</Text>
              </View>
              <Text style={styles.featureTitle}>{features[currentSlide].title}</Text>
              <Text style={styles.featureDescription}>
                {features[currentSlide].description}
              </Text>
            </View>

            {/* Dots Indicator */}
            <View style={styles.dotsContainer}>
              {features.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentSlide(index)}
                  style={[
                    styles.dot,
                    currentSlide === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaContainer}>
          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={() => router.push('/auth/signup')}
          >
            Get Started Free →
          </Button>

          <Button
            variant="secondary"
            fullWidth
            size="large"
            onPress={() => router.push('/auth/login')}
            style={styles.secondaryButton}
          >
            I Have an Account
          </Button>

          <TouchableOpacity
            onPress={handleGuestMode}
            style={styles.tertiaryButtonContainer}
          >
            <Text style={styles.tertiaryButton}>Continue as Guest →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.responsive.spacing.xl,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.xl,
  },
  mainIllustration: {
    position: 'relative',
  },
  illustrationBackground: {
    width: theme.responsive.moderateScale(160),
    height: theme.responsive.moderateScale(160),
    borderRadius: theme.responsive.scale(24),
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  illustrationIcon: {
    fontSize: theme.responsive.moderateScale(80),
    color: theme.colors.text.inverse,
    fontWeight: '700' as any,
  },
  floatingBadge: {
    position: 'absolute',
    bottom: theme.responsive.scale(-12),
    right: theme.responsive.scale(-12),
    width: theme.responsive.moderateScale(64),
    height: theme.responsive.moderateScale(64),
    borderRadius: theme.responsive.scale(16),
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: theme.responsive.moderateScale(32),
  },
  headline: {
    ...theme.typography.styles.h1,
    fontSize: theme.responsive.fontSize.h1,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.lg,
  },
  subheadline: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.xxl,
    paddingHorizontal: theme.responsive.spacing.lg,
  },
  carouselContainer: {
    width: theme.responsive.wp(100),
    maxWidth: theme.responsive.maxWidth.card,
    paddingHorizontal: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.xl,
  },
  featureCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.spacing.lg,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: theme.responsive.iconSize.xlarge,
    height: theme.responsive.iconSize.xlarge,
    borderRadius: theme.responsive.scale(12),
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  featureIcon: {
    fontSize: theme.responsive.moderateScale(28),
  },
  featureTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.h3,
    marginBottom: theme.responsive.spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.responsive.spacing.md,
  },
  dot: {
    width: theme.responsive.scale(8),
    height: theme.responsive.scale(8),
    borderRadius: theme.responsive.scale(4),
    backgroundColor: theme.colors.neutral[300],
    marginHorizontal: theme.responsive.spacing.xs,
  },
  activeDot: {
    width: theme.responsive.scale(32),
    backgroundColor: theme.colors.primary[600],
  },
  ctaContainer: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  secondaryButton: {
    marginTop: theme.responsive.spacing.md,
  },
  tertiaryButtonContainer: {
    marginTop: theme.responsive.spacing.sm,
    paddingVertical: theme.responsive.spacing.sm,
  },
  tertiaryButton: {
    ...theme.typography.styles.button,
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
