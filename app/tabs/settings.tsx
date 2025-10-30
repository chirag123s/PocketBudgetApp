import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { clearAllStorage, checkStorageState } from '@/scripts/clearStorage';
import { loadAvatarColor, getAvatarGradientSync } from '@/utils/avatar';
import { getInitials } from '@/utils/helpers';

interface SettingsItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  badge?: string;
  hasToggle?: boolean;
}

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

export default function SettingsTab() {
  const router = useRouter();
  const { clearAllData } = useAuth();
  const [avatarColorId, setAvatarColorId] = useState('blue');

  // User data (in real app, this would come from auth context)
  const userName = 'Alex Johnson';
  const userEmail = 'alex@email.com';

  // Load saved avatar color when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedColor();
    }, [])
  );

  const loadSavedColor = async () => {
    const colorId = await loadAvatarColor();
    setAvatarColorId(colorId);
  };

  const handleNavigation = (route?: string) => {
    if (route) {
      router.push(route as any);
    }
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all app data including guest mode, authentication, and onboarding status. You will be returned to the welcome screen.\n\n⚠️ This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllStorage();
              await clearAllData();
              Alert.alert(
                'Success',
                'All data cleared. Please close and reopen the app.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // App will show welcome screen on next launch
                    },
                  },
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data. Please try again.');
              console.error('Clear data error:', error);
            }
          },
        },
      ]
    );
  };

  const handleCheckStorage = async () => {
    await checkStorageState();
    Alert.alert('Storage State', 'Check console logs for storage details');
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => handleNavigation('/settings/profile')}
        >
          <LinearGradient
            colors={getAvatarGradientSync(avatarColorId)}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{getInitials(userName)}</Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.neutralMedium} />
        </TouchableOpacity>

        {/* Premium Upgrade Card */}
        <TouchableOpacity
          style={styles.upgradeCard}
          onPress={() => handleNavigation('/settings/subscription')}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.upgradeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.upgradeContent}>
              <View style={styles.upgradeLeft}>
                <View style={styles.upgradeIconContainer}>
                  <Text style={styles.upgradeIcon}>⭐</Text>
                </View>
                <View style={styles.upgradeTextContainer}>
                  <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
                  <Text style={styles.upgradeSubtitle}>
                    Unlock unlimited budgets & features
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={24} color={colors.neutralWhite} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/profile')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="person-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/subscription')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="card-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Subscription Plan</Text>
              </View>
              <View style={styles.settingsItemRight}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Free</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Budget & Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BUDGET & CATEGORIES</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/budget/categories')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="pricetag-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Categories</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/budget/templates')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="albums-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Budget Templates</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/notifications')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="notifications-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/appearance')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="color-palette-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Appearance</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/currency-region')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="globe-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Currency & Region</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy & Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACY & DATA</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/security')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Security & Privacy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/export')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="download-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Export Data</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/import')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="cloud-upload-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Import Data</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/backup-restore')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="cloud-done-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Backup & Restore</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/help')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => handleNavigation('/settings/about')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.settingsItemText}>About</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Developer Section - Only visible in development */}
        {__DEV__ && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DEVELOPER</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={handleCheckStorage}
              >
                <View style={styles.settingsItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${colors.functionalWarning}20` }]}>
                    <Ionicons name="bug-outline" size={20} color={colors.functionalWarning} />
                  </View>
                  <Text style={styles.settingsItemText}>Check Storage State</Text>
                </View>
                <Ionicons name="terminal-outline" size={20} color={colors.neutralMedium} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={handleClearAllData}
              >
                <View style={styles.settingsItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${colors.functionalError}20` }]}>
                    <Ionicons name="trash-outline" size={20} color={colors.functionalError} />
                  </View>
                  <Text style={[styles.settingsItemText, { color: colors.functionalError }]}>
                    Clear All Data
                  </Text>
                </View>
                <Ionicons name="warning-outline" size={20} color={colors.functionalError} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={colors.functionalError} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0 (Build 23)</Text>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[4] }} />
      </ScrollView>
    </Screen>
  );
}

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
  headerTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginHorizontal: responsive.spacing[4],
    marginTop: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  avatar: {
    width: ms(56),
    height: ms(56),
    borderRadius: ms(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing[3],
  },
  avatarText: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralWhite,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[1],
  },
  profileEmail: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
  upgradeCard: {
    marginHorizontal: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  upgradeGradient: {
    borderRadius: theme.borderRadius.xl,
  },
  upgradeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsive.spacing[5],
  },
  upgradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: responsive.spacing[3],
  },
  upgradeIconContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeIcon: {
    fontSize: responsive.fontSize.h3,
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralWhite,
    marginBottom: responsive.spacing[1],
  },
  upgradeSubtitle: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralWhite,
    opacity: 0.9,
  },
  section: {
    marginBottom: responsive.spacing[4],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '700',
    color: colors.neutralDark,
    letterSpacing: 0.5,
    marginBottom: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[4],
  },
  card: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    marginHorizontal: responsive.spacing[4],
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsive.spacing[4],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: responsive.spacing[3],
  },
  iconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsItemText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  badge: {
    backgroundColor: `${colors.functionalWarning}20`,
    paddingHorizontal: responsive.spacing[3],
    paddingVertical: responsive.spacing[1],
    borderRadius: theme.borderRadius.md,
  },
  badgeText: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '700',
    color: colors.functionalWarning,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutralBg,
    marginLeft: responsive.spacing[4] + ms(40) + responsive.spacing[3],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginHorizontal: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
    gap: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  logoutText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.functionalError,
  },
  versionText: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralMedium,
    textAlign: 'center',
    marginBottom: responsive.spacing[2],
  },
});
