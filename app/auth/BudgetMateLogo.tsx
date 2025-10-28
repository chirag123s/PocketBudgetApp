import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { theme } from '@/constants/theme';

interface BudgetMateLogoProps {
  iconOnly?: boolean;
  style?: ViewStyle;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function BudgetMateLogo({
  iconOnly = false,
  style,
  size = 96,
  color = theme.colors.info.main, // Royal blue
  backgroundColor = 'white'
}: BudgetMateLogoProps) {
  const scale = size / 80; // Original SVG viewBox is 80x80 for the icon

  if (iconOnly) {
    return (
      <View style={[styles.iconContainer, style, { width: size, height: size }]}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          style={{ backgroundColor: 'transparent' }}
        >
          <G>
            {/* Outer circle */}
            <Circle
              cx="40"
              cy="40"
              r="36"
              fill={color}
              stroke={color}
              strokeWidth="3"
            />

            {/* Inner 'B' shape */}
            <Path
              d="M28 24 L28 56 M28 24 L41 24 C46 24 49 27 49 31 C49 34 47 36 44 37.5 C49 39 51 42 51 47 C51 52 47 56 41 56 L28 56"
              stroke={backgroundColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Small upward arrow */}
            <Path
              d="M57 30 L57 20 M57 20 L47 20 M57 20 L49 28"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </G>
        </Svg>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { width: size, height: size }]}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          style={{ backgroundColor: 'transparent' }}
        >
          <G>
            {/* Outer circle */}
            <Circle
              cx="40"
              cy="40"
              r="36"
              fill={color}
              stroke={color}
              strokeWidth="3"
            />

            {/* Inner 'B' shape */}
            <Path
              d="M28 24 L28 56 M28 24 L41 24 C46 24 49 27 49 31 C49 34 47 36 44 37.5 C49 39 51 42 51 47 C51 52 47 56 41 56 L28 56"
              stroke={backgroundColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Small upward arrow */}
            <Path
              d="M57 30 L57 20 M57 20 L47 20 M57 20 L49 28"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </G>
        </Svg>
      </View>
      <Text style={styles.brandName}>budgetmate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginTop: 8,
    letterSpacing: -0.5,
  },
});
