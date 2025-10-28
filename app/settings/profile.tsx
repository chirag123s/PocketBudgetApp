import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileEdit() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('john@email.com');
  const [phone, setPhone] = useState('04XX XXX XXX');

  const handleSave = () => {
    // Save logic
    router.back();
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Photo */}
        <View style={styles.photoCard}>
          <LinearGradient
            colors={[theme.colors.primary[400], theme.colors.primary[600]]}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>JS</Text>
          </LinearGradient>
          <TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>

          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.colors.text.tertiary}
            />
            <View style={styles.verifiedRow}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.success.main} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone (Optional)</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="04XX XXX XXX"
              keyboardType="phone-pad"
              placeholderTextColor={theme.colors.text.tertiary}
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Changes Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={handleSave}
          style={styles.saveButton}
        >
          Save Changes
        </Button>

        {/* Account Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Actions</Text>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: responsive.spacing[2],
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  photoCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  avatarGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing[4],
  },
  avatarText: {
    fontSize: responsive.fontSize.h2,
    lineHeight: responsive.fontSize.h2 * 1.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  changePhotoText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    marginBottom: responsive.spacing[4],
  },
  inputGroup: {
    marginBottom: responsive.spacing[4],
  },
  label: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[2],
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive.spacing[2],
  },
  verifiedText: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginLeft: responsive.spacing[2],
  },
  verifyButton: {
    marginTop: responsive.spacing[2],
  },
  verifyButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.primary[600],
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  saveButton: {
    marginBottom: responsive.spacing[4],
  },
  actionButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
  },
  actionButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.primary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger.light,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    alignItems: 'center',
  },
  deleteButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.danger.dark,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
});
