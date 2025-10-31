import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
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
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    background: theme.colors.background.primary,
    backgroundSecondary: theme.colors.background.secondary,
    backgroundTertiary: theme.colors.background.tertiary,
    textPrimary: theme.colors.text.primary,
    textSecondary: theme.colors.text.secondary,
    textTertiary: theme.colors.text.tertiary,
    borderLight: theme.colors.border.light,
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[6],
      paddingVertical: responsive.spacing[2],
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    backButton: {
      padding: responsive.spacing[2],
    },
    headerTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
      color: colors.textPrimary,
    },
    searchContainer: {
      padding: responsive.spacing[4],
      backgroundColor: colors.backgroundSecondary,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: responsive.spacing[4],
      paddingVertical: responsive.spacing[2],
      ...theme.shadows.sm,
    },
    searchInput: {
      flex: 1,
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      paddingVertical: 0,
      color: colors.textPrimary,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: responsive.spacing[6],
      paddingBottom: responsive.spacing[4],
    },
    sectionHeader: {
      ...theme.typography.styles.label,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      marginTop: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[2],
    },
    bankItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      padding: responsive.spacing[4],
      marginBottom: responsive.spacing[2],
      borderRadius: 20,
      ...theme.shadows.sm,
    },
    bankInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[2],
    },
    bankLogo: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bankLogoText: {
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.5,
    },
    bankName: {
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    bankTime: {
      ...theme.typography.styles.caption,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.5,
      color: colors.textSecondary,
    },
    footer: {
      marginTop: responsive.spacing[4],
      marginBottom: responsive.spacing[8],
    },
    cantFindButton: {
      backgroundColor: colors.background,
      padding: responsive.spacing[4],
      borderRadius: 20,
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    cantFindText: {
      ...theme.typography.styles.button,
      fontSize: responsive.fontSize.md,
      lineHeight: responsive.fontSize.md * 1.5,
      color: colors.textPrimary,
    },
  });

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
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <Screen noPadding backgroundColor={colors.backgroundSecondary}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.backgroundSecondary} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Your Bank</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search banks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textTertiary}
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
