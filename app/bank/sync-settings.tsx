import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
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

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary} edges={['top', 'bottom']}>
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
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
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
    borderTopColor: theme.colors.border.light,
  },
  sectionTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: responsive.spacing[2],
  },
  sectionDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[4],
  },
  optionsContainer: {
    gap: responsive.spacing[2],
  },
  radioOption: {
    backgroundColor: theme.colors.background.primary,
    padding: responsive.spacing[4],
    borderRadius: 20,
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
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: theme.colors.primary[600],
  },
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary[600],
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
    color: theme.colors.text.primary,
  },
  radioDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: responsive.spacing[1],
  },
  premiumBadge: {
    backgroundColor: theme.colors.accent.light,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.accent.dark,
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    padding: responsive.spacing[6],
  },
});
