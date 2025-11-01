import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
import { Ionicons } from '@expo/vector-icons';
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';

interface SettingItemProps {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
  isLast?: boolean;
}

interface SettingToggleProps {
  icon: string;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
}

export default function CurrencyRegionSettings() {
  const { theme: themeMode, customBackgroundColor, customCardColor } = useTheme();
  const theme = getTheme(themeMode, customBackgroundColor, customCardColor);
  const settingsStyles = getSettingsStyles(themeMode, customBackgroundColor, customCardColor);
  const router = useRouter();

  // State variables
  const [country, setCountry] = useState('Australia');
  const [currency, setCurrency] = useState('AUD');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12-hour (am/pm)');
  const [numberFormat, setNumberFormat] = useState('1,000.00');
  const [financialYearStart, setFinancialYearStart] = useState('July 1st');
  const [taxGuidanceEnabled, setTaxGuidanceEnabled] = useState(true);

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

  const SettingItem: React.FC<SettingItemProps> = ({
    icon,
    label,
    value,
    onPress,
    isLast = false
  }) => (
    <React.Fragment>
      <TouchableOpacity
        style={settingsStyles.menuItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={settingsStyles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={SETTINGS_CONSTANTS.ICON_SIZE}
            color={colors.neutralDarkest}
          />
        </View>
        <View style={styles.settingContent}>
          <Text style={settingsStyles.menuText}>
            {label}
          </Text>
          <Text style={styles.settingValue}>
            {value}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={SETTINGS_CONSTANTS.CHEVRON_SIZE}
          color={colors.neutralMedium}
        />
      </TouchableOpacity>
      {!isLast && <View style={settingsStyles.menuItemDivider} />}
    </React.Fragment>
  );

  const SettingToggle: React.FC<SettingToggleProps> = ({
    icon,
    label,
    description,
    value,
    onValueChange,
    isLast = false
  }) => (
    <React.Fragment>
      <View style={settingsStyles.menuItem}>
        <View style={settingsStyles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={SETTINGS_CONSTANTS.ICON_SIZE}
            color={colors.neutralDarkest}
          />
        </View>
        <View style={styles.toggleTextContainer}>
          <Text style={settingsStyles.menuText}>
            {label}
          </Text>
          {description && (
            <Text style={settingsStyles.menuSubtitle}>
              {description}
            </Text>
          )}
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={value}
            onValueChange={onValueChange}
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

  // Handlers
  const handleSelectCountry = () => {
    Alert.alert('Select Country', 'Country selection coming soon');
  };

  const handleSelectCurrency = () => {
    Alert.alert('Select Currency', 'Currency selection coming soon');
  };

  const handleSelectDateFormat = () => {
    Alert.alert('Select Date Format', 'Date format selection coming soon');
  };

  const handleSelectTimeFormat = () => {
    Alert.alert('Select Time Format', 'Time format selection coming soon');
  };

  const handleSelectNumberFormat = () => {
    Alert.alert('Select Number Format', 'Number format selection coming soon');
  };

  const handleSelectFinancialYearStart = () => {
    Alert.alert('Select Financial Year Start', 'Financial year selection coming soon');
  };

  const handleSave = () => {
    Alert.alert(
      'Settings Saved',
      'Your currency and region settings have been updated successfully.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const styles = StyleSheet.create({
    settingContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: responsive.spacing[3],
    },
    toggleTextContainer: {
      flex: 1,
    },
    settingValue: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDark,
    },
    switchContainer: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
    infoBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: responsive.spacing[3],
      padding: responsive.spacing[4],
      borderRadius: theme.borderRadius.xl,
      backgroundColor: colors.primaryLight,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    infoText: {
      flex: 1,
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: colors.primaryDark,
    },
    bottomSpacer: {
      height: responsive.spacing[4],
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background.primary,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[3],
      paddingBottom: responsive.spacing[3],
      ...theme.shadows.md,
    },
    saveButton: {
      height: ms(48),
      borderRadius: theme.borderRadius.xl,
      backgroundColor: colors.functionalSuccess,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonText: {
      fontSize: settingsTypography.button,
      lineHeight: settingsTypography.button * 1.5,
      fontWeight: settingsFontWeights.bold,
      color: '#FFFFFF',
      letterSpacing: 0.3,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="Currency & Region" />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>
            LOCATION
          </Text>
          <View style={settingsStyles.card}>
            <SettingItem
              icon="globe-outline"
              label="Country"
              value={country}
              onPress={handleSelectCountry}
            />
            <SettingItem
              icon="cash-outline"
              label="Primary Currency"
              value={currency}
              onPress={handleSelectCurrency}
              isLast
            />
          </View>
        </View>

        {/* Formats Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>
            FORMATS
          </Text>
          <View style={settingsStyles.card}>
            <SettingItem
              icon="calendar-outline"
              label="Date Format"
              value={dateFormat}
              onPress={handleSelectDateFormat}
            />
            <SettingItem
              icon="clock-outline"
              label="Time Format"
              value={timeFormat}
              onPress={handleSelectTimeFormat}
            />
            <SettingItem
              icon="calculator-outline"
              label="Number Format"
              value={numberFormat}
              onPress={handleSelectNumberFormat}
              isLast
            />
          </View>
        </View>

        {/* Regional Options Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>
            REGIONAL OPTIONS
          </Text>
          <View style={settingsStyles.card}>
            <SettingItem
              icon="calendar-outline"
              label="Financial Year Start"
              value={financialYearStart}
              onPress={handleSelectFinancialYearStart}
            />
            <SettingToggle
              icon="receipt-outline"
              label="Regional Tax Guidance"
              description="Enable GST tracking features"
              value={taxGuidanceEnabled}
              onValueChange={setTaxGuidanceEnabled}
              isLast
            />
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle"
            size={ms(20)}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            Changing your currency will not auto-convert existing transactions.
            These settings primarily affect display formats and regional guidance.
          </Text>
        </View>

        {/* Bottom spacing for save button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Save Button Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.9}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
