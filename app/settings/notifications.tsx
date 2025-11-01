import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, StatusBar } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
import { SETTINGS_CONSTANTS } from './settingsStyles';

type AlertTiming = 'immediate' | 'daily' | 'weekly';

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  enabled: boolean;
  isPremium?: boolean;
}

export default function NotificationsSettings() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [masterToggle, setMasterToggle] = useState(true);
  const [alertTiming, setAlertTiming] = useState<AlertTiming>('immediate');

  // Budget Alerts
  const [budgetAlerts, setBudgetAlerts] = useState<NotificationItem[]>([
    { id: 'approaching90', title: 'At 90%', subtitle: 'Budget approaching limit', icon: 'warning-outline', enabled: true },
    { id: 'approaching100', title: 'At 100%', subtitle: 'Budget limit reached', icon: 'notifications-outline', enabled: true },
    { id: 'exceeded', title: 'Exceeded', subtitle: 'Over budget', icon: 'alert-circle-outline', enabled: true },
    { id: 'categoryLimit', title: 'Category Limit', subtitle: 'Category over budget', icon: 'pie-chart-outline', enabled: true },
    { id: 'underBudget', title: 'Under Budget', subtitle: 'Spending on track', icon: 'checkmark-circle-outline', enabled: false },
    { id: 'budgetPeriodEnd', title: 'Period Ending', subtitle: '3 days before end', icon: 'calendar-outline', enabled: true },
  ]);

  // Bill Reminders
  const [billReminders, setBillReminders] = useState<NotificationItem[]>([
    { id: 'dueTomorrow', title: 'Due Tomorrow', subtitle: 'Bill due in 1 day', icon: 'time-outline', enabled: true },
    { id: 'due3Days', title: 'Due in 3 Days', subtitle: 'Bill due soon', icon: 'hourglass-outline', enabled: true },
    { id: 'due1Week', title: 'Due in 1 Week', subtitle: 'Bill due in 7 days', icon: 'calendar-clear-outline', enabled: false },
    { id: 'billChanged', title: 'Bill Changed', subtitle: 'Amount updated', icon: 'swap-horizontal-outline', enabled: true },
  ]);

  // Transaction Alerts
  const [transactionAlerts, setTransactionAlerts] = useState<NotificationItem[]>([
    { id: 'largePurchases', title: 'Large Purchase', subtitle: 'Over $500', icon: 'cash-outline', enabled: false },
    { id: 'unusualSpending', title: 'Unusual Spend', subtitle: 'Above average', icon: 'trending-up-outline', enabled: false, isPremium: true },
    { id: 'dailySummary', title: 'Daily Summary', subtitle: 'Recap at 6pm', icon: 'stats-chart-outline', enabled: false },
  ]);

  // Account Updates
  const [accountUpdates, setAccountUpdates] = useState<NotificationItem[]>([
    { id: 'bankSyncComplete', title: 'Sync Complete', subtitle: 'Bank updated', icon: 'cloud-done-outline', enabled: false },
    { id: 'bankIssue', title: 'Bank Issue', subtitle: 'Connection error', icon: 'warning-outline', enabled: true },
  ]);

  // Delivery Methods
  const [deliveryMethods, setDeliveryMethods] = useState({
    push: true,
    email: true,
    sms: false,
  });

  const [quietHours, setQuietHours] = useState(true);

  const toggleNotification = (
    list: NotificationItem[],
    setList: React.Dispatch<React.SetStateAction<NotificationItem[]>>,
    id: string
  ) => {
    setList(list.map(item =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  const renderNotificationCard = (
    item: NotificationItem,
    onToggle: () => void
  ) => (
    <View key={item.id} style={styles.notificationCard}>
      <View style={styles.cardContent}>
        <View style={styles.notificationIconContainer}>
          <Ionicons
            name={item.icon}
            size={SETTINGS_CONSTANTS.ICON_SIZE}
            color={theme.colors.text.primary}
          />
        </View>
        <View style={styles.cardTextContainer}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            {item.isPremium && (
              <View style={styles.premiumBadgeSmall}>
                <Text style={styles.premiumBadgeTextSmall}>Pro</Text>
              </View>
            )}
          </View>
          <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={item.enabled}
          onValueChange={onToggle}
          trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );

  const renderSection = (
    title: string,
    items: NotificationItem[],
    setItems: React.Dispatch<React.SetStateAction<NotificationItem[]>>
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.cardContainer}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderNotificationCard(item, () => toggleNotification(items, setItems, item.id))}
            {index < items.length - 1 && <View style={styles.cardDivider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    content: {
      padding: responsive.spacing[4],
      paddingBottom: responsive.spacing[8],
    },
    masterToggleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[6],
      ...theme.shadows.sm,
    },
    masterToggleLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      flex: 1,
    },
    masterIcon: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      backgroundColor: theme.colors.background.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    masterToggleTitle: {
      ...theme.typography.styles.body,
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      marginBottom: 4,
    },
    masterToggleSubtitle: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
    },
    section: {
      marginBottom: responsive.spacing[6],
    },
    sectionTitle: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: theme.colors.text.tertiary,
      fontWeight: settingsFontWeights.bold,
      letterSpacing: 1.2,
      marginBottom: responsive.spacing[3],
    },
    cardContainer: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.sm,
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      gap: responsive.spacing[3],
      minHeight: ms(72),
    },
    cardDivider: {
      height: 1,
      backgroundColor: theme.colors.border.light,
      marginLeft: ms(72),
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      flex: 1,
    },
    notificationIconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      backgroundColor: theme.colors.background.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTextContainer: {
      flex: 1,
      gap: responsive.spacing[0.5],
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1.5],
    },
    cardTitle: {
      ...theme.typography.styles.body,
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
    },
    cardSubtitle: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
    },
    premiumBadgeSmall: {
      backgroundColor: theme.colors.warning.light,
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: 4,
      paddingVertical: 1,
    },
    premiumBadgeTextSmall: {
      ...theme.typography.styles.caption,
      color: theme.colors.warning.dark,
      fontSize: settingsTypography.badge,
      lineHeight: 12,
      fontWeight: settingsFontWeights.semibold,
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
      fontSize: settingsTypography.badge,
      lineHeight: 14,
      fontWeight: settingsFontWeights.semibold,
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
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      marginBottom: 4,
    },
    timingSubtitle: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
    },
    deliveryCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    deliveryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[2],
    },
    deliveryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: responsive.spacing[2],
      gap: responsive.spacing[3],
    },
    deliveryIconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      backgroundColor: theme.colors.background.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deliveryTextContainer: {
      flex: 1,
    },
    deliveryTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    deliveryTitle: {
      ...theme.typography.styles.body,
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      marginBottom: 4,
    },
    deliverySubtitle: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border.light,
      marginVertical: responsive.spacing[2],
    },
    switchContainer: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
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
      width: ms(48),
      height: ms(48),
      backgroundColor: theme.colors.background.tertiary,
      borderRadius: ms(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[2],
    },
    exampleContent: {
      flex: 1,
    },
    exampleTitle: {
      ...theme.typography.styles.body,
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      marginBottom: responsive.spacing[1],
    },
    exampleMessage: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.text.secondary,
      marginBottom: responsive.spacing[2],
    },
    exampleTime: {
      ...theme.typography.styles.caption,
      fontSize: settingsTypography.tertiary,
      lineHeight: settingsTypography.tertiary * 1.5,
      color: theme.colors.text.tertiary,
    },
    infoBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.info.light,
      borderWidth: 1,
      borderColor: theme.colors.info.main,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginTop: responsive.spacing[4],
    },
    infoText: {
      ...theme.typography.styles.bodySmall,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: theme.colors.info.dark,
      marginLeft: responsive.spacing[2],
      flex: 1,
    },
  });

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background.secondary} />
      <ScreenHeader title="Notifications" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Master Toggle */}
        <View style={styles.masterToggleCard}>
          <View style={styles.masterToggleLeft}>
            <View style={styles.masterIcon}>
              <Ionicons name="notifications" size={SETTINGS_CONSTANTS.ICON_SIZE} color={theme.colors.text.primary} />
            </View>
            <View>
              <Text style={styles.masterToggleTitle}>All Notifications</Text>
              <Text style={styles.masterToggleSubtitle}>
                {masterToggle ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={masterToggle}
              onValueChange={setMasterToggle}
              trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Budget Alerts */}
        {renderSection('BUDGET ALERTS', budgetAlerts, setBudgetAlerts)}

        {/* Bill Reminders */}
        {renderSection('BILL REMINDERS', billReminders, setBillReminders)}

        {/* Transaction Alerts */}
        {renderSection('TRANSACTION ALERTS', transactionAlerts, setTransactionAlerts)}

        {/* Account Updates */}
        {renderSection('ACCOUNT UPDATES', accountUpdates, setAccountUpdates)}

        {/* Alert Timing */}
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

        {/* Delivery Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DELIVERY METHOD</Text>

          <View style={styles.deliveryCard}>
            <View style={styles.deliveryRow}>
              <View style={styles.deliveryLeft}>
                <View style={styles.deliveryIconContainer}>
                  <Ionicons name="phone-portrait-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={theme.colors.text.primary} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryTitle}>Push Notifications</Text>
                  <Text style={styles.deliverySubtitle}>In-app alerts</Text>
                </View>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={deliveryMethods.push}
                  onValueChange={() => setDeliveryMethods(prev => ({ ...prev, push: !prev.push }))}
                  trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.deliveryRow}>
              <View style={styles.deliveryLeft}>
                <View style={styles.deliveryIconContainer}>
                  <Ionicons name="mail-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={theme.colors.text.primary} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryTitle}>Email Notifications</Text>
                  <Text style={styles.deliverySubtitle}>Send to user@example.com</Text>
                </View>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={deliveryMethods.email}
                  onValueChange={() => setDeliveryMethods(prev => ({ ...prev, email: !prev.email }))}
                  trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.deliveryRow}>
              <View style={styles.deliveryLeft}>
                <View style={styles.deliveryIconContainer}>
                  <Ionicons name="chatbubble-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={theme.colors.text.primary} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <View style={styles.deliveryTitleRow}>
                    <Text style={styles.deliveryTitle}>SMS Notifications</Text>
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>Premium</Text>
                    </View>
                  </View>
                  <Text style={styles.deliverySubtitle}>Send to +61 4XX XXX XXX</Text>
                </View>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={deliveryMethods.sms}
                  onValueChange={() => setDeliveryMethods(prev => ({ ...prev, sms: !prev.sms }))}
                  trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                  thumbColor="#FFFFFF"
                  disabled
                />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.deliveryRow}>
              <View style={styles.deliveryLeft}>
                <View style={styles.deliveryIconContainer}>
                  <Ionicons name="moon-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={theme.colors.text.primary} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryTitle}>Quiet Hours</Text>
                  <Text style={styles.deliverySubtitle}>10:00 PM - 8:00 AM</Text>
                </View>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={quietHours}
                  onValueChange={setQuietHours}
                  trackColor={{ false: theme.colors.border.main, true: theme.colors.success.main }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Example Notification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXAMPLE NOTIFICATION</Text>

          <View style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <View style={styles.exampleIconContainer}>
                <Ionicons name="notifications" size={SETTINGS_CONSTANTS.ICON_SIZE} color={theme.colors.text.primary} />
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

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={ms(20)} color={theme.colors.info.main} />
          <Text style={styles.infoText}>
            Notification preferences are saved automatically. Critical alerts like bank connection issues will always be sent immediately.
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}