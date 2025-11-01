import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { DonutChart, DonutChartSegment } from '@/components/charts';
import { ChartTypeModal } from '@/components/ui';

interface IncomeSource {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  amount: number;
  percentage: number;
  lastDate: string;
}

type ChartType = 'donut' | 'bar';

export default function IncomeScreen() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [chartType, setChartType] = useState<ChartType>('donut');
  const [showChartModal, setShowChartModal] = useState(false);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    functionalSuccess: theme.colors.success.main,
  };

  const currentIncome = 5120.00;

  const incomeSources: IncomeSource[] = [
    { id: '1', name: 'Salary - Acme Corp', icon: 'briefcase-outline', amount: 4500.00, percentage: 87.9, lastDate: '15 July' },
    { id: '2', name: 'Side Hustle', icon: 'laptop-outline', amount: 520.00, percentage: 10.2, lastDate: '12 July' },
    { id: '3', name: 'Interest Earned', icon: 'wallet-outline', amount: 100.00, percentage: 1.9, lastDate: '01 July' },
  ];

  const incomeColors = [colors.primary, colors.functionalSuccess, theme.colors.secondary.main];

  const handleChartLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowChartModal(true);
  };

  const chartTypeOptions = [
    {
      value: 'donut',
      label: 'Donut Chart',
      icon: 'pie-chart-outline' as keyof typeof Ionicons.glyphMap,
    },
    {
      value: 'bar',
      label: 'Bar Chart',
      icon: 'stats-chart-outline' as keyof typeof Ionicons.glyphMap,
    },
  ];

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: colors.neutralBg,
    },
    content: {
      paddingHorizontal: responsive.spacing[4],
    },
    totalCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[6],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    totalLabel: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDark,
      marginBottom: responsive.spacing[2],
    },
    totalAmount: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    changeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
    },
    changeText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.functionalSuccess,
    },
    chartCard: {
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[1],
    },
    sectionTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    chartPeriod: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    chartLabel: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralDark,
    },
    chartValue: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    sourcesTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    sourcesList: {
      gap: responsive.spacing[3],
    },
    sourceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      gap: responsive.spacing[4],
      ...theme.shadows.sm,
    },
    sourceIcon: {
      width: ms(48),
      height: ms(48),
      borderRadius: ms(24),
      backgroundColor: `${colors.primary}1A`,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sourceInfo: {
      flex: 1,
      gap: responsive.spacing[1],
    },
    sourceName: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    sourceDate: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
    },
    sourceAmount: {
      alignItems: 'flex-end',
      gap: responsive.spacing[1],
    },
    sourceValue: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.functionalSuccess,
    },
    sourcePercentage: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
    },
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Total Income Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Income This Month</Text>
          <Text style={styles.totalAmount}>${currentIncome.toFixed(2)}</Text>
          <View style={styles.changeRow}>
            <Ionicons name="arrow-up" size={16} color={colors.functionalSuccess} />
            <Text style={styles.changeText}>+5% vs Last Month</Text>
          </View>
        </View>

        {/* Income Sources Chart */}
        <Pressable style={styles.chartCard} onLongPress={handleChartLongPress}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Income by Source</Text>
            <Text style={styles.chartPeriod}>This Month</Text>
          </View>
          <Text style={{ fontSize: responsive.fontSize.xs, color: colors.neutralMedium, marginBottom: responsive.spacing[2] }}>
            Long press to change chart type
          </Text>

          {/* Donut Chart */}
          {chartType === 'donut' && (() => {
            const chartSize = responsive.layout.chartSizeLarge;
            return (
              <DonutChart
                data={incomeSources.map((source, index): DonutChartSegment => ({
                  label: source.name,
                  value: source.amount,
                  color: incomeColors[index],
                }))}
                sizeScale={chartSize}
                strokeWidthScale={chartSize * 0.083}
                showLegend={false}
                legendPosition="bottom"
                legendDotSize={chartSize * 0.0625}
              >
                <Text style={styles.chartLabel}>Total Income</Text>
                <Text style={styles.chartValue}>${currentIncome.toFixed(2)}</Text>
              </DonutChart>
            );
          })()}

          {/* Bar Chart */}
          {chartType === 'bar' && (
            <View style={{ gap: responsive.spacing[3], marginTop: responsive.spacing[2] }}>
              {incomeSources.map((source, index) => {
                const maxValue = Math.max(...incomeSources.map(s => s.amount));
                const barPercentage = (source.amount / maxValue) * 100;

                return (
                  <View key={source.id} style={{ gap: responsive.spacing[1] }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: responsive.fontSize.sm, color: colors.neutralDark }}>{source.name}</Text>
                      <Text style={{ fontSize: responsive.fontSize.sm, fontWeight: '600', color: colors.functionalSuccess }}>${source.amount.toFixed(0)}</Text>
                    </View>
                    <View style={{ height: ms(10), backgroundColor: colors.neutralBg, borderRadius: ms(5), overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${barPercentage}%`, backgroundColor: incomeColors[index], borderRadius: ms(5) }} />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </Pressable>

        {/* Income Sources */}
        <Text style={styles.sourcesTitle}>Income Sources</Text>
        <View style={styles.sourcesList}>
          {incomeSources.map((source) => (
            <TouchableOpacity key={source.id} style={styles.sourceCard} activeOpacity={0.7}>
              <View style={styles.sourceIcon}>
                <Ionicons name={source.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceName}>{source.name}</Text>
                <Text style={styles.sourceDate}>Last on: {source.lastDate}</Text>
              </View>
              <View style={styles.sourceAmount}>
                <Text style={styles.sourceValue}>${source.amount.toFixed(2)}</Text>
                <Text style={styles.sourcePercentage}>{source.percentage}% of total</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: responsive.spacing[4] }} />
      </View>

      {/* Chart Type Modal */}
      <ChartTypeModal
        visible={showChartModal}
        onClose={() => setShowChartModal(false)}
        currentType={chartType}
        options={chartTypeOptions}
        onSelectType={(type) => setChartType(type as ChartType)}
      />
    </ScrollView>
  );
}
