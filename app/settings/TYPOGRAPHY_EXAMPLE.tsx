/**
 * Settings Typography Example
 *
 * This file demonstrates how to use the settings typography system
 * in your settings screens. Copy and adapt these patterns for your screens.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

// Import the settings typography
import { settingsTypography, settingsFontWeights, settingsTextStyles } from './typography';

const colors = {
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,
  primary: theme.colors.info.main,
  border: theme.colors.border.light,
  functionalSuccess: theme.colors.success.main,
  functionalError: theme.colors.danger.main,
};

export default function TypographyExample() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fullName, setFullName] = useState('Alex Johnson');

  return (
    <Screen scrollable noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <ScreenHeader title="Typography Example" showBackButton />

      <ScrollView style={styles.container}>
        {/* ==================== EXAMPLE 1: Page Heading ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.pageHeading,
            { color: colors.neutralDarkest }
          ]}>
            Page Heading
          </Text>
          <Text style={[
            settingsTextStyles.secondaryText,
            { color: colors.neutralMedium, marginTop: 4 }
          ]}>
            Use settingsTextStyles.pageHeading for main page titles
          </Text>
        </View>

        {/* ==================== EXAMPLE 2: Section with Description ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.sectionHeading,
            { color: colors.neutralDarkest }
          ]}>
            Section Heading
          </Text>
          <Text style={[
            settingsTextStyles.secondaryText,
            { color: colors.neutralMedium, marginTop: 8 }
          ]}>
            This is a section description using secondary text. It provides additional context about the section.
          </Text>
        </View>

        {/* ==================== EXAMPLE 3: List Items ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.sectionHeading,
            { color: colors.neutralDarkest, marginBottom: 12 }
          ]}>
            List Items
          </Text>

          {/* Simple list item */}
          <TouchableOpacity style={styles.listItem}>
            <Text style={[
              settingsTextStyles.listItemTitle,
              { color: colors.neutralDarkest }
            ]}>
              List Item Title
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
          </TouchableOpacity>

          {/* List item with subtitle */}
          <TouchableOpacity style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={[
                settingsTextStyles.listItemTitle,
                { color: colors.neutralDarkest }
              ]}>
                List Item with Subtitle
              </Text>
              <Text style={[
                settingsTextStyles.listItemSubtitle,
                { color: colors.neutralMedium, marginTop: 4 }
              ]}>
                This is a subtitle with additional information
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
          </TouchableOpacity>

          {/* List item with value */}
          <View style={styles.listItem}>
            <Text style={[
              settingsTextStyles.listItemTitle,
              { color: colors.neutralDarkest }
            ]}>
              List Item with Value
            </Text>
            <Text style={[
              settingsTextStyles.listItemValue,
              { color: colors.neutralDark }
            ]}>
              $1,234.56
            </Text>
          </View>

          {/* List item with toggle */}
          <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={[
                settingsTextStyles.listItemTitle,
                { color: colors.neutralDarkest }
              ]}>
                Enable Notifications
              </Text>
              <Text style={[
                settingsTextStyles.listItemSubtitle,
                { color: colors.neutralMedium, marginTop: 4 }
              ]}>
                Receive alerts about important updates
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.neutralMedium, true: colors.primary }}
            />
          </View>
        </View>

        {/* ==================== EXAMPLE 4: Form Elements ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.sectionHeading,
            { color: colors.neutralDarkest, marginBottom: 12 }
          ]}>
            Form Elements
          </Text>

          {/* Input with label */}
          <View style={styles.formField}>
            <Text style={{
              fontSize: settingsTypography.inputLabel,
              fontWeight: settingsFontWeights.medium,
              color: colors.neutralDark,
              marginBottom: 8,
            }}>
              Full Name
            </Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your name"
              placeholderTextColor={colors.neutralMedium}
            />
            <Text style={{
              fontSize: settingsTypography.inputHint,
              color: colors.neutralMedium,
              marginTop: 6,
            }}>
              This is helper text below the input field
            </Text>
          </View>

          {/* Input with error */}
          <View style={styles.formField}>
            <Text style={{
              fontSize: settingsTypography.inputLabel,
              fontWeight: settingsFontWeights.medium,
              color: colors.neutralDark,
              marginBottom: 8,
            }}>
              Email Address
            </Text>
            <TextInput
              style={[styles.input, { borderColor: colors.functionalError }]}
              value="invalid-email"
              placeholder="Enter your email"
              placeholderTextColor={colors.neutralMedium}
            />
            <Text style={{
              fontSize: settingsTypography.inputError,
              fontWeight: settingsFontWeights.medium,
              color: colors.functionalError,
              marginTop: 6,
            }}>
              Please enter a valid email address
            </Text>
          </View>
        </View>

        {/* ==================== EXAMPLE 5: Cards ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.sectionHeading,
            { color: colors.neutralDarkest, marginBottom: 12 }
          ]}>
            Cards
          </Text>

          {/* Info card */}
          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <Ionicons name="information-circle" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[
                settingsTextStyles.cardTitle,
                { color: colors.neutralDarkest }
              ]}>
                Card Title
              </Text>
              <Text style={[
                settingsTextStyles.cardBody,
                { color: colors.neutralDark, marginTop: 4 }
              ]}>
                This is the card body text. It provides detailed information about the card's content.
              </Text>
              <Text style={[
                settingsTextStyles.cardCaption,
                { color: colors.neutralMedium, marginTop: 8 }
              ]}>
                Card caption or timestamp
              </Text>
            </View>
          </View>

          {/* Success card */}
          <View style={[styles.card, { backgroundColor: `${colors.functionalSuccess}15` }]}>
            <View style={[styles.cardIconContainer, { backgroundColor: `${colors.functionalSuccess}25` }]}>
              <Ionicons name="checkmark-circle" size={24} color={colors.functionalSuccess} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[
                settingsTextStyles.cardTitle,
                { color: colors.functionalSuccess }
              ]}>
                Success Card
              </Text>
              <Text style={[
                settingsTextStyles.cardBody,
                { color: colors.neutralDarkest, marginTop: 4 }
              ]}>
                Card with custom background and icon colors
              </Text>
            </View>
          </View>
        </View>

        {/* ==================== EXAMPLE 6: Interactive Elements ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.sectionHeading,
            { color: colors.neutralDarkest, marginBottom: 12 }
          ]}>
            Interactive Elements
          </Text>

          {/* Primary button */}
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={[
              settingsTextStyles.buttonText,
              { color: colors.neutralWhite }
            ]}>
              Primary Button
            </Text>
          </TouchableOpacity>

          {/* Secondary button */}
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={[
              settingsTextStyles.buttonText,
              { color: colors.primary }
            ]}>
              Secondary Button
            </Text>
          </TouchableOpacity>

          {/* Link */}
          <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
            <Text style={[
              settingsTextStyles.linkText,
              { color: colors.primary }
            ]}>
              This is a link
            </Text>
          </TouchableOpacity>

          {/* Badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Text style={[
              settingsTextStyles.primaryText,
              { color: colors.neutralDarkest, marginRight: 8 }
            ]}>
              Feature
            </Text>
            <View style={styles.badge}>
              <Text style={[
                settingsTextStyles.badge,
                { color: colors.neutralWhite }
              ]}>
                NEW
              </Text>
            </View>
          </View>
        </View>

        {/* ==================== EXAMPLE 7: Special Elements ==================== */}
        <View style={styles.section}>
          <Text style={[
            settingsTextStyles.sectionHeading,
            { color: colors.neutralDarkest, marginBottom: 12 }
          ]}>
            Special Elements
          </Text>

          {/* Hero text */}
          <Text style={[
            settingsTextStyles.hero,
            { color: colors.neutralDarkest, marginBottom: 8 }
          ]}>
            Hero Text
          </Text>

          {/* Mega text */}
          <Text style={[
            settingsTextStyles.hero,
            { fontSize: settingsTypography.mega, color: colors.primary, marginBottom: 16 }
          ]}>
            $6.99
          </Text>

          {/* Avatar initial */}
          <View style={styles.avatar}>
            <Text style={{
              fontSize: settingsTypography.avatarInitial,
              fontWeight: settingsFontWeights.semibold,
              color: colors.neutralWhite,
            }}>
              AJ
            </Text>
          </View>

          {/* Timestamp */}
          <Text style={{
            fontSize: settingsTypography.timestamp,
            color: colors.neutralMedium,
            marginTop: 12,
          }}>
            Last updated: 2 hours ago
          </Text>

          {/* Version */}
          <Text style={{
            fontSize: settingsTypography.version,
            color: colors.neutralMedium,
            marginTop: 4,
          }}>
            Version 1.0.0 (Build 42)
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[4],
    backgroundColor: colors.neutralBg,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  formField: {
    marginBottom: responsive.spacing[4],
  },
  input: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: responsive.spacing[3],
    fontSize: settingsTypography.input,
    fontWeight: settingsFontWeights.regular,
    color: colors.neutralDarkest,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[3],
    ...theme.shadows.sm,
  },
  cardIconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsive.spacing[3],
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[3],
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
    ...theme.shadows.sm,
  },
  buttonSecondary: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: responsive.spacing[3],
    alignItems: 'center',
    marginBottom: responsive.spacing[3],
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: responsive.spacing[1],
  },
  avatar: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
