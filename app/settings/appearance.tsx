import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
import { useWidgets } from '@/contexts/WidgetContext';
import { WIDGET_REGISTRY, WidgetId } from '@/components/widgets';

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
  iconBg: theme.colors.background.tertiary,
};

type ThemeType = 'light' | 'dark' | 'system';

// Icon mapping for widgets (not used, keeping for reference)
const widgetIconMap: Record<WidgetId, keyof typeof Ionicons.glyphMap> = {
  'budget-overview': 'wallet-outline',
  'spending-summary': 'bar-chart-outline',
  'recent-transactions': 'receipt-outline',
  'category-breakdown': 'pie-chart-outline',
  'bank-accounts': 'business-outline',
  'upcoming-bills': 'calendar-outline',
  'savings-goal': 'flag-outline',
  'card-cycle': 'card-outline',
};

export default function AppearanceSettings() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('system');
  const { enabledWidgets, widgetOrder, toggleWidget, isLoading } = useWidgets();

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
          size={20}
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

  const WidgetItem = ({ widgetId }: { widgetId: WidgetId }) => {
    const widget = WIDGET_REGISTRY[widgetId];
    const isEnabled = enabledWidgets.includes(widgetId);

    return (
      <View style={styles.widgetItem}>
        <Ionicons
          name="reorder-three-outline"
          size={20}
          color={colors.neutralMedium}
          style={styles.dragHandle}
        />

        <View style={styles.widgetIconContainer}>
          <Text style={styles.widgetEmoji}>{widget.icon}</Text>
        </View>

        <View style={styles.widgetContent}>
          <Text style={styles.widgetTitle}>
            {widget.name}
          </Text>
          <Text style={styles.widgetDescription}>
            {widget.description}
          </Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            value={isEnabled}
            onValueChange={() => toggleWidget(widgetId)}
            trackColor={{
              false: colors.border,
              true: colors.functionalSuccess
            }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
    );
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
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
            Customize widgets shown on your dashboard. Drag to reorder.
          </Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading widgets...</Text>
            </View>
          ) : (
            <View style={styles.widgetsList}>
              {widgetOrder.map((widgetId) => (
                <WidgetItem key={widgetId} widgetId={widgetId} />
              ))}
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: responsive.spacing[4],
  },
  section: {
    paddingTop: responsive.spacing[4],
  },
  widgetsSection: {
    paddingTop: responsive.spacing[6],
    paddingBottom: responsive.spacing[4],
  },
  sectionTitle: {
    fontSize: settingsTypography.sectionHeading,
    lineHeight: settingsTypography.sectionHeading * 1.5,
    fontWeight: settingsFontWeights.bold,
    letterSpacing: -0.3,
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[2],
  },
  sectionDescription: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.6,
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
    height: ms(72),
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
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    fontWeight: settingsFontWeights.semibold,
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
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetEmoji: {
    fontSize: 24,
  },
  widgetContent: {
    flex: 1,
    gap: 2,
  },
  loadingContainer: {
    paddingVertical: responsive.spacing[6],
    alignItems: 'center',
  },
  loadingText: {
    fontSize: settingsTypography.secondary,
    color: colors.neutralDark,
  },
  widgetTitle: {
    fontSize: settingsTypography.primary,
    lineHeight: settingsTypography.primary * 1.5,
    fontWeight: settingsFontWeights.semibold,
    color: colors.neutralDarkest,
  },
  widgetDescription: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    color: colors.neutralDark,
  },
  switchContainer: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});
