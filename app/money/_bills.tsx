import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type BillStatus = 'overdue' | 'upcoming' | 'paid';

interface Bill {
  id: string;
  name: string;
  amount: number;
  status: BillStatus;
  statusText: string;
  logo: string;
  daysInfo: string;
}

type FilterTab = 'upcoming' | 'overdue' | 'paid' | 'all';

export default function BillsScreen() {
  const { theme: themeMode, customBackgroundColor } = useTheme();
  const theme = getTheme(themeMode, customBackgroundColor);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('upcoming');

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
  };

  // Sample data
  const thisWeekBills: Bill[] = [
    {
      id: '1',
      name: 'Spotify',
      amount: 11.99,
      status: 'overdue',
      statusText: 'Overdue',
      daysInfo: 'Overdue by 2 days',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
    },
    {
      id: '2',
      name: 'Netflix',
      amount: 16.99,
      status: 'upcoming',
      statusText: 'Upcoming',
      daysInfo: 'Due in 3 days',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    },
  ];

  const nextWeekBills: Bill[] = [
    {
      id: '3',
      name: 'Optus Mobile',
      amount: 55.0,
      status: 'paid',
      statusText: 'Paid',
      daysInfo: 'Paid on 15 Oct',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Optus_logo.svg/2560px-Optus_logo.svg.png',
    },
    {
      id: '4',
      name: 'AGL Energy',
      amount: 200.52,
      status: 'upcoming',
      statusText: 'Upcoming',
      daysInfo: 'Due in 9 days',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/AGL_Energy_logo.svg/2560px-AGL_Energy_logo.svg.png',
    },
  ];

  const getStatusColor = (status: BillStatus): string => {
    switch (status) {
      case 'overdue':
        return colors.functionalError;
      case 'upcoming':
        return colors.functionalWarning;
      case 'paid':
        return colors.functionalSuccess;
      default:
        return colors.neutralMedium;
    }
  };

  const getStatusTextColor = (status: BillStatus): string => {
    switch (status) {
      case 'overdue':
        return colors.functionalError;
      case 'upcoming':
        return colors.functionalWarning;
      default:
        return colors.neutralDark;
    }
  };

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'overdue', label: 'Overdue' },
    { key: 'paid', label: 'Paid' },
    { key: 'all', label: 'All' },
  ];

  const totalUpcoming = [...thisWeekBills, ...nextWeekBills]
    .filter(b => b.status === 'upcoming' || b.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const upcomingCount = [...thisWeekBills, ...nextWeekBills]
    .filter(b => b.status === 'upcoming' || b.status === 'overdue').length;

  const thisWeekTotal = thisWeekBills
    .filter(b => b.status === 'upcoming' || b.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const nextWeekTotal = nextWeekBills
    .filter(b => b.status === 'upcoming' || b.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const renderBillCard = (bill: Bill) => (
    <TouchableOpacity
      key={bill.id}
      style={styles.billCard}
      activeOpacity={0.7}
    >
      <View style={styles.billCardHeader}>
        <View style={styles.billLogoContainer}>
          <Image
            source={{ uri: bill.logo }}
            style={styles.billLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.billName} numberOfLines={1}>
          {bill.name}
        </Text>
      </View>

      <View style={styles.billCardBody}>
        <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
        <View style={styles.billStatusRow}>
          <Text
            style={[
              styles.billDaysInfo,
              { color: getStatusTextColor(bill.status) },
            ]}
            numberOfLines={2}
          >
            {bill.daysInfo}
          </Text>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(bill.status) },
              ]}
            />
            <Text style={styles.statusText}>{bill.statusText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: colors.neutralBg,
    },
    contentContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingBottom: responsive.spacing[20],
    },

    // Summary Card
    summaryCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[5],
      marginBottom: responsive.spacing[4],
      minHeight: ms(150),
      ...theme.shadows.sm,
    },
    summaryLabel: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      marginBottom: responsive.spacing[2],
    },
    summaryAmount: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.5,
      marginBottom: responsive.spacing[2],
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: responsive.spacing[3],
    },
    summaryItem: {
      flex: 1,
    },
    summaryItemLabel: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
      marginBottom: responsive.spacing[1],
    },
    summaryItemValue: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    divider: {
      width: 1,
      backgroundColor: theme.colors.border.light,
      marginHorizontal: responsive.spacing[4],
    },

    // Filter Tabs
    filterContainer: {
      marginVertical: responsive.spacing[3],
    },
    filterContent: {
      gap: responsive.spacing[2],
      paddingRight: responsive.spacing[4],
    },
    filterTab: {
      height: ms(36),
      paddingHorizontal: responsive.spacing[4],
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterTabActive: {
      backgroundColor: colors.primary,
    },
    filterTabInactive: {
      backgroundColor: theme.colors.border.light,
    },
    filterTabText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
    },
    filterTabTextActive: {
      color: '#ffffff',
    },
    filterTabTextInactive: {
      color: colors.neutralDarkest,
    },

    // Section Title
    sectionTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.3,
      marginTop: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
    },

    // Bills Scroll View
    billsScrollView: {
      marginBottom: responsive.spacing[4],
    },
    billsScrollContent: {
      gap: responsive.spacing[4],
      paddingRight: responsive.spacing[4],
    },

    // Bill Card
    billCard: {
      width: ms(280),
      minHeight: ms(120),
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      justifyContent: 'space-between',
      backgroundColor: colors.neutralWhite,
      ...theme.shadows.sm,
    },
    billCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[3],
      marginBottom: responsive.spacing[4],
    },
    billLogoContainer: {
      width: ms(40),
      height: ms(40),
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      backgroundColor: colors.neutralBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    billLogo: {
      width: ms(32),
      height: ms(32),
    },
    billName: {
      flex: 1,
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    billCardBody: {
      gap: responsive.spacing[1],
    },
    billAmount: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      letterSpacing: -0.3,
      marginBottom: responsive.spacing[1],
    },
    billStatusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    billDaysInfo: {
      fontSize: responsive.fontSize.sm,
      flex: 1,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
    },
    statusDot: {
      width: ms(8),
      height: ms(8),
      borderRadius: ms(4),
    },
    statusText: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralMedium,
    },
  });

  return (
    <ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Due</Text>
        <Text style={styles.summaryAmount}>${totalUpcoming.toFixed(2)}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>This Week</Text>
            <Text style={[styles.summaryItemValue, { color: colors.functionalWarning }]}>
              ${thisWeekTotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemLabel}>Next Week</Text>
            <Text style={[styles.summaryItemValue, { color: colors.neutralDarkest }]}>
              ${nextWeekTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              activeFilter === filter.key
                ? styles.filterTabActive
                : styles.filterTabInactive,
            ]}
            onPress={() => setActiveFilter(filter.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === filter.key
                  ? styles.filterTabTextActive
                  : styles.filterTabTextInactive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* This Week Section */}
      <Text style={styles.sectionTitle}>This Week</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.billsScrollView}
        contentContainerStyle={styles.billsScrollContent}
      >
        {thisWeekBills.map(renderBillCard)}
      </ScrollView>

      {/* Next Week Section */}
      <Text style={styles.sectionTitle}>Next Week</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.billsScrollView}
        contentContainerStyle={styles.billsScrollContent}
      >
        {nextWeekBills.map(renderBillCard)}
      </ScrollView>
    </ScrollView>
  );
}
