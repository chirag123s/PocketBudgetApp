import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

interface Category {
  icon: string;
  name: string;
}

const recentCategories: Category[] = [
  { icon: '🍽️', name: 'Dining Out' },
  { icon: '🚗', name: 'Transport' },
  { icon: '💡', name: 'Bills' },
];

const allCategories: Category[] = [
  { icon: '🏠', name: 'Housing' },
  { icon: '🛒', name: 'Groceries' },
  { icon: '🎬', name: 'Entertainment' },
  { icon: '📱', name: 'Phone & Internet' },
  { icon: '👕', name: 'Clothing' },
  { icon: '💰', name: 'Savings' },
  { icon: '🏥', name: 'Healthcare' },
  { icon: '🎁', name: 'Gifts' },
];

export default function EditCategoryQuickAction() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Groceries');

  const renderCategoryItem = ({ item }: { item: Category }, isSelected: boolean) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        isSelected && styles.categoryItemSelected,
      ]}
      onPress={() => {
        setSelectedCategory(item.name);
        // Auto-close after selection
        setTimeout(() => router.back(), 300);
      }}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
      {isSelected && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={true}
      transparent
      animationType="slide"
      onRequestClose={() => router.back()}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => router.back()}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.bottomSheet}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Change Category</Text>
          </View>

          {/* Content */}
          <FlatList
            data={[
              { type: 'current' },
              { type: 'section', title: 'Recent Categories' },
              ...recentCategories.map(cat => ({ type: 'recent', ...cat })),
              { type: 'section', title: 'All Categories' },
              ...allCategories.map(cat => ({ type: 'all', ...cat })),
              { type: 'create' },
            ]}
            renderItem={({ item }: { item: any }) => {
              if (item.type === 'current') {
                return (
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Current</Text>
                    <View style={[styles.categoryItem, styles.currentCategory]}>
                      <Text style={styles.categoryIcon}>🛒</Text>
                      <Text style={styles.categoryName}>Groceries</Text>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  </View>
                );
              }

              if (item.type === 'section') {
                return (
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>{item.title}</Text>
                  </View>
                );
              }

              if (item.type === 'create') {
                return (
                  <View style={styles.createButtonContainer}>
                    <Button
                      variant="primary"
                      fullWidth
                      size="large"
                      onPress={() => {
                        // Handle create new category
                      }}
                    >
                      + Create Category
                    </Button>
                  </View>
                );
              }

              const isSelected = item.name === 'Groceries';
              return renderCategoryItem({ item }, isSelected);
            }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    ...theme.shadows.lg,
  },
  handle: {
    width: 48,
    height: 4,
    backgroundColor: theme.colors.border.main,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: responsive.spacing[2],
    marginBottom: responsive.spacing[2],
  },
  header: {
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  title: {
    ...theme.typography.styles.h3,
  },
  listContent: {
    paddingHorizontal: responsive.spacing[6],
    paddingBottom: responsive.spacing[6],
  },
  section: {
    marginTop: responsive.spacing[6],
  },
  sectionLabel: {
    ...theme.typography.styles.label,
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[2],
    textTransform: 'uppercase',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    padding: responsive.spacing[2],
    borderRadius: 20,
    marginBottom: responsive.spacing[2],
  },
  categoryItemSelected: {
    backgroundColor: theme.colors.primary[50],
    borderWidth: 2,
    borderColor: theme.colors.primary[600],
  },
  currentCategory: {
    backgroundColor: theme.colors.primary[50],
    borderWidth: 2,
    borderColor: theme.colors.primary[600],
  },
  categoryIcon: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  categoryName: {
    ...theme.typography.styles.body,
    fontWeight: '500',
    flex: 1,
  },
  checkmark: {
    fontSize: responsive.fontSize.xl,
    lineHeight: responsive.fontSize.xl * 1.5,
    color: theme.colors.primary[600],
  },
  createButtonContainer: {
    marginTop: responsive.spacing[6],
  },
});
