import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import { getSettingsStyles, SETTINGS_CONSTANTS } from './settingsStyles';
import { DateRangePicker, DateRange } from '@/components/ui/DateRangePicker';

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
  const settingsStyles = getSettingsStyles(themeMode);

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

  // Initialize with last 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: thirtyDaysAgo,
    endDate: today,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleDateRangeSelect = (range: DateRange) => {
    setDateRange(range);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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
    dateContent: {
      flex: 1,
    },
    formatContent: {
      flex: 1,
    },
    generateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: responsive.spacing[2],
      paddingVertical: responsive.spacing[4],
      paddingHorizontal: responsive.spacing[6],
      borderRadius: theme.borderRadius.xl,
      backgroundColor: colors.primary,
      ...theme.shadows.md,
    },
    generateButtonText: {
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: settingsFontWeights.bold,
      color: '#FFFFFF',
      letterSpacing: 0.3,
    },
    exportItemContent: {
      flex: 1,
    },
    downloadButton: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      borderRadius: theme.borderRadius.lg,
      backgroundColor: colors.primary,
      ...theme.shadows.sm,
    },
    downloadButtonText: {
      fontSize: settingsTypography.secondary,
      fontWeight: settingsFontWeights.bold,
      color: '#FFFFFF',
    },
    emptyCard: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[8],
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    emptyStateText: {
      fontSize: settingsTypography.primary,
      color: colors.neutralMedium,
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
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Data to Export */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>DATA TO EXPORT</Text>
          <View style={settingsStyles.card}>
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => toggleOption('transactions')}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="swap-horizontal-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Transactions</Text>
              {exportOptions.transactions && (
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              )}
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => toggleOption('budgets')}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="wallet-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Budgets</Text>
              {exportOptions.budgets && (
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              )}
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => toggleOption('categories')}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="pricetags-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Categories</Text>
              {exportOptions.categories && (
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              )}
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => toggleOption('accountDetails')}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="card-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Account Details</Text>
              {exportOptions.accountDetails && (
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              )}
            </TouchableOpacity>

            <View style={settingsStyles.menuItemDivider} />

            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => toggleOption('personalInfo')}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="person-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <Text style={settingsStyles.menuText}>Personal Info</Text>
              {exportOptions.personalInfo && (
                <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.functionalSuccess} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Range */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>DATE RANGE</Text>
          <View style={settingsStyles.card}>
            <TouchableOpacity
              style={settingsStyles.menuItem}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <View style={settingsStyles.iconContainer}>
                <Ionicons name="calendar-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.neutralDarkest} />
              </View>
              <View style={styles.dateContent}>
                <Text style={settingsStyles.menuText}>Date Range</Text>
                <Text style={settingsStyles.menuSubtitle}>
                  {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={SETTINGS_CONSTANTS.CHEVRON_SIZE} color={colors.neutralMedium} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Format */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>FORMAT</Text>
          <View style={settingsStyles.card}>
            {formatOptions.map((formatOption, index) => (
              <React.Fragment key={formatOption.id}>
                <TouchableOpacity
                  style={settingsStyles.menuItem}
                  onPress={() => setFormat(formatOption.id)}
                  activeOpacity={0.7}
                >
                  <View style={settingsStyles.iconContainer}>
                    <Ionicons
                      name={formatOption.icon as any}
                      size={SETTINGS_CONSTANTS.ICON_SIZE}
                      color={colors.neutralDarkest}
                    />
                  </View>
                  <View style={styles.formatContent}>
                    <Text style={settingsStyles.menuText}>{formatOption.title}</Text>
                    <Text style={settingsStyles.menuSubtitle}>{formatOption.description}</Text>
                  </View>
                  {format === formatOption.id && (
                    <Ionicons name="checkmark-circle" size={SETTINGS_CONSTANTS.ICON_SIZE} color={colors.primary} />
                  )}
                </TouchableOpacity>
                {index < formatOptions.length - 1 && <View style={settingsStyles.menuItemDivider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Generate Export Action */}
        <View style={settingsStyles.section}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateExport}
            activeOpacity={0.9}
          >
            <Ionicons name="download-outline" size={SETTINGS_CONSTANTS.ICON_SIZE} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Generate Export</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Exports */}
        <View style={settingsStyles.section}>
          <Text style={settingsStyles.sectionTitle}>RECENT EXPORTS</Text>

          {recentExports.length > 0 ? (
            <View style={settingsStyles.card}>
              {recentExports.map((item, index) => {
                const fileIcon = getFileIcon(item.type);
                return (
                  <React.Fragment key={item.id}>
                    <View style={settingsStyles.menuItem}>
                      <View style={settingsStyles.iconContainer}>
                        <Ionicons
                          name={fileIcon.name}
                          size={SETTINGS_CONSTANTS.ICON_SIZE}
                          color={fileIcon.color}
                        />
                      </View>
                      <View style={styles.exportItemContent}>
                        <Text style={settingsStyles.menuText}>{item.filename}</Text>
                        <Text style={settingsStyles.menuSubtitle}>Generated: {item.date}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={() => handleDownload(item.filename)}
                        activeOpacity={0.9}
                      >
                        <Text style={styles.downloadButtonText}>Download</Text>
                      </TouchableOpacity>
                    </View>
                    {index < recentExports.length - 1 && <View style={settingsStyles.menuItemDivider} />}
                  </React.Fragment>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyStateText}>You have no recent exports.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Date Range Picker Modal */}
      <DateRangePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectRange={handleDateRangeSelect}
        initialRange={dateRange}
      />
    </Screen>
  );
}
