import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { avatarColors, loadAvatarColor, saveAvatarColor, getAvatarGradientSync } from '@/utils/avatar';

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

interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export default function EditProfileScreen() {
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Alex Johnson',
    email: 'alex@email.com',
    phoneNumber: '+61 4XX XXX XXX',
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue'); // Preview color
  const [savedColor, setSavedColor] = useState('blue'); // Persisted color
  const [hasColorChanged, setHasColorChanged] = useState(false);

  // Load saved avatar color on mount
  useEffect(() => {
    loadSavedColor();
  }, []);

  const loadSavedColor = async () => {
    const colorId = await loadAvatarColor();
    setSelectedColor(colorId);
    setSavedColor(colorId);
  };

  const handleColorSelect = (colorId: string) => {
    // Update preview only, don't save yet
    setSelectedColor(colorId);
    setShowColorPicker(false);

    // Mark as changed if different from saved color
    if (colorId !== savedColor) {
      setHasChanges(true);
      setHasColorChanged(true);
    }
  };

  const getAvatarGradient = () => {
    return getAvatarGradientSync(selectedColor);
  };

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              // Revert color changes
              if (hasColorChanged) {
                setSelectedColor(savedColor);
              }
              router.back();
            },
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const handleSaveChanges = async () => {
    // Validate data
    if (!profileData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!profileData.email.trim() || !profileData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Save avatar color if changed
    if (hasColorChanged) {
      await saveAvatarColor(selectedColor);
      setSavedColor(selectedColor);
      setHasColorChanged(false);
    }

    // Save changes
    console.log('Save profile data:', profileData);
    Alert.alert('Success', 'Your profile has been updated successfully', [
      {
        text: 'OK',
        onPress: () => {
          setHasChanges(false);
          router.back();
        },
      },
    ]);
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value });
    setHasChanges(true);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <ScreenHeader
        title="My Profile"
        onBackPress={handleBack}
        backgroundColor={colors.neutralBg}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          {/* Avatar with Gradient */}
          <LinearGradient
            colors={getAvatarGradient()}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{getInitials(profileData.fullName)}</Text>
          </LinearGradient>

          {/* Change Avatar Color Button */}
          <Pressable
            onPress={() => setShowColorPicker(true)}
            style={({ pressed }) => [
              styles.changePhotoButton,
              pressed && styles.changePhotoButtonPressed,
            ]}
          >
            <Text style={styles.changePhotoButtonText}>Change Avatar Color</Text>
          </Pressable>
        </View>

        {/* Personal Information Form */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.fullName}
              onChangeText={(text) => updateField('fullName', text)}
              placeholder="Enter your full name"
              placeholderTextColor={colors.neutralMedium}
            />
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => updateField('email', text)}
              placeholder="Enter your email"
              placeholderTextColor={colors.neutralMedium}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.helperRow}>
              <Ionicons name="checkmark-circle" size={16} color={colors.functionalSuccess} />
              <Text style={styles.helperText}>Verified • Used for login</Text>
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number (Optional)</Text>
            <TextInput
              style={styles.input}
              value={profileData.phoneNumber}
              onChangeText={(text) => updateField('phoneNumber', text)}
              placeholder="+61 4XX XXX XXX"
              placeholderTextColor={colors.neutralMedium}
              keyboardType="phone-pad"
            />
            <Pressable onPress={() => console.log('Verify phone')}>
              <Text style={styles.verifyText}>Verify</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        {/* Save Changes Button */}
        <Pressable
          onPress={handleSaveChanges}
          disabled={!hasChanges}
          style={({ pressed }) => [
            styles.saveButton,
            !hasChanges && styles.saveButtonDisabled,
            pressed && styles.saveButtonPressed,
          ]}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>

      {/* Color Picker Modal */}
      <Modal
        visible={showColorPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowColorPicker(false)}
        >
          <Pressable
            style={styles.colorPickerSheet}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.colorPickerHeader}>
              <Text style={styles.colorPickerTitle}>Choose Avatar Color</Text>
              <Pressable
                onPress={() => setShowColorPicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.neutralDarkest} />
              </Pressable>
            </View>

            {/* Color Options */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorOptionsContainer}
            >
              {avatarColors.map((color) => (
                <Pressable
                  key={color.id}
                  onPress={() => handleColorSelect(color.id)}
                  style={styles.colorOptionWrapper}
                >
                  <LinearGradient
                    colors={color.gradient}
                    style={[
                      styles.colorOption,
                      selectedColor === color.id && styles.colorOptionSelected,
                    ]}
                  >
                    <Text style={styles.colorInitials}>
                      {getInitials(profileData.fullName)}
                    </Text>
                    {selectedColor === color.id && (
                      <View style={styles.selectedBadge}>
                        <Ionicons name="checkmark" size={16} color={colors.neutralWhite} />
                      </View>
                    )}
                  </LinearGradient>
                  <Text style={styles.colorName}>{color.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: ms(100),
  },
  photoSection: {
    alignItems: 'center',
    gap: responsive.spacing[4],
    paddingVertical: responsive.spacing[6],
  },
  avatar: {
    width: ms(112),
    height: ms(112),
    borderRadius: ms(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: responsive.fontSize.h1,
    fontWeight: '700',
    color: colors.neutralWhite,
  },
  changePhotoButton: {
    height: ms(36),
    paddingHorizontal: responsive.spacing[4],
    borderRadius: theme.borderRadius.lg,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoButtonPressed: {
    opacity: 0.7,
  },
  changePhotoButtonText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.2,
  },
  formSection: {
    gap: responsive.spacing[4],
    paddingHorizontal: responsive.spacing[4],
  },
  inputGroup: {
    gap: responsive.spacing[2],
  },
  label: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDarkest,
  },
  input: {
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.neutralWhite,
    paddingHorizontal: responsive.spacing[4],
    fontSize: responsive.fontSize.md,
    color: colors.neutralDarkest,
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1.5],
  },
  helperText: {
    fontSize: responsive.fontSize.xs,
    color: colors.neutralDark,
  },
  verifyText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.2,
  },
  footer: {
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
  },
  saveButton: {
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: `${colors.primary}80`,
  },
  saveButtonPressed: {
    opacity: 0.9,
  },
  saveButtonText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralWhite,
    letterSpacing: 0.2,
  },
  // Color Picker Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  colorPickerSheet: {
    backgroundColor: colors.neutralWhite,
    borderTopLeftRadius: theme.borderRadius.xl * 2,
    borderTopRightRadius: theme.borderRadius.xl * 2,
    paddingBottom: responsive.spacing[6],
    ...theme.shadows.lg,
  },
  colorPickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  colorPickerTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
  },
  closeButton: {
    width: ms(40),
    height: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOptionsContainer: {
    paddingHorizontal: responsive.spacing[6],
    paddingVertical: responsive.spacing[5],
    gap: responsive.spacing[4],
  },
  colorOptionWrapper: {
    alignItems: 'center',
    gap: responsive.spacing[2],
  },
  colorOption: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    position: 'relative',
  },
  colorOptionSelected: {
    borderColor: colors.neutralDarkest,
    transform: [{ scale: 1.05 }],
  },
  colorInitials: {
    fontSize: responsive.fontSize.h2,
    fontWeight: '700',
    color: colors.neutralWhite,
  },
  selectedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: ms(24),
    height: ms(24),
    borderRadius: ms(12),
    backgroundColor: colors.functionalSuccess,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.neutralWhite,
  },
  colorName: {
    fontSize: responsive.fontSize.xs,
    color: colors.neutralDark,
    textAlign: 'center',
    fontWeight: '500',
  },
});
