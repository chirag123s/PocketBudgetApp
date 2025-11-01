import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive } from '@/constants/responsive';

export interface TabOption {
  id: string;
  label: string;
}

export interface TabSelectorProps {
  options: TabOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  fullWidth?: boolean;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  options,
  selectedId,
  onSelect,
  fullWidth = true,
}) => {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDark: theme.colors.text.secondary,
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[1],
      gap: responsive.spacing[1],
      ...theme.shadows.sm,
    },
    tab: {
      flex: fullWidth ? 1 : 0,
      paddingVertical: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: fullWidth ? undefined : 80,
    },
    tabActive: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDark,
    },
    tabTextActive: {
      color: colors.neutralWhite,
    },
  });

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = selectedId === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
