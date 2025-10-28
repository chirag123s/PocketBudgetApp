import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, wp, hp, ms } from '@/constants/responsive';

const { width } = Dimensions.get('window');

interface Slide {
  icon: keyof typeof Ionicons.glyphMap;
  emoji: string;
  title: string;
  description: string;
  gradientColors: string[];
}

const slides: Slide[] = [
  {
    icon: 'business',
    emoji: '✅',
    title: 'Connect your banks securely',
    description:
      'Open Banking means we never see your bank password. Your data is encrypted and read-only.',
    gradientColors: [theme.colors.primary[400], theme.colors.primary[600]],
  },
  {
    icon: 'wallet',
    emoji: '💰',
    title: 'Create your budget',
    description:
      'Budget by credit card cycle, fortnightly, or monthly. We match how you actually get paid.',
    gradientColors: [theme.colors.info.light, theme.colors.info.main],
  },
  {
    icon: 'trending-up',
    emoji: '📊',
    title: 'Track spending automatically',
    description:
      'Transactions sync automatically and get smart categorization. See where your money goes in real-time.',
    gradientColors: [theme.colors.accent.light, theme.colors.accent.main],
  },
  {
    icon: 'notifications',
    emoji: '⏰',
    title: 'Never miss a bill',
    description:
      "Get reminders when bills are due and alerts when you're close to budget limits.",
    gradientColors: [theme.colors.warning.light, theme.colors.warning.main],
  },
];

export default function TutorialScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/auth/permissions');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    router.replace('/auth/permissions');
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const currentSlideData = slides[currentSlide];

  return (
    <Screen scrollable={false}>
      <View style={styles.container}>
        {/* Skip Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip Tutorial →</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <LinearGradient
              colors={currentSlideData.gradientColors}
              style={styles.mainCircle}
            >
              <Ionicons
                name={currentSlideData.icon}
                size={ms(80)}
                color="white"
              />
            </LinearGradient>
            <View style={styles.emojiCircle}>
              <Text style={styles.emoji}>{currentSlideData.emoji}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{currentSlideData.title}</Text>

          {/* Description */}
          <Text style={styles.description}>{currentSlideData.description}</Text>

          {/* Progress Dots */}
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
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

        {/* Navigation Buttons */}
        <View style={styles.footer}>
          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={handleNext}
            style={styles.nextButton}
          >
            {isLastSlide ? "Let's Get Started" : 'Next'}
            <Ionicons
              name="chevron-forward"
              size={responsive.layout.iconSm}
              color="white"
              style={styles.buttonIcon}
            />
          </Button>

          {currentSlide > 0 && (
            <Button
              variant="secondary"
              fullWidth
              size="large"
              onPress={handlePrev}
            >
              <Ionicons
                name="chevron-back"
                size={responsive.layout.iconSm}
                color={theme.colors.text.primary}
                style={styles.buttonIcon}
              />
              Previous
            </Button>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsive.spacing[6],
    maxWidth: responsive.layout.maxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'flex-end',
    paddingVertical: responsive.spacing[4],
  },
  skipButton: {
    padding: responsive.spacing[2],
  },
  skipText: {
    ...theme.typography.styles.button,
    fontSize: responsive.fontSize.base,
    lineHeight: responsive.fontSize.base * 1.5,
    color: theme.colors.primary[600],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    marginBottom: responsive.device.isShortDevice ? responsive.spacing[6] : responsive.spacing[8],
    position: 'relative',
  },
  mainCircle: {
    width: ms(160),
    height: ms(160),
    borderRadius: ms(80),
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  emojiCircle: {
    position: 'absolute',
    bottom: ms(-12),
    right: ms(-12),
    width: ms(64),
    height: ms(64),
    borderRadius: ms(32),
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.base,
  },
  emoji: {
    fontSize: responsive.layout.iconLg,
  },
  title: {
    ...theme.typography.styles.h2,
    fontSize: responsive.fontSize.h3,
    lineHeight: responsive.fontSize.h3 * 1.3,
    textAlign: 'center',
    marginBottom: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[4],
  },
  description: {
    ...theme.typography.styles.body,
    fontSize: responsive.fontSize.base,
    lineHeight: responsive.fontSize.base * 1.5,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: responsive.device.isShortDevice ? responsive.spacing[8] : responsive.spacing[12],
    maxWidth: wp(320),
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[8],
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
  footer: {
    gap: responsive.spacing[2],
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginHorizontal: responsive.spacing[1],
  },
});
