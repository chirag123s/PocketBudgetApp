import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ContactSupport() {
  const router = useRouter();
  const [issueType, setIssueType] = useState('technical');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSend = () => {
    // Send support message logic
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
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* Issue Type */}
          <Text style={styles.label}>What can we help with?</Text>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{issueType}</Text>
            <Ionicons name="chevron-down" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          {/* Subject */}
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Brief description of your issue"
            placeholderTextColor={theme.colors.text.tertiary}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Please provide as much detail as possible..."
            placeholderTextColor={theme.colors.text.tertiary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Attach Screenshot */}
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={20} color={theme.colors.text.primary} />
            <Text style={styles.attachButtonText}>Attach screenshot</Text>
          </TouchableOpacity>

          {/* Email Display */}
          <View style={styles.emailBox}>
            <Text style={styles.emailLabel}>Your email:</Text>
            <Text style={styles.emailText}>john@email.com</Text>
          </View>

          {/* Send Button */}
          <Button
            variant="primary"
            fullWidth
            size="large"
            onPress={handleSend}
          >
            Send Message
          </Button>
        </View>

        {/* Response Time Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>📧 Average response time</Text>
          <Text style={styles.infoText}>Premium: 4 hours</Text>
          <Text style={styles.infoText}>Free: 24 hours</Text>
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
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  label: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.sm,
    marginTop: theme.responsive.spacing.md,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.md,
  },
  selectButtonText: {
    ...theme.typography.styles.body,
    textTransform: 'capitalize',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.md,
  },
  textArea: {
    minHeight: 120,
    paddingTop: theme.responsive.spacing.sm,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.md,
  },
  attachButtonText: {
    ...theme.typography.styles.button,
    marginLeft: theme.responsive.spacing.sm,
    fontWeight: '600',
  },
  emailBox: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
  },
  emailLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  emailText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: theme.colors.info.light,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    alignItems: 'center',
  },
  infoLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
    marginBottom: theme.responsive.spacing.sm,
  },
  infoText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
  },
});
