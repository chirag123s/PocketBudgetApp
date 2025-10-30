import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Color Palette - Using theme colors
const colors = {
  primaryDark: theme.colors.info.dark,
  primary: theme.colors.info.main,
  primaryLight: theme.colors.info.light,

  neutralBg: theme.colors.background.secondary,
  neutralWhite: theme.colors.background.primary,
  neutralDarkest: theme.colors.text.primary,
  neutralDark: theme.colors.text.secondary,
  neutralMedium: theme.colors.text.tertiary,

  functionalSuccess: theme.colors.success.main,
  functionalWarning: theme.colors.warning.main,
  functionalError: theme.colors.danger.main,

  border: theme.colors.border.light,
};

interface Category {
  id: string;
  name: string;
  icon: string;
  isFrequent?: boolean;
}

interface CategorizeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId?: string;
  transaction?: {
    merchant: string;
    date: string;
    amount: string;
  };
}

export const CategorizeModal: React.FC<CategorizeModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
  selectedCategoryId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(selectedCategoryId);

  // Categories list
  const categories: Category[] = [
    { id: '1', name: 'Groceries', icon: 'cart-outline', isFrequent: true },
    { id: '2', name: 'Eating Out', icon: 'restaurant-outline', isFrequent: true },
    { id: '3', name: 'Transport', icon: 'car-outline', isFrequent: false },
    { id: '4', name: 'Rent', icon: 'home-outline', isFrequent: false },
    { id: '5', name: 'Utilities', icon: 'receipt-outline', isFrequent: false },
    { id: '6', name: 'Shopping', icon: 'bag-handle-outline', isFrequent: false },
    { id: '7', name: 'Entertainment', icon: 'film-outline', isFrequent: false },
    { id: '8', name: 'Health', icon: 'medical-outline', isFrequent: false },
    { id: '9', name: 'Subscriptions', icon: 'repeat-outline', isFrequent: false },
    { id: '10', name: 'Income', icon: 'cash-outline', isFrequent: false },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const frequentCategories = filteredCategories.filter((cat) => cat.isFrequent);
  const allCategories = filteredCategories.filter((cat) => !cat.isFrequent);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedId(categoryId);
    onSelectCategory(categoryId);
    setTimeout(() => {
      onClose();
      setSearchQuery(''); // Reset search
    }, 300);
  };

  const CategoryCard = ({ category }: { category: Category }) => {
    const isSelected = selectedId === category.id;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.categoryCard,
          {
            backgroundColor: isSelected ? `${colors.primary}15` : colors.neutralWhite,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={() => handleSelectCategory(category.id)}
      >
        <View style={styles.categoryCardContent}>
          <Ionicons
            name={category.icon as any}
            size={ms(24)}
            color={isSelected ? colors.primary : colors.neutralDarkest}
          />
          <Text
            style={[
              styles.categoryName,
              { color: isSelected ? colors.primary : colors.neutralDarkest },
            ]}
            numberOfLines={1}
          >
            {category.name}
          </Text>
        </View>
        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: colors.functionalSuccess }]}>
            <Ionicons name="checkmark" size={14} color={colors.neutralWhite} />
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />

        <View style={[styles.bottomSheet, { backgroundColor: colors.neutralBg }]}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.neutralDarkest }]}>
              Categorize Transaction
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.neutralDark} />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: colors.neutralWhite, borderColor: colors.border }]}>
              <Ionicons
                name="search"
                size={20}
                color={colors.neutralMedium}
                style={styles.searchIcon}
              />
              <TextInput
                style={[styles.searchInput, { color: colors.neutralDarkest }]}
                placeholder="Search categories..."
                placeholderTextColor={colors.neutralMedium}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={colors.neutralMedium} />
                </Pressable>
              )}
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Frequent Categories */}
            {frequentCategories.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.neutralDarkest }]}>
                  Frequent
                </Text>
                <View style={styles.grid}>
                  {frequentCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </View>
              </View>
            )}

            {/* All Categories */}
            {allCategories.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.neutralDarkest }]}>
                  All Categories
                </Text>
                <View style={styles.grid}>
                  {allCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </View>
              </View>
            )}

            {filteredCategories.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color={colors.neutralMedium} />
                <Text style={[styles.emptyStateText, { color: colors.neutralMedium }]}>
                  No categories found
                </Text>
              </View>
            )}

            {/* Bottom spacing for fixed button */}
            <View style={styles.bottomSpacing} />
          </ScrollView>

          {/* Fixed Footer Button */}
          <View
            style={[
              styles.footer,
              {
                backgroundColor: colors.neutralWhite,
                borderTopColor: colors.border,
              },
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                {
                  borderColor: colors.primary,
                  backgroundColor: 'transparent',
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
              <Text style={[styles.addButtonText, { color: colors.primary }]}>
                Add New Category
              </Text>
              <View style={[styles.premiumBadge, { backgroundColor: colors.functionalWarning }]}>
                <Text style={styles.premiumText}>PREMIUM</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    height: SCREEN_HEIGHT * 0.85,
    borderTopLeftRadius: theme.borderRadius.xl * 2,
    borderTopRightRadius: theme.borderRadius.xl * 2,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: responsive.spacing[3],
    paddingBottom: responsive.spacing[2],
  },
  handle: {
    width: ms(36),
    height: ms(4),
    borderRadius: ms(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
  },
  title: {
    fontSize: responsive.fontSize.h4,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  closeButton: {
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: responsive.spacing[4],
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: responsive.spacing[2],
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: ms(120),
  },
  section: {
    marginTop: responsive.spacing[4],
  },
  sectionTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    paddingHorizontal: responsive.spacing[4],
    paddingBottom: responsive.spacing[3],
    letterSpacing: -0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[3],
  },
  categoryCard: {
    width: '47.5%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.spacing[4],
    borderRadius: theme.borderRadius.lg,
    position: 'relative',
    minHeight: ms(64),
  },
  categoryCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[3],
  },
  categoryName: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.2,
  },
  checkmark: {
    position: 'absolute',
    top: responsive.spacing[2],
    right: responsive.spacing[2],
    width: ms(20),
    height: ms(20),
    borderRadius: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    paddingVertical: responsive.spacing[8],
    alignItems: 'center',
    gap: responsive.spacing[3],
  },
  emptyStateText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '400',
  },
  bottomSpacing: {
    height: responsive.spacing[4],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[3],
    paddingBottom: responsive.spacing[4],
    borderTopWidth: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[2],
    paddingVertical: responsive.spacing[3],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
  },
  addButtonText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
  },
  premiumBadge: {
    position: 'absolute',
    right: responsive.spacing[4],
    paddingHorizontal: responsive.spacing[2.5],
    paddingVertical: responsive.spacing[1],
    borderRadius: theme.borderRadius.md,
  },
  premiumText: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '700',
    color: colors.neutralDarkest,
    letterSpacing: 0.5,
  },
});
