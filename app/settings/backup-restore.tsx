import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';

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

export default function BackupRestoreScreen() {
  const [cloudBackupEnabled, setCloudBackupEnabled] = useState(true);

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

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <ScreenHeader title="Backup & Restore" backgroundColor={colors.neutralBg} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Backup & Sync Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cloud Backup</Text>

          {/* Cloud Backup Toggle */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="cloud-upload-outline" size={ms(20)} color={colors.primary} />
              </View>
              <Text style={styles.rowTitle}>Auto Backup</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={cloudBackupEnabled}
                onValueChange={handleBackupToggle}
                trackColor={{ false: colors.border, true: colors.functionalSuccess }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Backup Frequency */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => console.log('Change backup frequency')}
            activeOpacity={0.7}
          >
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Backup Frequency</Text>
              <Text style={styles.rowSubtitle}>Daily</Text>
            </View>
            <Text style={styles.linkText}>Change</Text>
          </TouchableOpacity>

          {/* Last Backup */}
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Last Backup</Text>
              <Text style={styles.rowSubtitle}>2 hours ago</Text>
            </View>
            <Text style={styles.rowValue}>3.2 MB</Text>
          </View>

          <View style={styles.divider} />

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={handleBackupNow}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonTextPrimary}>Backup Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={handleRestore}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonTextPrimary}>Restore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Backup History Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Backup History</Text>

          {/* Recent Backup 1 */}
          <View style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>Today at 10:30 AM</Text>
                <Text style={styles.historySubtitle}>Full backup completed</Text>
              </View>
            </View>
            <Text style={styles.historySize}>3.2 MB</Text>
          </View>

          <View style={styles.divider} />

          {/* Recent Backup 2 */}
          <View style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>Yesterday at 10:30 AM</Text>
                <Text style={styles.historySubtitle}>Full backup completed</Text>
              </View>
            </View>
            <Text style={styles.historySize}>3.1 MB</Text>
          </View>

          <View style={styles.divider} />

          {/* Recent Backup 3 */}
          <View style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>2 days ago at 10:30 AM</Text>
                <Text style={styles.historySubtitle}>Full backup completed</Text>
              </View>
            </View>
            <Text style={styles.historySize}>2.9 MB</Text>
          </View>
        </View>

        {/* Storage & Cache Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Storage & Cache</Text>

          {/* App Storage Size */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="phone-portrait-outline" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <Text style={styles.rowTitle}>App Storage Size</Text>
            </View>
            <Text style={styles.rowValue}>45 MB</Text>
          </View>

          {/* Cache Size */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="archive-outline" size={ms(24)} color={colors.neutralDarkest} />
              </View>
              <Text style={styles.rowTitle}>Cache Size</Text>
            </View>
            <Text style={styles.rowValue}>12 MB</Text>
          </View>

          <View style={styles.divider} />

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonDanger]}
              onPress={handleClearCache}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonTextDanger}>Clear Cache</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={() => console.log('Optimize storage')}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonTextPrimary}>Optimize Storage</Text>
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

        {/* Bottom Spacing */}
        <View style={{ height: responsive.spacing[8] }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: responsive.spacing[6],
    gap: responsive.spacing[6],
  },
  card: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    ...theme.shadows.sm,
  },
  cardTitle: {
    fontSize: settingsTypography.sectionHeading,
    lineHeight: settingsTypography.sectionHeading * 1.5,
    fontWeight: settingsFontWeights.bold,
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[4],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: ms(56),
    paddingVertical: responsive.spacing[2],
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    flex: 1,
  },
  iconContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: colors.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: settingsTypography.primary,
    lineHeight: settingsTypography.primary * 1.5,
    fontWeight: settingsFontWeights.medium,
    color: colors.neutralDarkest,
  },
  rowSubtitle: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    fontWeight: settingsFontWeights.regular,
    color: colors.neutralDark,
    marginTop: 2,
  },
  rowValue: {
    fontSize: settingsTypography.primary,
    lineHeight: settingsTypography.primary * 1.5,
    fontWeight: settingsFontWeights.regular,
    color: colors.neutralDarkest,
  },
  linkText: {
    fontSize: settingsTypography.primary,
    lineHeight: settingsTypography.primary * 1.5,
    fontWeight: settingsFontWeights.semibold,
    color: colors.primary,
  },
  switchContainer: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: responsive.spacing[2],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: responsive.spacing[3],
    marginTop: responsive.spacing[2],
  },
  actionButton: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: responsive.spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: `${colors.primary}20`,
  },
  actionButtonDanger: {
    backgroundColor: `${colors.functionalError}20`,
  },
  actionButtonTextPrimary: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    fontWeight: settingsFontWeights.bold,
    color: colors.primary,
  },
  actionButtonTextDanger: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    fontWeight: settingsFontWeights.bold,
    color: colors.functionalError,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: ms(56),
    paddingVertical: responsive.spacing[2],
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
    flex: 1,
  },
  historyContent: {
    flex: 1,
    gap: 2,
  },
  historyTitle: {
    fontSize: settingsTypography.primary,
    lineHeight: settingsTypography.primary * 1.5,
    fontWeight: settingsFontWeights.medium,
    color: colors.neutralDarkest,
  },
  historySubtitle: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    fontWeight: settingsFontWeights.regular,
    color: colors.neutralDark,
    marginTop: 2,
  },
  historySize: {
    fontSize: settingsTypography.secondary,
    lineHeight: settingsTypography.secondary * 1.5,
    fontWeight: settingsFontWeights.semibold,
    color: colors.neutralMedium,
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
    fontSize: settingsTypography.tertiary,
    lineHeight: settingsTypography.tertiary * 1.6,
    color: colors.primaryDark,
  },
});
