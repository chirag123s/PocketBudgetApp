import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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

export default function BackupRestoreScreen() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const settingsStyles = getSettingsStyles(themeMode);
  const [cloudBackupEnabled, setCloudBackupEnabled] = useState(true);

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

  const handleBackupToggle = (value: boolean) => {
    setCloudBackupEnabled(value);
    if (value) {
      Alert.alert('Cloud Backup Enabled', 'Your data will be backed up to the cloud.');
    } else {
      Alert.alert(
        'Disable Cloud Backup?',
        'Your data will not be backed up automatically. Are you sure?',
        [
          { text: 'Cancel', onPress: () => setCloudBackupEnabled(true), style: 'cancel' },
          { text: 'Disable', style: 'destructive' },
        ]
      );
    }
  };

  const handleBackupNow = () => {
    Alert.alert('Backing Up', 'Creating backup...');
  };

  const handleRestore = () => {
    Alert.alert(
      'Restore Backup?',
      'This will replace your current data with the backup. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Restore', style: 'destructive', onPress: () => console.log('Restore') },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache?',
      'This will clear temporary data and may require re-downloading some information.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => console.log('Clear cache') },
      ]
    );
  };

  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
    },
    valueText: {
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
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader title="Backup & Restore" backgroundColor={colors.neutralBg} />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Cloud Backup Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>CLOUD BACKUP</Text>
          <View style={settingsStyles.card}>
            {/* Auto Backup Toggle */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="cloud-upload-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Auto Backup</Text>
              <View style={styles.switchContainer}>
                <Switch
                  value={cloudBackupEnabled}
                  onValueChange={handleBackupToggle}
                  trackColor={{ false: colors.border, true: colors.functionalSuccess }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            <View style={settingsStyles.menuItemDivider} />

            {/* Backup Frequency */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => Alert.alert('Backup Frequency', 'Feature coming soon')}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="time-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Backup Frequency</Text>
                <Text style={settingsStyles.menuSubtitle}>Daily</Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Last Backup */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="checkmark-circle-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Last Backup</Text>
                <Text style={settingsStyles.menuSubtitle}>2 hours ago</Text>
              </View>
              <Text style={styles.valueText}>3.2 MB</Text>
            </View>
          </View>
        </View>

        {/* Backup Actions Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>ACTIONS</Text>
          <View style={settingsStyles.card}>
            {/* Backup Now */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleBackupNow}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="cloud-upload" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Backup Now</Text>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Restore */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleRestore}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="cloud-download-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Restore from Backup</Text>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Backup History Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>BACKUP HISTORY</Text>
          <View style={settingsStyles.card}>
            {/* Recent Backup 1 */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Today at 10:30 AM</Text>
                <Text style={settingsStyles.menuSubtitle}>Full backup completed</Text>
              </View>
              <Text style={styles.valueText}>3.2 MB</Text>
            </View>

            <View style={settingsStyles.menuItemDivider} />

            {/* Recent Backup 2 */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Yesterday at 10:30 AM</Text>
                <Text style={settingsStyles.menuSubtitle}>Full backup completed</Text>
              </View>
              <Text style={styles.valueText}>3.1 MB</Text>
            </View>

            <View style={settingsStyles.menuItemDivider} />

            {/* Recent Backup 3 */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>2 days ago at 10:30 AM</Text>
                <Text style={settingsStyles.menuSubtitle}>Full backup completed</Text>
              </View>
              <Text style={styles.valueText}>2.9 MB</Text>
            </View>
          </View>
        </View>

        {/* Storage & Cache Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>STORAGE & CACHE</Text>
          <View style={settingsStyles.card}>
            {/* App Storage Size */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="phone-portrait-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>App Storage Size</Text>
              <Text style={styles.valueText}>45 MB</Text>
            </View>

            <View style={settingsStyles.menuItemDivider} />

            {/* Cache Size */}
            <View style={settingsStyles.menuItem}>
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="archive-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Cache Size</Text>
              <Text style={styles.valueText}>12 MB</Text>
            </View>

            <View style={settingsStyles.menuItemDivider} />

            {/* Clear Cache */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleClearCache}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="trash-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalError} />
              </View>
              <Text style={[settingsStyles.menuText, { color: colors.functionalError }]}>Clear Cache</Text>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={ms(20)} color={colors.primary} />
          <Text style={styles.infoText}>
            Backups are encrypted and stored securely in the cloud. You can restore your data at any time from any device.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
