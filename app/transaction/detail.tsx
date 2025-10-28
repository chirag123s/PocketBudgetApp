import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
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
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: responsive.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
  },
  moreButton: {
    padding: responsive.spacing[2],
  },
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  headerCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: 20,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  merchantName: {
    ...theme.typography.styles.h3,
    marginBottom: responsive.spacing[2],
  },
  location: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[4],
  },
  amount: {
    fontSize: responsive.fontSize.h3,
    lineHeight: responsive.fontSize.h3 * 1.5,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: responsive.spacing[2],
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
    borderRadius: 20,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  sectionTitle: {
    ...theme.typography.styles.h4,
    marginBottom: responsive.spacing[4],
  },
  detailRow: {
    paddingBottom: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
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
    marginBottom: responsive.spacing[2],
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailValueColumn: {
    gap: responsive.spacing[1],
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
    marginRight: responsive.spacing[2],
  },
  editButton: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
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
    marginBottom: responsive.spacing[2],
  },
  premiumBadge: {
    backgroundColor: theme.colors.warning.light,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  premiumBadgeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.warning.dark,
    fontWeight: '600',
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
  },
  addButton: {
    marginBottom: responsive.spacing[2],
  },
  addButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing[2],
  },
  tag: {
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: responsive.spacing[1],
    borderRadius: theme.borderRadius.full,
  },
  tagText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.primary[700],
  },
  receiptButtons: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
  },
  receiptButton: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[4],
    borderRadius: 20,
    alignItems: 'center',
  },
  receiptButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  actionButton: {
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[4],
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
  },
  actionButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger.light,
    marginBottom: 0,
  },
  deleteButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.danger.main,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: responsive.spacing[6],
  },
  moreMenu: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: 20,
    ...theme.shadows.lg,
    minWidth: 200,
    overflow: 'hidden',
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    gap: responsive.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  moreMenuText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
});
