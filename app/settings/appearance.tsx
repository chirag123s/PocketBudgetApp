import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

type ThemeType = 'system' | 'light' | 'dark';
type BudgetDisplay = 'progressBars' | 'percentage' | 'dollars';

const colors = [
  { name: 'green', hex: theme.colors.primary[600] },
  { name: 'blue', hex: '#2563EB' },
  { name: 'purple', hex: '#9333EA' },
  { name: 'orange', hex: '#EA580C' },
  { name: 'pink', hex: '#DB2777' },
  { name: 'teal', hex: '#0D9488' },
];

export default function AppearanceSettings() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('system');
  const [accentColor, setAccentColor] = useState('green');
  const [budgetDisplay, setBudgetDisplay] = useState<BudgetDisplay>('progressBars');
  const [dashboardItems, setDashboardItems] = useState({
    quickSummary: true,
    topCategories: true,
    recentTransactions: true,
    upcomingBills: true,
    spendingTrends: false,
  });

  const toggleDashboardItem = (key: keyof typeof dashboardItems) => {
    setDashboardItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Theme</Text>

          <View style={styles.optionsGroup}>
            <TouchableOpacity
              style={[
                styles.option,
                selectedTheme === 'system' && styles.optionSelected,
              ]}
              onPress={() => setSelectedTheme('system')}
            >
              <View style={styles.radioCircle}>
                {selectedTheme === 'system' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>System default</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selectedTheme === 'light' && styles.optionSelected,
              ]}
              onPress={() => setSelectedTheme('light')}
            >
              <View style={styles.radioCircle}>
                {selectedTheme === 'light' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>Light mode</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selectedTheme === 'dark' && styles.optionSelected,
              ]}
              onPress={() => setSelectedTheme('dark')}
            >
              <View style={styles.radioCircle}>
                {selectedTheme === 'dark' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>Dark mode</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Preview themes</Text>
          </TouchableOpacity>
        </View>

        {/* Colors */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Colors</Text>

          <Text style={styles.sectionLabel}>Accent color:</Text>
          <View style={styles.colorRow}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: color.hex },
                  accentColor === color.name && styles.colorSwatchSelected,
                ]}
                onPress={() => setAccentColor(color.name)}
              />
            ))}
          </View>
          <Text style={styles.colorLabel}>{accentColor} (Default)</Text>

          <Text style={[styles.sectionLabel, { marginTop: responsive.spacing[6] }]}>
            Budget display:
          </Text>
          <View style={styles.optionsGroup}>
            <TouchableOpacity
              style={[
                styles.option,
                budgetDisplay === 'progressBars' && styles.optionSelected,
              ]}
              onPress={() => setBudgetDisplay('progressBars')}
            >
              <View style={styles.radioCircle}>
                {budgetDisplay === 'progressBars' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>Progress bars</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                budgetDisplay === 'percentage' && styles.optionSelected,
              ]}
              onPress={() => setBudgetDisplay('percentage')}
            >
              <View style={styles.radioCircle}>
                {budgetDisplay === 'percentage' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>Percentage only</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                budgetDisplay === 'dollars' && styles.optionSelected,
              ]}
              onPress={() => setBudgetDisplay('dollars')}
            >
              <View style={styles.radioCircle}>
                {budgetDisplay === 'dollars' && <View style={styles.radioCircleInner} />}
              </View>
              <Text style={styles.optionText}>Dollar amounts only</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dashboard</Text>

          <Text style={styles.sectionLabel}>Show on home:</Text>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleDashboardItem('quickSummary')}
            >
              <View style={[styles.checkbox, dashboardItems.quickSummary && styles.checkboxChecked]}>
                {dashboardItems.quickSummary && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Quick summary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleDashboardItem('topCategories')}
            >
              <View style={[styles.checkbox, dashboardItems.topCategories && styles.checkboxChecked]}>
                {dashboardItems.topCategories && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Top categories</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleDashboardItem('recentTransactions')}
            >
              <View style={[styles.checkbox, dashboardItems.recentTransactions && styles.checkboxChecked]}>
                {dashboardItems.recentTransactions && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Recent transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleDashboardItem('upcomingBills')}
            >
              <View style={[styles.checkbox, dashboardItems.upcomingBills && styles.checkboxChecked]}>
                {dashboardItems.upcomingBills && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Upcoming bills</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => toggleDashboardItem('spendingTrends')}
            >
              <View style={[styles.checkbox, dashboardItems.spendingTrends && styles.checkboxChecked]}>
                {dashboardItems.spendingTrends && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxText}>Spending trends</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: responsive.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    marginBottom: responsive.spacing[4],
  },
  optionsGroup: {
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[4],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
  },
  optionSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[600],
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing[2],
  },
  radioCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary[600],
  },
  optionText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    alignItems: 'center',
  },
  actionButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  sectionLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[2],
  },
  colorRow: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[2],
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.xl,
  },
  colorSwatchSelected: {
    borderWidth: 4,
    borderColor: theme.colors.border.main,
  },
  colorLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
    textTransform: 'capitalize',
  },
  checkboxGroup: {
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[4],
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    borderRadius: 4,
    marginRight: responsive.spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary[600],
    borderColor: theme.colors.primary[600],
  },
  checkboxText: {
    ...theme.typography.styles.body,
  },
});
