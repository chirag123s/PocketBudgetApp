import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '@/constants/theme';
import { darkColors } from '@/constants/colors';
import { responsive, ms, fs } from '@/constants/responsive';

interface AddReceiptModalProps {
  visible: boolean;
  onClose: () => void;
  onReceiptSelected: (uri: string) => void;
}

export const AddReceiptModal: React.FC<AddReceiptModalProps> = ({
  visible,
  onClose,
  onReceiptSelected,
}) => {
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === 'dark';

  // Use centralized theme with dark mode support
  const colors = {
    background: isDark ? darkColors.background.primary : theme.colors.background.secondary,
    surface: isDark ? darkColors.background.secondary : theme.colors.background.primary,
    textPrimary: isDark ? darkColors.text.primary : theme.colors.text.primary,
    textSecondary: isDark ? darkColors.text.secondary : theme.colors.text.secondary,
    border: isDark ? darkColors.border.light : theme.colors.border.light,
    primary: theme.colors.success.main,
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos of receipts.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Gallery permission is required to select photos.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onClose();
        onReceiptSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleChooseFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onClose();
        onReceiptSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error choosing from gallery:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const OptionItem = ({
    icon,
    title,
    onPress,
  }: {
    icon: string;
    title: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <View style={[styles.optionIconContainer, { backgroundColor: `${colors.primary}15` }]}>
          <Ionicons name={icon as any} size={24} color={colors.primary} />
        </View>
        <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={[styles.bottomSheet, { backgroundColor: colors.background }]}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Add Receipt
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View style={styles.optionsList}>
            <OptionItem
              icon="camera"
              title="Take Photo"
              onPress={handleTakePhoto}
            />
            <OptionItem
              icon="images"
              title="Choose from Gallery"
              onPress={handleChooseFromGallery}
            />
          </View>

          <View style={styles.sheetBottom} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheet: {
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingBottom: theme.spacing[5],
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[2],
  },
  handle: {
    width: ms(36),
    height: ms(4),
    borderRadius: theme.borderRadius.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[2],
  },
  title: {
    fontSize: fs(24),
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: -0.5,
  },
  closeButton: {
    width: ms(32),
    height: ms(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(16),
  },
  optionsList: {
    paddingVertical: theme.spacing[4],
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    minHeight: theme.layout.listItemHeight,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
    flex: 1,
  },
  optionIconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: fs(16),
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: fs(22),
  },
  sheetBottom: {
    height: theme.spacing[4],
  },
});
