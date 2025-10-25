import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionDetail() {
  const router = useRouter();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [notes, setNotes] = useState('Weekly grocery shop');

  const moreMenuOptions = [
    { label: 'Copy transaction', icon: 'copy-outline' },
    { label: 'Share', icon: 'share-outline' },
    { label: 'Report incorrect', icon: 'flag-outline' },
    { label: 'Mark as recurring', icon: 'repeat-outline' },
  ];

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setShowMoreMenu(true)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Transaction Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.merchantName}>Coles Supermarket</Text>
          <Text style={styles.location}>📍 123 Main St, Sydney</Text>
          <Text style={styles.amount}>-$45.30</Text>
          <Text style={styles.date}>October 25, 2025</Text>
          <Text style={styles.time}>10:34 AM</Text>
        </View>

        {/* Details Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>

          {/* Category */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <View style={styles.detailValueRow}>
              <Text style={styles.detailValue}>
                <Text style={styles.emoji}>🛒</Text> Groceries
              </Text>
              <TouchableOpacity>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Account */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account:</Text>
            <View style={styles.detailValueColumn}>
              <Text style={styles.detailValue}>CBA Smart Access</Text>
              <Text style={styles.detailSubvalue}>**** 1234</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method:</Text>
            <Text style={styles.detailValue}>💳 Debit Card</Text>
          </View>

          {/* Status */}
          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailValue}>✅ Cleared</Text>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add note..."
            placeholderTextColor={theme.colors.text.tertiary}
            multiline
          />
        </View>

        {/* Tags (Premium) */}
        <View style={styles.card}>
          <View style={styles.premiumHeader}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add tags</Text>
          </TouchableOpacity>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>#essential</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>#weekly</Text>
            </View>
          </View>
        </View>

        {/* Receipt (Premium) */}
        <View style={styles.card}>
          <View style={styles.premiumHeader}>
            <Text style={styles.sectionTitle}>Receipt</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </View>
          <View style={styles.receiptButtons}>
            <TouchableOpacity style={styles.receiptButton}>
              <Text style={styles.receiptButtonText}>📷 Attach Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.receiptButton}>
              <Text style={styles.receiptButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Split Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Mark as Duplicate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
            <Text style={styles.deleteButtonText}>Delete Transaction</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* More Menu Modal */}
      <Modal
        visible={showMoreMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMoreMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMoreMenu(false)}
        >
          <View style={styles.moreMenu}>
            {moreMenuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.moreMenuItem}
                onPress={() => {
                  setShowMoreMenu(false);
                  // Handle action
                }}
              >
                <Ionicons name={option.icon as any} size={20} color={theme.colors.text.secondary} />
                <Text style={styles.moreMenuText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.responsive.getScreenPadding(),
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
  moreButton: {
    padding: theme.responsive.spacing.sm,
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  headerCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  merchantName: {
    ...theme.typography.styles.h3,
    marginBottom: theme.responsive.spacing.sm,
  },
  location: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.md,
  },
  amount: {
    fontSize: theme.responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: theme.responsive.spacing.sm,
  },
  date: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  time: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    ...theme.typography.styles.h4,
    marginBottom: theme.responsive.spacing.md,
  },
  detailRow: {
    paddingBottom: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  lastDetailRow: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  detailLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.sm,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailValueColumn: {
    gap: theme.responsive.spacing.xs,
  },
  detailValue: {
    ...theme.typography.styles.body,
    fontWeight: '500',
  },
  detailSubvalue: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
  },
  emoji: {
    marginRight: theme.responsive.spacing.sm,
  },
  editButton: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  notesInput: {
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
    minHeight: 40,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  premiumBadge: {
    backgroundColor: theme.colors.warning.light,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontWeight: '600',
    fontSize: theme.responsive.fontSize.caption,
  },
  addButton: {
    marginBottom: theme.responsive.spacing.sm,
  },
  addButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.responsive.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: theme.responsive.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  tagText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.primary[700],
  },
  receiptButtons: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  receiptButton: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.md,
    borderRadius: theme.responsive.scale(20),
    alignItems: 'center',
  },
  receiptButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  actionButton: {
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.md,
    borderRadius: theme.responsive.scale(20),
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  actionButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger.light,
    marginBottom: 0,
  },
  deleteButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.danger.main,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: theme.responsive.spacing.lg,
  },
  moreMenu: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    ...theme.shadows.lg,
    minWidth: 200,
    overflow: 'hidden',
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    gap: theme.responsive.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  moreMenuText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
});
