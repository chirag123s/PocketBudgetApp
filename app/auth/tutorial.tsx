import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

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
                size={80}
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
              size={20}
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
                size={20}
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
    padding: theme.spacing[6],
  },
  header: {
    alignItems: 'flex-end',
    paddingVertical: theme.spacing[4],
  },
  skipButton: {
    padding: theme.spacing[2],
  },
  skipText: {
    ...theme.typography.styles.button,
    fontSize: 16,
    color: theme.colors.primary[600],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    marginBottom: theme.spacing[8],
    position: 'relative',
  },
  mainCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  emojiCircle: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.base,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    ...theme.typography.styles.h2,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
  },
  description: {
    ...theme.typography.styles.body,
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing[12],
    maxWidth: 320,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[8],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.neutral[300],
  },
  activeDot: {
    width: 32,
    backgroundColor: theme.colors.primary[600],
  },
  footer: {
    gap: theme.spacing[2],
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginHorizontal: theme.spacing[1],
  },
});
