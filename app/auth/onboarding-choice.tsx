import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { getTheme } from '@/constants/theme';
import { responsive, wp, hp, ms } from '@/constants/responsive';
import { useTheme } from '@/contexts/ThemeContext';

interface OptionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  isRecommended?: boolean;
  gradientColors?: string[];
  borderColor?: string;
  onPress: () => void;
}

const OptionCard = ({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle1,
  subtitle2,
  isRecommended,
  gradientColors,
  borderColor,
  onPress,
}: OptionCardProps) => {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: ms(20),
      padding: responsive.spacing[6],
      borderWidth: 2,
      borderColor: theme.colors.border.light,
    },
    recommendedCard: {
      borderRadius: ms(20),
      padding: responsive.spacing[6],
      borderWidth: 2,
      borderColor: theme.colors.primary[500],
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: responsive.spacing[4],
      right: responsive.spacing[4],
      backgroundColor: theme.colors.primary[600],
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: responsive.spacing[1],
      borderRadius: ms(16),
    },
    badgeText: {
      ...theme.typography.styles.caption,
      fontSize: responsive.fontSize.xs,
      lineHeight: responsive.fontSize.xs * 1.4,
      color: 'white',
      fontWeight: 'bold',
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: responsive.spacing[4],
    },
    iconContainer: {
      width: ms(56),
      height: ms(56),
      borderRadius: ms(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTextContainer: {
      flex: 1,
      paddingTop: responsive.spacing[1],
    },
    cardTitle: {
      ...theme.typography.styles.h3,
      fontSize: responsive.fontSize.h4,
      lineHeight: responsive.fontSize.h4 * 1.3,
      marginBottom: responsive.spacing[2],
    },
    cardSubtitle: {
      ...theme.typography.styles.bodySmall,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
      color: theme.colors.text.secondary,
    },
    chevron: {
      marginTop: responsive.spacing[2],
    },
  });

  const Container = gradientColors ? LinearGradient : View;
  const containerProps = gradientColors
    ? { colors: gradientColors }
    : { style: [styles.card, borderColor && { borderColor }] };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Container {...containerProps} style={isRecommended && styles.recommendedCard}>
        {isRecommended && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Recommended</Text>
          </View>
        )}

        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
            <Ionicons name={icon} size={responsive.layout.iconLg} color={iconColor} />
          </View>

          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle1}</Text>
            <Text style={styles.cardSubtitle}>{subtitle2}</Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={responsive.layout.iconMd}
            color={isRecommended ? theme.colors.primary[600] : theme.colors.text.tertiary}
            style={styles.chevron}
          />
        </View>
      </Container>
    </TouchableOpacity>
  );
};

export default function OnboardingChoiceScreen() {
  const router = useRouter();
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: responsive.spacing[6],
      maxWidth: responsive.layout.maxContentWidth,
      width: '100%',
      alignSelf: 'center',
    },
    title: {
      ...theme.typography.styles.h1,
      fontSize: responsive.fontSize.h2,
      lineHeight: responsive.fontSize.h2 * 1.3,
      marginBottom: responsive.spacing[2],
    },
    description: {
      ...theme.typography.styles.body,
      fontSize: responsive.fontSize.base,
      lineHeight: responsive.fontSize.base * 1.5,
      color: theme.colors.text.secondary,
      marginBottom: responsive.spacing[6],
    },
    optionsContainer: {
      flex: 1,
      gap: responsive.spacing[4],
    },
    helpText: {
      ...theme.typography.styles.bodySmall,
      fontSize: responsive.fontSize.sm,
      lineHeight: responsive.fontSize.sm * 1.5,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginTop: responsive.spacing[4],
    },
  });

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>How do you want to get started?</Text>
        <Text style={styles.description}>
          Choose the best way to set up your budget
        </Text>

        <View style={styles.optionsContainer}>
          {/* Option 1: Connect Bank - Recommended */}
          <OptionCard
            icon="business"
            iconColor="white"
            iconBg={theme.colors.primary[600]}
            title="Connect Bank"
            subtitle1="Auto-sync transactions"
            subtitle2="Quick setup with Open Banking"
            isRecommended
            gradientColors={[theme.colors.primary[50], theme.colors.primary[100]]}
            onPress={() => router.push('/bank/intro')}
          />

          {/* Option 2: Manual Setup */}
          <OptionCard
            icon="create"
            iconColor={theme.colors.info.main}
            iconBg={theme.colors.info.light}
            title="Manual Setup"
            subtitle1="Enter manually"
            subtitle2="More control over your data"
            borderColor={theme.colors.border.light}
            onPress={() => router.push('/budget/welcome')}
          />

          {/* Option 3: Import CSV */}
          <OptionCard
            icon="cloud-upload"
            iconColor={theme.colors.accent.main}
            iconBg={theme.colors.accent.light}
            title="Import CSV"
            subtitle1="Upload file"
            subtitle2="Migrate data from another app"
            borderColor={theme.colors.border.light}
            onPress={() => {
              // TODO: Navigate to CSV import screen
              router.push('/budget/welcome');
            }}
          />
        </View>

        <Text style={styles.helpText}>
          Don't worry, you can always change this later in Settings
        </Text>
      </View>
    </Screen>
  );
}