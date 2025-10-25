import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface HelpTopic {
  title: string;
  items: string[];
}

const helpTopics: HelpTopic[] = [
  {
    title: 'Getting Started',
    items: [
      'How to connect bank',
      'Create your first budget',
      'Understanding categories',
    ],
  },
  {
    title: 'Common Questions',
    items: [
      "Why isn't my bank syncing?",
      'How do I change my budget period?',
      "What's the difference between Free & Premium?",
    ],
  },
  {
    title: 'Troubleshooting',
    items: [
      'Bank connection fails',
      'Missing transactions',
      'App crashes',
    ],
  },
];

export default function HelpCenter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Search */}
        <View style={styles.searchCard}>
          <Ionicons name="search" size={20} color={theme.colors.text.tertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search help..."
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        {/* Help Topics */}
        {helpTopics.map((topic, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <View style={styles.topicsList}>
              {topic.items.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.topicItem}>
                  <Text style={styles.topicText}>{item}</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.colors.text.tertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Browse All Articles</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Video Tutorials</Text>
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
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: theme.responsive.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    marginBottom: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  cardTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.md,
  },
  topicsList: {
    gap: theme.responsive.spacing.sm,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
  },
  topicText: {
    ...theme.typography.styles.body,
    flex: 1,
  },
  actionsContainer: {
    gap: theme.responsive.spacing.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  primaryButtonText: {
    ...theme.typography.styles.button,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
});
