import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

// Color Palette
const colors = {
  neutralWhite: theme.colors.background.primary,
  neutralBg: theme.colors.background.secondary,
  neutralLight: '#EDEEF0',
};

export interface GaugeChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface GaugeChartProps {
  data: GaugeChartSegment[];
  sizeScale?: number;        // Multiplier for responsive size (default: 160)
  strokeWidthScale?: number; // Multiplier for stroke width (default: 7.5% of sizeScale)
  showLegend?: boolean;
  children?: React.ReactNode; // Custom center content
  legendPosition?: 'bottom' | 'right';
  legendDotSize?: number;    // Legend dot size (default: 7.5% of sizeScale)
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  data,
  sizeScale = 160,
  strokeWidthScale,
  showLegend = true,
  children,
  legendPosition = 'bottom',
  legendDotSize,
}) => {
  // Use responsive scaling
  const size = ms(sizeScale);
  // Default stroke width is 7.5% of size if not provided
  const strokeWidth = ms(strokeWidthScale ?? sizeScale * 0.075);
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  // Default legend dot size is 7.5% of sizeScale if not provided
  const dotSize = legendDotSize ?? sizeScale * 0.075;

  // Calculate total value
  const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);

  // Helper function to convert polar coordinates to cartesian
  const polarToCartesian = (angle: number, r: number) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  // Helper function to create arc path
  const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start1 = polarToCartesian(startAngle, outerRadius);
    const end1 = polarToCartesian(endAngle, outerRadius);
    const start2 = polarToCartesian(endAngle, innerRadius);
    const end2 = polarToCartesian(startAngle, innerRadius);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const pathData = [
      `M ${start1.x} ${start1.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end1.x} ${end1.y}`,
      `L ${start2.x} ${start2.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${end2.x} ${end2.y}`,
      'Z',
    ].join(' ');

    return pathData;
  };

  const innerRadius = radius - strokeWidth / 2;
  const outerRadius = radius + strokeWidth / 2;

  // Background arc (full circle)
  const backgroundPath = createArcPath(0, 360, innerRadius, outerRadius);

  // Calculate segments with small gaps
  let currentAngle = 0;
  const gapSize = 2; // Gap in degrees between segments
  const segments = data.map((segment, index) => {
    const percentage = (segment.value / totalValue) * 100;
    const segmentAngle = (percentage / 100) * 360 - gapSize; // 360 degrees for full circle, minus gap

    const startAngle = currentAngle;
    const endAngle = currentAngle + segmentAngle;

    currentAngle = endAngle + gapSize; // Add gap after segment

    return {
      ...segment,
      path: createArcPath(startAngle, endAngle, innerRadius, outerRadius),
      percentage,
    };
  });

  return (
    <View style={[
      styles.container,
      legendPosition === 'right' && styles.containerHorizontal
    ]}>
      {/* SVG Gauge Chart */}
      <View style={styles.chartContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background arc */}
          <Path
            d={backgroundPath}
            fill={colors.neutralLight}
          />

          {/* Segment arcs */}
          {segments.map((segment, index) => (
            <Path
              key={index}
              d={segment.path}
              fill={segment.color}
            />
          ))}
        </Svg>

        {/* Center Content */}
        {children && (
          <View style={styles.centerContent}>
            {children}
          </View>
        )}
      </View>

      {/* Legend */}
      {showLegend && (
        <View style={[
          styles.legend,
          legendPosition === 'right' && styles.legendRight
        ]}>
          {data.map((segment, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[
                styles.legendDot,
                {
                  backgroundColor: segment.color,
                  width: ms(dotSize),
                  height: ms(dotSize),
                  borderRadius: ms(dotSize / 2),
                }
              ]} />
              <View style={styles.legendTextContainer}>
                <Text style={styles.legendLabel}>{segment.label}</Text>
                <Text style={styles.legendValue}>${segment.value.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: responsive.spacing[4],
  },
  containerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[4],
    flex: 1,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0, // Prevent chart from shrinking
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    gap: responsive.spacing[3],
  },
  legendRight: {
    flex: 1,
    gap: responsive.spacing[2],
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    width: '100%',
  },
  legendDot: {
    // Size set dynamically via props
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 0,
  },
  legendLabel: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.text.primary,
    flexShrink: 1,
  },
  legendValue: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginLeft: responsive.spacing[2],
  },
});
