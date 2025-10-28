import { Stack } from 'expo-router';

export default function AccountsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'default',
      }}
    >
      <Stack.Screen name="connected" />
    </Stack>
  );
}
