import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type AlertTiming = 'immediate' | 'daily' | 'weekly';
type NotificationType = 'push' | 'email' | 'sms';

export default function BudgetAlerts() {
  const router = useRouter();

  // Alert triggers
  const [alerts, setAlerts] = useState({
    approaching90: true,
    approaching100: true,
    exceeded: true,
    categoryLimit: false,
    unusualSpending: false,
    budgetPeriodEnd: true,
  });

  // Alert timing
  const [alertTiming, setAlertTiming] = useState<AlertTiming>('immediate');

  // Notification types
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false,
  });

  const toggleAlert = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save settings logic
    router.back();
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
        <Text style={styles.headerTitle}>Budget Alerts</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Alert When Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ALERT ME WHEN</Text>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>⚠️</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Approaching 90%</Text>
                  <Text style={styles.settingSubtitle}>Budget is at 90% spent</Text>
                </View>
              </View>
              <Switch
                value={alerts.approaching90}
                onValueChange={() => toggleAlert('approaching90')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Approaching 100%</Text>
                  <Text style={styles.settingSubtitle}>Budget is at 100% spent</Text>
                </View>
              </View>
              <Switch
                value={alerts.approaching100}
                onValueChange={() => toggleAlert('approaching100')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🚨</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Budget Exceeded</Text>
                  <Text style={styles.settingSubtitle}>Spending goes over budget</Text>
                </View>
              </View>
              <Switch
                value={alerts.exceeded}
                onValueChange={() => toggleAlert('exceeded')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📊</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Category Limit Reached</Text>
                  <Text style={styles.settingSubtitle}>Individual category over budget</Text>
                </View>
              </View>
              <Switch
                value={alerts.categoryLimit}
                onValueChange={() => toggleAlert('categoryLimit')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>👀</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Unusual Spending Detected</Text>
                  <Text style={styles.settingSubtitle}>Higher than typical spending</Text>
                </View>
              </View>
              <Switch
                value={alerts.unusualSpending}
                onValueChange={() => toggleAlert('unusualSpending')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📅</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Budget Period Ending</Text>
                  <Text style={styles.settingSubtitle}>3 days before period ends</Text>
                </View>
              </View>
              <Switch
                value={alerts.budgetPeriodEnd}
                onValueChange={() => toggleAlert('budgetPeriodEnd')}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Alert Timing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ALERT TIMING</Text>

          <View style={styles.timingContainer}>
            <TouchableOpacity
              style={[
                styles.timingOption,
                alertTiming === 'immediate' && styles.timingOptionSelected,
              ]}
              onPress={() => setAlertTiming('immediate')}
            >
              <View style={styles.radioCircle}>
                {alertTiming === 'immediate' && <View style={styles.radioCircleInner} />}
              </View>
              <View style={styles.timingTextContainer}>
                <Text style={styles.timingTitle}>Immediate</Text>
                <Text style={styles.timingSubtitle}>Alert as soon as threshold is reached</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.timingOption,
                alertTiming === 'daily' && styles.timingOptionSelected,
              ]}
              onPress={() => setAlertTiming('daily')}
            >
              <View style={styles.radioCircle}>
                {alertTiming === 'daily' && <View style={styles.radioCircleInner} />}
              </View>
              <View style={styles.timingTextContainer}>
                <Text style={styles.timingTitle}>Daily Summary</Text>
                <Text style={styles.timingSubtitle}>One notification per day at 6pm</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.timingOption,
                alertTiming === 'weekly' && styles.timingOptionSelected,
              ]}
              onPress={() => setAlertTiming('weekly')}
            >
              <View style={styles.radioCircle}>
                {alertTiming === 'weekly' && <View style={styles.radioCircleInner} />}
              </View>
              <View style={styles.timingTextContainer}>
                <Text style={styles.timingTitle}>Weekly Summary</Text>
                <Text style={styles.timingSubtitle}>Sundays at 6pm</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATION TYPE</Text>

          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="phone-portrait-outline" size={24} color={theme.colors.text.secondary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingSubtitle}>In-app alerts</Text>
                </View>
              </View>
              <Switch
                value={notifications.push}
                onValueChange={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="mail-outline" size={24} color={theme.colors.text.secondary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Email Notifications</Text>
                  <Text style={styles.settingSubtitle}>Send to user@example.com</Text>
                </View>
              </View>
              <Switch
                value={notifications.email}
                onValueChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="chatbubble-outline" size={24} color={theme.colors.text.secondary} />
                <View style={styles.settingTextContainer}>
                  <View style={styles.settingTitleRow}>
                    <Text style={styles.settingTitle}>SMS Notifications</Text>
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>Premium</Text>
                    </View>
                  </View>
                  <Text style={styles.settingSubtitle}>Send to +61 4XX XXX XXX</Text>
                </View>
              </View>
              <Switch
                value={notifications.sms}
                onValueChange={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                thumbColor="#FFFFFF"
                disabled
              />
            </View>
          </View>
        </View>

        {/* Example Notification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXAMPLE NOTIFICATION</Text>

          <View style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <View style={styles.exampleIconContainer}>
                <Ionicons name="notifications" size={20} color={theme.colors.warning.dark} />
              </View>
              <View style={styles.exampleContent}>
                <Text style={styles.exampleTitle}>Budget Alert: Groceries</Text>
                <Text style={styles.exampleMessage}>
                  You've spent $450 of $500 (90%). You have $50 remaining for the rest of the period.
                </Text>
                <Text style={styles.exampleTime}>2 minutes ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={handleSave}
        >
          Save Settings
        </Button>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={theme.colors.info.main} />
          <Text style={styles.infoText}>
            You can change these settings anytime from Settings → Notifications
          </Text>
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
  section: {
    marginBottom: responsive.spacing[6],
  },
  sectionTitle: {
    ...theme.typography.styles.label,
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: responsive.spacing[2],
  },
  settingsCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.spacing[2],
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: responsive.spacing[2],
  },
  settingIcon: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  settingTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: responsive.spacing[2],
  },
  timingContainer: {
    gap: responsive.spacing[2],
  },
  timingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  timingOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[500],
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing[2],
  },
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary[600],
  },
  timingTextContainer: {
    flex: 1,
  },
  timingTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  timingSubtitle: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  premiumBadge: {
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 2,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '600',
  },
  exampleCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    borderWidth: 1,
    borderColor: theme.colors.warning.light,
    ...theme.shadows.sm,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  exampleIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.warning.light,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing[2],
  },
  exampleContent: {
    flex: 1,
  },
  exampleTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: responsive.spacing[1],
  },
  exampleMessage: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: responsive.spacing[2],
  },
  exampleTime: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.info.light,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    marginTop: responsive.spacing[6],
  },
  infoText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
    marginLeft: responsive.spacing[2],
    flex: 1,
  },
});
