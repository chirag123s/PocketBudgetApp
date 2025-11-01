import { Stack } from 'expo-router';

export default function MoneyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'default',
      }}
    >
      <Stack.Screen name="accounts" />
      <Stack.Screen name="transaction" />
    </Stack>
  );
}
