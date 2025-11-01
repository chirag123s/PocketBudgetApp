import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface ChartTypeOption {
  value: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description?: string;
}

interface ChartTypeModalProps {
  visible: boolean;
  onClose: () => void;
  currentType: string;
  options: ChartTypeOption[];
  onSelectType: (type: string) => void;
}

export function ChartTypeModal({
  visible,
  onClose,
  currentType,
  options,
  onSelectType,
}: ChartTypeModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    primary: theme.colors.info.main,
  };

  const handleSelect = (type: string) => {
    onSelectType(type);
    onClose();
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[4],
    },
    modalContent: {
      width: '100%',
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.xl,
      padding: responsive.spacing[4],
      ...theme.shadows.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[4],
    },
    title: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    closeButton: {
      width: ms(32),
      height: ms(32),
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionsList: {
      gap: responsive.spacing[2],
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      borderWidth: 2,
      borderColor: colors.neutralBg,
      gap: responsive.spacing[3],
    },
    optionCardSelected: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}0D`,
    },
    optionIcon: {
      width: ms(40),
      height: ms(40),
      borderRadius: ms(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionLabel: {
      flex: 1,
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    checkIcon: {
      width: ms(24),
      height: ms(24),
      borderRadius: ms(12),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Select Chart Type</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color={colors.neutralDark} />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {options.map((option) => {
                const isSelected = option.value === currentType;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                    ]}
                    onPress={() => handleSelect(option.value)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.optionIcon,
                        {
                          backgroundColor: isSelected
                            ? `${colors.primary}20`
                            : colors.neutralBg,
                        },
                      ]}
                    >
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={isSelected ? colors.primary : colors.neutralDark}
                      />
                    </View>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {isSelected && (
                      <View style={styles.checkIcon}>
                        <Ionicons name="checkmark" size={16} color={colors.neutralWhite} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
