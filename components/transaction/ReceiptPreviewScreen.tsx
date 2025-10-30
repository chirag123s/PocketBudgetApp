import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

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

interface ReceiptPreviewScreenProps {
  receiptUri: string;
  onSave: (uri: string) => void;
  onRetake: () => void;
}

export const ReceiptPreviewScreen: React.FC<ReceiptPreviewScreenProps> = ({
  receiptUri,
  onSave,
  onRetake,
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Simulate saving delay
      await new Promise(resolve => setTimeout(resolve, 500));

      onSave(receiptUri);
      Alert.alert(
        'Receipt Saved',
        'Your receipt has been attached to this transaction.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('Error saving receipt:', error);
      Alert.alert('Error', 'Failed to save receipt. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Receipt',
      'Are you sure you want to discard this receipt?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleRetake = () => {
    Alert.alert(
      'Retake Photo',
      'This will discard the current photo. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Retake',
          onPress: onRetake,
        },
      ]
    );
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralDarkest} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.neutralDarkest} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={colors.neutralWhite} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.neutralWhite }]}>
          Receipt Preview
        </Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Receipt Image */}
      <View style={styles.imageContainer}>
        {!imageLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.neutralWhite} />
            <Text style={[styles.loadingText, { color: colors.neutralWhite }]}>
              Loading receipt...
            </Text>
          </View>
        )}
        <Image
          source={{ uri: receiptUri }}
          style={styles.receiptImage}
          resizeMode="contain"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            Alert.alert('Error', 'Failed to load image. Please try again.');
            router.back();
          }}
        />
      </View>

      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
        {/* Action Buttons */}
        <View style={styles.toolbarActions}>
          {/* Retake Button */}
          <Pressable
            style={({ pressed }) => [
              styles.toolbarButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={handleRetake}
            disabled={isSaving}
          >
            <View style={[styles.toolbarIconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <Ionicons name="camera-reverse" size={24} color={colors.neutralWhite} />
            </View>
            <Text style={[styles.toolbarButtonText, { color: colors.neutralWhite }]}>
              Retake
            </Text>
          </Pressable>

          {/* Delete Button */}
          <Pressable
            style={({ pressed }) => [
              styles.toolbarButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={handleDelete}
            disabled={isSaving}
          >
            <View style={[styles.toolbarIconContainer, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <Ionicons name="trash-outline" size={24} color={colors.functionalError} />
            </View>
            <Text style={[styles.toolbarButtonText, { color: colors.functionalError }]}>
              Delete
            </Text>
          </Pressable>
        </View>

        {/* Save Button */}
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed || isSaving ? 0.8 : 1,
            },
          ]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.neutralWhite} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={24} color={colors.neutralWhite} />
              <Text style={[styles.saveButtonText, { color: colors.neutralWhite }]}>
                Save Receipt
              </Text>
            </>
          )}
        </Pressable>

        {/* Info Text */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={16} color={colors.neutralMedium} />
          <Text style={[styles.infoText, { color: colors.neutralMedium }]}>
            Receipt will be attached to this transaction
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[3],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(20),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerPlaceholder: {
    width: ms(40),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutralDarkest,
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsive.spacing[3],
    zIndex: 5,
  },
  loadingText: {
    fontSize: responsive.fontSize.md,
  },
  receiptImage: {
    width: '100%',
    height: '100%',
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[4],
    paddingBottom: responsive.spacing[6],
    gap: responsive.spacing[4],
  },
  toolbarActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: responsive.spacing[4],
  },
  toolbarButton: {
    alignItems: 'center',
    gap: responsive.spacing[2],
    flex: 1,
  },
  toolbarIconContainer: {
    width: ms(56),
    height: ms(56),
    borderRadius: ms(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarButtonText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[2],
    height: ms(52),
    borderRadius: theme.borderRadius.lg,
  },
  saveButtonText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[1.5],
  },
  infoText: {
    fontSize: responsive.fontSize.xs,
  },
});
