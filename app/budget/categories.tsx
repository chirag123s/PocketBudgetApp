import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
}

interface CategorySection {
  title: string;
  categories: Category[];
}

export default function CategoriesScreen() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  // Color Palette - Using dynamic theme colors
  const colors = {
    // Primary Palette
    primaryDark: theme.colors.info.dark,
    primary: theme.colors.info.main,
    primaryLight: theme.colors.info.light,

    // Neutral Palette
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,

    // Functional Palette
    functionalSuccess: theme.colors.success.main,
    functionalWarning: theme.colors.warning.main,
    functionalError: theme.colors.danger.main,

    // Border
    border: theme.colors.border.light,
  };

  const sections: CategorySection[] = [
    {
      title: 'ESSENTIALS',
      categories: [
        {
          id: '1',
          name: 'Groceries',
          icon: 'cart-outline',
          iconColor: colors.functionalSuccess,
          iconBgColor: `${colors.functionalSuccess}20`,
        },
        {
          id: '2',
          name: 'Rent/Mortgage',
          icon: 'home-outline',
          iconColor: colors.functionalSuccess,
          iconBgColor: `${colors.functionalSuccess}20`,
        },
        {
          id: '3',
          name: 'Utilities',
          icon: 'bulb-outline',
          iconColor: colors.functionalSuccess,
          iconBgColor: `${colors.functionalSuccess}20`,
        },
        {
          id: '4',
          name: 'Transport',
          icon: 'car-outline',
          iconColor: colors.functionalSuccess,
          iconBgColor: `${colors.functionalSuccess}20`,
        },
      ],
    },
    {
      title: 'LIFESTYLE',
      categories: [
        {
          id: '5',
          name: 'Restaurants & Cafes',
          icon: 'restaurant-outline',
          iconColor: colors.functionalWarning,
          iconBgColor: `${colors.functionalWarning}20`,
        },
        {
          id: '6',
          name: 'Shopping',
          icon: 'bag-outline',
          iconColor: colors.functionalWarning,
          iconBgColor: `${colors.functionalWarning}20`,
        },
        {
          id: '7',
          name: 'Entertainment',
          icon: 'film-outline',
          iconColor: colors.functionalWarning,
          iconBgColor: `${colors.functionalWarning}20`,
        },
        {
          id: '8',
          name: 'Holidays',
          icon: 'airplane-outline',
          iconColor: colors.functionalWarning,
          iconBgColor: `${colors.functionalWarning}20`,
        },
      ],
    },
    {
      title: 'FINANCIAL',
      categories: [
        {
          id: '9',
          name: 'Income',
          icon: 'wallet-outline',
          iconColor: colors.primary,
          iconBgColor: `${colors.primary}20`,
        },
        {
          id: '10',
          name: 'Investments',
          icon: 'trending-up-outline',
          iconColor: colors.primary,
          iconBgColor: `${colors.primary}20`,
        },
        {
          id: '11',
          name: 'Loan Repayments',
          icon: 'card-outline',
          iconColor: colors.primary,
          iconBgColor: `${colors.primary}20`,
        },
      ],
    },
  ];

  const [customCategories] = useState<Category[]>([]);

  const handleCategoryPress = (category: Category) => {
    console.log('Category selected:', category.name);
    // Navigate to category detail/edit screen
  };

  const handleAddCategory = () => {
    router.push('/budget/add-category');
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} />
      <ScreenHeader
        title="Categories"
        backgroundColor={colors.neutralBg}
      />

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: responsive.spacing[4],
          paddingTop: responsive.spacing[4],
          paddingBottom: ms(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, sectionIndex) => (
          <View key={section.title} style={{ marginTop: sectionIndex > 0 ? responsive.spacing[4] : 0 }}>
            {/* Section Header */}
            <Text
              style={{
                fontSize: responsive.fontSize.xs,
                fontWeight: '700',
                color: colors.neutralDark,
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                paddingVertical: responsive.spacing[4],
              }}
            >
              {section.title}
            </Text>

            {/* Section Card */}
            <View
              style={{
                backgroundColor: colors.neutralWhite,
                borderRadius: theme.borderRadius.lg,
                overflow: 'hidden',
                ...theme.shadows.sm,
              }}
            >
              {section.categories.map((category, categoryIndex) => (
                <View key={category.id}>
                  {/* Category Item */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      minHeight: ms(56),
                      paddingHorizontal: responsive.spacing[4],
                    }}
                  >
                    {/* Icon Circle */}
                    <View
                      style={{
                        width: ms(40),
                        height: ms(40),
                        borderRadius: ms(20),
                        backgroundColor: category.iconBgColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: responsive.spacing[4],
                      }}
                    >
                      <Ionicons
                        name={category.icon}
                        size={ms(20)}
                        color={category.iconColor}
                      />
                    </View>

                    {/* Category Name */}
                    <Text
                      style={{
                        flex: 1,
                        fontSize: responsive.fontSize.md,
                        fontWeight: '500',
                        color: colors.neutralDarkest,
                      }}
                      numberOfLines={1}
                    >
                      {category.name}
                    </Text>
                  </View>

                  {/* Divider */}
                  {categoryIndex < section.categories.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.border,
                        marginLeft: ms(72),
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Custom Categories Section */}
        <View style={{ marginTop: responsive.spacing[4] }}>
          <Text
            style={{
              fontSize: responsive.fontSize.xs,
              fontWeight: '700',
              color: colors.neutralDark,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              paddingVertical: responsive.spacing[4],
            }}
          >
            CUSTOM
          </Text>

          {customCategories.length > 0 ? (
            <View
              style={{
                backgroundColor: colors.neutralWhite,
                borderRadius: theme.borderRadius.lg,
                overflow: 'hidden',
                ...theme.shadows.sm,
              }}
            >
              {customCategories.map((category, categoryIndex) => (
                <View key={category.id}>
                  {/* Custom Category Item - Editable */}
                  <Pressable
                    onPress={() => handleCategoryPress(category)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      minHeight: ms(56),
                      paddingHorizontal: responsive.spacing[4],
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsive.spacing[4],
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          width: ms(40),
                          height: ms(40),
                          borderRadius: ms(20),
                          backgroundColor: category.iconBgColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Ionicons
                          name={category.icon}
                          size={ms(20)}
                          color={category.iconColor}
                        />
                      </View>

                      <Text
                        style={{
                          flex: 1,
                          fontSize: responsive.fontSize.md,
                          fontWeight: '500',
                          color: colors.neutralDarkest,
                        }}
                        numberOfLines={1}
                      >
                        {category.name}
                      </Text>
                    </View>

                    {/* Chevron for custom categories (editable) */}
                    <View
                      style={{
                        width: ms(28),
                        height: ms(28),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={ms(20)}
                        color={colors.neutralMedium}
                      />
                    </View>
                  </Pressable>

                  {categoryIndex < customCategories.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.border,
                        marginLeft: ms(72),
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          ) : (
            // Empty State
            <View
              style={{
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: colors.border,
                borderStyle: 'dashed',
                padding: responsive.spacing[8],
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.neutralWhite,
              }}
            >
              <Ionicons
                name="pricetags-outline"
                size={ms(36)}
                color={colors.neutralMedium}
                style={{ marginBottom: responsive.spacing[2] }}
              />
              <Text
                style={{
                  fontSize: responsive.fontSize.sm,
                  color: colors.neutralMedium,
                  textAlign: 'center',
                  lineHeight: responsive.fontSize.sm * 1.4,
                }}
              >
                You haven't added any custom categories yet. Tap the '+' button to create your first one.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View
        style={{
          position: 'absolute',
          bottom: responsive.spacing[6],
          right: responsive.spacing[4],
        }}
      >
        <Pressable
          onPress={handleAddCategory}
          style={({ pressed }) => ({
            width: ms(56),
            height: ms(56),
            borderRadius: ms(28),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...theme.shadows.lg,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
        >
          <Ionicons name="add" size={ms(32)} color={colors.neutralWhite} />
        </Pressable>
      </View>
    </Screen>
  );
}
