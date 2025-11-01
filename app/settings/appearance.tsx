import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, StatusBar } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
import { useWidgets } from '@/contexts/WidgetContext';
import { useTheme } from '@/contexts/ThemeContext';
import { WIDGET_REGISTRY, WidgetId } from '@/components/widgets';
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';
import { BottomSheetModal } from '@/components/ui';

type ThemeType = 'light' | 'dark' | 'system';

// Icon mapping for widgets
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

// Predefined background color options
const BACKGROUND_COLORS = [
  { id: 'default', label: 'Default', color: null },
  { id: 'white', label: 'White', color: '#FFFFFF' },
  { id: 'lightGray', label: 'Light Gray', color: '#F9FAFB' },
  { id: 'warmGray', label: 'Warm Gray', color: '#F5F5F4' },
  { id: 'coolGray', label: 'Cool Gray', color: '#F1F5F9' },
  { id: 'beige', label: 'Beige', color: '#FAF8F5' },
  { id: 'mint', label: 'Mint', color: '#F0FDF4' },
  { id: 'sky', label: 'Sky', color: '#F0F9FF' },
  { id: 'lavender', label: 'Lavender', color: '#FAF5FF' },
];

export default function AppearanceSettings() {
  const { theme: currentTheme, themeMode, setThemeMode, customBackgroundColor, setCustomBackgroundColor, customCardColor, setCustomCardColor } = useTheme();
  const { enabledWidgets, widgetOrder, toggleWidget, isLoading } = useWidgets();
  const theme = getTheme(currentTheme, customBackgroundColor, customCardColor);
  const settingsStyles = getSettingsStyles(currentTheme, customBackgroundColor, customCardColor);

  const [showBackgroundColorModal, setShowBackgroundColorModal] = useState(false);
  const [showCardColorModal, setShowCardColorModal] = useState(false);

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

  const ThemeOption = ({
    icon,
    label,
    value
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: ThemeType;
  }) => {
    const isSelected = themeMode === value;

    return (
      <TouchableOpacity
        style={[
          styles.themeOption,
          isSelected && styles.themeOptionSelected,
        ]}
        onPress={() => setThemeMode(value)}
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

  const WidgetItem = ({ widgetId, isLast }: { widgetId: WidgetId; isLast: boolean }) => {
    const widget = WIDGET_REGISTRY[widgetId];
    const isEnabled = enabledWidgets.includes(widgetId);
    const iconName = widgetIconMap[widgetId];

    return (
      <React.Fragment>
        <View style={settingsStyles.menuItem}>
          <View style={[settingsStyles.iconContainer, { backgroundColor: colors.iconBg }]}>
            <Ionicons
              name={iconName}
              size={SETTINGS_CONSTANTS.ICON_SIZE}
              color={colors.neutralDarkest}
            />
          </View>

          <View style={styles.widgetContent}>
            <Text style={settingsStyles.menuText}>
              {widget.name}
            </Text>
            <Text style={settingsStyles.menuSubtitle}>
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
        {!isLast && <View style={settingsStyles.menuItemDivider} />}
      </React.Fragment>
    );
  };

  const styles = StyleSheet.create({
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
  menuContent: {
    flex: 1,
  },
  widgetContent: {
    flex: 1,
  },
  loadingContainer: {
    paddingVertical: responsive.spacing[6],
    alignItems: 'center',
  },
  loadingText: {
    fontSize: settingsTypography.secondary,
    color: colors.neutralDark,
  },
  switchContainer: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  modalContent: {
    paddingBottom: responsive.spacing[4],
  },
  colorModalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[3],
    minHeight: ms(72),
  },
  colorSwatchLarge: {
    width: ms(48),
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorModalLabel: {
    flex: 1,
    fontSize: settingsTypography.primary,
    lineHeight: settingsTypography.primary * 1.5,
    fontWeight: settingsFontWeights.semibold,
    color: colors.neutralDarkest,
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: ms(72),
  },
});

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="Appearance" />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>THEME</Text>

          <View style={styles.themeContainer}>
            <ThemeOption icon="sunny" label="Light" value="light" />
            <ThemeOption icon="moon" label="Dark" value="dark" />
            <ThemeOption icon="contrast" label="System" value="system" />
          </View>
        </View>

        {/* Customization Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>CUSTOMIZATION</Text>
          <View style={settingsStyles.card}>
            {/* Background Color */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => setShowBackgroundColorModal(true)}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="color-palette-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.menuContent}>
                <Text style={settingsStyles.menuText}>Background Color</Text>
                <Text style={settingsStyles.menuSubtitle}>
                  {BACKGROUND_COLORS.find(c => c.color === customBackgroundColor)?.label || 'Default'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Card Color */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => setShowCardColorModal(true)}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="layers-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.menuContent}>
                <Text style={settingsStyles.menuText}>Card Color</Text>
                <Text style={settingsStyles.menuSubtitle}>
                  {BACKGROUND_COLORS.find(c => c.color === customCardColor)?.label || 'Default'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Home Screen Widgets Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>HOME SCREEN WIDGETS</Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading widgets...</Text>
            </View>
          ) : (
            <View style={settingsStyles.card}>
              {widgetOrder.map((widgetId, index) => (
                <WidgetItem
                  key={widgetId}
                  widgetId={widgetId}
                  isLast={index === widgetOrder.length - 1}
                />
              ))}
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>

      {/* Background Color Modal */}
      <BottomSheetModal
        visible={showBackgroundColorModal}
        onClose={() => setShowBackgroundColorModal(false)}
        title="Background Color"
      >
        <View style={styles.modalContent}>
          {BACKGROUND_COLORS.map((bgColor, index) => (
            <React.Fragment key={bgColor.id}>
              <TouchableOpacity
                style={styles.colorModalOption}
                onPress={() => {
                  setCustomBackgroundColor(bgColor.color);
                  setShowBackgroundColorModal(false);
                }}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.colorSwatchLarge,
                  { backgroundColor: bgColor.color || (currentTheme === 'dark' ? '#1E1E1E' : '#F9FAFB') },
                ]}>
                  {customBackgroundColor === bgColor.color && (
                    <Ionicons name="checkmark-circle" size={ms(24)} color={colors.functionalSuccess} />
                  )}
                </View>
                <Text style={styles.colorModalLabel}>{bgColor.label}</Text>
                {customBackgroundColor === bgColor.color && (
                  <Ionicons name="checkmark" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
                )}
              </TouchableOpacity>
              {index < BACKGROUND_COLORS.length - 1 && <View style={styles.modalDivider} />}
            </React.Fragment>
          ))}
        </View>
      </BottomSheetModal>

      {/* Card Color Modal */}
      <BottomSheetModal
        visible={showCardColorModal}
        onClose={() => setShowCardColorModal(false)}
        title="Card Color"
      >
        <View style={styles.modalContent}>
          {BACKGROUND_COLORS.map((bgColor, index) => (
            <React.Fragment key={bgColor.id}>
              <TouchableOpacity
                style={styles.colorModalOption}
                onPress={() => {
                  setCustomCardColor(bgColor.color);
                  setShowCardColorModal(false);
                }}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.colorSwatchLarge,
                  { backgroundColor: bgColor.color || (currentTheme === 'dark' ? '#1E1E1E' : '#F9FAFB') },
                ]}>
                  {customCardColor === bgColor.color && (
                    <Ionicons name="checkmark-circle" size={ms(24)} color={colors.functionalSuccess} />
                  )}
                </View>
                <Text style={styles.colorModalLabel}>{bgColor.label}</Text>
                {customCardColor === bgColor.color && (
                  <Ionicons name="checkmark" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
                )}
              </TouchableOpacity>
              {index < BACKGROUND_COLORS.length - 1 && <View style={styles.modalDivider} />}
            </React.Fragment>
          ))}
        </View>
      </BottomSheetModal>
    </Screen>
  );
}
