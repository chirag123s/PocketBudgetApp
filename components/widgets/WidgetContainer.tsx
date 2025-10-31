import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';
import { responsive } from '@/constants/responsive';

export interface WidgetContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: responsive.spacing[4],
  },
});
