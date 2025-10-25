import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutApp() {
  const router = useRouter();

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
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* App Info */}
        <View style={styles.appInfoCard}>
          <LinearGradient
            colors={[theme.colors.primary[400], theme.colors.primary[600]]}
            style={styles.appIcon}
          >
            <Text style={styles.appIconText}>💰</Text>
          </LinearGradient>
          <Text style={styles.appName}>PocketBudget</Text>
          <Text style={styles.appVersion}>Version 1.0.0 (Build 23)</Text>
          <Text style={styles.appTagline}>
            "The Australian budgeting app you've been waiting for"
          </Text>
        </View>

        {/* Legal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Legal</Text>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Licenses</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Security */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security</Text>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Security Overview</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Data Encryption Info</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Company */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Company</Text>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Website</Text>
            <Ionicons name="open-outline" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Blog</Text>
            <Ionicons name="open-outline" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Twitter</Text>
            <Ionicons name="open-outline" size={16} color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <LinearGradient
          colors={[theme.colors.primary[50], '#DBEAFE']}
          style={styles.footerCard}
        >
          <Text style={styles.footerCopyright}>© 2025 PocketBudget</Text>
          <View style={styles.footerMadeWith}>
            <Text style={styles.footerText}>Made with</Text>
            <Text style={styles.footerHeart}>❤️</Text>
            <Text style={styles.footerText}>in Australia</Text>
          </View>
        </LinearGradient>
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
  appInfoCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.xl,
    marginBottom: theme.responsive.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  appIcon: {
    width: theme.responsive.moderateScale(96),
    height: theme.responsive.moderateScale(96),
    borderRadius: theme.responsive.scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.responsive.spacing.md,
  },
  appIconText: {
    fontSize: theme.responsive.moderateScale(40),
  },
  appName: {
    fontSize: theme.responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.sm,
  },
  appVersion: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
    marginBottom: theme.responsive.spacing.md,
  },
  appTagline: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
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
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.sm,
    paddingHorizontal: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.sm,
  },
  linkText: {
    ...theme.typography.styles.body,
  },
  footerCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.getScreenPadding(),
    alignItems: 'center',
  },
  footerCopyright: {
    ...theme.typography.styles.body,
    marginBottom: theme.responsive.spacing.xs,
  },
  footerMadeWith: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.secondary,
  },
  footerHeart: {
    fontSize: theme.responsive.fontSize.body,
    marginHorizontal: theme.responsive.spacing.xs,
  },
});
