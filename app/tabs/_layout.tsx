import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabsLayout() {
  // Get theme
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  // Get safe area insets for proper bottom spacing on Android/iOS
  const insets = useSafeAreaInsets();

  // 🔍 Check Tabs boolean props
  const headerShown = false;
  if (typeof headerShown !== 'boolean') {
    console.error('❌ Tabs prop ERROR: headerShown is', typeof headerShown, '- value:', headerShown);
  }

  // Calculate tab bar height with safe area
  // Base height: 60px (icon + label + padding)
  // Add bottom inset for Android gesture navigation / iOS home indicator
  const tabBarHeight = 60 + insets.bottom;
  const tabBarPaddingBottom = Math.max(8, insets.bottom);

  return (
    <Tabs
      screenOptions={{
        headerShown: headerShown,
        tabBarActiveTintColor: theme.colors.info.main,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.light,
          height: tabBarHeight,
          paddingBottom: tabBarPaddingBottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Trans',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      {/* Charts - Hidden from tab bar, accessible via navigation */}
      <Tabs.Screen
        name="charts"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
