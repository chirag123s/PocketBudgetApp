import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { TabSelector } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import AccountsScreen from '@/app/money/_accounts';
import TransactionsScreen from '@/app/money/_transactions';
import BillsScreen from '@/app/money/_bills';

type MoneyTab = 'accounts' | 'transactions' | 'bills';

export default function MoneyTab() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [selectedTab, setSelectedTab] = useState<MoneyTab>('accounts');

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    primary: theme.colors.info.main,
  };

  const renderScreen = () => {
    switch (selectedTab) {
      case 'accounts':
        return <AccountsScreen />;
      case 'transactions':
        return <TransactionsScreen />;
      case 'bills':
        return <BillsScreen />;
      default:
        return <AccountsScreen />;
    }
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    headerButton: {
      width: ms(40),
      height: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Money</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/money/transaction/add')}>
          <Ionicons name="add-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TabSelector
          options={[
            { id: 'accounts', label: 'Accounts' },
            { id: 'transactions', label: 'Transactions' },
            { id: 'bills', label: 'Bills' },
          ]}
          selectedId={selectedTab}
          onSelect={(id) => setSelectedTab(id as MoneyTab)}
        />
      </View>

      {/* Render Selected Screen */}
      {renderScreen()}
    </Screen>
  );
}
