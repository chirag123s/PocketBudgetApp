console.log('📦 index.tsx MODULE LOADING - START');

import { useEffect } from 'react';
console.log('✅ React imported');

import { View, ActivityIndicator, StyleSheet } from 'react-native';
console.log('✅ React Native components imported');

import { useRouter } from 'expo-router';
console.log('✅ expo-router imported');

import { useAuth } from '@/contexts/AuthContext';
console.log('✅ AuthContext imported');

import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
console.log('✅ theme imported');

import { useScreenTracker } from '@/utils/screenTracker';
console.log('✅ screenTracker imported');

import { Screen } from '@/components/layout/Screen';
console.log('✅ Screen component imported');

console.log('📦 index.tsx MODULE LOADED');

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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  useEffect(() => {
    if (isLoading) return;

    // Small delay for initial loading
    const timer = setTimeout(() => {
      // Always show the branded splash screen first (app/auth/index.tsx)
      // The splash screen will then handle the routing logic
      router.replace('/auth');
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // 🔍 Check ActivityIndicator props
  const animating = true;
  const activityColor = theme.colors.primary[600];

  if (typeof animating !== 'boolean') {
    console.error('❌ ActivityIndicator prop ERROR: animating is', typeof animating, '- value:', animating);
  }
  if (typeof activityColor !== 'string') {
    console.error('❌ ActivityIndicator prop ERROR: color is', typeof activityColor, '- value:', activityColor);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Screen scrollable={false} backgroundColor={theme.colors.background.primary}>
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={activityColor}
          animating={animating}
        />
      </View>
    </Screen>
  );
}

console.log('✅ Index component defined successfully');
