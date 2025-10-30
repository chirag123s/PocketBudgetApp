import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
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
  iconBg: theme.colors.background.tertiary,
};

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
  const router = useRouter();
  const [taxGuidanceEnabled, setTaxGuidanceEnabled] = useState(true);

  const SettingItem: React.FC<SettingItemProps> = ({
    icon,
    label,
    value,
    onPress,
    isLast = false
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        !isLast && styles.settingItemBorder,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color={colors.neutralDarkest}
          />
        </View>
        <Text style={styles.settingLabel}>
          {label}
        </Text>
      </View>
      <View style={styles.settingRight}>
        <Text style={styles.settingValue}>
          {value}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.neutralMedium}
        />
      </View>
    </TouchableOpacity>
  );

  const SettingToggle: React.FC<SettingToggleProps> = ({
    icon,
    label,
    description,
    value,
    onValueChange,
    isLast = false
  }) => (
    <View
      style={[
        styles.settingItem,
        !isLast && styles.settingItemBorder
      ]}
    >
      <View style={styles.settingLeftFlex}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color={colors.neutralDarkest}
          />
        </View>
        <View style={styles.toggleTextContainer}>
          <Text style={styles.settingLabel}>
            {label}
          </Text>
          {description && (
            <Text style={styles.settingDescription}>
              {description}
            </Text>
          )}
        </View>
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
  );

  const handleSave = () => {
    console.log('Saving currency and region settings');
    // Save settings logic here
    router.back();
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <ScreenHeader title="Currency & Region" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            LOCATION
          </Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon="earth"
              label="Country"
              value="Australia"
              onPress={() => console.log('Select country')}
            />
            <SettingItem
              icon="cash-multiple"
              label="Primary Currency"
              value="AUD"
              onPress={() => console.log('Select currency')}
              isLast
            />
          </View>
        </View>

        {/* Formats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            FORMATS
          </Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon="calendar-month"
              label="Date Format"
              value="DD/MM/YYYY"
              onPress={() => console.log('Select date format')}
            />
            <SettingItem
              icon="clock-outline"
              label="Time Format"
              value="12-hour (am/pm)"
              onPress={() => console.log('Select time format')}
            />
            <SettingItem
              icon="numeric"
              label="Number Format"
              value="1,000.00"
              onPress={() => console.log('Select number format')}
              isLast
            />
          </View>
        </View>

        {/* Regional Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            REGIONAL OPTIONS
          </Text>
          <View style={styles.settingsCard}>
            <SettingItem
              icon="calendar-refresh"
              label="Financial Year Start"
              value="July 1st"
              onPress={() => console.log('Select financial year start')}
            />
            <SettingToggle
              icon="receipt-text"
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
            size={20}
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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: responsive.spacing[6],
    paddingTop: responsive.spacing[6],
    paddingBottom: ms(100),
  },
  section: {
    marginBottom: responsive.spacing[6],
  },
  sectionHeader: {
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.neutralMedium,
    marginBottom: responsive.spacing[3],
  },
  settingsCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.spacing[3],
    paddingHorizontal: responsive.spacing[4],
    minHeight: ms(64),
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[4],
  },
  settingLeftFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[4],
    flex: 1,
  },
  iconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: theme.borderRadius.lg,
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '500',
    color: colors.neutralDarkest,
  },
  toggleTextContainer: {
    flex: 1,
  },
  settingDescription: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    color: colors.neutralDark,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  settingValue: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
    color: colors.primary,
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
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.6,
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
    backgroundColor: colors.neutralWhite,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: responsive.spacing[6],
    paddingTop: responsive.spacing[4],
    paddingBottom: responsive.spacing[4],
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
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '700',
    color: colors.neutralWhite,
    letterSpacing: 0.3,
  },
});
