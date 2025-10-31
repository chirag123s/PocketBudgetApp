import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
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

type FormatType = 'csv' | 'pdf' | 'json';

interface ExportOptions {
  transactions: boolean;
  budgets: boolean;
  categories: boolean;
  accountDetails: boolean;
  personalInfo: boolean;
}

interface FormatOption {
  id: FormatType;
  title: string;
  description: string;
  icon: string;
}

interface RecentExport {
  id: string;
  filename: string;
  date: string;
  type: FormatType;
}

export default function ExportData() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

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

  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    transactions: true,
    budgets: false,
    categories: true,
    accountDetails: false,
    personalInfo: false,
  });
  const [format, setFormat] = useState<FormatType>('csv');
  const [dateFrom] = useState('Jan 1, 2025');
  const [dateTo] = useState('Oct 29, 2025');

  const formatOptions: FormatOption[] = [
    {
      id: 'csv',
      title: 'CSV',
      description: 'Excel, Numbers, Google Sheets',
      icon: 'document-text-outline',
    },
    {
      id: 'pdf',
      title: 'PDF Report',
      description: 'Easy to read and print',
      icon: 'document-outline',
    },
    {
      id: 'json',
      title: 'JSON',
      description: 'Raw data for developers',
      icon: 'code-slash-outline',
    },
  ];

  const recentExports: RecentExport[] = [
    { id: '1', filename: 'Oct 2025 Report.pdf', date: 'Oct 20, 2025', type: 'pdf' },
    { id: '2', filename: 'Sep 2025 Data.csv', date: 'Sep 15, 2025', type: 'csv' },
  ];

  const toggleOption = (key: keyof ExportOptions) => {
    setExportOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateExport = () => {
    const selectedOptions = Object.entries(exportOptions).filter(([_, checked]) => checked);
    if (selectedOptions.length === 0) {
      Alert.alert('No Data Selected', 'Please select at least one type of data to export.');
      return;
    }

    const selectedFormat = formatOptions.find(f => f.id === format);
    Alert.alert(
      'Export Generated',
      `Your ${selectedFormat?.title} export is being prepared.`,
      [{ text: 'OK' }]
    );
  };

  const handleDownload = (filename: string) => {
    Alert.alert('Download', `Downloading ${filename}...`, [{ text: 'OK' }]);
  };

  const getFileIcon = (type: FormatType): { name: keyof typeof Ionicons.glyphMap; color: string } => {
    switch (type) {
      case 'pdf':
        return { name: 'document-outline', color: colors.functionalError };
      case 'csv':
        return { name: 'document-text-outline', color: colors.functionalSuccess };
      case 'json':
        return { name: 'code-slash-outline', color: colors.functionalWarning };
      default:
        return { name: 'document-outline', color: colors.neutralDark };
    }
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[4],
      paddingBottom: responsive.spacing[8],
    },
    card: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    sectionTitle: {
      fontSize: settingsTypography.subsectionHeading,
      fontWeight: settingsFontWeights.semibold,
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[3],
    },
    checkboxGroup: {
      gap: responsive.spacing[3],
      marginBottom: responsive.spacing[6],
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: responsive.spacing[3],
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.spacing[1],
    },
    checkbox: {
      width: ms(20),
      height: ms(20),
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: theme.borderRadius.sm,
      marginRight: responsive.spacing[3],
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    checkboxText: {
      fontSize: settingsTypography.primary,
      color: colors.neutralDarkest,
      fontWeight: settingsFontWeights.regular,
    },
    dateRow: {
      flexDirection: 'row',
      gap: responsive.spacing[3],
      marginBottom: responsive.spacing[6],
    },
    dateField: {
      flex: 1,
    },
    label: {
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.medium,
      color: colors.neutralDark,
      marginBottom: responsive.spacing[2],
    },
    selectButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: ms(48),
      backgroundColor: colors.iconBg,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: responsive.spacing[4],
    },
    selectButtonText: {
      fontSize: settingsTypography.primary,
      color: colors.neutralDarkest,
      fontWeight: settingsFontWeights.regular,
    },
    formatList: {
      gap: responsive.spacing[3],
      marginBottom: responsive.spacing[6],
    },
    formatOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[4],
      backgroundColor: colors.neutralWhite,
    },
    formatOptionSelected: {
      backgroundColor: `${colors.primary}15`,
      borderColor: colors.primary,
    },
    formatOptionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      flex: 1,
    },
    formatOptionContent: {
      flex: 1,
    },
    formatOptionTitle: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.semibold,
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[0.5],
    },
    formatOptionDescription: {
      fontSize: settingsTypography.secondary,
      color: colors.neutralDark,
    },
    radioCircle: {
      width: ms(20),
      height: ms(20),
      borderRadius: ms(10),
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioCircleInner: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(5),
      backgroundColor: colors.primary,
    },
    generateButton: {
      height: ms(48),
      borderRadius: theme.borderRadius.lg,
      backgroundColor: colors.functionalSuccess,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    },
    generateButtonPressed: {
      opacity: 0.9,
    },
    generateButtonText: {
      fontSize: settingsTypography.primary,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralWhite,
      letterSpacing: 0.3,
    },
    exportsList: {
      gap: responsive.spacing[3],
    },
    exportItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.iconBg,
      borderRadius: theme.borderRadius.lg,
      padding: responsive.spacing[4],
      gap: responsive.spacing[3],
    },
    exportItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      flex: 1,
    },
    exportIconContainer: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      backgroundColor: colors.iconBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    exportItemContent: {
      flex: 1,
    },
    exportName: {
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.semibold,
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[0.5],
    },
    exportDate: {
      fontSize: settingsTypography.tertiary,
      color: colors.neutralDark,
    },
    downloadButton: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      borderRadius: theme.borderRadius.lg,
      backgroundColor: colors.primary,
      ...theme.shadows.sm,
    },
    downloadButtonPressed: {
      opacity: 0.9,
    },
    downloadButtonText: {
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.bold,
      color: colors.neutralWhite,
    },
    emptyState: {
      paddingVertical: responsive.spacing[8],
      alignItems: 'center',
    },
    emptyStateText: {
      fontSize: settingsTypography.primary,
      color: colors.neutralMedium,
    },
    bottomSpacer: {
      height: responsive.spacing[4],
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top', 'bottom']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />
      <ScreenHeader
        title="Export Data"
        backgroundColor={colors.neutralBg}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* What to export */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What to export</Text>

          <View style={styles.checkboxGroup}>
            <Pressable
              style={styles.checkboxRow}
              onPress={() => toggleOption('transactions')}
            >
              <View style={[styles.checkbox, exportOptions.transactions && styles.checkboxChecked]}>
                {exportOptions.transactions && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Transactions</Text>
            </Pressable>

            <Pressable
              style={styles.checkboxRow}
              onPress={() => toggleOption('budgets')}
            >
              <View style={[styles.checkbox, exportOptions.budgets && styles.checkboxChecked]}>
                {exportOptions.budgets && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Budgets</Text>
            </Pressable>

            <Pressable
              style={styles.checkboxRow}
              onPress={() => toggleOption('categories')}
            >
              <View style={[styles.checkbox, exportOptions.categories && styles.checkboxChecked]}>
                {exportOptions.categories && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Categories</Text>
            </Pressable>

            <Pressable
              style={styles.checkboxRow}
              onPress={() => toggleOption('accountDetails')}
            >
              <View style={[styles.checkbox, exportOptions.accountDetails && styles.checkboxChecked]}>
                {exportOptions.accountDetails && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Account details</Text>
            </Pressable>

            <Pressable
              style={styles.checkboxRow}
              onPress={() => toggleOption('personalInfo')}
            >
              <View style={[styles.checkbox, exportOptions.personalInfo && styles.checkboxChecked]}>
                {exportOptions.personalInfo && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Personal info</Text>
            </Pressable>
          </View>

          {/* Date Range */}
          <Text style={styles.sectionTitle}>Date Range</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateField}>
              <Text style={styles.label}>From</Text>
              <Pressable style={styles.selectButton}>
                <Text style={styles.selectButtonText}>{dateFrom}</Text>
                <Ionicons name="calendar-outline" size={ms(16)} color={colors.neutralMedium} />
              </Pressable>
            </View>
            <View style={styles.dateField}>
              <Text style={styles.label}>To</Text>
              <Pressable style={styles.selectButton}>
                <Text style={styles.selectButtonText}>{dateTo}</Text>
                <Ionicons name="calendar-outline" size={ms(16)} color={colors.neutralMedium} />
              </Pressable>
            </View>
          </View>

          {/* Format */}
          <Text style={styles.sectionTitle}>Format</Text>
          <View style={styles.formatList}>
            {formatOptions.map((formatOption) => (
              <Pressable
                key={formatOption.id}
                style={[
                  styles.formatOption,
                  format === formatOption.id && styles.formatOptionSelected,
                ]}
                onPress={() => setFormat(formatOption.id)}
              >
                <View style={styles.formatOptionLeft}>
                  <View style={styles.radioCircle}>
                    {format === formatOption.id && <View style={styles.radioCircleInner} />}
                  </View>
                  <View style={styles.formatOptionContent}>
                    <Text style={styles.formatOptionTitle}>{formatOption.title}</Text>
                    <Text style={styles.formatOptionDescription}>{formatOption.description}</Text>
                  </View>
                </View>
                <Ionicons
                  name={formatOption.icon as any}
                  size={ms(24)}
                  color={format === formatOption.id ? colors.primary : colors.neutralMedium}
                />
              </Pressable>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.generateButton,
              pressed && styles.generateButtonPressed,
            ]}
            onPress={handleGenerateExport}
          >
            <Text style={styles.generateButtonText}>Generate Export</Text>
          </Pressable>
        </View>

        {/* Recent Exports */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recent Exports</Text>

          {recentExports.length > 0 ? (
            <View style={styles.exportsList}>
              {recentExports.map((item) => {
                const fileIcon = getFileIcon(item.type);
                return (
                  <View key={item.id} style={styles.exportItem}>
                    <View style={styles.exportItemLeft}>
                      <View style={styles.exportIconContainer}>
                        <Ionicons
                          name={fileIcon.name}
                          size={ms(24)}
                          color={colors.neutralDarkest}
                        />
                      </View>
                      <View style={styles.exportItemContent}>
                        <Text style={styles.exportName}>{item.filename}</Text>
                        <Text style={styles.exportDate}>Generated: {item.date}</Text>
                      </View>
                    </View>
                    <Pressable
                      style={({ pressed }) => [
                        styles.downloadButton,
                        pressed && styles.downloadButtonPressed,
                      ]}
                      onPress={() => handleDownload(item.filename)}
                    >
                      <Text style={styles.downloadButtonText}>Download</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>You have no recent exports.</Text>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
}
