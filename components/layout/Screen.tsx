import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

/**
 * Screen Component
 * Wrapper for all screens providing consistent layout with SafeAreaView
 *
 * Features:
 * - Safe area handling for iOS notch, Android status bar
 * - Keyboard avoidance on iOS
 * - ScrollView option
 * - Consistent padding
 * - Customizable safe area edges
 *
 * Usage:
 * <Screen>
 *   <Text>Content</Text>
 * </Screen>
 *
 * For full-screen modals or custom edge handling:
 * <Screen edges={['bottom']} noPadding>
 *   <Text>Full width content</Text>
 * </Screen>
 */

export interface ScreenProps {
  children: React.ReactNode;
  /** Enable scrolling (default: true) */
  scrollable?: boolean;
  /** Remove default padding (default: false) */
  noPadding?: boolean;
  /** Background color (default: theme.colors.background.secondary) */
  backgroundColor?: string;
  /** Safe area edges to apply (default: ['top', 'bottom'] for iOS/Android) */
  edges?: readonly Edge[];
  /** Additional style for the content container */
  contentStyle?: ViewStyle;
  /** Disable safe area view entirely (default: false) */
  disableSafeArea?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = true,
  noPadding = false,
  backgroundColor = theme.colors.background.secondary,
  edges = ['top', 'bottom'],
  contentStyle: customContentStyle,
  disableSafeArea = false,
}) => {
  // 🔍 Check for string-to-boolean issues
  if (typeof scrollable !== 'boolean') {
    console.error('❌ Screen prop ERROR: scrollable is', typeof scrollable, '- value:', scrollable);
  }
  if (typeof noPadding !== 'boolean') {
    console.error('❌ Screen prop ERROR: noPadding is', typeof noPadding, '- value:', noPadding);
  }

  const contentStyle = [
    styles.content,
    !noPadding && styles.contentWithPadding,
    { backgroundColor },
    customContentStyle,
  ];

  // Choose container based on platform and disableSafeArea prop
  const Container = Platform.OS === 'web' || disableSafeArea ? View : SafeAreaView;

  // Safe area props only apply to SafeAreaView
  const containerProps = Platform.OS !== 'web' && !disableSafeArea
    ? { style: styles.container, edges }
    : { style: styles.container };

  // 🔍 Check ScrollView props
  const showsVerticalScrollIndicator = false;
  if (typeof showsVerticalScrollIndicator !== 'boolean') {
    console.error('❌ ScrollView prop ERROR: showsVerticalScrollIndicator is', typeof showsVerticalScrollIndicator);
  }

  return (
    <Container {...containerProps}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={contentStyle}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            bounces={true}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={contentStyle}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  contentWithPadding: {
    padding: theme.spacing[6],
  },
});
