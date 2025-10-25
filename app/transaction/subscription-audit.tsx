import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Subscription {
  id: number;
  name: string;
  amount: number;
  status: 'rarely-used' | 'active';
  lastUsed: string;
  canCancel: boolean;
}

const sampleSubscriptions: Subscription[] = [
  {
    id: 1,
    name: 'Adobe Creative Cloud',
    amount: 52.99,
    status: 'rarely-used',
    lastUsed: '4 months ago',
    canCancel: true,
  },
  {
    id: 2,
    name: 'Audible',
    amount: 16.45,
    status: 'rarely-used',
    lastUsed: '3 months ago',
    canCancel: true,
  },
  {
    id: 3,
    name: 'Gym Membership',
    amount: 45.0,
    status: 'rarely-used',
    lastUsed: '2 months ago',
    canCancel: true,
  },
  {
    id: 4,
    name: 'Netflix',
    amount: 16.99,
    status: 'active',
    lastUsed: 'Yesterday',
    canCancel: false,
  },
  {
    id: 5,
    name: 'Spotify',
    amount: 11.99,
    status: 'active',
    lastUsed: 'Today',
    canCancel: false,
  },
];

export default function SubscriptionAuditTool() {
  const router = useRouter();
  const [subscriptions] = useState<Subscription[]>(sampleSubscriptions);

  const totalSubscriptions = subscriptions.length;
  const monthlyTotal = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const rarelyUsed = subscriptions.filter((sub) => sub.status === 'rarely-used');
  const potentialSavings = rarelyUsed.reduce((sum, sub) => sum + sub.amount, 0);
  const yearlySavings = potentialSavings * 12;
  const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active');

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Audit</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Analysis Summary */}
        <LinearGradient
          colors={['#9333EA', '#7E22CE']}
          style={styles.summaryCard}
        >
          <Text style={styles.summarySubtitle}>We analyzed your transactions and found:</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalSubscriptions}</Text>
              <Text style={styles.statLabel}>Active Subscriptions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>${monthlyTotal.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Per month total</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Rarely Used Section */}
        {rarelyUsed.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionEmoji}>⚠️</Text>
                <Text style={styles.sectionTitle}>Rarely Used</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{rarelyUsed.length} found</Text>
              </View>
            </View>

            {rarelyUsed.map((sub) => (
              <View key={sub.id} style={styles.warningCard}>
                <View style={styles.subscriptionInfo}>
                  <Text style={styles.subscriptionName}>{sub.name}</Text>
                  <Text style={styles.subscriptionAmount}>${sub.amount.toFixed(2)}/month</Text>
                  <Text style={styles.lastUsedText}>
                    Last used:{' '}
                    <Text style={styles.lastUsedHighlight}>{sub.lastUsed}</Text>
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.keepButton}>
                    <Text style={styles.keepButtonText}>Keep</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Active Subscriptions */}
        {activeSubscriptions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionEmoji}>✅</Text>
                <Text style={styles.sectionTitle}>Active & Used</Text>
              </View>
              <View style={[styles.badge, styles.badgeGreen]}>
                <Text style={[styles.badgeText, styles.badgeTextGreen]}>
                  {activeSubscriptions.length}
                </Text>
              </View>
            </View>

            {activeSubscriptions.map((sub) => (
              <View key={sub.id} style={styles.activeCard}>
                <View style={styles.activeCardContent}>
                  <View style={styles.activeCardLeft}>
                    <Text style={styles.activeCardName}>{sub.name}</Text>
                    <Text style={styles.activeCardLastUsed}>
                      Last used:{' '}
                      <Text style={styles.activeCardLastUsedGreen}>{sub.lastUsed}</Text>
                    </Text>
                  </View>
                  <Text style={styles.activeCardAmount}>${sub.amount.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Potential Savings Card */}
        <LinearGradient
          colors={[theme.colors.success.main, '#059669']}
          style={styles.savingsCard}
        >
          <View style={styles.savingsHeader}>
            <View style={styles.savingsInfo}>
              <Text style={styles.savingsLabel}>💰 Potential Savings</Text>
              <Text style={styles.savingsAmount}>${yearlySavings.toFixed(0)}/year</Text>
              <Text style={styles.savingsSubtext}>
                Cancel {rarelyUsed.length} unused subscription
                {rarelyUsed.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <View style={styles.savingsExamples}>
            <Text style={styles.savingsExamplesTitle}>That's enough to:</Text>
            <Text style={styles.savingsExampleItem}>• 4 months of Netflix</Text>
            <Text style={styles.savingsExampleItem}>• 70 coffees ☕</Text>
            <Text style={styles.savingsExampleItem}>• Weekend getaway 🏖️</Text>
          </View>
        </LinearGradient>

        {/* View All Button */}
        <Button variant="secondary" fullWidth onPress={() => {}}>
          View All Subscriptions
        </Button>
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
  headerButton: {
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
  summaryCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.lg,
  },
  summarySubtitle: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: theme.responsive.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.md,
  },
  statItem: {
    flex: 1,
  },
  statNumber: {
    fontSize: theme.responsive.fontSize.h2,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.responsive.fontSize.caption,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    marginBottom: theme.responsive.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionEmoji: {
    fontSize: theme.responsive.fontSize.h3,
    marginRight: theme.responsive.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  badge: {
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.borderRadius.full,
  },
  badgeText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.warning.dark,
  },
  badgeGreen: {
    backgroundColor: theme.colors.success.light,
  },
  badgeTextGreen: {
    color: theme.colors.success.dark,
  },
  warningCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
    borderWidth: 2,
    borderColor: '#FEF3C7',
    ...theme.shadows.sm,
  },
  subscriptionInfo: {
    marginBottom: theme.responsive.spacing.sm,
  },
  subscriptionName: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.xs,
  },
  subscriptionAmount: {
    fontSize: theme.responsive.fontSize.h3,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: theme.responsive.spacing.sm,
  },
  lastUsedText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  lastUsedHighlight: {
    fontWeight: '700',
    color: theme.colors.warning.dark,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: '#FEF2F2',
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...theme.typography.styles.button,
    fontWeight: '700',
    color: theme.colors.danger.main,
  },
  keepButton: {
    flex: 1,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  keepButtonText: {
    ...theme.typography.styles.button,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  activeCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    ...theme.shadows.sm,
  },
  activeCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeCardLeft: {
    flex: 1,
  },
  activeCardName: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.xs,
  },
  activeCardLastUsed: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  activeCardLastUsedGreen: {
    fontWeight: '600',
    color: theme.colors.success.main,
  },
  activeCardAmount: {
    fontSize: theme.responsive.fontSize.h4,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  savingsCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.lg,
  },
  savingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.responsive.spacing.md,
  },
  savingsInfo: {
    flex: 1,
  },
  savingsLabel: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: theme.responsive.spacing.sm,
  },
  savingsAmount: {
    fontSize: theme.responsive.fontSize.h1,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: theme.responsive.spacing.xs,
  },
  savingsSubtext: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  savingsExamples: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
  },
  savingsExamplesTitle: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: '#FFFFFF',
    marginBottom: theme.responsive.spacing.sm,
  },
  savingsExampleItem: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
});
