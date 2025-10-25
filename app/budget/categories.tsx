import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories = {
  essential: [
    { id: 'housing', name: 'Housing', icon: '🏠' },
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'bills', name: 'Bills & Utilities', icon: '💡' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '📚' },
  ],
  lifestyle: [
    { id: 'dining', name: 'Dining Out', icon: '🍽️' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'gifts', name: 'Gifts', icon: '🎁' },
  ],
  financial: [
    { id: 'debt', name: 'Debt Payments', icon: '💳' },
    { id: 'savings', name: 'Savings', icon: '💰' },
    { id: 'investments', name: 'Investments', icon: '📈' },
  ],
  australian: [
    { id: 'hecs', name: 'HECS/HELP', icon: '🎓' },
    { id: 'health', name: 'Private Health', icon: '🏥' },
    { id: 'rego', name: 'Rego & CTP', icon: '🚗' },
    { id: 'super', name: 'Super (extra)', icon: '📊' },
  ],
};

const FREE_TIER_LIMIT = 10;

export default function CategorySelection() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'housing', 'groceries', 'transport', 'bills', 'dining'
  ]);

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== id));
    } else {
      if (selectedCategories.length < FREE_TIER_LIMIT) {
        setSelectedCategories([...selectedCategories, id]);
      }
    }
  };

  const renderCategoryItem = (cat: Category) => {
    const isSelected = selectedCategories.includes(cat.id);
    return (
      <TouchableOpacity
        key={cat.id}
        style={[
          styles.categoryItem,
          isSelected && styles.categoryItemSelected,
        ]}
        onPress={() => toggleCategory(cat.id)}
      >
        <View
          style={[
            styles.checkbox,
            isSelected && styles.checkboxSelected,
          ]}
        >
          {isSelected && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>
        <Text style={styles.categoryIcon}>{cat.icon}</Text>
        <Text style={styles.categoryName}>{cat.name}</Text>
      </TouchableOpacity>
    );
  };

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Categories</Text>
          <Text style={styles.headerSubtitle}>Step 3 of 4</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Question */}
        <Text style={styles.question}>
          Select categories to{'\n'}track in your budget
        </Text>

        {/* Counter */}
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {selectedCategories.length}/{FREE_TIER_LIMIT} selected
          </Text>
        </View>

        {/* Essential */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ESSENTIAL</Text>
          <View style={styles.categoriesContainer}>
            {categories.essential.map(renderCategoryItem)}
          </View>
        </View>

        {/* Lifestyle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIFESTYLE</Text>
          <View style={styles.categoriesContainer}>
            {categories.lifestyle.map(renderCategoryItem)}
          </View>
        </View>

        {/* Financial */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FINANCIAL</Text>
          <View style={styles.categoriesContainer}>
            {categories.financial.map(renderCategoryItem)}
          </View>
        </View>

        {/* Australian Specific */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AUSTRALIAN SPECIFIC 🇦🇺</Text>
          <View style={styles.categoriesContainer}>
            {categories.australian.map(renderCategoryItem)}
          </View>
        </View>

        {/* Custom Category Button */}
        <TouchableOpacity style={styles.customButton}>
          <Text style={styles.customButtonText}>+ Custom Category</Text>
        </TouchableOpacity>

        {/* Free Tier Warning */}
        {selectedCategories.length >= FREE_TIER_LIMIT && (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>
              Free Plan: {FREE_TIER_LIMIT}/{FREE_TIER_LIMIT} categories
            </Text>
            <Text style={styles.warningText}>
              You've reached the free tier limit. Upgrade for unlimited categories.
            </Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade for Unlimited</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Continue Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          disabled={selectedCategories.length === 0}
          onPress={() => router.push('/budget/amounts')}
        >
          Continue ({selectedCategories.length} selected)
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
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  headerSubtitle: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.responsive.spacing.xs,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  question: {
    ...theme.typography.styles.h2,
    fontSize: theme.responsive.fontSize.h4,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  counter: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.responsive.spacing.sm,
    alignSelf: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  counterText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
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
  categoriesContainer: {
    gap: theme.responsive.spacing.sm,
  },
  categoryItem: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border.light,
  },
  categoryItemSelected: {
    borderColor: theme.colors.primary[500],
  },
  checkbox: {
    width: theme.responsive.scale(24),
    height: theme.responsive.scale(24),
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.spacing.sm,
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: theme.responsive.fontSize.caption,
  },
  categoryIcon: {
    fontSize: theme.responsive.fontSize.h4,
    marginRight: theme.responsive.spacing.sm,
  },
  categoryName: {
    ...theme.typography.styles.body,
    fontWeight: '500',
    flex: 1,
  },
  customButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  customButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  warningCard: {
    backgroundColor: theme.colors.warning.light,
    borderWidth: 1,
    borderColor: theme.colors.warning.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
  },
  warningTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.warning.dark,
    marginBottom: theme.responsive.spacing.xs,
  },
  warningText: {
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
});
