import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ViewToken } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, wp, hp, ms } from '@/constants/responsive';
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
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get('window');

  // Calculate card width with gap
  const CARD_GAP = responsive.spacing[4]; // 16px gap between cards
  const CARD_PADDING = responsive.spacing[4]; // Side padding
  const CARD_WIDTH = width - (CARD_PADDING * 2);

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

  const handleSlideChange = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentSlide(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item, index }: { item: typeof features[0]; index: number }) => (
    <View
      style={[
        styles.featureCardWrapper,
        {
          width: CARD_WIDTH,
          marginRight: index < features.length - 1 ? CARD_GAP : 0,
        }
      ]}
    >
      <View style={styles.featureCard}>
        <View style={styles.featureIconContainer}>
          <Text style={styles.featureIcon}>{item.icon}</Text>
        </View>
        <Text
          style={styles.featureTitle}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {item.title}
        </Text>
        <Text
          style={styles.featureDescription}
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

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
          <Text style={styles.headline} numberOfLines={2} adjustsFontSizeToFit>
            Budget the way you actually get paid
          </Text>

          {/* Subheadline */}
          <Text style={styles.subheadline}>
            Built for Australians, by an Australian
          </Text>

          {/* Feature Carousel */}
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={features}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              contentContainerStyle={styles.flatListContent}
              style={styles.flatList}
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH + CARD_GAP}
              snapToAlignment="start"
            />

            {/* Dots Indicator - Tappable for navigation */}
            <View style={styles.dotsContainer}>
              {features.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSlideChange(index)}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={styles.dotTouchable}
                >
                  <View
                    style={[
                      styles.dot,
                      currentSlide === index && styles.activeDot,
                    ]}
                  />
                </TouchableOpacity>
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
            <Text
              style={styles.tertiaryButton}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Continue as Guest →
            </Text>
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
    paddingTop: responsive.device.isShortDevice ? hp(16) : hp(32),
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: responsive.device.isShortDevice ? hp(20) : hp(32),
  },
  mainIllustration: {
    position: 'relative',
  },
  illustrationBackground: {
    width: responsive.device.isSmallDevice ? wp(140) : wp(160),
    height: responsive.device.isSmallDevice ? wp(140) : wp(160),
    borderRadius: ms(24),
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  illustrationIcon: {
    fontSize: responsive.device.isSmallDevice ? ms(64) : ms(80),
    color: theme.colors.text.inverse,
    fontWeight: '700' as any,
  },
  floatingBadge: {
    position: 'absolute',
    bottom: ms(-12),
    right: ms(-12),
    width: ms(64),
    height: ms(64),
    borderRadius: ms(16),
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: ms(32),
  },
  headline: {
    fontSize: responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[6],
    lineHeight: responsive.fontSize.h2 * 1.4,
    width: '100%',
  },
  subheadline: {
    ...theme.typography.styles.body,
    fontSize: responsive.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: responsive.device.isShortDevice ? hp(20) : hp(40),
    paddingHorizontal: responsive.spacing[6],
    lineHeight: responsive.fontSize.md * 1.5,
  },
  carouselContainer: {
    width: "100%",
    maxWidth: responsive.layout.maxContentWidth,
    marginBottom: responsive.spacing[8],
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  flatListContent: {
    paddingHorizontal: responsive.spacing[4],
  },
  featureCardWrapper: {
    // Width set dynamically
  },
  featureCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: responsive.layout.cardRadius,
    padding: responsive.spacing[6],
    alignItems: 'center',
    minHeight: responsive.device.isShortDevice ? hp(140) : hp(160),
    justifyContent: 'center',
    width: '100%',
  },
  featureIconContainer: {
    width: responsive.layout.iconXl,
    height: responsive.layout.iconXl,
    borderRadius: ms(12),
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing[4],
  },
  featureIcon: {
    fontSize: ms(28),
  },
  featureTitle: {
    fontSize: responsive.fontSize.h4,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: responsive.spacing[2],
    textAlign: 'center',
    lineHeight: responsive.fontSize.h4 * 1.3,
    width: '100%',
  },
  featureDescription: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '400',
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: responsive.fontSize.sm * 1.6,
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsive.spacing[4],
    gap: responsive.spacing[1],
  },
  dotTouchable: {
    padding: responsive.spacing[1],
  },
  dot: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(4),
    backgroundColor: theme.colors.neutral[300],
  },
  activeDot: {
    width: ms(32),
    backgroundColor: theme.colors.primary[600],
  },
  ctaContainer: {
    paddingHorizontal: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
    maxWidth: responsive.layout.maxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  secondaryButton: {
    marginTop: responsive.spacing[4],
  },
  tertiaryButtonContainer: {
    marginTop: responsive.spacing[2],
    paddingVertical: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[4],
    width: '100%',
  },
  tertiaryButton: {
    ...theme.typography.styles.button,
    fontSize: ms(12, 0.2), // Less aggressive scaling than fs() to prevent cutoff
    color: theme.colors.text.secondary,
    textAlign: 'center',
    width: '100%',
    lineHeight: ms(12, 0.2) * 1.4,
  },
});
