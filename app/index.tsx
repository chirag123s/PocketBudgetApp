import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';
import { useScreenTracker } from '@/utils/screenTracker';

/**
 * Splash/Index Screen
 * This is the entry point of the app
 * Checks authentication state and redirects appropriately
 */
export default function Index() {
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

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary[600]}
        animating={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
});
