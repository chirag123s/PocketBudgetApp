/**
 * BudgetMate Color System
 * Professional color palette for financial management app
 */

export const colors = {
  // Primary - Professional Blue (Brand color)
  primary: {
    50: '#EFF6FF',    // Lightest blue
    100: '#DBEAFE',   // Very light blue
    200: '#BFDBFE',   // Light blue
    300: '#93C5FD',   // Soft blue
    400: '#60A5FA',   // Sky Blue - Main light
    500: '#3B82F6',   // Modern Blue - Main brand color
    600: '#2563EB',   // Medium blue
    700: '#1E40AF',   // Professional Blue - Main dark
    800: '#1E3A8A',   // Dark blue
    900: '#1E3A8A',   // Darkest blue
  },

  // Success - Prosperity Green
  success: {
    light: '#D1FAE5',
    main: '#10B981',
    dark: '#059669',
  },

  // Warning - Soft Gold
  warning: {
    light: '#FEF3C7',
    main: '#F59E0B',
    dark: '#D97706',
  },

  // Danger - Error Red
  danger: {
    light: '#FEE2E2',
    main: '#EF4444',
    dark: '#DC2626',
  },

  // Info - Modern Blue (same as primary for consistency)
  info: {
    light: '#60A5FA',   // Sky Blue
    main: '#3B82F6',    // Modern Blue
    dark: '#1E40AF',    // Professional Blue
  },

  // Accent - Warm Coral (for highlights/special actions)
  accent: {
    light: '#FED7D7',
    main: '#FF6B6B',    // Warm Coral
    dark: '#F56565',
  },

  // Secondary - Soft Gold
  secondary: {
    light: '#FEF3C7',
    main: '#FCD34D',    // Soft Gold
    dark: '#F59E0B',
  },

  // Neutral - Gray scale (Neutral Foundation)
  neutral: {
    50: '#F9FAFB',    // Background Primary
    100: '#F3F4F6',   // Light backgrounds
    200: '#E5E7EB',   // Borders
    300: '#D1D5DB',   // Light borders
    400: '#9CA3AF',   // Disabled/Borders
    500: '#6B7280',   // Muted text
    600: '#4B5563',   // Text Secondary
    700: '#374151',   // Medium text
    800: '#1F2937',   // Text Primary
    900: '#111827',   // Darkest text
  },

  // Semantic colors
  background: {
    primary: '#FFFFFF',   // Surface
    secondary: '#F9FAFB', // Background Primary
    tertiary: '#F3F4F6',  // Light gray background
  },

  text: {
    primary: '#1F2937',   // Text Primary (Gray 800)
    secondary: '#4B5563', // Text Secondary (Gray 600)
    tertiary: '#9CA3AF',  // Disabled/Borders (Gray 400)
    inverse: '#FFFFFF',   // White text on dark backgrounds
  },

  border: {
    light: '#E5E7EB',     // Light borders
    main: '#D1D5DB',      // Standard borders
    dark: '#9CA3AF',      // Disabled/Borders
  },

  // Transaction-specific colors
  transaction: {
    expense: '#EF4444',   // Error Red
    income: '#10B981',    // Prosperity Green
    transfer: '#3B82F6',  // Modern Blue
    pending: '#9CA3AF',   // Gray 400
  },

  // Category colors (for icons/badges)
  categories: {
    housing: '#EF4444',     // Red
    groceries: '#10B981',   // Green
    transport: '#3B82F6',   // Blue
    dining: '#F59E0B',      // Amber
    entertainment: '#8B5CF6', // Purple
    healthcare: '#EC4899',  // Pink
    education: '#06B6D4',   // Cyan
    bills: '#F97316',       // Orange
    shopping: '#FF6B6B',    // Warm Coral
    personal: '#14B8A6',    // Teal
  },

  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    main: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
    primary: 'rgba(59, 130, 246, 0.3)', // Blue shadow for primary buttons
  },
};

// Dark mode colors
export const darkColors = {
  // Primary - Blue Adaptation for dark mode
  primary: {
    50: '#1E3A8A',    // Blue Adaptation
    100: '#1E40AF',   // Professional Blue
    200: '#2563EB',
    300: '#3B82F6',   // Modern Blue
    400: '#60A5FA',   // Sky Blue
    500: '#3B82F6',   // Main brand color
    600: '#2563EB',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#1E3A8A',
  },

  // Dark mode backgrounds
  background: {
    primary: '#121212',   // Base
    secondary: '#1E1E1E', // Surface 1
    tertiary: '#2C2C2C',  // Surface 2
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
    inverse: '#1F2937',
  },

  border: {
    light: '#2C2C2C',
    main: '#374151',
    dark: '#4B5563',
  },

  // Keep functional colors the same for consistency
  success: {
    light: '#10B981',
    main: '#10B981',
    dark: '#059669',
  },

  warning: {
    light: '#F59E0B',
    main: '#F59E0B',
    dark: '#D97706',
  },

  danger: {
    light: '#EF4444',
    main: '#EF4444',
    dark: '#DC2626',
  },
};
