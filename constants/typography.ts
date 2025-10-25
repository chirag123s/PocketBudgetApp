/**
 * Typography System
 * Matches the screen designs
 */

export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Text styles (pre-defined combinations)
  styles: {
    // Headings
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.2,
      color: '#111827',
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
      color: '#111827',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
      color: '#1F2937',
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.4,
      color: '#1F2937',
    },

    // Body text
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      color: '#374151',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      color: '#4B5563',
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      color: '#6B7280',
    },

    // UI text
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      color: '#9CA3AF',
    },
    label: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 1.5,
      color: '#374151',
    },

    // Special text
    currency: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    currencyLarge: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
  },
};
