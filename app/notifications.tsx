import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SectionList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type NotificationType = 'budget-alert' | 'transaction' | 'savings' | 'bill-reminder' | 'summary';
type NotificationFilter = 'All' | 'Unread' | 'Alerts';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
}

interface NotificationSection {
  title: string;
  data: Notification[];
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [selectedFilter, setSelectedFilter] = useState<NotificationFilter>('All');

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

  // Sample notification data
  const [notifications, setNotifications] = useState<NotificationSection[]>([
    {
      title: 'New Today',
      data: [
        {
          id: '1',
          type: 'budget-alert',
          title: 'Budget Alert',
          description: "You've spent 90% of your 'Groceries' budget.",
          timestamp: '5m ago',
          isUnread: true,
          icon: 'warning',
          iconBgColor: colors.functionalWarning,
        },
        {
          id: '2',
          type: 'transaction',
          title: 'Transaction Update',
          description: 'New transaction of $45.50 at Woolworths.',
          timestamp: '1h ago',
          isUnread: true,
          icon: 'receipt-outline',
          iconBgColor: `${colors.neutralMedium}40`,
        },
      ],
    },
    {
      title: 'Yesterday',
      data: [
        {
          id: '3',
          type: 'savings',
          title: 'Savings Goal Update',
          description: "You've reached your 'Holiday Fund' goal!",
          timestamp: 'Yesterday',
          isUnread: false,
          icon: 'wallet-outline',
          iconBgColor: colors.functionalSuccess,
        },
        {
          id: '4',
          type: 'bill-reminder',
          title: 'Bill Reminder',
          description: 'Upcoming bill: Telstra is due in 3 days.',
          timestamp: 'Yesterday',
          isUnread: false,
          icon: 'calendar-outline',
          iconBgColor: `${colors.neutralMedium}40`,
        },
      ],
    },
    {
      title: 'This Week',
      data: [
        {
          id: '5',
          type: 'summary',
          title: 'Weekly Summary',
          description: 'Your weekly spending summary is ready.',
          timestamp: '3d ago',
          isUnread: false,
          icon: 'document-text-outline',
          iconBgColor: `${colors.neutralMedium}40`,
        },
      ],
    },
  ]);

  const handleMarkAllAsRead = () => {
    Alert.alert(
      'Mark All as Read',
      'Mark all notifications as read?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark All',
          onPress: () => {
            // Update all notifications to read
            const updatedNotifications = notifications.map((section) => ({
              ...section,
              data: section.data.map((notif) => ({
                ...notif,
                isUnread: false,
              })),
            }));
            setNotifications(updatedNotifications);
          },
        },
      ]
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read when pressed
    const updatedNotifications = notifications.map((section) => ({
      ...section,
      data: section.data.map((notif) =>
        notif.id === notification.id ? { ...notif, isUnread: false } : notif
      ),
    }));
    setNotifications(updatedNotifications);
  };

  // Filter notifications based on selected filter
  const getFilteredNotifications = (): NotificationSection[] => {
    if (selectedFilter === 'Unread') {
      return notifications
        .map((section) => ({
          ...section,
          data: section.data.filter((notif) => notif.isUnread),
        }))
        .filter((section) => section.data.length > 0);
    }

    if (selectedFilter === 'Alerts') {
      return notifications
        .map((section) => ({
          ...section,
          data: section.data.filter((notif) => notif.type === 'budget-alert'),
        }))
        .filter((section) => section.data.length > 0);
    }

    return notifications;
  };

  const filteredNotifications = getFilteredNotifications();
  const hasUnreadNotifications = notifications.some((section) =>
    section.data.some((notif) => notif.isUnread)
  );

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const isIconBgColored = item.iconBgColor === colors.functionalSuccess ||
                           item.iconBgColor === colors.functionalWarning ||
                           item.iconBgColor === colors.functionalError;

    return (
      <TouchableOpacity
        style={styles.notificationItem}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.notificationContent}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
            <Ionicons
              name={item.icon}
              size={ms(24)}
              color={isIconBgColored ? colors.neutralWhite : colors.neutralDarkest}
            />
          </View>

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.notificationDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>

        {/* Right Side: Timestamp and Unread Indicator */}
        <View style={styles.rightContent}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.isUnread && (
            <View style={styles.unreadDot} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: NotificationSection }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="notifications-off-outline" size={ms(48)} color={colors.neutralMedium} />
      </View>
      <Text style={styles.emptyTitle}>No New Notifications</Text>
      <Text style={styles.emptyDescription}>
        You're all caught up! We'll let you know when there's something new.
      </Text>
    </View>
  );

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerButton: {
      width: ms(48),
      height: ms(48),
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
      flex: 1,
      textAlign: 'center',
    },
    segmentedControlContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    segmentedControl: {
      flexDirection: 'row',
      height: ms(40),
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[1],
      backgroundColor: `${colors.neutralMedium}20`,
    },
    segment: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: responsive.spacing[2],
    },
    segmentActive: {
      backgroundColor: colors.neutralWhite,
      ...theme.shadows.sm,
    },
    segmentText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    segmentTextActive: {
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    listContent: {
      paddingHorizontal: responsive.spacing[2],
      paddingBottom: responsive.spacing[4],
    },
    sectionHeader: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[4],
      paddingBottom: responsive.spacing[2],
      backgroundColor: colors.neutralBg,
    },
    sectionHeaderText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.neutralDark,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      minHeight: ms(72),
    },
    notificationContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[4],
      flex: 1,
    },
    iconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContent: {
      flex: 1,
      gap: responsive.spacing[1],
    },
    notificationTitle: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    notificationDescription: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '400',
      color: colors.neutralDark,
      lineHeight: responsive.fontSize.sm * 1.4,
    },
    rightContent: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: responsive.spacing[1],
      marginLeft: responsive.spacing[2],
    },
    timestamp: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '400',
      color: colors.neutralMedium,
    },
    unreadDot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(5),
      backgroundColor: colors.primary,
    },
    scrollContent: {
      flex: 1,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: responsive.spacing[8],
      paddingVertical: responsive.spacing[16],
    },
    emptyIconContainer: {
      width: ms(96),
      height: ms(96),
      borderRadius: ms(48),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${colors.neutralMedium}20`,
      marginBottom: responsive.spacing[6],
    },
    emptyTitle: {
      fontSize: responsive.fontSize.h3,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    emptyDescription: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '400',
      color: colors.neutralDark,
      textAlign: 'center',
      lineHeight: responsive.fontSize.sm * 1.4,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={ms(28)} color={colors.neutralDarkest} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity
          onPress={handleMarkAllAsRead}
          style={styles.headerButton}
          disabled={!hasUnreadNotifications}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="checkmark-done"
            size={ms(28)}
            color={hasUnreadNotifications ? colors.neutralDarkest : colors.neutralMedium}
          />
        </TouchableOpacity>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentedControlContainer}>
        <View style={styles.segmentedControl}>
          {(['All', 'Unread', 'Alerts'] as NotificationFilter[]).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.segment,
                selectedFilter === filter && styles.segmentActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedFilter === filter && styles.segmentTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notification List */}
      {filteredNotifications.length > 0 ? (
        <SectionList
          sections={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderEmptyState()}
        </ScrollView>
      )}
    </Screen>
  );
}
