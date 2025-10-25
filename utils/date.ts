import { format, parseISO, isToday, isYesterday, isSameWeek } from 'date-fns';

/**
 * Date Utilities
 * Formatting and calculations
 */

export const formatDate = (date: Date | string, formatStr: string = 'MMM d, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatTransactionDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(dateObj)) return 'Today';
  if (isYesterday(dateObj)) return 'Yesterday';
  if (isSameWeek(dateObj, new Date())) return format(dateObj, 'EEEE'); // Day name
  return format(dateObj, 'MMM d'); // "Oct 25"
};

export const formatBudgetPeriod = (startDate: Date, endDate: Date): string => {
  return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
};

// Calculate days remaining in period
export const getDaysRemaining = (endDate: Date): number => {
  const today = new Date();
  const diff = endDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
