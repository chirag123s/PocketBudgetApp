import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

  // Border
  border: theme.colors.border.light,
};

type ThemeType = 'light' | 'dark' | 'system';

interface Widget {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  isPrimary?: boolean;
}

export default function AppearanceSettings() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('system');
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: '1',
      icon: 'wallet',
      title: 'Account Balances',
      description: 'View your current balance.',
      enabled: true,
      isPrimary: true,
    },
    {
      id: '2',
      icon: 'receipt',
      title: 'Recent Transactions',
      description: 'Your latest spending.',
      enabled: true,
      isPrimary: true,
    },
    {
      id: '3',
      icon: 'chart-pie',
      title: 'Spending by Category',
      description: 'Breakdown of your expenses.',
      enabled: true,
      isPrimary: false,
    },
    {
      id: '4',
      icon: 'calendar-clock',
      title: 'Upcoming Bills',
      description: 'Never miss a payment.',
      enabled: false,
      isPrimary: false,
    },
    {
      id: '5',
      icon: 'piggy-bank',
      title: 'Savings Goals',
      description: 'Track your goal progress.',
      enabled: false,
      isPrimary: true,
    },
  ]);

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget =>
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const ThemeOption = ({
    icon,
    label,
    value
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: ThemeType;
  }) => {
    const isSelected = selectedTheme === value;

    return (
      <TouchableOpacity
        style={[
          styles.themeOption,
          isSelected && styles.themeOptionSelected,
        ]}
        onPress={() => setSelectedTheme(value)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={icon}
          size={24}
          color={isSelected ? colors.primary : colors.neutralDarkest}
        />
        <Text
          style={[
            styles.themeLabel,
            { color: isSelected ? colors.primary : colors.neutralDarkest },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const WidgetItem = ({ widget }: { widget: Widget }) => (
    <View style={styles.widgetItem}>
      <MaterialCommunityIcons
        name="drag-horizontal-variant"
        size={24}
        color={colors.neutralMedium}
        style={styles.dragHandle}
      />

      <View
        style={[
          styles.widgetIconContainer,
          {
            backgroundColor: widget.isPrimary
              ? `${colors.functionalSuccess}20`
              : `${colors.primary}20`
          },
        ]}
      >
        <MaterialCommunityIcons
          name={widget.icon as any}
          size={24}
          color={widget.isPrimary ? colors.functionalSuccess : colors.primary}
        />
      </View>

      <View style={styles.widgetContent}>
        <Text style={styles.widgetTitle}>
          {widget.title}
        </Text>
        <Text style={styles.widgetDescription}>
          {widget.description}
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Switch
          value={widget.enabled}
          onValueChange={() => toggleWidget(widget.id)}
          trackColor={{
            false: colors.border,
            true: colors.functionalSuccess
          }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <ScreenHeader title="Appearance" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <Text style={styles.sectionDescription}>
            Changes will apply across the app.
          </Text>

          <View style={styles.themeContainer}>
            <ThemeOption icon="sunny" label="Light" value="light" />
            <ThemeOption icon="moon" label="Dark" value="dark" />
            <ThemeOption icon="contrast" label="System" value="system" />
          </View>
        </View>

        {/* Home Screen Widgets Section */}
        <View style={styles.widgetsSection}>
          <Text style={styles.sectionTitle}>Home Screen Widgets</Text>
          <Text style={styles.sectionDescription}>
            Add, remove, or drag to reorder the widgets on your home screen.
          </Text>

          <View style={styles.widgetsList}>
            {widgets.map((widget) => (
              <WidgetItem key={widget.id} widget={widget} />
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: responsive.spacing[6],
  },
  section: {
    paddingTop: responsive.spacing[6],
  },
  widgetsSection: {
    paddingTop: responsive.spacing[8],
    paddingBottom: responsive.spacing[6],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.xl,
    lineHeight: responsive.fontSize.xl * 1.5,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[1],
  },
  sectionDescription: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.6,
    color: colors.neutralDark,
    marginBottom: responsive.spacing[4],
  },
  themeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutralWhite,
    padding: responsive.spacing[1],
    borderRadius: theme.borderRadius.xl,
    gap: responsive.spacing[1],
    ...theme.shadows.sm,
  },
  themeOption: {
    flex: 1,
    height: ms(80),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[2],
    borderRadius: theme.borderRadius.lg,
    backgroundColor: colors.neutralBg,
  },
  themeOptionSelected: {
    backgroundColor: colors.neutralWhite,
    ...theme.shadows.md,
  },
  themeLabel: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    fontWeight: '600',
  },
  widgetsList: {
    gap: responsive.spacing[2],
  },
  widgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.spacing[3],
    borderRadius: theme.borderRadius.xl,
    gap: responsive.spacing[3],
    backgroundColor: colors.neutralWhite,
    ...theme.shadows.sm,
  },
  dragHandle: {
    opacity: 0.5,
  },
  widgetIconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetContent: {
    flex: 1,
    gap: 2,
  },
  widgetTitle: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
    color: colors.neutralDarkest,
  },
  widgetDescription: {
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: colors.neutralDark,
  },
  switchContainer: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});
