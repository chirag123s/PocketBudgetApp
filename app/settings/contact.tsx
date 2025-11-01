import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert, Linking } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { settingsTypography, settingsFontWeights } from './typography';
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';

export default function ContactSupport() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const settingsStyles = getSettingsStyles(themeMode);

  // Color Palette - Using theme colors
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
  };

  const handleEmailSupport = () => {
    const email = 'support@pocketbudget.com.au';
    const subject = 'Support Request';
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const handleLiveChat = () => {
    Alert.alert('Live Chat', 'Live chat feature coming soon');
  };

  const handleFAQs = () => {
    Alert.alert('FAQs', 'Frequently Asked Questions coming soon');
  };

  const handleReportBug = () => {
    const email = 'bugs@pocketbudget.com.au';
    const subject = 'Bug Report';
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const handleFeatureRequest = () => {
    const email = 'feedback@pocketbudget.com.au';
    const subject = 'Feature Request';
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`).catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const handleWebsite = () => {
    Linking.openURL('https://pocketbudget.com.au').catch(() => {
      Alert.alert('Error', 'Unable to open website');
    });
  };

  const handleTwitter = () => {
    Linking.openURL('https://twitter.com/pocketbudget').catch(() => {
      Alert.alert('Error', 'Unable to open Twitter');
    });
  };

  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
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
      <ScreenHeader title="Contact Support" backgroundColor={colors.neutralBg} />

      <ScrollView
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Channels Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>SUPPORT CHANNELS</Text>
          <View style={settingsStyles.card}>
            {/* Email Support */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleEmailSupport}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="mail-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Email Support</Text>
                <Text style={settingsStyles.menuSubtitle}>support@pocketbudget.com.au</Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Live Chat */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleLiveChat}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="chatbubble-ellipses-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Live Chat</Text>
                <Text style={settingsStyles.menuSubtitle}>Available Mon-Fri, 9am-5pm AEST</Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Help Resources Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>HELP RESOURCES</Text>
          <View style={settingsStyles.card}>
            {/* FAQs */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleFAQs}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="help-circle-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>FAQs</Text>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Report a Bug */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleReportBug}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="bug-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Report a Bug</Text>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Feature Request */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleFeatureRequest}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="bulb-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Feature Request</Text>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Connect With Us Section */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>CONNECT WITH US</Text>
          <View style={settingsStyles.card}>
            {/* Website */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleWebsite}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="globe-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Website</Text>
                <Text style={settingsStyles.menuSubtitle}>pocketbudget.com.au</Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            {/* Twitter */}
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={handleTwitter}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="logo-twitter" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.textContainer}>
                <Text style={settingsStyles.menuText}>Twitter</Text>
                <Text style={settingsStyles.menuSubtitle}>@pocketbudget</Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="time-outline" size={ms(20)} color={colors.primary} />
          <Text style={styles.infoText}>
            Average response time: Premium users 4 hours, Free users 24 hours. We aim to respond to all inquiries within one business day.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
