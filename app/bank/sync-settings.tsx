import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';

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

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
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

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.body,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.getScreenPadding(),
  },
  section: {
    marginBottom: theme.responsive.spacing.lg,
  },
  sectionBorder: {
    paddingTop: theme.responsive.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  sectionTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.sm,
  },
  sectionDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.md,
  },
  optionsContainer: {
    gap: theme.responsive.spacing.sm,
  },
  radioOption: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.responsive.spacing.md,
    borderRadius: theme.responsive.scale(20),
    borderWidth: 2,
    borderColor: theme.colors.border.light,
  },
  radioOptionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[600],
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.responsive.spacing.sm,
  },
  radioCircleContainer: {
    marginTop: 2,
  },
  radioCircle: {
    width: theme.responsive.scale(20),
    height: theme.responsive.scale(20),
    borderRadius: theme.responsive.scale(10),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: theme.colors.primary[600],
  },
  radioCircleInner: {
    width: theme.responsive.scale(10),
    height: theme.responsive.scale(10),
    borderRadius: theme.responsive.scale(5),
    backgroundColor: theme.colors.primary[600],
  },
  radioTextContainer: {
    flex: 1,
  },
  radioLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  radioLabel: {
    ...theme.typography.styles.body,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  radioDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.responsive.spacing.xs,
  },
  premiumBadge: {
    backgroundColor: theme.colors.accent.light,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.accent.dark,
    fontSize: theme.responsive.fontSize.body,
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    padding: theme.responsive.getScreenPadding(),
  },
});
