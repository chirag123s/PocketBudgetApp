import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';

export interface CircularProgressProps {
  percentage: number;
  sizeScale?: number;        // Multiplier for responsive size (default: 120)
  strokeWidthScale?: number; // Multiplier for stroke width (default: 10% of sizeScale)
  color?: string;            // Custom color, or auto-color based on percentage
  showPercentage?: boolean;  // Show percentage in center
  children?: React.ReactNode; // Custom center content
  autoColor?: boolean;       // Auto-color based on percentage thresholds
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  sizeScale = 120,
  strokeWidthScale,
  color,
  showPercentage = true,
  children,
  autoColor = true,
}) => {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  // Color Palette
  const colors = {
    neutralBg: theme.colors.background.secondary,
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,
  };

  // Use responsive scaling
  const size = ms(sizeScale);
  // Default stroke width is 10% of size if not provided
  const strokeWidth = ms(strokeWidthScale ?? sizeScale * 0.1);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate stroke offset
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color
  let progressColor = color;
  if (!progressColor && autoColor) {
    if (percentage >= 100) {
      progressColor = colors.functionalError;
    } else if (percentage >= 80) {
      progressColor = colors.functionalWarning;
    } else {
      progressColor = colors.functionalSuccess;
    }
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    centerContent: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    percentageText: {
      fontSize: responsive.fontSize.h2,
      fontWeight: '700',
      color: theme.colors.text.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.neutralBg}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center Content */}
      <View style={styles.centerContent}>
        {children ? (
          children
        ) : showPercentage ? (
          <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
        ) : null}
      </View>
    </View>
  );
};
