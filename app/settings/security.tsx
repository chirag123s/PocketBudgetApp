import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export default function SecurityPrivacy() {
  const router = useRouter();
  const [faceID, setFaceID] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [authSettings, setAuthSettings] = useState({
    appLaunch: true,
    transactionEdits: true,
    viewingBalance: false,
  });

  const toggleAuthSetting = (key: keyof typeof authSettings) => {
    setAuthSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security & Privacy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Authentication */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Authentication</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Face ID/Touch ID</Text>
              <Text style={styles.settingSubtitle}>Require on launch</Text>
            </View>
            <Switch
              value={faceID}
              onValueChange={setFaceID}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>Last changed: 45 days ago</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Two-Factor Auth</Text>
              <Text style={styles.settingSubtitle}>Via SMS to 04XX...789</Text>
            </View>
            <Switch
              value={twoFactor}
              onValueChange={setTwoFactor}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.linkText}>Configure</Text>
          </TouchableOpacity>
        </View>

        {/* App Security */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Security</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Auto-lock after</Text>
            <Switch
              value={autoLock}
              onValueChange={setAutoLock}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>5 minutes</Text>
            <Ionicons name="chevron-down" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <Text style={styles.sectionLabel}>Require auth for:</Text>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleAuthSetting('appLaunch')}
            >
              <View style={[styles.checkbox, authSettings.appLaunch && styles.checkboxChecked]}>
                {authSettings.appLaunch && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>App launch</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleAuthSetting('transactionEdits')}
            >
              <View style={[styles.checkbox, authSettings.transactionEdits && styles.checkboxChecked]}>
                {authSettings.transactionEdits && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Transaction edits</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleAuthSetting('viewingBalance')}
            >
              <View style={[styles.checkbox, authSettings.viewingBalance && styles.checkboxChecked]}>
                {authSettings.viewingBalance && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Viewing balance</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Data Privacy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Privacy</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Download My Data</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>Get copy of all data</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Share Analytics</Text>
              <Text style={styles.settingSubtitle}>Help improve the app (Anonymous only)</Text>
            </View>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Data Usage Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Deactivate Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: responsive.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    marginBottom: responsive.spacing[4],
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing[4],
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  settingSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  actionButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
  },
  actionButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  hint: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginBottom: responsive.spacing[4],
  },
  linkText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    marginTop: responsive.spacing[2],
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    marginBottom: responsive.spacing[4],
  },
  selectButtonText: {
    ...theme.typography.styles.body,
  },
  sectionLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[2],
  },
  checkboxGroup: {
    gap: responsive.spacing[2],
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    borderRadius: 4,
    marginRight: responsive.spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary[600],
    borderColor: theme.colors.primary[600],
  },
  checkboxText: {
    ...theme.typography.styles.body,
  },
  dangerCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    borderWidth: 2,
    borderColor: theme.colors.danger.light,
    ...theme.shadows.sm,
  },
  dangerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    color: theme.colors.danger.main,
    marginBottom: responsive.spacing[4],
  },
  deleteButton: {
    backgroundColor: theme.colors.danger.light,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    alignItems: 'center',
  },
  deleteButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.danger.dark,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
});
