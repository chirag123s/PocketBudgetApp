import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateRangePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectRange: (range: DateRange) => void;
  initialRange?: DateRange;
}

type PresetType = 'last7' | 'last30' | 'thisMonth' | 'lastMonth' | 'custom';

interface DateInfo {
  day: number;
  month: number;
  year: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface MonthData {
  month: number;
  year: number;
  dates: DateInfo[];
  title: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  visible,
  onClose,
  onSelectRange,
  initialRange,
}) => {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const scrollViewRef = useRef<FlatList>(null);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    borderLight: theme.colors.border.light,
  };

  const today = useMemo(() => new Date(), []);
  const [selectedPreset, setSelectedPreset] = useState<PresetType>('last30');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Generate calendar data for 3 months (prev, current, next)
  const monthsData = useMemo((): MonthData[] => {
    const months: MonthData[] = [];
    const baseDate = new Date();

    for (let i = -1; i <= 1; i++) {
      const monthDate = new Date(baseDate);
      monthDate.setMonth(baseDate.getMonth() + i);

      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

      // Get first day of month and total days
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      const dates: DateInfo[] = [];

      // Add previous month's trailing dates
      for (let j = firstDay - 1; j >= 0; j--) {
        const day = daysInPrevMonth - j;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        dates.push({
          day,
          month: prevMonth,
          year: prevYear,
          date: new Date(prevYear, prevMonth, day),
          isCurrentMonth: false,
          isToday: false,
        });
      }

      // Add current month's dates
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();

        dates.push({
          day,
          month,
          year,
          date,
          isCurrentMonth: true,
          isToday,
        });
      }

      months.push({
        month,
        year,
        dates,
        title: monthName,
      });
    }

    return months;
  }, [today]);

  // Helper functions for date calculations
  const getPresetRange = (preset: PresetType): DateRange => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    switch (preset) {
      case 'last7': {
        const start = new Date(todayDate);
        start.setDate(todayDate.getDate() - 7);
        return { startDate: start, endDate: todayDate };
      }
      case 'last30': {
        const start = new Date(todayDate);
        start.setDate(todayDate.getDate() - 30);
        return { startDate: start, endDate: todayDate };
      }
      case 'thisMonth': {
        const start = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
        return { startDate: start, endDate: todayDate };
      }
      case 'lastMonth': {
        const start = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, 1);
        const end = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0);
        return { startDate: start, endDate: end };
      }
      default:
        return { startDate: todayDate, endDate: todayDate };
    }
  };

  // Initialize dates when modal opens
  useEffect(() => {
    if (visible) {
      if (initialRange) {
        setStartDate(initialRange.startDate);
        setEndDate(initialRange.endDate);
        setSelectedPreset('custom');
      } else {
        const range = getPresetRange('last30');
        setStartDate(range.startDate);
        setEndDate(range.endDate);
        setSelectedPreset('last30');
      }
    }
  }, [visible]);

  const handlePresetSelect = (preset: PresetType) => {
    setSelectedPreset(preset);
    if (preset !== 'custom') {
      const range = getPresetRange(preset);
      setStartDate(range.startDate);
      setEndDate(range.endDate);
    }
  };

  // Check if date is in selected range
  const isDateInRange = useCallback(
    (date: Date): boolean => {
      if (!startDate || !endDate) return false;
      const dateTime = new Date(date).setHours(0, 0, 0, 0);
      const startTime = new Date(startDate).setHours(0, 0, 0, 0);
      const endTime = new Date(endDate).setHours(0, 0, 0, 0);
      return dateTime >= startTime && dateTime <= endTime;
    },
    [startDate, endDate]
  );

  const isStartDate = useCallback(
    (date: Date): boolean => {
      if (!startDate) return false;
      return (
        date.getDate() === startDate.getDate() &&
        date.getMonth() === startDate.getMonth() &&
        date.getFullYear() === startDate.getFullYear()
      );
    },
    [startDate]
  );

  const isEndDate = useCallback(
    (date: Date): boolean => {
      if (!endDate) return false;
      return (
        date.getDate() === endDate.getDate() &&
        date.getMonth() === endDate.getMonth() &&
        date.getFullYear() === endDate.getFullYear()
      );
    },
    [endDate]
  );

  // Handle date selection
  const handleDatePress = useCallback(
    (dateInfo: DateInfo) => {
      const { date } = dateInfo;
      setSelectedPreset('custom');

      if (!startDate || (startDate && endDate)) {
        // Start new selection
        setStartDate(date);
        setEndDate(null);
      } else {
        // Complete the range
        if (date < startDate) {
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
      }
    },
    [startDate, endDate]
  );

  const handleApply = () => {
    if (startDate && endDate) {
      onSelectRange({ startDate, endDate });
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const formatDateRange = () => {
    if (!startDate || !endDate) return 'Select dates';
    return `${startDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
    })} - ${endDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`;
  };

  const presets = [
    { key: 'last7' as PresetType, label: 'Last 7 Days' },
    { key: 'last30' as PresetType, label: 'Last 30 Days' },
    { key: 'thisMonth' as PresetType, label: 'This Month' },
    { key: 'lastMonth' as PresetType, label: 'Last Month' },
    { key: 'custom' as PresetType, label: 'Custom' },
  ];

  // Navigate to previous/next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? Math.max(0, currentMonthIndex - 1)
      : Math.min(monthsData.length - 1, currentMonthIndex + 1);

    setCurrentMonthIndex(newIndex);
    scrollViewRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  // Render individual date cell
  const renderDateCell = (dateInfo: DateInfo, dayOfWeek: number) => {
    const { day, date, isCurrentMonth, isToday } = dateInfo;
    const inRange = isDateInRange(date);
    const isStart = isStartDate(date);
    const isEnd = isEndDate(date);
    const isRangeStart = inRange && dayOfWeek === 0;
    const isRangeEnd = inRange && dayOfWeek === 6;

    return (
      <TouchableOpacity
        key={`${date.getTime()}-${day}`}
        style={[
          styles.dateCell,
          inRange && { backgroundColor: `${colors.primary}15` },
          (isStart || isRangeStart) && styles.dateCellRangeStart,
          (isEnd || isRangeEnd) && styles.dateCellRangeEnd,
        ]}
        onPress={() => isCurrentMonth && handleDatePress(dateInfo)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.dateCellInner,
            (isStart || isEnd) && { backgroundColor: colors.primary },
            isToday && !isStart && !isEnd && {
              borderWidth: 1.5,
              borderColor: colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.dateText,
              { color: colors.neutralDarkest },
              !isCurrentMonth && { color: colors.neutralMedium, opacity: 0.4 },
              (isStart || isEnd) && { color: '#FFFFFF', fontWeight: '700' },
              inRange && !isStart && !isEnd && { color: colors.primary, fontWeight: '600' },
            ]}
          >
            {day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render month grid
  const renderMonth = ({ item }: { item: MonthData }) => {
    return (
      <View style={[styles.monthContainer, { width: SCREEN_WIDTH - responsive.spacing[4] * 2 }]}>
        <View style={styles.datesGrid}>
          {item.dates.map((dateInfo, idx) => {
            const dayOfWeek = idx % 7;
            return renderDateCell(dateInfo, dayOfWeek);
          })}
        </View>
      </View>
    );
  };

  const currentMonth = monthsData[currentMonthIndex];

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: responsive.spacing[3],
    },
    container: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.lg,
      width: '100%',
      maxWidth: 420,
      maxHeight: '90%',
      ...theme.shadows.lg,
    },
    header: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[3],
      paddingBottom: responsive.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[1.5],
    },
    headerTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    closeButton: {
      width: ms(32),
      height: ms(32),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.full,
      backgroundColor: colors.neutralBg,
    },
    selectedRangeText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.primary,
      textAlign: 'center',
    },
    content: {
      flex: 1,
    },
    presetsContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    presetsScroll: {
      gap: responsive.spacing[1.5],
    },
    presetButton: {
      paddingVertical: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[3],
      borderRadius: theme.borderRadius.full,
      backgroundColor: colors.neutralBg,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    presetButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    presetText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    presetTextActive: {
      color: '#FFFFFF',
    },
    monthHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
    },
    monthTitle: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    navButton: {
      width: ms(32),
      height: ms(32),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.full,
      backgroundColor: colors.neutralBg,
    },
    weekdayHeader: {
      flexDirection: 'row',
      paddingHorizontal: responsive.spacing[4],
      paddingBottom: responsive.spacing[2],
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    weekdayCell: {
      flex: 1,
      height: ms(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekdayText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '700',
      color: colors.neutralMedium,
    },
    calendarContainer: {
      flex: 1,
      position: 'relative',
    },
    monthContainer: {
      paddingHorizontal: responsive.spacing[4],
    },
    datesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dateCell: {
      width: `${100 / 7}%`,
      height: ms(44),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateCellRangeStart: {
      borderTopLeftRadius: ms(22),
      borderBottomLeftRadius: ms(22),
    },
    dateCellRangeEnd: {
      borderTopRightRadius: ms(22),
      borderBottomRightRadius: ms(22),
    },
    dateCellInner: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
    },
    navArrowContainer: {
      position: 'absolute',
      top: '50%',
      width: ms(36),
      height: ms(36),
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    navArrowLeft: {
      left: responsive.spacing[2],
    },
    navArrowRight: {
      right: responsive.spacing[2],
    },
    navArrow: {
      width: ms(36),
      height: ms(36),
      borderRadius: ms(18),
      backgroundColor: colors.neutralWhite,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.sm,
    },
    actionsContainer: {
      flexDirection: 'row',
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[3],
      gap: responsive.spacing[2],
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>Select Date Range</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color={colors.neutralDark} />
                </TouchableOpacity>
              </View>
              <Text style={styles.selectedRangeText}>{formatDateRange()}</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Presets */}
              <View style={styles.presetsContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.presetsScroll}
                >
                  {presets.map((preset) => (
                    <TouchableOpacity
                      key={preset.key}
                      style={[
                        styles.presetButton,
                        selectedPreset === preset.key && styles.presetButtonActive,
                      ]}
                      onPress={() => handlePresetSelect(preset.key)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.presetText,
                          selectedPreset === preset.key && styles.presetTextActive,
                        ]}
                      >
                        {preset.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Header */}
              <View style={styles.monthHeader}>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => navigateMonth('prev')}
                  activeOpacity={0.7}
                  disabled={currentMonthIndex === 0}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={currentMonthIndex === 0 ? colors.neutralMedium : colors.neutralDarkest}
                  />
                </TouchableOpacity>
                <Text style={styles.monthTitle}>{currentMonth?.title}</Text>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => navigateMonth('next')}
                  activeOpacity={0.7}
                  disabled={currentMonthIndex === monthsData.length - 1}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={currentMonthIndex === monthsData.length - 1 ? colors.neutralMedium : colors.neutralDarkest}
                  />
                </TouchableOpacity>
              </View>

              {/* Weekday Header */}
              <View style={styles.weekdayHeader}>
                {WEEKDAYS.map((day, index) => (
                  <View key={`weekday-${index}`} style={styles.weekdayCell}>
                    <Text style={styles.weekdayText}>{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar - Horizontal Scroll */}
              <View style={styles.calendarContainer}>
                <FlatList
                  ref={scrollViewRef}
                  data={monthsData}
                  renderItem={renderMonth}
                  keyExtractor={(item) => `${item.year}-${item.month}`}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={SCREEN_WIDTH - responsive.spacing[4] * 2}
                  decelerationRate="fast"
                  onMomentumScrollEnd={(event) => {
                    const index = Math.round(
                      event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - responsive.spacing[4] * 2)
                    );
                    setCurrentMonthIndex(index);
                  }}
                  getItemLayout={(data, index) => ({
                    length: SCREEN_WIDTH - responsive.spacing[4] * 2,
                    offset: (SCREEN_WIDTH - responsive.spacing[4] * 2) * index,
                    index,
                  })}
                />
              </View>
            </ScrollView>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <View style={{ flex: 1 }}>
                <Button
                  variant="secondary"
                  size="small"
                  onPress={handleCancel}
                  fullWidth
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  variant="primary"
                  size="small"
                  onPress={handleApply}
                  disabled={!startDate || !endDate}
                  fullWidth
                >
                  Apply
                </Button>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
