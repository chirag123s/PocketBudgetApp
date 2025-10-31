import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { GaugeChart, GaugeChartSegment } from '@/components/charts';

const colors = {
  primary: theme.colors.info.main,
  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
};

export interface SpendingSummaryWidgetProps {
  gaugeChartData: GaugeChartSegment[];
  totalSpending: number;
  totalBudget: number;
  onPeriodSelect?: (period: 'week' | 'month' | 'year') => void;
}

export const SpendingSummaryWidget: React.FC<SpendingSummaryWidgetProps> = ({
  gaugeChartData,
  totalSpending,
  totalBudget,
  onPeriodSelect,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };

  return (
    <View style={[styles.spendingCard, styles.cardShadow]}>
      <View style={styles.spendingHeader}>
        <Text style={styles.sectionTitle}>Spending</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => onPeriodSelect?.(selectedPeriod)}
        >
          <Text style={styles.dropdownText}>{getPeriodLabel()}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {(() => {
        const chartSize = responsive.layout.chartSizeCompact;
        return (
          <GaugeChart
            data={gaugeChartData}
            sizeScale={chartSize}
            strokeWidthScale={chartSize * 0.1}
            showLegend={true}
            legendPosition="right"
            legendDotSize={chartSize * 0.083}
            showNavigation={false}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.circleAmount}>
                ${(totalSpending / 1000).toFixed(1)}k
              </Text>
              <Text style={styles.circleLabel}>
                of ${(totalBudget / 1000).toFixed(1)}k
              </Text>
            </View>
          </GaugeChart>
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  spendingCard: {
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[5],
  },
  cardShadow: {
    ...theme.shadows.sm,
  },
  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing[4],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1],
  },
  dropdownText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.primary,
  },
  circleAmount: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  circleLabel: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    color: colors.neutralDark,
    marginTop: responsive.spacing[1],
  },
});
