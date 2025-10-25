import { Stack } from 'expo-router';

export default function BudgetLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Budget Setup Wizard */}
      <Stack.Screen name="welcome" />
      <Stack.Screen name="period" />
      <Stack.Screen name="income" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="amounts" />
      <Stack.Screen name="summary" />

      {/* Budget Management */}
      <Stack.Screen name="edit" />
      <Stack.Screen name="category-detail" />
      <Stack.Screen name="templates" />
      <Stack.Screen name="history" />
      <Stack.Screen name="rollover" />
      <Stack.Screen name="alerts" />
    </Stack>
  );
}
