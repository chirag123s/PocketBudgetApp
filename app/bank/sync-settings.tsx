import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';

type SyncFrequency = 'realtime' | 'daily' | 'manual';
type ImportHistory = '1month' | '3months' | '6months' | 'all';

interface RadioOptionProps {
  label: string;
  description?: string;
  isPremium?: boolean;
  isSelected: boolean;
  onPress: () => void;
}

const RadioOption = ({ label, description, isPremium, isSelected, onPress }: RadioOptionProps) => (
  <TouchableOpacity
    style={[
      styles.radioOption,
      isSelected && styles.radioOptionSelected,
    ]}
    onPress={onPress}
  >
    <View style={styles.radioContent}>
      <View style={styles.radioCircleContainer}>
        <View
          style={[
            styles.radioCircle,
            isSelected && styles.radioCircleSelected,
          ]}
        >
          {isSelected && <View style={styles.radioCircleInner} />}
        </View>
      </View>
      <View style={styles.radioTextContainer}>
        <View style={styles.radioLabelRow}>
          <Text style={styles.radioLabel}>{label}</Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          )}
        </View>
        {description && (
          <Text style={styles.radioDescription}>{description}</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default function SyncSettings() {
  const router = useRouter();
  const [syncFrequency, setSyncFrequency] = useState<SyncFrequency>('daily');
  const [importHistory, setImportHistory] = useState<ImportHistory>('3months');
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    borderLight: theme.colors.border.light,
    borderMain: theme.colors.border.main,
    primary: theme.colors.primary[600],
    primaryLight: theme.colors.primary[50],
    accentLight: theme.colors.accent.light,
    accentDark: theme.colors.accent.dark,
  };

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      color: colors.textPrimary,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[6],
    },
    section: {
      marginBottom: responsive.spacing[6],
    },
    sectionBorder: {
      paddingTop: responsive.spacing[6],
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
    sectionTitle: {
      ...theme.typography.styles.body,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: responsive.spacing[2],
    },
    sectionDescription: {
      ...theme.typography.styles.bodySmall,
      color: colors.textSecondary,
      marginBottom: responsive.spacing[4],
    },
    optionsContainer: {
      gap: responsive.spacing[2],
    },
    radioOption: {
      backgroundColor: colors.background,
      padding: responsive.spacing[4],
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.borderLight,
    },
    radioOptionSelected: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    radioContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: responsive.spacing[2],
    },
    radioCircleContainer: {
      marginTop: 2,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.borderMain,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioCircleSelected: {
      borderColor: colors.primary,
    },
    radioCircleInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    radioTextContainer: {
      flex: 1,
    },
    radioLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    radioLabel: {
      ...theme.typography.styles.body,
      fontWeight: '500',
      color: colors.textPrimary,
    },
    radioDescription: {
      ...theme.typography.styles.bodySmall,
      color: colors.textSecondary,
      marginTop: responsive.spacing[1],
    },
    premiumBadge: {
      backgroundColor: colors.accentLight,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: 2,
      borderRadius: theme.borderRadius.full,
    },
    premiumBadgeText: {
      ...theme.typography.styles.caption,
      color: colors.accentDark,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: '600',
    },
    buttonContainer: {
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      padding: responsive.spacing[6],
    },
  });

  return (
    <Screen noPadding backgroundColor={colors.backgroundSecondary} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.backgroundSecondary} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sync Settings</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Sync Frequency Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How often should we check for new transactions?
          </Text>
          <Text style={styles.sectionDescription}>
            More frequent syncing keeps your budget up to date
          </Text>

          <View style={styles.optionsContainer}>
            <RadioOption
              label="Real-time"
              description="Every 5 minutes"
              isPremium
              isSelected={syncFrequency === 'realtime'}
              onPress={() => setSyncFrequency('realtime')}
            />
            <RadioOption
              label="Daily"
              description="Once per day"
              isSelected={syncFrequency === 'daily'}
              onPress={() => setSyncFrequency('daily')}
            />
            <RadioOption
              label="Manual only"
              description="You control syncs"
              isSelected={syncFrequency === 'manual'}
              onPress={() => setSyncFrequency('manual')}
            />
          </View>
        </View>

        {/* Import History Section */}
        <View style={[styles.section, styles.sectionBorder]}>
          <Text style={styles.sectionTitle}>
            How far back should we import?
          </Text>
          <Text style={styles.sectionDescription}>
            More history helps with budgeting insights
          </Text>

          <View style={styles.optionsContainer}>
            <RadioOption
              label="1 month"
              isSelected={importHistory === '1month'}
              onPress={() => setImportHistory('1month')}
            />
            <RadioOption
              label="3 months"
              isSelected={importHistory === '3months'}
              onPress={() => setImportHistory('3months')}
            />
            <RadioOption
              label="6 months"
              isPremium
              isSelected={importHistory === '6months'}
              onPress={() => setImportHistory('6months')}
            />
            <RadioOption
              label="All available"
              isPremium
              isSelected={importHistory === 'all'}
              onPress={() => setImportHistory('all')}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => router.push('/bank/syncing')}
        >
          Finish Setup
        </Button>
      </View>
    </Screen>
  );
}
