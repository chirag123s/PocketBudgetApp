console.log('📦 _layout.tsx MODULE LOADING');

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { WidgetProvider } from '@/contexts/WidgetContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';

console.log('✅ _layout.tsx imports complete');

// This component handles protected route logic
function RootLayoutNav() {
  console.log('🏗️ RootLayoutNav rendering - START');

  console.log('📌 Calling useAuth...');
  const { isAuthenticated, isGuestMode, isLoading, hasCompletedOnboarding } = useAuth();
  console.log('📌 useAuth completed');

  console.log('📌 Calling useSegments...');
  const segments = useSegments();
  console.log('📌 useSegments completed:', segments);

  console.log('📌 Calling useRouter...');
  const router = useRouter();
  console.log('📌 useRouter completed');

  useEffect(() => {
    // Log current route for debugging
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📍 NAVIGATION:', segments.join('/') || 'index');
    console.log('   Auth:', isAuthenticated, '| Guest:', isGuestMode, '| Loading:', isLoading);
    console.log('   Onboarding:', hasCompletedOnboarding);
    console.log('═══════════════════════════════════════════════════════════');

    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === 'tabs';
    const inOnboardingFlow = segments[0] === 'bank' || segments[0] === 'budget';

    // Don't redirect if user is viewing the splash screen (auth/index)
    const isOnSplashScreen = inAuthGroup && segments.length === 1;

    // Redirect logic based on authentication state
    if (!isAuthenticated && !isGuestMode && !inAuthGroup && !isOnSplashScreen) {
      // User is not authenticated, not in guest mode, and not in auth flow
      // Let the splash screen handle initial routing
      console.log('🔄 Redirecting to auth splash screen');
      router.replace('/auth');
    } else if (isAuthenticated && !hasCompletedOnboarding && !inOnboardingFlow && !isOnSplashScreen) {
      // User is authenticated but hasn't completed onboarding
      // Only redirect if not on splash screen (splash screen will handle it)
      console.log('🔄 Redirecting to onboarding');
      router.replace('/bank/intro');
    } else if ((isAuthenticated && hasCompletedOnboarding && inAuthGroup && !isOnSplashScreen) ||
               (isGuestMode && inAuthGroup && !isOnSplashScreen)) {
      // User is authenticated/guest and has completed onboarding
      // Only redirect if not on splash screen
      console.log('🔄 Redirecting to main app');
      router.replace('/tabs');
    }
  }, [isAuthenticated, isGuestMode, isLoading, hasCompletedOnboarding, segments]);

  // 🔍 Check Stack.Screen boolean props
  const headerShown = false;
  console.log('📌 headerShown value:', headerShown, 'type:', typeof headerShown);

  console.log('📌 About to create screenOptions object');
  const screenOptions = {
    headerShown: headerShown,
  };
  console.log('📌 screenOptions created:', screenOptions);

  console.log('📌 About to render Stack component');

  console.log('📌 About to return Stack JSX');

  try {
    return (
      <Stack
        screenOptions={{
          ...screenOptions,
          animation: 'default',
        }}
      >
        {/* Auth Flow */}
        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />

        {/* Main App (Tabs) */}
        <Stack.Screen name="tabs" options={{ headerShown: false }} />

        {/* Onboarding Flows */}
        <Stack.Screen name="bank" options={{ headerShown: false }} />
        <Stack.Screen name="budget" options={{ headerShown: false }} />

        {/* Other route groups */}
        <Stack.Screen name="insights" options={{ headerShown: false }} />
        <Stack.Screen name="money" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />

        {/* Index redirect */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
  } catch (error) {
    console.error('❌ ERROR in RootLayoutNav return:', error);
    throw error;
  }
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <WidgetProvider>
                <StatusBar style="auto" />
                <RootLayoutNav />
              </WidgetProvider>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
