import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Bank {
  name: string;
  logo: string;
  time: string;
  supported: boolean;
}

const banksData = {
  popular: [
    { name: 'Commonwealth Bank', logo: '🏦', time: '~2 min', supported: true },
    { name: 'Westpac', logo: '🏦', time: '~2 min', supported: true },
    { name: 'ANZ', logo: '🏦', time: '~2 min', supported: true },
    { name: 'NAB', logo: '🏦', time: '~2 min', supported: true },
  ],
  all: [
    { name: 'Bank of Melbourne', logo: '🏦', time: '~3 min', supported: true },
    { name: 'Bank of Queensland', logo: '🏦', time: '~3 min', supported: true },
    { name: 'Bendigo Bank', logo: '🏦', time: '~3 min', supported: true },
    { name: 'ING', logo: '🏦', time: '~2 min', supported: true },
    { name: 'Macquarie Bank', logo: '🏦', time: '~3 min', supported: true },
    { name: 'St.George Bank', logo: '🏦', time: '~2 min', supported: true },
  ],
};

export default function BankSelection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const renderBankItem = ({ item }: { item: Bank }) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => router.push('/bank/account-selection')}
    >
      <View style={styles.bankInfo}>
        <View style={styles.bankLogo}>
          <Text style={styles.bankLogoText}>{item.logo}</Text>
        </View>
        <View>
          <Text style={styles.bankName}>{item.name}</Text>
          <Text style={styles.bankTime}>{item.time}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Your Bank</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search banks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>
      </View>

      {/* Banks List */}
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={[
          { type: 'header', title: 'Popular Banks' },
          ...banksData.popular,
          { type: 'header', title: 'All Banks (A-Z)' },
          ...banksData.all,
        ]}
        renderItem={({ item }: { item: any }) => {
          if (item.type === 'header') {
            return (
              <Text style={styles.sectionHeader}>{item.title}</Text>
            );
          }
          return renderBankItem({ item });
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cantFindButton}
              onPress={() => {/* Navigate to manual setup */}}
            >
              <Text style={styles.cantFindText}>Can't Find Your Bank? →</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.h3,
  },
  searchContainer: {
    padding: theme.responsive.spacing.md,
    backgroundColor: theme.colors.background.secondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(20),
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    ...theme.shadows.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    paddingVertical: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.md,
  },
  sectionHeader: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.label,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    marginTop: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.sm,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.primary,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
    borderRadius: theme.responsive.scale(20),
    ...theme.shadows.sm,
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.responsive.spacing.sm,
  },
  bankLogo: {
    width: theme.responsive.moderateScale(48),
    height: theme.responsive.moderateScale(48),
    borderRadius: theme.responsive.scale(12),
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankLogoText: {
    fontSize: theme.responsive.fontSize.h3,
  },
  bankName: {
    ...theme.typography.styles.body,
    fontSize: theme.responsive.fontSize.body,
    fontWeight: '600',
  },
  bankTime: {
    ...theme.typography.styles.caption,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.secondary,
  },
  footer: {
    marginTop: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.xl,
  },
  cantFindButton: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.responsive.spacing.md,
    borderRadius: theme.responsive.scale(20),
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  cantFindText: {
    ...theme.typography.styles.button,
    fontSize: theme.responsive.fontSize.button,
    color: theme.colors.text.primary,
  },
});
