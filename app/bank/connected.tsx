import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { BottomButton } from '@/components/ui/BottomButton';

interface BankAccount {
  id: string;
  customName: string;
  bankName: string;
  logo: string;
  status: 'connected' | 'warning' | 'error';
  statusText: string;
  lastUpdate: string;
  actionButton?: { label: string; onPress: () => void };
}

const ConnectedAccountsScreen: React.FC = () => {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    primaryDark: theme.colors.info.dark,
    primary: theme.colors.info.main,
    primaryLight: theme.colors.info.light,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
      flex: 1,
    },
    headerButton: {
      width: ms(40),
      height: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    accountsList: {
      padding: responsive.spacing[4],
      gap: responsive.spacing[4],
    },
    accountCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      gap: responsive.spacing[3],
      ...theme.shadows.sm,
    },
    accountHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    accountLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      flex: 1,
    },
    accountLogo: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
    },
    accountInfo: {
      gap: responsive.spacing[1],
      flex: 1,
    },
    accountName: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    bankName: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
      marginBottom: responsive.spacing[1],
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    statusDot: {
      width: ms(8),
      height: ms(8),
      borderRadius: ms(4),
    },
    statusText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '400',
    },
    moreButton: {
      width: ms(32),
      height: ms(32),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: ms(16),
    },
    accountFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: responsive.spacing[3],
      borderTopWidth: 1,
      borderTopColor: `${colors.neutralDarkest}1A`,
    },
    updateText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    actionButton: {
      paddingHorizontal: responsive.spacing[3],
      paddingVertical: responsive.spacing[1],
      borderRadius: theme.borderRadius.xl,
      backgroundColor: `${colors.primary}1A`,
    },
    actionButtonText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.primaryDark,
    },
  });

  const accounts: BankAccount[] = [
    {
      id: '1',
      customName: 'Everyday Spending',
      bankName: 'Commonwealth Bank',
      logo: 'https://via.placeholder.com/48/FFCC00/172B4D?text=CBA',
      status: 'connected',
      statusText: 'Connected',
      lastUpdate: 'Last updated: 5 mins ago',
    },
    {
      id: '2',
      customName: 'Emergency Fund',
      bankName: 'NAB',
      logo: 'https://via.placeholder.com/48/E30000/FFFFFF?text=NAB',
      status: 'warning',
      statusText: 'Needs Re-authentication',
      lastUpdate: 'Last updated: 2 days ago',
      actionButton: { label: 'Fix', onPress: () => {} },
    },
    {
      id: '3',
      customName: 'Savings Account',
      bankName: 'ANZ',
      logo: 'https://via.placeholder.com/48/1E40AF/FFFFFF?text=ANZ',
      status: 'error',
      statusText: 'Error',
      lastUpdate: 'Failed to sync',
      actionButton: { label: 'Retry', onPress: () => {} },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return colors.functionalSuccess;
      case 'warning':
        return colors.functionalWarning;
      case 'error':
        return colors.functionalError;
      default:
        return colors.neutralMedium;
    }
  };

  const getStatusTextColor = (status: string) => {
    return status === 'connected' ? colors.neutralDark : getStatusColor(status);
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Connected Accounts</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.neutralDarkest} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.accountsList}>
          {accounts.map((account) => (
            <View key={account.id} style={styles.accountCard}>
              {/* Account Header */}
              <View style={styles.accountHeader}>
                <View style={styles.accountLeft}>
                  <Image source={{ uri: account.logo }} style={styles.accountLogo} />
                  <View style={styles.accountInfo}>
                    <Text style={styles.accountName}>{account.customName}</Text>
                    <Text style={styles.bankName}>{account.bankName}</Text>
                    <View style={styles.statusContainer}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: getStatusColor(account.status) },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusTextColor(account.status) },
                        ]}
                      >
                        {account.statusText}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-vertical" size={20} color={colors.neutralMedium} />
                </TouchableOpacity>
              </View>

              {/* Account Footer */}
              <View style={styles.accountFooter}>
                <Text style={styles.updateText}>{account.lastUpdate}</Text>
                {account.actionButton && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={account.actionButton.onPress}
                  >
                    <Text style={styles.actionButtonText}>
                      {account.actionButton.label}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[20] }} />
      </ScrollView>

      {/* Bottom CTA */}
      <BottomButton
        text="Add New Bank Account"
        onPress={() => console.log('Add bank account')}
      />
    </Screen>
  );
};

export default ConnectedAccountsScreen;
