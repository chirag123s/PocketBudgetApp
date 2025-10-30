import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const myTemplates = [
  { name: 'Regular Month', lastUsed: 'Nov 2025', categories: 8 },
  { name: 'Holiday Season', note: '+30% dining & gifts', categories: 10 },
];

const suggestedTemplates = [
  { name: 'Single Professional', budget: 3200, savings: 15 },
  { name: 'Family of 4', budget: 6500, savings: 10 },
  { name: 'Student Budget', budget: 1800, savings: 5 },
  { name: 'Retirement Income', budget: 4000, savings: 20 },
];

export default function BudgetTemplates() {
  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      <ScreenHeader title="Budget Templates" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Premium Badge */}
        <LinearGradient
          colors={[theme.colors.warning.light, '#FEF3C7']}
          style={styles.premiumCard}
        >
          <View style={styles.premiumHeader}>
            <Text style={styles.premiumIcon}>⭐</Text>
            <Text style={styles.premiumTitle}>Premium Feature</Text>
          </View>
          <Text style={styles.premiumText}>
            Save and reuse budget templates for different situations
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* My Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MY TEMPLATES</Text>
          <View style={styles.templatesContainer}>
            {myTemplates.map((template, idx) => (
              <View key={idx} style={styles.templateCard}>
                <View style={styles.templateHeader}>
                  <View style={styles.templateLeft}>
                    <Text style={styles.templateIcon}>📋</Text>
                    <Text style={styles.templateName}>{template.name}</Text>
                  </View>
                </View>

                {template.note && (
                  <Text style={styles.templateNote}>{template.note}</Text>
                )}

                <View style={styles.templateFooter}>
                  <Text style={styles.templateMeta}>
                    Last used: {template.lastUsed} • {template.categories} categories
                  </Text>
                  <View style={styles.templateActions}>
                    <TouchableOpacity style={styles.useButton}>
                      <Text style={styles.useButtonText}>Use</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Create Template</Text>
          </TouchableOpacity>
        </View>

        {/* Suggested Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUGGESTED TEMPLATES</Text>
          <View style={styles.templatesContainer}>
            {suggestedTemplates.map((template, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestedCard}
              >
                <View style={styles.suggestedHeader}>
                  <View style={styles.templateLeft}>
                    <Text style={styles.templateIcon}>📋</Text>
                    <Text style={styles.templateName}>{template.name}</Text>
                  </View>
                  <Text style={styles.useArrow}>Use →</Text>
                </View>

                <View style={styles.suggestedStats}>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Budget</Text>
                    <Text style={styles.statValue}>
                      ${template.budget.toLocaleString('en-AU')}
                    </Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Savings Rate</Text>
                    <Text style={styles.statValue}>{template.savings}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoContent}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>About Templates</Text>
              <Text style={styles.infoDescription}>
                Templates save your budget categories and amounts. Use them to quickly switch between different budgeting scenarios like regular months, holidays, or vacation periods.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  premiumCard: {
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[6],
    borderWidth: 1,
    borderColor: theme.colors.warning.main,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
  },
  premiumIcon: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  premiumTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.warning.dark,
  },
  premiumText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.warning.dark,
    marginBottom: responsive.spacing[2],
  },
  upgradeButton: {
    backgroundColor: theme.colors.warning.main,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: responsive.spacing[2],
    alignItems: 'center',
  },
  upgradeButtonText: {
    ...theme.typography.styles.button,
    color: '#FFFFFF',
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  section: {
    marginBottom: responsive.spacing[6],
  },
  sectionTitle: {
    ...theme.typography.styles.label,
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: responsive.spacing[2],
  },
  templatesContainer: {
    gap: responsive.spacing[2],
  },
  templateCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing[2],
  },
  templateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  templateIcon: {
    fontSize: responsive.fontSize.xl,
    lineHeight: responsive.fontSize.xl * 1.5,
    marginRight: responsive.spacing[2],
  },
  templateName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  templateNote: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[2],
  },
  templateFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  templateMeta: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
  templateActions: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
  },
  useButton: {
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 4,
  },
  useButtonText: {
    ...theme.typography.styles.caption,
    color: theme.colors.primary[700],
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 4,
  },
  editButtonText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    fontWeight: '500',
  },
  createButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    alignItems: 'center',
    marginTop: responsive.spacing[2],
  },
  createButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  suggestedCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  suggestedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing[2],
  },
  useArrow: {
    ...theme.typography.styles.body,
    color: theme.colors.primary[600],
    fontWeight: '500',
  },
  suggestedStats: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    padding: responsive.spacing[2],
  },
  statLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  statValue: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: theme.colors.info.light,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
    marginBottom: responsive.spacing[1],
  },
  infoDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
    lineHeight: 20,
  },
});
