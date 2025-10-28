import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

// Color Palette - Using theme colors
const colors = {
  // Primary Palette
  primaryDark: theme.colors.info.dark,
  primary: theme.colors.info.main,
  primaryLight: theme.colors.info.light,

  // Neutral Palette
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,

  // Functional Palette
  functionalSuccess: theme.colors.success.main,
  functionalWarning: theme.colors.warning.main,
  functionalError: theme.colors.danger.main,
};

interface BankAccount {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'warning' | 'error';
  statusText: string;
  lastUpdate: string;
  actionButton?: { label: string; onPress: () => void };
}

interface AccountTypeOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
}

const ConnectedAccountsScreen: React.FC = () => {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);

  const accountTypeOptions: AccountTypeOption[] = [
    {
      id: 'bank',
      title: 'Bank Account',
      description: 'Connect your checking or savings account',
      icon: 'business',
      iconColor: colors.primary,
      iconBg: `${colors.primary}15`,
    },
    {
      id: 'investment',
      title: 'Investment Account',
      description: 'Add stocks, ETFs, or superannuation',
      icon: 'trending-up',
      iconColor: colors.functionalSuccess,
      iconBg: `${colors.functionalSuccess}15`,
    },
    {
      id: 'credit',
      title: 'Credit Card',
      description: 'Track your credit card balances',
      icon: 'card',
      iconColor: colors.functionalWarning,
      iconBg: `${colors.functionalWarning}15`,
    },
    {
      id: 'loan',
      title: 'Loan',
      description: 'Add mortgage, car loan, or personal loan',
      icon: 'home',
      iconColor: colors.functionalError,
      iconBg: `${colors.functionalError}15`,
    },
  ];

  const handleAddAccountType = (typeId: string) => {
    setShowAddModal(false);
    // TODO: Navigate to specific add screen based on type
    console.log('Add account type:', typeId);
  };

  const accounts: BankAccount[] = [
    {
      id: '1',
      name: 'Commonwealth Bank',
      logo: 'https://via.placeholder.com/48/FFCC00/172B4D?text=CBA',
      status: 'connected',
      statusText: 'Connected',
      lastUpdate: 'Last updated: 5 mins ago',
    },
    {
      id: '2',
      name: 'NAB',
      logo: 'https://via.placeholder.com/48/E30000/FFFFFF?text=NAB',
      status: 'warning',
      statusText: 'Needs Re-authentication',
      lastUpdate: 'Last updated: 2 days ago',
      actionButton: { label: 'Fix', onPress: () => {} },
    },
    {
      id: '3',
      name: 'ANZ',
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

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
                    <Text style={styles.accountName}>{account.name}</Text>
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
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.9}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color={colors.neutralWhite} />
          <Text style={styles.addButtonText}>Add Account</Text>
        </TouchableOpacity>
      </View>

      {/* Add Account Type Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowAddModal(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Account</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddModal(false)}
              >
                <Ionicons name="close" size={24} color={colors.neutralDark} />
              </TouchableOpacity>
            </View>

            {/* Modal Options */}
            <View style={styles.modalOptions}>
              {accountTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionCard}
                  activeOpacity={0.7}
                  onPress={() => handleAddAccountType(option.id)}
                >
                  <View style={[styles.optionIcon, { backgroundColor: option.iconBg }]}>
                    <Ionicons
                      name={option.icon}
                      size={24}
                      color={option.iconColor}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.neutralMedium}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
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
  footer: {
    padding: responsive.spacing[4],
    paddingBottom: responsive.spacing[3],
    backgroundColor: colors.neutralBg,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.xl,
    gap: responsive.spacing[2],
    ...theme.shadows.lg,
  },
  addButtonText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralWhite,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.neutralWhite,
    borderTopLeftRadius: theme.borderRadius.xl * 2,
    borderTopRightRadius: theme.borderRadius.xl * 2,
    paddingBottom: responsive.spacing[6],
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[5],
    paddingVertical: responsive.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: `${colors.neutralMedium}20`,
  },
  modalTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  closeButton: {
    width: ms(40),
    height: ms(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(20),
  },
  modalOptions: {
    padding: responsive.spacing[5],
    gap: responsive.spacing[3],
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.spacing[4],
    backgroundColor: colors.neutralBg,
    borderRadius: theme.borderRadius.xl,
    gap: responsive.spacing[3],
  },
  optionIcon: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  optionText: {
    flex: 1,
    gap: responsive.spacing[1],
  },
  optionTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  optionDescription: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
});

export default ConnectedAccountsScreen;
