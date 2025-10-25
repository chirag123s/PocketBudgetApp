import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SettingsItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  badge?: string;
}

const settingsData = {
  account: [
    { title: 'Profile', icon: 'person-outline' as const, route: '/settings/profile' },
    { title: 'Subscription', icon: 'card-outline' as const, route: '/settings/subscription', badge: 'Free' },
    { title: 'Notifications', icon: 'notifications-outline' as const, route: '/settings/notifications' },
    { title: 'Security & Privacy', icon: 'lock-closed-outline' as const, route: '/settings/security' },
  ],
  app: [
    { title: 'Appearance', icon: 'color-palette-outline' as const, route: '/settings/appearance' },
    { title: 'Export Data', icon: 'download-outline' as const, route: '/settings/export' },
  ],
  support: [
    { title: 'Help Center', icon: 'help-circle-outline' as const, route: '/settings/help' },
    { title: 'Contact Support', icon: 'chatbubble-outline' as const, route: '/settings/contact' },
    { title: 'About', icon: 'information-circle-outline' as const, route: '/settings/about' },
  ],
};

export default function SettingsTab() {
  const router = useRouter();

  const handleNavigation = (route?: string) => {
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => handleNavigation('/settings/profile')}
        >
          <LinearGradient
            colors={[theme.colors.primary[400], theme.colors.primary[600]]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>JS</Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Smith</Text>
            <Text style={styles.profileEmail}>john@email.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.text.tertiary} />
        </TouchableOpacity>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            {settingsData.account.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={20} color={theme.colors.primary[600]} />
                    </View>
                    <Text style={styles.settingsItemText}>{item.title}</Text>
                  </View>
                  <View style={styles.settingsItemRight}>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
                  </View>
                </TouchableOpacity>
                {index < settingsData.account.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.card}>
            {settingsData.app.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={20} color={theme.colors.primary[600]} />
                    </View>
                    <Text style={styles.settingsItemText}>{item.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
                </TouchableOpacity>
                {index < settingsData.app.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            {settingsData.support.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={20} color={theme.colors.primary[600]} />
                    </View>
                    <Text style={styles.settingsItemText}>{item.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
                </TouchableOpacity>
                {index < settingsData.support.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Upgrade to Premium */}
        <TouchableOpacity
          style={styles.upgradeCard}
          onPress={() => handleNavigation('/settings/upgrade')}
        >
          <LinearGradient
            colors={[theme.colors.primary[400], theme.colors.primary[600]]}
            style={styles.upgradeGradient}
          >
            <View style={styles.upgradeContent}>
              <View style={styles.upgradeLeft}>
                <Text style={styles.upgradeIcon}>⭐</Text>
                <View>
                  <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
                  <Text style={styles.upgradeSubtitle}>
                    Unlock unlimited budgets & more
                  </Text>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.danger.main} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0 (Build 23)</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    ...theme.typography.styles.h2,
    fontSize: theme.responsive.fontSize.h3,
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.sm,
  },
  avatar: {
    width: theme.responsive.moderateScale(56),
    height: theme.responsive.moderateScale(56),
    borderRadius: theme.responsive.scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.md,
  },
  avatarText: {
    fontSize: theme.responsive.fontSize.h4,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.large,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  section: {
    marginBottom: theme.responsive.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.responsive.spacing.md,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: theme.responsive.moderateScale(40),
    height: theme.responsive.moderateScale(40),
    borderRadius: theme.responsive.scale(20),
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  settingsItemText: {
    ...theme.typography.styles.body,
    fontWeight: '500',
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.warning.light,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
  },
  badgeText: {
    ...theme.typography.styles.bodySmall,
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '700',
    color: theme.colors.warning.dark,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginLeft: theme.responsive.spacing.md + 40 + theme.responsive.spacing.sm,
  },
  upgradeCard: {
    marginBottom: theme.responsive.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  upgradeGradient: {
    borderRadius: theme.borderRadius.xl,
  },
  upgradeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.responsive.spacing.md,
  },
  upgradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  upgradeIcon: {
    fontSize: theme.responsive.fontSize.h1,
    marginRight: theme.responsive.spacing.sm,
  },
  upgradeTitle: {
    fontSize: theme.responsive.fontSize.body,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  upgradeSubtitle: {
    fontSize: theme.responsive.fontSize.caption,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
    gap: theme.responsive.spacing.sm,
    ...theme.shadows.sm,
  },
  logoutText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.danger.main,
  },
  versionText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});
