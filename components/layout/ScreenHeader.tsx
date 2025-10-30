import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

interface ScreenHeaderProps {
  /**
   * The title text displayed in the center of the header
   */
  title: string;

  /**
   * Optional custom back button handler. Defaults to router.back()
   */
  onBackPress?: () => void;

  /**
   * Show or hide the back button. Defaults to true
   */
  showBackButton?: boolean;

  /**
   * Icon name for the back button. Defaults to 'chevron-back'
   */
  backIconName?: keyof typeof Ionicons.glyphMap;

  /**
   * Optional right element (action button, icon, etc.)
   */
  rightElement?: React.ReactNode;

  /**
   * Background color of the header. Defaults to theme background primary
   */
  backgroundColor?: string;

  /**
   * Status bar style. Defaults to 'dark-content'
   */
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';

  /**
   * Color for the back icon. Defaults to theme info.main
   */
  iconColor?: string;

  /**
   * Color for the title text. Defaults to theme text.primary
   */
  titleColor?: string;

  /**
   * Additional style for the header container
   */
  style?: ViewStyle;
}

export function ScreenHeader({
  title,
  onBackPress,
  showBackButton = true,
  backIconName = 'chevron-back',
  rightElement,
  backgroundColor = theme.colors.background.primary,
  statusBarStyle = 'dark-content',
  iconColor = theme.colors.info.main,
  titleColor = theme.colors.text.primary,
  style,
}: ScreenHeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      <View style={[styles.header, { backgroundColor }, style]}>
        {/* Left - Back Button or Placeholder */}
        {showBackButton ? (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={backIconName}
              size={ms(24)}
              color={iconColor}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        {/* Center - Title */}
        <Text style={[styles.headerTitle, { color: titleColor }]} numberOfLines={1}>
          {title}
        </Text>

        {/* Right - Custom Element or Placeholder */}
        {rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerButton: {
    padding: responsive.spacing[2],
    minWidth: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: ms(40),
    padding: responsive.spacing[2],
  },
  rightElement: {
    minWidth: ms(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
