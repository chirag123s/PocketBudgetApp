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
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    ...theme.typography.styles.h2,
    fontSize: 24,
  },
  content: {
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[6],
    ...theme.shadows.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[4],
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...theme.typography.styles.body,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  section: {
    marginBottom: theme.spacing[6],
  },
  sectionTitle: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing[2],
    paddingHorizontal: theme.spacing[2],
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
    padding: theme.spacing[4],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[2],
  },
  settingsItemText: {
    ...theme.typography.styles.body,
    fontWeight: '500',
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  badge: {
    backgroundColor: theme.colors.warning.light,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
  },
  badgeText: {
    ...theme.typography.styles.bodySmall,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.warning.dark,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginLeft: theme.spacing[4] + 40 + theme.spacing[2],
  },
  upgradeCard: {
    marginBottom: theme.spacing[6],
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
    padding: theme.spacing[4],
  },
  upgradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  upgradeIcon: {
    fontSize: 32,
    marginRight: theme.spacing[2],
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  upgradeSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    gap: theme.spacing[2],
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
