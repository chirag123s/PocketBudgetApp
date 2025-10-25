import Currency from 'currency.js';

/**
 * Currency Utilities
 * Handle Australian dollar formatting and calculations
 */

export const AUD = (value: number | string) =>
  Currency(value, { symbol: '$', precision: 2 });

export const formatCurrency = (
  amount: number,
  options?: {
    showSymbol?: boolean;
    showDecimals?: boolean;
  }
): string => {
  const { showSymbol = true, showDecimals = true } = options || {};

  const formatted = AUD(amount).format({
    symbol: showSymbol ? '$' : '',
    precision: showDecimals ? 2 : 0,
  });

  return formatted;
};

export const formatCurrencyCompact = (amount: number): string => {
  const abs = Math.abs(amount);

  if (abs >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (abs >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
};

// Calculate percentage
export const calculatePercentage = (
  spent: number,
  budget: number
): number => {
  if (budget === 0) return 0;
  return Math.round((spent / budget) * 100);
};

// Determine budget status color
export const getBudgetStatusColor = (
  percentage: number
): 'success' | 'warning' | 'danger' => {
  if (percentage < 80) return 'success';
  if (percentage < 100) return 'warning';
  return 'danger';
};
