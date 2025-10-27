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
    paddingTop: theme.spacing[8],
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing[8],
  },
  mainIllustration: {
    position: 'relative',
  },
  illustrationBackground: {
    width: 160,
    height: 160,
    borderRadius: 24,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  illustrationIcon: {
    fontSize: 80,
    color: theme.colors.text.inverse,
    fontWeight: '700' as any,
  },
  floatingBadge: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 32,
  },
  headline: {
    ...theme.typography.styles.h1,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: theme.spacing[2],
    paddingHorizontal: theme.spacing[6],
  },
  subheadline: {
    ...theme.typography.styles.body,
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing[12],
    paddingHorizontal: theme.spacing[6],
  },
  carouselContainer: {
    width: "100%",
    maxWidth: 600,
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[8],
  },
  featureCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: 20,
    padding: theme.spacing[6],
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[4],
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    ...theme.typography.styles.h3,
    fontSize: 24,
    marginBottom: theme.spacing[2],
    textAlign: 'center',
  },
  featureDescription: {
    ...theme.typography.styles.bodySmall,
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing[4],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.neutral[300],
    marginHorizontal: theme.spacing[1],
  },
  activeDot: {
    width: 32,
    backgroundColor: theme.colors.primary[600],
  },
  ctaContainer: {
    paddingHorizontal: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  secondaryButton: {
    marginTop: theme.spacing[4],
  },
  tertiaryButtonContainer: {
    marginTop: theme.spacing[2],
    paddingVertical: theme.spacing[2],
  },
  tertiaryButton: {
    ...theme.typography.styles.button,
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
