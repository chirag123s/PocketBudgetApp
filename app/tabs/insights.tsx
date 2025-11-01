import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { TabSelector } from '@/components/ui';
import { DateRangePickerModal } from '@/components/transaction';
import { Ionicons } from '@expo/vector-icons';
import SpendingScreen from '@/app/insights/_spending';
import IncomeScreen from '@/app/insights/_income';
import NetWorthScreen from '@/app/insights/_networth';
import PagerView from 'react-native-pager-view';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

type InsightsTab = 'spending' | 'income' | 'networth';

const TAB_ORDER: InsightsTab[] = ['spending', 'income', 'networth'];

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

  const pagerRef = useRef<PagerView>(null);

  // Handle tab selection from TabSelector
  const handleTabSelect = (id: string) => {
    const newTab = id as InsightsTab;
    setSelectedTab(newTab);
    const pageIndex = TAB_ORDER.indexOf(newTab);
    pagerRef.current?.setPage(pageIndex);
  };

  // Handle page change from swipe gesture
  const handlePageSelected = (e: any) => {
    const pageIndex = e.nativeEvent.position;
    setSelectedTab(TAB_ORDER[pageIndex]);
  };

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

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      backgroundColor: colors.neutralBg,
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    dateRangeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    dateRangeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1.5],
      paddingHorizontal: responsive.spacing[3],
      paddingVertical: responsive.spacing[1],
      borderRadius: theme.borderRadius.full,
      backgroundColor: `${colors.primary}10`,
    },
    dateRangeText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
    },
    calendarButton: {
      width: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
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
        <Text style={styles.headerTitle}>Insights</Text>
        <View style={styles.dateRangeRow}>
          <TouchableOpacity
            style={styles.dateRangeButton}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={styles.dateRangeText}>{formatDateRangeDisplay()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={24} color={colors.neutralDarkest} />
          </TouchableOpacity>
        </View>
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
          onSelect={handleTabSelect}
        />
      </View>

      {/* Swipeable Content */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="spending" style={{ flex: 1 }}>
          <SpendingScreen dateRange={dateRange} />
        </View>
        <View key="income" style={{ flex: 1 }}>
          <IncomeScreen dateRange={dateRange} />
        </View>
        <View key="networth" style={{ flex: 1 }}>
          <NetWorthScreen dateRange={dateRange} />
        </View>
      </PagerView>

      {/* Date Range Picker */}
      <DateRangePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onApply={(startDate, endDate) => {
          setDateRange({ startDate, endDate });
        }}
        initialStartDate={dateRange.startDate}
        initialEndDate={dateRange.endDate}
      />
    </Screen>
  );
}
