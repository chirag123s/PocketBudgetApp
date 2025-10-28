import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';

interface BottomButtonProps {
  text: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

const colors = {
  primary: theme.colors.info.main,
  neutralWhite: theme.colors.background.primary,
  neutralBg: theme.colors.background.secondary,
};

export const BottomButton: React.FC<BottomButtonProps> = ({
  text,
  onPress,
  icon = 'add',
}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.addButton} activeOpacity={0.9} onPress={onPress}>
        <Ionicons name={icon} size={24} color={colors.neutralWhite} />
        <Text style={styles.addButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: responsive.spacing[4],
    paddingBottom: responsive.spacing[6],
    backgroundColor: colors.neutralBg,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.xl,
    gap: responsive.spacing[2],
    ...theme.shadows.lg,
  },
  addButtonText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '700',
    color: colors.neutralWhite,
  },
});
