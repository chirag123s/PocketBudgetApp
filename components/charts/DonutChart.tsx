import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

// Color Palette
const colors = {
  neutralWhite: theme.colors.background.primary,
  neutralBg: theme.colors.background.secondary,
};

export interface DonutChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutChartSegment[];
  sizeScale?: number;        // Multiplier for responsive size (default: 160)
  strokeWidthScale?: number; // Multiplier for stroke width (default: 5% of sizeScale)
  showLegend?: boolean;
  gapSize?: number;          // Gap between segments in degrees (default: 2)
  children?: React.ReactNode; // Custom center content
  legendPosition?: 'bottom' | 'right'; // Legend position (default: 'bottom')
  legendDotSize?: number;    // Legend dot size (default: 7.5% of sizeScale)
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  sizeScale = 160,
  strokeWidthScale,
  showLegend = true,
  gapSize = 2,
  children,
  legendPosition = 'bottom',
  legendDotSize,
}) => {
  // Use responsive scaling
  const size = ms(sizeScale);
  // Default stroke width is 5% of size if not provided
  const strokeWidth = ms(strokeWidthScale ?? sizeScale * 0.05);
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

  // Helper function to create arc path for donut segment
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

  // Calculate segments with gaps
  let currentAngle = 0;
  const segments = data.map((segment) => {
    const percentage = (segment.value / totalValue) * 100;
    const segmentAngle = (percentage / 100) * 360 - gapSize;

    const startAngle = currentAngle;
    const endAngle = currentAngle + segmentAngle;

    currentAngle = endAngle + gapSize; // Add gap after segment

    return {
      ...segment,
      percentage,
      path: createArcPath(startAngle, endAngle, innerRadius, outerRadius),
    };
  });

  return (
    <View style={[
      styles.container,
      legendPosition === 'right' && styles.containerHorizontal
    ]}>
      {/* SVG Donut Chart */}
      <View style={styles.chartContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((segment, index) => (
            <Path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke={colors.neutralWhite}
              strokeWidth="1"
              strokeLinejoin="round"
              opacity="1"
            />
          ))}
        </Svg>

        {/* Center Content */}
        <View style={styles.centerContent}>
          {children ? (
            children
          ) : (
            <>
              <Text style={styles.totalAmount}>${totalValue.toFixed(0)}</Text>
              <Text style={styles.totalLabel}>Total</Text>
            </>
          )}
        </View>
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
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAmount: {
    fontSize: responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  totalLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    marginTop: responsive.spacing[1],
  },
  legend: {
    gap: responsive.spacing[3],
  },
  legendRight: {
    flex: 1,
    gap: responsive.spacing[2],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  legendDot: {
    // Size set dynamically via props
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 0, // Allows flex to shrink properly
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
