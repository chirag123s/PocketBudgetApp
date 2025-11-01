import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface InlineDropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  align?: 'left' | 'right';
}

export function InlineDropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select...',
  align = 'right',
}: InlineDropdownProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    primary: theme.colors.info.main,
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const handleToggle = () => {
    if (!isOpen) {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setDropdownLayout({ x, y, width, height });
        setIsOpen(true);
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const styles = StyleSheet.create({
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
      paddingVertical: responsive.spacing[1],
      paddingHorizontal: responsive.spacing[2],
      borderRadius: theme.borderRadius.md,
      backgroundColor: 'transparent',
    },
    triggerText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDark,
    },
    dropdownOverlay: {
      position: 'absolute',
      top: dropdownLayout.y + dropdownLayout.height + 4,
      [align === 'right' ? 'right' : 'left']: align === 'right'
        ? responsive.spacing[4]
        : dropdownLayout.x,
      minWidth: ms(160),
      backgroundColor: colors.neutralWhite,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.lg,
      overflow: 'hidden',
      zIndex: 1000,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.spacing[3],
      paddingHorizontal: responsive.spacing[4],
      gap: responsive.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: `${colors.neutralBg}80`,
    },
    optionItemLast: {
      borderBottomWidth: 0,
    },
    optionItemSelected: {
      backgroundColor: `${colors.primary}0D`,
    },
    optionIconContainer: {
      width: ms(24),
      height: ms(24),
      borderRadius: ms(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionText: {
      flex: 1,
      fontSize: responsive.fontSize.sm,
      fontWeight: '500',
      color: colors.neutralDarkest,
    },
    optionTextSelected: {
      color: colors.primary,
      fontWeight: '600',
    },
    checkmark: {
      width: ms(20),
      height: ms(20),
      borderRadius: ms(10),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View>
      <TouchableOpacity
        ref={triggerRef}
        style={styles.trigger}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.neutralDark}
        />
      </TouchableOpacity>

      {isOpen && (
        <Modal
          transparent
          visible={isOpen}
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)}>
            <View style={styles.dropdownOverlay}>
              {options.map((option, index) => {
                const isSelected = option.value === selectedValue;
                const isLast = index === options.length - 1;

                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionItem,
                      isLast && styles.optionItemLast,
                      isSelected && styles.optionItemSelected,
                    ]}
                    onPress={() => handleSelect(option.value)}
                    activeOpacity={0.7}
                  >
                    {option.icon && (
                      <View style={styles.optionIconContainer}>
                        <Ionicons
                          name={option.icon}
                          size={16}
                          color={isSelected ? colors.primary : colors.neutralDark}
                        />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <Ionicons name="checkmark" size={12} color={colors.neutralWhite} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}
