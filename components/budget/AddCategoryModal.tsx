import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { BottomSheetModal } from '@/components/ui/BottomSheetModal';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

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

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (category: { name: string; icon: string; color: string }) => void;
}

export function AddCategoryModal({ visible, onClose, onSave }: AddCategoryModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

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

  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof Ionicons.glyphMap>('star-outline');
  const [selectedColor, setSelectedColor] = useState(availableColors[0].value);

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    primary: theme.colors.info.main,
    border: theme.colors.border.light,
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    // Call onSave callback if provided
    if (onSave) {
      onSave({
        name: categoryName,
        icon: selectedIcon,
        color: selectedColor,
      });
    }

    // Reset form
    setCategoryName('');
    setSelectedIcon('star-outline');
    setSelectedColor(availableColors[0].value);

    // Close modal
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setCategoryName('');
    setSelectedIcon('star-outline');
    setSelectedColor(availableColors[0].value);
    onClose();
  };

  return (
    <BottomSheetModal
      visible={visible}
      onClose={handleClose}
      title="Add Category"
      maxHeight="90%"
      footer={
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
      }
    >
      {/* Preview */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: responsive.spacing[6],
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
      <View style={{ marginBottom: responsive.spacing[4] }}>
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
    </BottomSheetModal>
  );
}
