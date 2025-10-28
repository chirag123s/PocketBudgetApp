import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
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
  appInfoCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[8],
    marginBottom: responsive.spacing[4],
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  appIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing[4],
  },
  appIconText: {
    fontSize: responsive.fontSize.display,
    lineHeight: responsive.fontSize.display * 1.5,
  },
  appName: {
    fontSize: responsive.fontSize.h3,
    lineHeight: responsive.fontSize.h3 * 1.5,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: responsive.spacing[2],
  },
  appVersion: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.tertiary,
    marginBottom: responsive.spacing[4],
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
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[2],
    paddingHorizontal: responsive.spacing[4],
    marginBottom: responsive.spacing[2],
  },
  linkText: {
    ...theme.typography.styles.body,
  },
  footerCard: {
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[6],
    alignItems: 'center',
  },
  footerCopyright: {
    ...theme.typography.styles.body,
    marginBottom: responsive.spacing[1],
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
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    marginHorizontal: responsive.spacing[1],
  },
});
