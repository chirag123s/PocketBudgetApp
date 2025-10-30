import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ContactOption {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  isAvailable?: boolean;
}

export default function HelpSupportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I link a new bank account?',
      answer: "To link a new bank account, navigate to the 'Accounts' tab, tap the '+' icon, select your bank from the list, and follow the on-screen prompts to securely log in to your financial institution.",
    },
    {
      id: '2',
      question: 'Is my data secure?',
      answer: 'Yes, your data security is our top priority. We use bank-level 256-bit encryption and do not store your banking credentials on our servers. All data is read-only.',
    },
    {
      id: '3',
      question: 'How are transactions categorized?',
      answer: 'Our app uses a smart categorization engine to automatically assign categories to your transactions. You can also create custom rules and manually re-categorize any transaction as needed.',
    },
    {
      id: '4',
      question: 'Can I set spending budgets?',
      answer: "Absolutely! Go to the 'Budgets' section to create monthly or weekly budgets for different spending categories to help you stay on track with your financial goals.",
    },
  ];

  const contactOptions: ContactOption[] = [
    {
      id: 'email',
      icon: 'mail-outline',
      title: 'Email Support',
      subtitle: "We'll get back to you within 24 hours.",
    },
    {
      id: 'chat',
      icon: 'chatbubble-outline',
      title: 'Start Live Chat',
      subtitle: 'Available now',
      isAvailable: true,
    },
  ];

  const handleKnowledgeBase = () => {
    console.log('Open knowledge base');
  };

  const handleContactOption = (optionId: string) => {
    console.log('Contact option pressed:', optionId);
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <Screen scrollable={false} noPadding backgroundColor={colors.neutralBg} edges={['top']}>
      <ScreenHeader
        title="Help & Support"
        backgroundColor={colors.primary}
        statusBarStyle="light-content"
        iconColor={colors.neutralWhite}
        titleColor={colors.neutralWhite}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color={colors.neutralMedium} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for answers..."
            placeholderTextColor={colors.neutralMedium}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Popular Questions Section */}
        <Text style={styles.sectionTitle}>Popular Questions</Text>

        {/* FAQ Accordion */}
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedFAQ === faq.id;
            const isLast = index === faqs.length - 1;

            return (
              <Pressable
                key={faq.id}
                onPress={() => toggleFAQ(faq.id)}
                style={[
                  styles.faqItem,
                  !isLast && styles.faqItemBorder,
                ]}
              >
                {/* Question */}
                <View style={styles.faqQuestion}>
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color={colors.functionalSuccess}
                    style={{
                      transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                    }}
                  />
                </View>

                {/* Answer */}
                {isExpanded && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Knowledge Base Button */}
        <Pressable
          onPress={handleKnowledgeBase}
          style={({ pressed }) => [
            styles.knowledgeBaseButton,
            pressed && styles.knowledgeBaseButtonPressed,
          ]}
        >
          <Ionicons name="book-outline" size={20} color={colors.primary} />
          <Text style={styles.knowledgeBaseButtonText}>
            Explore our Knowledge Base
          </Text>
        </Pressable>

        {/* Contact Options Section */}
        <Text style={styles.sectionTitle}>Still need help?</Text>

        <View style={styles.contactOptionsContainer}>
          {contactOptions.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => handleContactOption(option.id)}
              style={({ pressed }) => [
                styles.contactOption,
                pressed && styles.contactOptionPressed,
              ]}
            >
              {/* Icon */}
              <View style={styles.contactOptionIcon}>
                <Ionicons
                  name={option.icon}
                  size={24}
                  color={colors.functionalSuccess}
                />
              </View>

              {/* Content */}
              <View style={styles.contactOptionContent}>
                <Text style={styles.contactOptionTitle}>{option.title}</Text>
                <View style={styles.contactOptionSubtitleRow}>
                  {option.isAvailable && <View style={styles.liveIndicator} />}
                  <Text style={styles.contactOptionSubtitle}>
                    {option.subtitle}
                  </Text>
                </View>
              </View>

              {/* Chevron */}
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.neutralMedium}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: responsive.spacing[8],
  },
  searchContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsive.spacing[4],
    paddingBottom: responsive.spacing[3],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    height: ms(48),
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[2],
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    color: colors.neutralDarkest,
  },
  sectionTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    color: colors.neutralDarkest,
    paddingHorizontal: responsive.spacing[4],
    paddingTop: responsive.spacing[6],
    paddingBottom: responsive.spacing[2],
    letterSpacing: -0.3,
  },
  faqContainer: {
    paddingHorizontal: responsive.spacing[4],
  },
  faqItem: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: responsive.spacing[2],
  },
  faqItemBorder: {
    borderBottomWidth: 0,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.spacing[2],
  },
  faqQuestionText: {
    flex: 1,
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    color: colors.neutralDarkest,
    marginRight: responsive.spacing[4],
    lineHeight: responsive.fontSize.sm * 1.4,
  },
  faqAnswer: {
    paddingTop: responsive.spacing[1],
    paddingBottom: responsive.spacing[2],
    paddingRight: responsive.spacing[8],
  },
  faqAnswerText: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
    lineHeight: responsive.fontSize.sm * 1.4,
  },
  knowledgeBaseButton: {
    marginHorizontal: responsive.spacing[4],
    marginVertical: responsive.spacing[6],
    height: ms(48),
    borderRadius: theme.borderRadius.lg,
    backgroundColor: `${colors.primary}33`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive.spacing[2],
  },
  knowledgeBaseButtonPressed: {
    opacity: 0.7,
  },
  knowledgeBaseButtonText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.2,
  },
  contactOptionsContainer: {
    paddingHorizontal: responsive.spacing[4],
    gap: responsive.spacing[3],
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutralWhite,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: responsive.spacing[4],
    gap: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  contactOptionPressed: {
    opacity: 0.7,
  },
  contactOptionIcon: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(24),
    backgroundColor: `${colors.functionalSuccess}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactOptionContent: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.neutralDarkest,
    marginBottom: responsive.spacing[0.5],
  },
  contactOptionSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing[1.5],
  },
  liveIndicator: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(4),
    backgroundColor: colors.functionalSuccess,
  },
  contactOptionSubtitle: {
    fontSize: responsive.fontSize.sm,
    color: colors.neutralDark,
  },
});
