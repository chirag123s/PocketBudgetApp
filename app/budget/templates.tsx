import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
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
  const router = useRouter();

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget Templates</Text>
        <View style={styles.placeholder} />
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  premiumCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.warning.main,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  premiumIcon: {
    fontSize: theme.responsive.fontSize.h3,
    marginRight: theme.responsive.spacing.sm,
  },
  premiumTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.warning.dark,
  },
  premiumText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.warning.dark,
    marginBottom: theme.responsive.spacing.sm,
  },
  upgradeButton: {
    backgroundColor: theme.colors.warning.main,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.responsive.spacing.sm,
    alignItems: 'center',
  },
  upgradeButtonText: {
    ...theme.typography.styles.button,
    color: '#FFFFFF',
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  section: {
    marginBottom: theme.responsive.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  templatesContainer: {
    gap: theme.responsive.spacing.sm,
  },
  templateCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  templateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  templateIcon: {
    fontSize: theme.responsive.fontSize.h4,
    marginRight: theme.responsive.spacing.sm,
  },
  templateName: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  templateNote: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.sm,
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
    gap: theme.responsive.spacing.sm,
  },
  useButton: {
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
  },
  useButtonText: {
    ...theme.typography.styles.caption,
    color: theme.colors.primary[700],
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
  },
  editButtonText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '500',
  },
  createButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
    marginTop: theme.responsive.spacing.sm,
  },
  createButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  suggestedCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  suggestedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  useArrow: {
    ...theme.typography.styles.body,
    color: theme.colors.primary[600],
    fontWeight: '500',
  },
  suggestedStats: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.responsive.spacing.sm,
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
    padding: theme.responsive.spacing.md,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: theme.responsive.fontSize.h3,
    marginRight: theme.responsive.spacing.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
    marginBottom: theme.responsive.spacing.xs,
  },
  infoDescription: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
    lineHeight: 20,
  },
});
