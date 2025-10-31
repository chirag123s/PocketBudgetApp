import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Polyline } from 'react-native-svg';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';

export interface LineChartDataPoint {
  label: string;
  value: number;
  compareValue?: number;
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  heightScale?: number; // Multiplier for responsive height (default: 100)
  widthScale?: number;  // Multiplier for responsive width (default: 280)
  showGrid?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  primaryColor?: string;
  compareColor?: string;
  primaryLabel?: string;
  compareLabel?: string;
  showCompare?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  heightScale = 100,
  widthScale = 280,
  showGrid = true,
  showLabels = true,
  showLegend = false,
  primaryColor,
  compareColor,
  primaryLabel = 'Actual Spending',
  compareLabel = 'Budget Limit',
  showCompare = true,
}) => {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  // Color Palette
  const colors = {
    primary: theme.colors.info.main,
    neutralWhite: theme.colors.background.primary,
    neutralMedium: theme.colors.text.tertiary,
    neutralBg: theme.colors.background.secondary,
  };

  // Use responsive scaling
  const height = ms(heightScale);
  const width = ms(widthScale);

  // Set default colors using the dynamic theme
  const actualPrimaryColor = primaryColor ?? colors.primary;
  const actualCompareColor = compareColor ?? colors.neutralMedium;

  // Calculate chart dimensions
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.value, d.compareValue || 0))
  ) * 1.1; // Add 10% padding

  const pointSpacing = width / (data.length - 1);

  // Calculate points for primary line
  const primaryPoints = data.map((d, i) => {
    const x = i * pointSpacing;
    const y = height - (d.value / maxValue) * height;
    return { x, y, value: d.value };
  });

  // Calculate points for compare line (if exists)
  const comparePoints = showCompare && data[0].compareValue !== undefined
    ? data.map((d, i) => {
        const x = i * pointSpacing;
        const y = height - ((d.compareValue || 0) / maxValue) * height;
        return { x, y, value: d.compareValue || 0 };
      })
    : [];

  // Create path strings
  const primaryPath = primaryPoints.map(p => `${p.x},${p.y}`).join(' ');
  const comparePath = comparePoints.length > 0
    ? comparePoints.map(p => `${p.x},${p.y}`).join(' ')
    : '';

  const styles = StyleSheet.create({
    container: {
      gap: responsive.spacing[2],
    },
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      backgroundColor: colors.neutralBg,
    },
    labels: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: responsive.spacing[2],
    },
    labelText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '700',
      color: theme.colors.text.secondary,
    },
    legend: {
      flexDirection: 'row',
      gap: responsive.spacing[4],
      marginTop: responsive.spacing[4],
      justifyContent: 'center',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    legendDot: {
      width: ms(12),
      height: ms(12),
      borderRadius: ms(6),
    },
    legendText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '400',
      color: theme.colors.text.secondary,
    },
  });

  return (
    <View style={styles.container}>
      {/* SVG Chart */}
      <View style={[styles.chartContainer, { backgroundColor: colors.neutralBg }]}>
        <Svg width={width} height={height}>
          {/* Grid lines */}
          {showGrid && [0, 0.25, 0.5, 0.75, 1].map((fraction, i) => {
            const y = height - (height * fraction);
            return (
              <Line
                key={`grid-${i}`}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke={`${colors.neutralMedium}30`}
                strokeWidth={ms(1)}
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Compare line (dashed) */}
          {showCompare && comparePoints.length > 0 && (
            <>
              <Polyline
                points={comparePath}
                fill="none"
                stroke={actualCompareColor}
                strokeWidth={ms(2)}
                strokeDasharray="6,4"
              />
              {comparePoints.map((point, i) => (
                <Circle
                  key={`compare-${i}`}
                  cx={point.x}
                  cy={point.y}
                  r={ms(3)}
                  fill={actualCompareColor}
                  stroke={colors.neutralWhite}
                  strokeWidth={ms(2)}
                />
              ))}
            </>
          )}

          {/* Primary line */}
          <Polyline
            points={primaryPath}
            fill="none"
            stroke={actualPrimaryColor}
            strokeWidth={ms(3)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Primary data points */}
          {primaryPoints.map((point, i) => (
            <Circle
              key={`primary-${i}`}
              cx={point.x}
              cy={point.y}
              r={ms(4)}
              fill={actualPrimaryColor}
              stroke={colors.neutralWhite}
              strokeWidth={ms(2)}
            />
          ))}
        </Svg>
      </View>

      {/* Labels */}
      {showLabels && (
        <View style={styles.labels}>
          {data.map((d, i) => (
            <Text key={i} style={styles.labelText}>{d.label}</Text>
          ))}
        </View>
      )}

      {/* Legend */}
      {showLegend && (
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: actualPrimaryColor }]} />
            <Text style={styles.legendText}>{primaryLabel}</Text>
          </View>
          {showCompare && (
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: actualCompareColor }]} />
              <Text style={styles.legendText}>{compareLabel}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
