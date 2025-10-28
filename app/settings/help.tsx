import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
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
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[6],
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: responsive.spacing[2],
  },
  searchInput: {
    flex: 1,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
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
  topicsList: {
    gap: responsive.spacing[2],
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
  },
  topicText: {
    ...theme.typography.styles.body,
    flex: 1,
  },
  actionsContainer: {
    gap: responsive.spacing[2],
  },
  primaryButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
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
    padding: responsive.spacing[2],
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
});
