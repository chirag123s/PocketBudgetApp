import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type FormatType = 'csv' | 'pdf' | 'json';

interface ExportOptions {
  transactions: boolean;
  budgets: boolean;
  categories: boolean;
  accountDetails: boolean;
  personalInfo: boolean;
}

export default function ExportData() {
  const router = useRouter();
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    transactions: true,
    budgets: true,
    categories: true,
    accountDetails: false,
    personalInfo: false,
  });
  const [format, setFormat] = useState<FormatType>('csv');

  const toggleOption = (key: keyof ExportOptions) => {
    setExportOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateExport = () => {
    // Generate export logic
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Export Data</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* What to export */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What to export:</Text>

          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleOption('transactions')}
            >
              <View style={[styles.checkbox, exportOptions.transactions && styles.checkboxChecked]}>
                {exportOptions.transactions && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleOption('budgets')}
            >
              <View style={[styles.checkbox, exportOptions.budgets && styles.checkboxChecked]}>
                {exportOptions.budgets && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Budgets</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleOption('categories')}
            >
              <View style={[styles.checkbox, exportOptions.categories && styles.checkboxChecked]}>
                {exportOptions.categories && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleOption('accountDetails')}
            >
              <View style={[styles.checkbox, exportOptions.accountDetails && styles.checkboxChecked]}>
                {exportOptions.accountDetails && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Account details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleOption('personalInfo')}
            >
              <View style={[styles.checkbox, exportOptions.personalInfo && styles.checkboxChecked]}>
                {exportOptions.personalInfo && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Personal info</Text>
            </TouchableOpacity>
          </View>

          {/* Date Range */}
          <Text style={styles.cardTitle}>Date Range:</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.label}>From:</Text>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Jan 1, 2025</Text>
                <Ionicons name="chevron-down" size={16} color={theme.colors.text.tertiary} />
              </TouchableOpacity>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.label}>To:</Text>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Oct 25, 2025</Text>
                <Ionicons name="chevron-down" size={16} color={theme.colors.text.tertiary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Format */}
          <Text style={styles.cardTitle}>Format:</Text>
          <View style={styles.optionsGroup}>
            <TouchableOpacity
              style={[
                styles.option,
                format === 'csv' && styles.optionSelected,
              ]}
              onPress={() => setFormat('csv')}
            >
              <View style={styles.radioCircle}>
                {format === 'csv' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>CSV (Excel)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                format === 'pdf' && styles.optionSelected,
              ]}
              onPress={() => setFormat('pdf')}
            >
              <View style={styles.radioCircle}>
                {format === 'pdf' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>PDF Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                format === 'json' && styles.optionSelected,
              ]}
              onPress={() => setFormat('json')}
            >
              <View style={styles.radioCircle}>
                {format === 'json' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>JSON (Raw data)</Text>
            </TouchableOpacity>
          </View>

          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={handleGenerateExport}
          >
            Generate Export
          </Button>
        </View>

        {/* Recent Exports */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Exports</Text>

          <View style={styles.exportsList}>
            <View style={styles.exportItem}>
              <View>
                <Text style={styles.exportName}>Oct 2025 Report.pdf</Text>
                <Text style={styles.exportDate}>Generated: Oct 20</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.exportItem}>
              <View>
                <Text style={styles.exportName}>Q3 2025 Data.csv</Text>
                <Text style={styles.exportDate}>Generated: Sep 30</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.md,
  },
  checkboxGroup: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: theme.responsive.scale(20),
    height: theme.responsive.scale(20),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    borderRadius: theme.responsive.scale(4),
    marginRight: theme.responsive.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary[600],
    borderColor: theme.colors.primary[600],
  },
  checkboxText: {
    ...theme.typography.styles.body,
  },
  dateRow: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  dateField: {
    flex: 1,
  },
  label: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.sm,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
  },
  selectButtonText: {
    ...theme.typography.styles.body,
  },
  optionsGroup: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[600],
  },
  radioCircle: {
    width: theme.responsive.scale(20),
    height: theme.responsive.scale(20),
    borderRadius: theme.responsive.scale(10),
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  radioCircleInner: {
    width: theme.responsive.scale(12),
    height: theme.responsive.scale(12),
    borderRadius: theme.responsive.scale(6),
    backgroundColor: theme.colors.primary[600],
  },
  optionText: {
    ...theme.typography.styles.body,
  },
  exportsList: {
    gap: theme.responsive.spacing.sm,
  },
  exportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
  },
  exportName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  exportDate: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  downloadButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
  },
  downloadButtonText: {
    ...theme.typography.styles.button,
    color: '#FFFFFF',
    fontSize: theme.responsive.fontSize.bodySmall,
  },
});
