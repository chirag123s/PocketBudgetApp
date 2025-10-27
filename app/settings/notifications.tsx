import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface NotificationSettings {
  category80: boolean;
  category100: boolean;
  overBudget: boolean;
  underBudget: boolean;
  dueTomorrow: boolean;
  due3Days: boolean;
  due1Week: boolean;
  billChanged: boolean;
  largePurchases: boolean;
  unusualSpending: boolean;
  dailySummary: boolean;
  bankSyncComplete: boolean;
  bankIssue: boolean;
  pushNotifications: boolean;
  email: boolean;
  sms: boolean;
  quietHours: boolean;
}

export default function NotificationsSettings() {
  const router = useRouter();
  const [masterToggle, setMasterToggle] = useState(true);
  const [settings, setSettings] = useState<NotificationSettings>({
    category80: true,
    category100: true,
    overBudget: true,
    underBudget: false,
    dueTomorrow: true,
    due3Days: true,
    due1Week: false,
    billChanged: true,
    largePurchases: false,
    unusualSpending: false,
    dailySummary: false,
    bankSyncComplete: false,
    bankIssue: true,
    pushNotifications: true,
    email: true,
    sms: false,
    quietHours: true,
  });

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Master Toggle */}
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Master Toggle</Text>
              <Text style={styles.settingSubtitle}>All Notifications</Text>
            </View>
            <Switch
              value={masterToggle}
              onValueChange={setMasterToggle}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Budget Alerts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Alerts</Text>

          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Category at 80%</Text>
              <Switch
                value={settings.category80}
                onValueChange={() => toggleSetting('category80')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Category at 100%</Text>
              <Switch
                value={settings.category100}
                onValueChange={() => toggleSetting('category100')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Over budget overall</Text>
              <Switch
                value={settings.overBudget}
                onValueChange={() => toggleSetting('overBudget')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Under budget</Text>
              <Switch
                value={settings.underBudget}
                onValueChange={() => toggleSetting('underBudget')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Bill Reminders */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bill Reminders</Text>

          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Due tomorrow</Text>
              <Switch
                value={settings.dueTomorrow}
                onValueChange={() => toggleSetting('dueTomorrow')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Due in 3 days</Text>
              <Switch
                value={settings.due3Days}
                onValueChange={() => toggleSetting('due3Days')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Due in 1 week</Text>
              <Switch
                value={settings.due1Week}
                onValueChange={() => toggleSetting('due1Week')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Bill amount changed</Text>
              <Switch
                value={settings.billChanged}
                onValueChange={() => toggleSetting('billChanged')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Transaction Alerts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transaction Alerts</Text>

          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingText}>Large purchases</Text>
                <Text style={styles.settingHint}>(Over $500)</Text>
              </View>
              <Switch
                value={settings.largePurchases}
                onValueChange={() => toggleSetting('largePurchases')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingWithBadge}>
                <Text style={styles.settingText}>Unusual spending</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>Premium</Text>
                </View>
              </View>
              <Switch
                value={settings.unusualSpending}
                onValueChange={() => toggleSetting('unusualSpending')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Daily summary</Text>
              <Switch
                value={settings.dailySummary}
                onValueChange={() => toggleSetting('dailySummary')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Account Updates */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Updates</Text>

          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Bank sync complete</Text>
              <Switch
                value={settings.bankSyncComplete}
                onValueChange={() => toggleSetting('bankSyncComplete')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Bank connection issue</Text>
              <Switch
                value={settings.bankIssue}
                onValueChange={() => toggleSetting('bankIssue')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Delivery Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Method</Text>

          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleSetting('pushNotifications')}
            >
              <View style={[styles.checkbox, settings.pushNotifications && styles.checkboxChecked]}>
                {settings.pushNotifications && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Push notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleSetting('email')}
            >
              <View style={[styles.checkbox, settings.email && styles.checkboxChecked]}>
                {settings.email && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleSetting('sms')}
            >
              <View style={[styles.checkbox, settings.sms && styles.checkboxChecked]}>
                {settings.sms && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.settingWithBadge}>
                <Text style={styles.checkboxText}>SMS</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>Premium</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>Quiet Hours</Text>
              <Text style={styles.settingSubtitle}>10:00 PM - 8:00 AM</Text>
            </View>
            <Switch
              value={settings.quietHours}
              onValueChange={() => toggleSetting('quietHours')}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>
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
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: theme.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: theme.spacing[6],
    paddingBottom: theme.spacing[8],
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    marginBottom: theme.spacing[4],
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: 18,
    marginBottom: theme.spacing[4],
  },
  settingsGroup: {
    gap: theme.spacing[4],
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  settingSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  settingText: {
    ...theme.typography.styles.body,
  },
  settingHint: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
  settingWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  premiumBadge: {
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: 2,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontSize: 12,
    fontWeight: '600',
  },
  checkboxGroup: {
    gap: theme.spacing[2],
    marginBottom: theme.spacing[4],
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
    marginRight: theme.spacing[2],
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
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing[4],
  },
});
