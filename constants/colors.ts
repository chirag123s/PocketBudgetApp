/**
 * PocketBudget Color System
 * Based on the 50 JSX screens design
 */

export const colors = {
  // Primary - Green (Money, positive, success)
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',  // Main primary
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Success - Green
  success: {
    light: '#D1FAE5',
    main: '#10B981',
    dark: '#047857',
  },

  // Warning - Yellow (80-100% budget)
  warning: {
    light: '#FEF3C7',
    main: '#F59E0B',
    dark: '#D97706',
  },

  // Danger - Red (Over budget)
  danger: {
    light: '#FEE2E2',
    main: '#EF4444',
    dark: '#DC2626',
  },

  // Info - Blue
  info: {
    light: '#DBEAFE',
    main: '#3B82F6',
    dark: '#1D4ED8',
  },

  // Accent - Purple (Premium features)
  accent: {
    light: '#F3E8FF',
    main: '#A855F7',
    dark: '#7C3AED',
  },

  // Neutral - Gray scale
  neutral: {
    50: '#F9FAFB',   // Lightest background
    100: '#F3F4F6',  // Card backgrounds
    200: '#E5E7EB',  // Borders
    300: '#D1D5DB',  // Disabled
    400: '#9CA3AF',  // Placeholder text
    500: '#6B7280',  // Secondary text
    600: '#4B5563',  // Body text
    700: '#374151',  // Headings
    800: '#1F2937',  // Dark headings
    900: '#111827',  // Darkest text
  },

  // Semantic colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#E5E7EB',
    main: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // Transaction-specific
  transaction: {
    expense: '#EF4444',    // Red
    income: '#10B981',     // Green
    transfer: '#3B82F6',   // Blue
    pending: '#9CA3AF',    // Gray
  },

  // Category colors (for icons/badges)
  categories: {
    housing: '#EF4444',
    groceries: '#10B981',
    transport: '#3B82F6',
    dining: '#F59E0B',
    entertainment: '#8B5CF6',
    healthcare: '#EC4899',
    education: '#06B6D4',
    bills: '#F97316',
    shopping: '#A855F7',
    personal: '#14B8A6',
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    main: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
    primary: 'rgba(16, 185, 129, 0.3)', // Green shadow for primary buttons
  },
};

// Dark mode colors (for future implementation)
export const darkColors = {
  // ... dark mode variants
};
