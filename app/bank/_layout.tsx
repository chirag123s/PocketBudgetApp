import { Stack } from 'expo-router';

export default function BankLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="select" />
      <Stack.Screen name="account-selection" />
      <Stack.Screen name="sync-settings" />
      <Stack.Screen name="syncing" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
