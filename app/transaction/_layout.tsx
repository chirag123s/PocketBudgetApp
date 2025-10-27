import { Stack } from 'expo-router';

export default function TransactionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="detail" />
      <Stack.Screen name="add" />
      <Stack.Screen name="edit-category" />
      <Stack.Screen name="split" />
      <Stack.Screen name="recurring" />
      <Stack.Screen name="subscription-audit" />
      <Stack.Screen name="bulk-actions" />
      <Stack.Screen name="search-results" />
    </Stack>
  );
}
