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
import { Picker } from '@react-native-picker/picker';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';

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

  // Authentication states
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // App Security states
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [autoLockTimer, setAutoLockTimer] = useState('5');
  const [requireAuthLaunch, setRequireAuthLaunch] = useState(true);
  const [requireAuthEdits, setRequireAuthEdits] = useState(true);
  const [requireAuthBalance, setRequireAuthBalance] = useState(false);

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
    <TouchableOpacity
      style={[
        styles.settingRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }
      ]}
      onPress={onPress}
      activeOpacity={rightElement === 'toggle' ? 1 : 0.7}
      disabled={rightElement === 'toggle'}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={ms(24)} color={colors.neutralDarkest} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightElement === 'chevron' && (
        <Ionicons name="chevron-forward" size={ms(20)} color={colors.neutralMedium} />
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
  );

  const CheckboxRow = ({
    label,
    checked,
    onToggle,
  }: {
    label: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity
      style={styles.checkboxRow}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          {
            borderColor: colors.border,
            backgroundColor: checked ? colors.functionalSuccess : 'transparent',
          },
        ]}
      >
        {checked && (
          <Ionicons name="checkmark" size={ms(14)} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.checkboxLabel}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
    content: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[8],
    },
    section: {
      marginBottom: responsive.spacing[4],
    },
    sectionHeader: {
      fontSize: settingsTypography.tertiary,
      lineHeight: settingsTypography.tertiary * 1.5,
      fontWeight: settingsFontWeights.bold,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.neutralMedium,
      marginBottom: responsive.spacing[3],
    },
    dangerHeader: {
      color: colors.functionalError,
    },
    card: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.sm,
    },
    cardContent: {
      padding: responsive.spacing[4],
      gap: responsive.spacing[4],
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      minHeight: ms(64),
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      flex: 1,
    },
    iconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.iconBg,
    },
    settingTitle: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDarkest,
    },
    settingSubtitle: {
      fontSize: settingsTypography.secondary,
      lineHeight: settingsTypography.secondary * 1.5,
      color: colors.neutralDark,
      marginTop: 2,
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
    inlineSettingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inlineLabel: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDarkest,
    },
    pickerContainer: {
      backgroundColor: colors.iconBg,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      minWidth: ms(140),
    },
    picker: {
      height: ms(40),
      color: colors.neutralDarkest,
    },
    checkboxSection: {
      paddingTop: responsive.spacing[2],
    },
    checkboxSectionTitle: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[3],
    },
    checkboxList: {
      gap: responsive.spacing[3],
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
    },
    checkbox: {
      width: ms(20),
      height: ms(20),
      borderRadius: theme.borderRadius.sm,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxLabel: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.regular,
      color: colors.neutralDarkest,
    },
    dangerCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: `${colors.functionalError}80`,
      ...theme.shadows.sm,
    },
    dangerButton: {
      height: ms(48),
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${colors.functionalError}15`,
    },
    dangerButtonText: {
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.bold,
      color: colors.functionalError,
    },
    deleteButton: {
      height: ms(48),
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.functionalError,
      marginTop: responsive.spacing[2],
    },
    deleteButtonText: {
      color: '#FFFFFF',
      fontSize: settingsTypography.primary,
      lineHeight: settingsTypography.primary * 1.5,
      fontWeight: settingsFontWeights.bold,
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="Security & Privacy" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Authentication Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            AUTHENTICATION
          </Text>
          <View style={styles.card}>
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
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            APP SECURITY
          </Text>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* Auto-lock Toggle */}
              <View style={styles.inlineSettingRow}>
                <Text style={styles.inlineLabel}>
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
              </View>

              {/* Auto-lock Timer Picker */}
              {autoLockEnabled && (
                <View style={styles.inlineSettingRow}>
                  <Text style={styles.inlineLabel}>
                    Auto-lock timer
                  </Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={autoLockTimer}
                      onValueChange={(value) => setAutoLockTimer(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Immediately" value="0" />
                      <Picker.Item label="1 minute" value="1" />
                      <Picker.Item label="5 minutes" value="5" />
                      <Picker.Item label="15 minutes" value="15" />
                    </Picker>
                  </View>
                </View>
              )}

              {/* Require Auth Checkboxes */}
              <View style={styles.checkboxSection}>
                <Text style={styles.checkboxSectionTitle}>
                  Require auth for:
                </Text>
                <View style={styles.checkboxList}>
                  <CheckboxRow
                    label="App launch"
                    checked={requireAuthLaunch}
                    onToggle={() => setRequireAuthLaunch(!requireAuthLaunch)}
                  />
                  <CheckboxRow
                    label="Transaction edits"
                    checked={requireAuthEdits}
                    onToggle={() => setRequireAuthEdits(!requireAuthEdits)}
                  />
                  <CheckboxRow
                    label="Viewing balance"
                    checked={requireAuthBalance}
                    onToggle={() => setRequireAuthBalance(!requireAuthBalance)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Data Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            DATA PRIVACY
          </Text>
          <View style={styles.card}>
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
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, styles.dangerHeader]}>
            DANGER ZONE
          </Text>
          <View style={styles.dangerCard}>
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
