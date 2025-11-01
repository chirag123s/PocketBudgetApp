import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTheme } from '@/constants/theme';
import { responsive } from '@/constants/responsive';
import { formatCurrencyCompact } from '@/utils/currency';
import { GaugeChart, GaugeChartSegment } from '@/components/charts';
import { useTheme } from '@/contexts/ThemeContext';
import { InlineDropdown, DropdownOption } from '@/components/ui';

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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
  };

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const handlePeriodChange = (period: string) => {
    const typedPeriod = period as 'week' | 'month' | 'year';
    setSelectedPeriod(typedPeriod);
    onPeriodSelect?.(typedPeriod);
  };

  const periodOptions: DropdownOption[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

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

  return (
    <View style={[styles.spendingCard, styles.cardShadow]}>
      <View style={styles.spendingHeader}>
        <Text style={styles.sectionTitle}>Spending</Text>
        <InlineDropdown
          options={periodOptions}
          selectedValue={selectedPeriod}
          onSelect={handlePeriodChange}
          align="right"
        />
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
                {formatCurrencyCompact(totalSpending)}
              </Text>
              <Text style={styles.circleLabel}>
                of {formatCurrencyCompact(totalBudget)}
              </Text>
            </View>
          </GaugeChart>
        );
      })()}
    </View>
  );
};
