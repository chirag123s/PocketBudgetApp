import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

/**
 * Screen Component
 * Wrapper for all screens providing consistent layout
 *
 * Features:
 * - Safe area handling
 * - Keyboard avoidance
 * - ScrollView option
 * - Consistent padding
 */

export interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  noPadding?: boolean;
  backgroundColor?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = true,
  noPadding = false,
  backgroundColor = theme.colors.background.secondary,
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
  ];

  // On web, we use a regular View. On native, we use SafeAreaView
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  // 🔍 Check ScrollView props
  const showsVerticalScrollIndicator = false;
  if (typeof showsVerticalScrollIndicator !== 'boolean') {
    console.error('❌ ScrollView prop ERROR: showsVerticalScrollIndicator is', typeof showsVerticalScrollIndicator);
  }

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? (
          <ScrollView
            contentContainerStyle={contentStyle}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
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
