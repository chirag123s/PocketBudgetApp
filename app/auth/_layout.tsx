import { Stack } from 'expo-router';
import { Easing } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'default',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="welcome"
        options={{
          animation: 'fade',
          animationDuration: 600,
          presentation: 'card',
          gestureEnabled: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="tutorial" />
      <Stack.Screen name="onboarding-choice" />
    </Stack>
  );
}
