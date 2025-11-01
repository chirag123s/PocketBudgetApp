import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';

interface SettingRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: 'chevron' | 'toggle' | 'button' | 'none';
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  buttonText?: string;
  isLast?: boolean;
}

export default function SecurityPrivacy() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const settingsStyles = getSettingsStyles(themeMode);

  // Authentication states
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // App Security states
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [autoLockTimer, setAutoLockTimer] = useState('5');
  const [showTimerOptions, setShowTimerOptions] = useState(false);

  const timerOptions = [
    { label: 'Immediately', value: '0' },
    { label: '1 minute', value: '1' },
    { label: '5 minutes', value: '5' },
    { label: '15 minutes', value: '15' },
  ];

  // Data Privacy states
  const [shareAnalytics, setShareAnalytics] = useState(true);

  const colors = {
    primaryDark: theme.colors.info.dark,
    primary: theme.colors.info.main,
    primaryLight: theme.colors.info.light,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
    border: theme.colors.border.light,
    iconBg: theme.colors.background.tertiary,
  };

  const SettingRow: React.FC<SettingRowProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement = 'chevron',
    toggleValue,
    onToggleChange,
    buttonText,
    isLast = false,
  }) => (
    <React.Fragment>
      <TouchableOpacity
        style={settingsStyles.menuItem}
        onPress={onPress}
        activeOpacity={rightElement === 'toggle' ? 1 : 0.7}
        disabled={rightElement === 'toggle'}
      >
        <View style={settingsStyles.iconContainer}>
          <Ionicons name={icon as any} size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
        </View>
        <View style={styles.textContainer}>
          <Text style={settingsStyles.menuText}>
            {title}
          </Text>
          {subtitle && (
            <Text style={settingsStyles.menuSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>

        {rightElement === 'chevron' && (
          <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
        )}

        {rightElement === 'toggle' && toggleValue !== undefined && onToggleChange && (
          <View style={styles.switchContainer}>
            <Switch
              value={toggleValue}
              onValueChange={onToggleChange}
              trackColor={{
                false: colors.border,
                true: colors.functionalSuccess
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        )}

        {rightElement === 'button' && buttonText && (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {!isLast && <View style={settingsStyles.menuItemDivider} />}
    </React.Fragment>
  );

  const getTimerLabel = () => {
    const option = timerOptions.find(opt => opt.value === autoLockTimer);
    return option?.label || '5 minutes';
  };

  const handleTimerSelect = (value: string) => {
    setAutoLockTimer(value);
    setShowTimerOptions(false);
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? You can reactivate it later.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: () => {
            console.log('Deactivate account');
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Delete account');
          }
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
    },
    dangerHeader: {
      color: colors.functionalError,
    },
    customCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.sm,
    },
    cardContent: {
      padding: responsive.spacing[4],
      gap: responsive.spacing[4],
    },
    buttonText: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.semibold,
      color: colors.primary,
    },
    switchContainer: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
    dropdownContainer: {
      backgroundColor: theme.colors.background.tertiary,
      marginHorizontal: responsive.spacing[4],
      marginTop: responsive.spacing[1],
      marginBottom: responsive.spacing[2],
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
    },
    dropdownOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      minHeight: ms(48),
    },
    dropdownOptionText: {
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: settingsFontWeights.regular,
      color: colors.neutralDarkest,
    },
    dropdownOptionTextActive: {
      fontWeight: settingsFontWeights.semibold,
      color: colors.primary,
    },
    dropdownDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: responsive.spacing[4],
    },
    dangerButton: {
      paddingVertical: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${colors.functionalError}15`,
    },
    dangerButtonText: {
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: settingsFontWeights.bold,
      color: colors.functionalError,
    },
    deleteButton: {
      paddingVertical: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.functionalError,
      marginTop: responsive.spacing[2],
    },
    deleteButtonText: {
      color: '#FFFFFF',
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: settingsFontWeights.bold,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="Security & Privacy" />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Authentication Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>
            AUTHENTICATION
          </Text>
          <View style={settingsStyles.card}>
            <SettingRow
              icon="finger-print-outline"
              title="Face ID / Touch ID"
              subtitle="Require on app launch"
              rightElement="toggle"
              toggleValue={biometricEnabled}
              onToggleChange={setBiometricEnabled}
            />
            <SettingRow
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Last changed: 45 days ago"
              onPress={() => {}}
            />
            <SettingRow
              icon="phone-portrait-outline"
              title="Two-Factor Auth"
              subtitle="via SMS"
              rightElement="button"
              buttonText="Configure"
              onPress={() => {}}
              isLast
            />
          </View>
        </View>

        {/* App Security Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>
            APP SECURITY
          </Text>
          <View style={settingsStyles.card}>
            {/* Auto-lock Toggle */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              activeOpacity={1}
              disabled
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>
                Auto-lock
              </Text>
              <View style={styles.switchContainer}>
                <Switch
                  value={autoLockEnabled}
                  onValueChange={setAutoLockEnabled}
                  trackColor={{
                    false: colors.border,
                    true: colors.functionalSuccess
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </TouchableOpacity>

            {/* Auto-lock Timer */}
            {autoLockEnabled && (
              <>
                <View style={settingsStyles.menuItemDivider} />
                <TouchableOpacity
                  style={settingsStyles.menuItem}
                  onPress={() => setShowTimerOptions(!showTimerOptions)}
                  activeOpacity={0.7}
                >
                  <View style={settingsStyles.iconContainer}>
                    <Ionicons name="time-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={settingsStyles.menuText}>Auto-lock timer</Text>
                    <Text style={settingsStyles.menuSubtitle}>{getTimerLabel()}</Text>
                  </View>
                  <Ionicons
                    name={showTimerOptions ? "chevron-up" : "chevron-down"}
                    size={SETTINGS_CONSTANTS.CHEVRON_SIZE}
                    color={colors.neutralMedium}
                  />
                </TouchableOpacity>

                {/* Timer Options Dropdown */}
                {showTimerOptions && (
                  <View style={styles.dropdownContainer}>
                    {timerOptions.map((option, index) => (
                      <React.Fragment key={option.value}>
                        <TouchableOpacity
                          style={styles.dropdownOption}
                          onPress={() => handleTimerSelect(option.value)}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.dropdownOptionText,
                            autoLockTimer === option.value && styles.dropdownOptionTextActive
                          ]}>
                            {option.label}
                          </Text>
                          {autoLockTimer === option.value && (
                            <Ionicons name="checkmark" size={20} color={colors.primary} />
                          )}
                        </TouchableOpacity>
                        {index < timerOptions.length - 1 && (
                          <View style={styles.dropdownDivider} />
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        {/* Data Privacy Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>
            DATA PRIVACY
          </Text>
          <View style={settingsStyles.card}>
            <SettingRow
              icon="cloud-download-outline"
              title="Download My Data"
              onPress={() => {}}
            />
            <SettingRow
              icon="analytics-outline"
              title="Share Analytics"
              subtitle="Anonymous only"
              rightElement="toggle"
              toggleValue={shareAnalytics}
              onToggleChange={setShareAnalytics}
            />
            <SettingRow
              icon="shield-checkmark-outline"
              title="Privacy Policy"
              onPress={() => {}}
            />
            <SettingRow
              icon="document-text-outline"
              title="Data Usage Policy"
              onPress={() => {}}
              isLast
            />
          </View>
        </View>

        {/* Danger Zone Section */}
        <View style={settingsStyles.section}>
          <Text style={[settingsStyles.sectionTitle, styles.dangerHeader]}>
            DANGER ZONE
          </Text>
          <View style={styles.customCard}>
            <View style={styles.cardContent}>
              <TouchableOpacity
                style={styles.dangerButton}
                onPress={handleDeactivateAccount}
                activeOpacity={0.7}
              >
                <Text style={styles.dangerButtonText}>
                  Deactivate Account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteAccount}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteButtonText}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </Screen>
  );
}
