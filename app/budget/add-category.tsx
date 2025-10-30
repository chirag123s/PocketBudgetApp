import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

// Color Palette - Using theme colors
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

// Available icons for categories
const availableIcons: Array<keyof typeof Ionicons.glyphMap> = [
  'cart-outline',
  'home-outline',
  'car-outline',
  'restaurant-outline',
  'cafe-outline',
  'pizza-outline',
  'fast-food-outline',
  'shirt-outline',
  'bag-outline',
  'gift-outline',
  'film-outline',
  'game-controller-outline',
  'musical-notes-outline',
  'fitness-outline',
  'medical-outline',
  'school-outline',
  'briefcase-outline',
  'wallet-outline',
  'card-outline',
  'cash-outline',
  'trending-up-outline',
  'airplane-outline',
  'train-outline',
  'bicycle-outline',
  'bus-outline',
  'paw-outline',
  'heart-outline',
  'book-outline',
  'laptop-outline',
  'phone-portrait-outline',
  'build-outline',
  'construct-outline',
  'water-outline',
  'flame-outline',
  'leaf-outline',
];

// Available colors for categories
const availableColors = [
  { name: 'Green', value: theme.colors.success.main },
  { name: 'Blue', value: theme.colors.info.main },
  { name: 'Orange', value: theme.colors.warning.main },
  { name: 'Red', value: theme.colors.danger.main },
  { name: 'Purple', value: theme.colors.secondary.main },
  { name: 'Teal', value: '#0D9488' },
  { name: 'Pink', value: '#DB2777' },
  { name: 'Indigo', value: '#4F46E5' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Cyan', value: '#06B6D4' },
];

export default function AddCategoryScreen() {
  const router = useRouter();

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof Ionicons.glyphMap>('star-outline');
  const [selectedColor, setSelectedColor] = useState(availableColors[0].value);

  const handleSave = () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    // Save category logic here
    console.log('Saving category:', {
      name: categoryName,
      icon: selectedIcon,
      color: selectedColor,
    });

    Alert.alert('Success', 'Category added successfully', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutralBg} />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: responsive.spacing[4],
          paddingVertical: responsive.spacing[3],
          backgroundColor: colors.neutralBg,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: ms(40),
            height: ms(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="close" size={24} color={colors.neutralDarkest} />
        </Pressable>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: responsive.fontSize.lg,
            fontWeight: '700',
            color: colors.neutralDarkest,
            letterSpacing: -0.3,
          }}
        >
          Add Category
        </Text>

        <View style={{ width: ms(40) }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: responsive.spacing[4],
          paddingTop: responsive.spacing[6],
          paddingBottom: ms(100),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: responsive.spacing[8],
          }}
        >
          <View
            style={{
              width: ms(80),
              height: ms(80),
              borderRadius: ms(40),
              backgroundColor: `${selectedColor}20`,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: responsive.spacing[3],
            }}
          >
            <Ionicons
              name={selectedIcon}
              size={ms(40)}
              color={selectedColor}
            />
          </View>
          <Text
            style={{
              fontSize: responsive.fontSize.lg,
              fontWeight: '600',
              color: colors.neutralDarkest,
            }}
          >
            {categoryName || 'Category Name'}
          </Text>
        </View>

        {/* Category Name */}
        <View style={{ marginBottom: responsive.spacing[6] }}>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[2],
            }}
          >
            Category Name
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.neutralWhite,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: responsive.spacing[4],
              height: ms(48),
              fontSize: responsive.fontSize.md,
              color: colors.neutralDarkest,
            }}
            placeholder="Enter category name"
            placeholderTextColor={colors.neutralMedium}
            value={categoryName}
            onChangeText={setCategoryName}
            autoFocus
          />
        </View>

        {/* Select Icon */}
        <View style={{ marginBottom: responsive.spacing[6] }}>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[3],
            }}
          >
            Select Icon
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: -responsive.spacing[1],
            }}
          >
            {availableIcons.map((icon) => (
              <Pressable
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                style={({ pressed }) => ({
                  width: '16.666%',
                  paddingHorizontal: responsive.spacing[1],
                  marginBottom: responsive.spacing[2],
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View
                  style={{
                    aspectRatio: 1,
                    backgroundColor: selectedIcon === icon ? `${selectedColor}20` : colors.neutralWhite,
                    borderRadius: theme.borderRadius.md,
                    borderWidth: 2,
                    borderColor: selectedIcon === icon ? selectedColor : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons
                    name={icon}
                    size={ms(24)}
                    color={selectedIcon === icon ? selectedColor : colors.neutralDark}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Select Color */}
        <View style={{ marginBottom: responsive.spacing[6] }}>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[3],
            }}
          >
            Select Color
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: -responsive.spacing[1.5],
            }}
          >
            {availableColors.map((color) => (
              <Pressable
                key={color.name}
                onPress={() => setSelectedColor(color.value)}
                style={({ pressed }) => ({
                  width: '20%',
                  paddingHorizontal: responsive.spacing[1.5],
                  marginBottom: responsive.spacing[3],
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View
                  style={{
                    aspectRatio: 1,
                    backgroundColor: color.value,
                    borderRadius: theme.borderRadius.md,
                    borderWidth: 3,
                    borderColor: selectedColor === color.value ? colors.neutralDarkest : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedColor === color.value && (
                    <Ionicons name="checkmark" size={ms(24)} color={colors.neutralWhite} />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: responsive.fontSize.xs,
                    color: colors.neutralDark,
                    textAlign: 'center',
                    marginTop: responsive.spacing[1],
                  }}
                >
                  {color.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.neutralWhite,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: responsive.spacing[4],
          paddingTop: responsive.spacing[4],
          paddingBottom: responsive.spacing[4],
        }}
      >
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => ({
            height: ms(48),
            borderRadius: theme.borderRadius.lg,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
            ...theme.shadows.md,
          })}
        >
          <Text
            style={{
              fontSize: responsive.fontSize.md,
              fontWeight: '700',
              color: colors.neutralWhite,
              letterSpacing: 0.2,
            }}
          >
            Save Category
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
