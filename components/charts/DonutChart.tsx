import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
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
  interactive?: boolean;     // Enable tap-to-show-details (default: true)
  showNavigation?: boolean;  // Show left/right navigation buttons (default: true)
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
  interactive = true,
  showNavigation = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
      startAngle,
      endAngle,
    };
  });

  // Handle dismissing tooltip (tap anywhere)
  const handleDismiss = () => {
    if (!interactive || !tooltipVisible) return;
    setSelectedIndex(null);
    setTooltipVisible(false);
  };

  // Navigate to next/previous segment
  const navigateSegment = (direction: 'next' | 'prev') => {
    if (!interactive || !showNavigation) return;

    // Provide haptic feedback when using navigation buttons
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let newIndex: number;
    if (selectedIndex === null) {
      // If nothing selected, start at first segment
      newIndex = 0;
    } else {
      // Move clockwise (next) or anti-clockwise (prev)
      if (direction === 'next') {
        newIndex = (selectedIndex + 1) % segments.length;
      } else {
        newIndex = selectedIndex - 1;
        if (newIndex < 0) newIndex = segments.length - 1;
      }
    }

    handleSegmentPress(newIndex);
  };

  // Handle segment tap
  const handleSegmentPress = (index: number, event?: any) => {
    if (!interactive) return;

    // Select segment
    setSelectedIndex(index);
    setTooltipVisible(true);

    // Calculate tooltip position based on segment angle
    const segment = segments[index];
    const midAngle = ((segment.startAngle + segment.endAngle) / 2 - 90) * (Math.PI / 180);
    const tooltipRadius = radius + strokeWidth / 2 + ms(20);
    let tooltipX = centerX + tooltipRadius * Math.cos(midAngle);
    let tooltipY = centerY + tooltipRadius * Math.sin(midAngle);

    // Tooltip dimensions (approximate)
    const tooltipWidth = ms(120);
    const tooltipHeight = ms(70);
    const padding = ms(10);

    // Adjust X position to keep tooltip inside container
    if (tooltipX - tooltipWidth / 2 < padding) {
      tooltipX = tooltipWidth / 2 + padding;
    } else if (tooltipX + tooltipWidth / 2 > size - padding) {
      tooltipX = size - tooltipWidth / 2 - padding;
    }

    // Adjust Y position to keep tooltip inside container
    if (tooltipY - tooltipHeight / 2 < padding) {
      tooltipY = tooltipHeight / 2 + padding;
    } else if (tooltipY + tooltipHeight / 2 > size - padding) {
      tooltipY = size - tooltipHeight / 2 - padding;
    }

    setTooltipPosition({ x: tooltipX, y: tooltipY });
  };

  // Get selected segment data
  const selectedSegment = selectedIndex !== null ? segments[selectedIndex] : null;

  return (
    <View style={[
      styles.container,
      legendPosition === 'right' && styles.containerHorizontal
    ]}>
      {/* SVG Donut Chart */}
      <View style={styles.chartContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            {segments.map((segment, index) => (
              <Path
                key={index}
                d={segment.path}
                fill={segment.color}
                stroke={colors.neutralWhite}
                strokeWidth="1"
                strokeLinejoin="round"
                opacity={interactive && selectedIndex !== null && selectedIndex !== index ? 0.3 : 1}
              />
            ))}
          </G>
        </Svg>

        {/* Touchable overlays for segments (Android compatibility) */}
        {interactive && segments.map((segment, index) => {
          const midAngle = ((segment.startAngle + segment.endAngle) / 2 - 90) * (Math.PI / 180);
          const touchRadius = (innerRadius + outerRadius) / 2;
          const touchX = centerX + touchRadius * Math.cos(midAngle);
          const touchY = centerY + touchRadius * Math.sin(midAngle);
          // Use responsive scaling - 40% of chart size with minimum 60, properly scaled
          const touchSize = ms(Math.max(sizeScale * 0.4, 60));

          return (
            <TouchableWithoutFeedback
              key={`touch-${index}`}
              onPress={() => handleSegmentPress(index)}
            >
              <View
                style={{
                  position: 'absolute',
                  left: touchX - touchSize / 2,
                  top: touchY - touchSize / 2,
                  width: touchSize,
                  height: touchSize,
                  // backgroundColor: 'rgba(255,0,0,0.2)', // Debug: uncomment to see touch areas
                }}
              />
            </TouchableWithoutFeedback>
          );
        })}

        {/* Tooltip - tap to dismiss */}
        {interactive && tooltipVisible && selectedSegment && (
          <TouchableWithoutFeedback onPress={handleDismiss}>
            <View
              style={[
                styles.tooltip,
                {
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                },
              ]}
            >
              <View style={[styles.tooltipDot, { backgroundColor: selectedSegment.color }]} />
              <View style={styles.tooltipContent}>
                <Text style={styles.tooltipLabel}>{selectedSegment.label}</Text>
                <Text style={styles.tooltipValue}>${selectedSegment.value.toFixed(2)}</Text>
                <Text style={styles.tooltipPercentage}>{selectedSegment.percentage.toFixed(1)}%</Text>
              </View>
              <Text style={styles.tooltipClose}>×</Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* Navigation Buttons - Left (Anti-clockwise) and Right (Clockwise) */}
        {interactive && showNavigation && (
          <>
            {/* Left Button - Previous/Anti-clockwise */}
            <TouchableWithoutFeedback onPress={() => navigateSegment('prev')}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: size * 0.2,
                  // backgroundColor: 'rgba(0,0,255,0.1)', // Debug: uncomment to see button area
                }}
              />
            </TouchableWithoutFeedback>

            {/* Right Button - Next/Clockwise */}
            <TouchableWithoutFeedback onPress={() => navigateSegment('next')}>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: size * 0.2,
                  // backgroundColor: 'rgba(255,0,0,0.1)', // Debug: uncomment to see button area
                }}
              />
            </TouchableWithoutFeedback>
          </>
        )}

        {/* Center Content */}
        <View style={styles.centerContent} pointerEvents="none">
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
          {data.map((segment, index) => {
            const isSelected = selectedIndex === index;
            const isOtherSelected = selectedIndex !== null && selectedIndex !== index;

            return (
              <TouchableOpacity
                key={index}
                style={styles.legendItem}
                onPress={() => handleSegmentPress(index)}
                disabled={!interactive}
              >
                <View style={[
                  styles.legendDot,
                  {
                    backgroundColor: segment.color,
                    width: ms(dotSize),
                    height: ms(dotSize),
                    borderRadius: ms(dotSize / 2),
                    opacity: interactive && isOtherSelected ? 0.3 : 1,
                  }
                ]} />
                <View style={styles.legendTextContainer}>
                  <Text style={[
                    styles.legendLabel,
                    {
                      opacity: interactive && isOtherSelected ? 0.3 : 1,
                      fontWeight: interactive && isSelected ? '700' : '500',
                    }
                  ]}>
                    {segment.label}
                  </Text>
                  <Text style={[
                    styles.legendValue,
                    {
                      opacity: interactive && isOtherSelected ? 0.3 : 1,
                      fontWeight: interactive && isSelected ? '800' : '700',
                    }
                  ]}>
                    ${segment.value.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
  percentageLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    marginTop: responsive.spacing[0.5],
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.md,
    padding: responsive.spacing[2],
    ...theme.shadows.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[2],
    minWidth: ms(120),
    maxWidth: ms(150),
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    zIndex: 1000,
    elevation: 5,
    paddingRight: responsive.spacing[3],
  },
  tooltipClose: {
    position: 'absolute',
    top: responsive.spacing[1],
    right: responsive.spacing[1],
    fontSize: responsive.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    opacity: 0.6,
  },
  tooltipDot: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(4),
  },
  tooltipContent: {
    flex: 1,
  },
  tooltipLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  tooltipValue: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginTop: responsive.spacing[0.5],
  },
  tooltipPercentage: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: theme.colors.text.secondary,
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
