console.log('📦 index.tsx MODULE LOADING - START');

import { useEffect } from 'react';
console.log('✅ React imported');

import { View, ActivityIndicator, StyleSheet } from 'react-native';
console.log('✅ React Native components imported');

import { useRouter } from 'expo-router';
console.log('✅ expo-router imported');

import { useAuth } from '@/contexts/AuthContext';
console.log('✅ AuthContext imported');

import { theme } from '@/constants/theme';
console.log('✅ theme imported - colors.primary[600]:', theme.colors.primary[600]);

import { useScreenTracker } from '@/utils/screenTracker';
console.log('✅ screenTracker imported');

console.log('📦 index.tsx MODULE LOADED - About to create StyleSheet');

/**
 * Splash/Index Screen
 * This is the entry point of the app
 * Checks authentication state and redirects appropriately
 */
export default function Index() {
  console.log('🚀 IndexScreen component function CALLED');
  useScreenTracker('IndexScreen');
  const router = useRouter();
  const { isAuthenticated, isGuestMode, isLoading, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Small delay for splash effect
    const timer = setTimeout(() => {
      if (isGuestMode) {
        // Guest mode → Go directly to main app
        router.replace('/tabs');
      } else if (!isAuthenticated) {
        // Not authenticated → Go to welcome
        router.replace('/auth/welcome');
      } else if (!hasCompletedOnboarding) {
        // Authenticated but not onboarded → Go to bank connection
        router.replace('/bank/intro');
      } else {
        // Fully set up → Go to main app
        router.replace('/tabs');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isGuestMode, isLoading, hasCompletedOnboarding]);

  // 🔍 Check ActivityIndicator props
  const animating = true;
  const activityColor = theme.colors.primary[600];

  if (typeof animating !== 'boolean') {
    console.error('❌ ActivityIndicator prop ERROR: animating is', typeof animating, '- value:', animating);
  }
  if (typeof activityColor !== 'string') {
    console.error('❌ ActivityIndicator prop ERROR: color is', typeof activityColor, '- value:', activityColor);
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={activityColor}
        animating={animating}
      />
    </View>
  );
}

console.log('🎨 Creating StyleSheet for index.tsx');
console.log('   backgroundColor value:', theme.colors.background.primary, 'type:', typeof theme.colors.background.primary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
});

console.log('✅ StyleSheet created successfully for index.tsx');
