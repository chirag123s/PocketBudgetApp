import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

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
      backgroundColor: colors.neutralWhite,
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    headerTitle: {
      fontSize: responsive.fontSize.xl,
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
      fontSize: responsive.fontSize.xs,
      fontWeight: '700',
      color: colors.neutralDark,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      paddingVertical: responsive.spacing[2],
      marginBottom: responsive.spacing[2],
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
      minHeight: ms(56),
    },
    menuItemDivider: {
      height: 1,
      backgroundColor: colors.neutralBg,
      marginLeft: ms(56),
    },
    iconContainer: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: responsive.spacing[3],
    },
    menuText: {
      flex: 1,
      fontSize: responsive.fontSize.md,
      fontWeight: '500',
      color: colors.neutralDarkest,
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
                        size={24}
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
                      size={20}
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
