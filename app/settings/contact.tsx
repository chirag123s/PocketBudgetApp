import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export default function ContactSupport() {
  const [issueType, setIssueType] = useState('technical');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSend = () => {
    // Send support message logic
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary} edges={['top', 'bottom']}>
      <ScreenHeader title="Contact Support" />

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
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    marginBottom: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  label: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[2],
    marginTop: responsive.spacing[4],
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    marginBottom: responsive.spacing[4],
  },
  selectButtonText: {
    ...theme.typography.styles.body,
    textTransform: 'capitalize',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
    marginBottom: responsive.spacing[4],
  },
  textArea: {
    minHeight: 120,
    paddingTop: responsive.spacing[2],
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    marginBottom: responsive.spacing[4],
  },
  attachButtonText: {
    ...theme.typography.styles.button,
    marginLeft: responsive.spacing[2],
    fontWeight: '600',
  },
  emailBox: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
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
    padding: responsive.spacing[6],
    alignItems: 'center',
  },
  infoLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
    marginBottom: responsive.spacing[2],
  },
  infoText: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
  },
});
