import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { TabSelector, DateRangePicker, DateRange } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import SpendingScreen from '@/app/insights/_spending';
import IncomeScreen from '@/app/insights/_income';
import NetWorthScreen from '@/app/insights/_networth';

type InsightsTab = 'spending' | 'income' | 'networth';

export default function InsightsTab() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [selectedTab, setSelectedTab] = useState<InsightsTab>('spending');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  });

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    primary: theme.colors.info.main,
  };

  const formatDateRangeDisplay = () => {
    return `${dateRange.startDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
    })} - ${dateRange.endDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`;
  };

  const renderScreen = () => {
    switch (selectedTab) {
      case 'spending':
        return <SpendingScreen dateRange={dateRange} />;
      case 'income':
        return <IncomeScreen dateRange={dateRange} />;
      case 'networth':
        return <NetWorthScreen dateRange={dateRange} />;
      default:
        return <SpendingScreen dateRange={dateRange} />;
    }
  };

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[3],
      paddingBottom: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[1],
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    headerButton: {
      width: ms(40),
      height: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateRangeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1.5],
    },
    dateRangeText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
    },
    tabContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
  });

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Insights</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.dateRangeContainer}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.dateRangeText}>{formatDateRangeDisplay()}</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TabSelector
          options={[
            { id: 'spending', label: 'Spending' },
            { id: 'income', label: 'Income' },
            { id: 'networth', label: 'Net Worth' },
          ]}
          selectedId={selectedTab}
          onSelect={(id) => setSelectedTab(id as InsightsTab)}
        />
      </View>

      {/* Render Selected Screen */}
      {renderScreen()}

      {/* Date Range Picker */}
      <DateRangePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectRange={(range) => {
          setDateRange(range);
          setShowDatePicker(false);
        }}
        initialRange={dateRange}
      />
    </Screen>
  );
}
