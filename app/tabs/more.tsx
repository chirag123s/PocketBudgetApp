import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights } from '@/app/settings/typography';
import { getSettingsStyles, SETTINGS_CONSTANTS } from '@/app/settings/settingsStyles';

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  iconColor: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function MoreTab() {
  const router = useRouter();
  const { theme: themeMode, customBackgroundColor, customCardColor } = useTheme();
  const theme = getTheme(themeMode, customBackgroundColor, customCardColor);
  const settingsStyles = getSettingsStyles(themeMode, customBackgroundColor, customCardColor);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
  };

  const menuSections: MenuSection[] = [
    {
      title: 'ACCOUNT',
      items: [
        {
          id: '1',
          title: 'Profile',
          icon: 'person-outline',
          route: '/settings/profile',
          iconColor: colors.primary,
        },
        {
          id: '2',
          title: 'Subscription',
          icon: 'diamond-outline',
          route: '/settings/subscription',
          iconColor: colors.functionalWarning,
          badge: 'Premium',
        },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        {
          id: '3',
          title: 'Appearance',
          icon: 'color-palette-outline',
          route: '/settings/appearance',
          iconColor: colors.primary,
        },
        {
          id: '4',
          title: 'Currency & Region',
          icon: 'globe-outline',
          route: '/settings/currency-region',
          iconColor: colors.primary,
        },
        {
          id: '5',
          title: 'Notifications',
          icon: 'notifications-outline',
          route: '/settings/notifications',
          iconColor: colors.primary,
        },
      ],
    },
    {
      title: 'DATA',
      items: [
        {
          id: '6',
          title: 'Backup & Restore',
          icon: 'cloud-upload-outline',
          route: '/settings/backup-restore',
          iconColor: colors.functionalSuccess,
        },
        {
          id: '7',
          title: 'Import Data',
          icon: 'download-outline',
          route: '/settings/import',
          iconColor: colors.primary,
        },
        {
          id: '8',
          title: 'Export Data',
          icon: 'share-outline',
          route: '/settings/export',
          iconColor: colors.primary,
        },
      ],
    },
    {
      title: 'SECURITY',
      items: [
        {
          id: '9',
          title: 'Security',
          icon: 'shield-checkmark-outline',
          route: '/settings/security',
          iconColor: colors.primary,
        },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        {
          id: '10',
          title: 'Help & FAQ',
          icon: 'help-circle-outline',
          route: '/settings/help',
          iconColor: colors.primary,
        },
        {
          id: '11',
          title: 'Contact Support',
          icon: 'mail-outline',
          route: '/settings/contact',
          iconColor: colors.primary,
        },
        {
          id: '12',
          title: 'About',
          icon: 'information-circle-outline',
          route: '/settings/about',
          iconColor: colors.primary,
        },
      ],
    },
  ];

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.neutralBg,
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    content: {
      paddingTop: responsive.spacing[4],
      paddingBottom: responsive.spacing[20],
    },
    section: {
      marginBottom: responsive.spacing[6],
      paddingHorizontal: responsive.spacing[4],
    },
    sectionTitle: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: theme.colors.text.tertiary,
      fontWeight: settingsFontWeights.bold,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginBottom: responsive.spacing[3],
    },
    card: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.sm,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      gap: responsive.spacing[3],
      minHeight: ms(72),
    },
    menuItemDivider: {
      height: 1,
      backgroundColor: theme.colors.border.light,
      marginLeft: ms(72),
    },
    iconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuText: {
      ...theme.typography.styles.body,
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      color: theme.colors.text.primary,
      flex: 1,
    },
    badge: {
      backgroundColor: colors.functionalWarning,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: responsive.spacing[1],
      borderRadius: theme.borderRadius.sm,
      marginRight: responsive.spacing[2],
    },
    badgeText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '700',
      color: colors.neutralWhite,
    },
    chevron: {
      marginLeft: 'auto',
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {menuSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.card}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push(item.route as any)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}20` }]}>
                      <Ionicons
                        name={item.icon}
                        size={SETTINGS_CONSTANTS.ICON_SIZE}
                        color={item.iconColor}
                      />
                    </View>

                    <Text style={styles.menuText}>{item.title}</Text>

                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}

                    <Ionicons
                      name="chevron-forward"
                      size={SETTINGS_CONSTANTS.CHEVRON_SIZE}
                      color={colors.neutralMedium}
                      style={styles.chevron}
                    />
                  </TouchableOpacity>

                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.menuItemDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
