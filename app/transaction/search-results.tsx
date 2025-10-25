import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SearchResult {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  location: string;
}

const sampleSearchResults: SearchResult[] = [
  {
    id: 1,
    name: 'Coles Supermarket',
    category: 'Groceries',
    amount: -45.3,
    date: 'Oct 25',
    location: 'Sydney CBD',
  },
  {
    id: 2,
    name: 'Coles Express',
    category: 'Transport',
    amount: -67.0,
    date: 'Oct 20',
    location: 'Parramatta',
  },
  {
    id: 3,
    name: 'Coles Supermarket',
    category: 'Groceries',
    amount: -89.2,
    date: 'Oct 15',
    location: 'Bondi Junction',
  },
  {
    id: 4,
    name: 'Coles Online',
    category: 'Groceries',
    amount: -125.5,
    date: 'Oct 10',
    location: 'Online',
  },
  {
    id: 5,
    name: 'Coles Supermarket',
    category: 'Groceries',
    amount: -52.4,
    date: 'Sep 28',
    location: 'Sydney CBD',
  },
  {
    id: 6,
    name: 'Coles Express',
    category: 'Transport',
    amount: -45.0,
    date: 'Sep 25',
    location: 'Chatswood',
  },
  {
    id: 7,
    name: 'Coles Supermarket',
    category: 'Groceries',
    amount: -78.9,
    date: 'Sep 18',
    location: 'Westfield Sydney',
  },
];

const filterOptions = ['All Results', 'Groceries Only', 'Over $50', 'This Year'];

export default function TransactionSearchResults() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('coles');
  const [selectedFilter, setSelectedFilter] = useState('All Results');

  const totalResults = sampleSearchResults.length;
  const thisMonthResults = sampleSearchResults.filter((r) => r.date.includes('Oct'));
  const lastMonthResults = sampleSearchResults.filter((r) => r.date.includes('Sep'));

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header with Search */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search transactions..."
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>
      </View>

      <View style={styles.clearButtonContainer}>
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Results Summary */}
        <LinearGradient
          colors={[theme.colors.primary[400], theme.colors.primary[600]]}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryNumber}>{totalResults} results</Text>
          <Text style={styles.summaryText}>
            Found "{searchQuery}" in your transactions
          </Text>
        </LinearGradient>

        {/* This Month Results */}
        {thisMonthResults.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>This Month</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{thisMonthResults.length}</Text>
              </View>
            </View>

            {thisMonthResults.map((result) => (
              <TouchableOpacity key={result.id} style={styles.resultCard}>
                <View style={styles.resultContent}>
                  <View style={styles.resultLeft}>
                    <Text style={styles.resultName}>{result.name}</Text>
                    <View style={styles.resultMeta}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{result.category}</Text>
                      </View>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.resultLocation}>{result.location}</Text>
                    </View>
                  </View>
                  <View style={styles.resultRight}>
                    <Text style={styles.resultAmount}>
                      ${Math.abs(result.amount).toFixed(2)}
                    </Text>
                    <Text style={styles.resultDate}>{result.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Last Month Results */}
        {lastMonthResults.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Last Month</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{lastMonthResults.length}</Text>
              </View>
            </View>

            {lastMonthResults.map((result) => (
              <TouchableOpacity key={result.id} style={styles.resultCard}>
                <View style={styles.resultContent}>
                  <View style={styles.resultLeft}>
                    <Text style={styles.resultName}>{result.name}</Text>
                    <View style={styles.resultMeta}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{result.category}</Text>
                      </View>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.resultLocation}>{result.location}</Text>
                    </View>
                  </View>
                  <View style={styles.resultRight}>
                    <Text style={styles.resultAmount}>
                      ${Math.abs(result.amount).toFixed(2)}
                    </Text>
                    <Text style={styles.resultDate}>{result.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Save Search (Premium) */}
        <View style={styles.premiumCard}>
          <View style={styles.premiumHeader}>
            <Text style={styles.premiumTitle}>Save this search?</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </View>
          <Text style={styles.premiumDescription}>
            Get notified when new transactions match "{searchQuery}"
          </Text>
          <Button variant="primary" fullWidth onPress={() => {}}>
            Save Search
          </Button>
        </View>
      </ScrollView>

      {/* Quick Filters - Fixed at Bottom */}
      <View style={styles.filterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.responsive.spacing.md,
    paddingTop: theme.responsive.spacing.md,
    paddingBottom: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    gap: theme.responsive.spacing.sm,
  },
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    gap: theme.responsive.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.styles.body,
    color: theme.colors.text.primary,
  },
  clearButtonContainer: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  clearButton: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.primary[600],
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: 100, // Space for filter bar
  },
  summaryCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
    ...theme.shadows.lg,
  },
  summaryNumber: {
    fontSize: theme.responsive.fontSize.h1,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: theme.responsive.spacing.sm,
  },
  summaryText: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    marginBottom: theme.responsive.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  countBadge: {
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
  },
  countBadgeText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  resultCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    ...theme.shadows.sm,
  },
  resultContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resultLeft: {
    flex: 1,
    marginRight: theme.responsive.spacing.md,
  },
  resultName: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
    marginBottom: theme.responsive.spacing.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
  },
  categoryBadgeText: {
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  metaDot: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  resultLocation: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  resultRight: {
    alignItems: 'flex-end',
  },
  resultAmount: {
    fontSize: theme.responsive.fontSize.h4,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: theme.responsive.spacing.xs,
  },
  resultDate: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
  },
  premiumCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    borderWidth: 2,
    borderColor: '#FEF3C7',
    ...theme.shadows.sm,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  premiumTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  premiumBadge: {
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 4,
    backgroundColor: theme.colors.warning.light,
    borderRadius: theme.borderRadius.full,
  },
  premiumBadgeText: {
    fontSize: theme.responsive.fontSize.caption,
    fontWeight: '700',
    color: theme.colors.warning.dark,
  },
  premiumDescription: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.md,
  },
  filterBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    paddingVertical: theme.responsive.spacing.md,
  },
  filterScrollContent: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    gap: theme.responsive.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary[600],
  },
  filterChipText: {
    ...theme.typography.styles.bodySmall,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
});
