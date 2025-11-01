import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomSheetModal } from '@/components/ui';

interface DateRangePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export function DateRangePickerModal({
  visible,
  onClose,
  onApply,
  initialStartDate,
  initialEndDate,
}: DateRangePickerModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [startDate, setStartDate] = useState<Date>(initialStartDate || new Date());
  const [endDate, setEndDate] = useState<Date>(initialEndDate || new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
  };

  const handleApply = () => {
    onApply(startDate, endDate);
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Generate calendar for current month
  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = generateCalendar(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayPress = (day: number | null) => {
    if (day === null) return;

    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (selectingStart) {
      setStartDate(selectedDate);
      setSelectingStart(false);
    } else {
      if (selectedDate < startDate) {
        // If end date is before start date, swap them
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  const isDayInRange = (day: number | null) => {
    if (day === null) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date >= startDate && date <= endDate;
  };

  const isDayStart = (day: number | null) => {
    if (day === null) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === startDate.toDateString();
  };

  const isDayEnd = (day: number | null) => {
    if (day === null) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === endDate.toDateString();
  };

  const styles = StyleSheet.create({
    dateSelectors: {
      flexDirection: 'row',
      gap: responsive.spacing[3],
      marginBottom: responsive.spacing[3],
    },
    dateSelector: {
      flex: 1,
      padding: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      borderWidth: 2,
      borderColor: theme.colors.border.light,
    },
    dateSelectorActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}10`,
    },
    dateSelectorLabel: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
      marginBottom: responsive.spacing[1],
    },
    dateSelectorValue: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    calendarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[3],
    },
    monthName: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    navButton: {
      width: ms(36),
      height: ms(36),
      borderRadius: theme.borderRadius.full,
      backgroundColor: colors.neutralBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weekDays: {
      flexDirection: 'row',
      marginBottom: responsive.spacing[2],
    },
    weekDay: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: responsive.spacing[2],
    },
    weekDayText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '600',
      color: colors.neutralMedium,
    },
    calendar: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: responsive.spacing[4],
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: responsive.spacing[1],
    },
    dayButton: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayInRange: {
      backgroundColor: `${colors.primary}20`,
    },
    dayStart: {
      backgroundColor: colors.primary,
    },
    dayEnd: {
      backgroundColor: colors.primary,
    },
    dayText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDarkest,
    },
    dayTextInRange: {
      color: colors.primary,
      fontWeight: '600',
    },
    dayTextStartEnd: {
      color: '#ffffff',
      fontWeight: '700',
    },
    emptyDay: {
      width: '100%',
      height: '100%',
    },
    actions: {
      flexDirection: 'row',
      gap: responsive.spacing[3],
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.neutralBg,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: responsive.spacing[3],
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    applyButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: responsive.spacing[3],
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    applyButtonText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: '#ffffff',
    },
  });

  const headerContent = (
    <View style={styles.dateSelectors}>
      <TouchableOpacity
        style={[styles.dateSelector, selectingStart && styles.dateSelectorActive]}
        onPress={() => setSelectingStart(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dateSelectorLabel}>Start Date</Text>
        <Text style={styles.dateSelectorValue}>{formatDate(startDate)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.dateSelector, !selectingStart && styles.dateSelectorActive]}
        onPress={() => setSelectingStart(false)}
        activeOpacity={0.7}
      >
        <Text style={styles.dateSelectorLabel}>End Date</Text>
        <Text style={styles.dateSelectorValue}>{formatDate(endDate)}</Text>
      </TouchableOpacity>
    </View>
  );

  const footerContent = (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={handleApply}
        activeOpacity={0.8}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Select Date Range"
      scrollable={true}
      footer={footerContent}
    >
      {headerContent}

      <View style={styles.calendarHeader}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={goToPreviousMonth}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={colors.neutralDarkest} />
        </TouchableOpacity>

        <Text style={styles.monthName}>{monthName}</Text>

        <TouchableOpacity
          style={styles.navButton}
          onPress={goToNextMonth}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={20} color={colors.neutralDarkest} />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar */}
      <View style={styles.calendar}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            {day === null ? (
              <View style={styles.emptyDay} />
            ) : (
              <TouchableOpacity
                style={[
                  styles.dayButton,
                  isDayInRange(day) && styles.dayInRange,
                  isDayStart(day) && styles.dayStart,
                  isDayEnd(day) && styles.dayEnd,
                ]}
                onPress={() => handleDayPress(day)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayText,
                    isDayInRange(day) && styles.dayTextInRange,
                    (isDayStart(day) || isDayEnd(day)) && styles.dayTextStartEnd,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </BottomSheetModal>
  );
}
