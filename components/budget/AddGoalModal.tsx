import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { BottomSheetModal } from '@/components/ui/BottomSheetModal';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

// Available icons for goals
const availableIcons: Array<keyof typeof Ionicons.glyphMap> = [
  'airplane-outline',
  'car-outline',
  'home-outline',
  'briefcase-outline',
  'school-outline',
  'medical-outline',
  'fitness-outline',
  'bicycle-outline',
  'game-controller-outline',
  'gift-outline',
  'heart-outline',
  'laptop-outline',
  'phone-portrait-outline',
  'camera-outline',
  'watch-outline',
  'diamond-outline',
  'trophy-outline',
  'rocket-outline',
  'umbrella-outline',
  'boat-outline',
  'train-outline',
  'wallet-outline',
  'card-outline',
  'cash-outline',
];

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (goal: {
    name: string;
    icon: string;
    current: number;
    target: number;
    deadline: string;
  }) => void;
}

export function AddGoalModal({ visible, onClose, onSave }: AddGoalModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [goalName, setGoalName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof Ionicons.glyphMap>('trophy-outline');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const colors = {
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    primary: theme.colors.primary[500],
    success: theme.colors.success.main,
    border: theme.colors.border.light,
  };

  const handleSave = () => {
    // Validation
    if (!goalName.trim()) {
      Alert.alert('Error', 'Please enter a goal name');
      return;
    }

    if (!targetAmount || parseFloat(targetAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid target amount');
      return;
    }

    if (!deadline.trim()) {
      Alert.alert('Error', 'Please enter a deadline (e.g., Dec 2025)');
      return;
    }

    const current = currentAmount ? parseFloat(currentAmount) : 0;
    const target = parseFloat(targetAmount);

    if (current < 0) {
      Alert.alert('Error', 'Current amount cannot be negative');
      return;
    }

    if (current > target) {
      Alert.alert('Error', 'Current amount cannot exceed target amount');
      return;
    }

    // Call onSave callback if provided
    if (onSave) {
      onSave({
        name: goalName,
        icon: selectedIcon,
        current,
        target,
        deadline,
      });
    }

    // Reset form
    resetForm();

    // Close modal
    onClose();
  };

  const resetForm = () => {
    setGoalName('');
    setSelectedIcon('trophy-outline');
    setCurrentAmount('');
    setTargetAmount('');
    setDeadline('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Format currency input
  const formatCurrencyInput = (value: string) => {
    // Remove non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  };

  const handleCurrentAmountChange = (value: string) => {
    setCurrentAmount(formatCurrencyInput(value));
  };

  const handleTargetAmountChange = (value: string) => {
    setTargetAmount(formatCurrencyInput(value));
  };

  // Calculate progress percentage for preview
  const getProgressPercentage = () => {
    const current = parseFloat(currentAmount) || 0;
    const target = parseFloat(targetAmount) || 0;
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  return (
    <BottomSheetModal
      visible={visible}
      onClose={handleClose}
      title="Add Savings Goal"
      maxHeight="90%"
      footer={
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => ({
            height: ms(48),
            borderRadius: theme.borderRadius.lg,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
            ...theme.shadows.md,
          })}
        >
          <Text
            style={{
              fontSize: responsive.fontSize.md,
              fontWeight: '700',
              color: colors.neutralWhite,
              letterSpacing: 0.2,
            }}
          >
            Save Goal
          </Text>
        </Pressable>
      }
    >
      {/* Preview */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: responsive.spacing[6],
          backgroundColor: colors.neutralBg,
          borderRadius: theme.borderRadius.lg,
          padding: responsive.spacing[4],
        }}
      >
        <View
          style={{
            width: ms(64),
            height: ms(64),
            borderRadius: ms(32),
            backgroundColor: `${colors.success}20`,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: responsive.spacing[3],
          }}
        >
          <Ionicons
            name={selectedIcon}
            size={ms(32)}
            color={colors.success}
          />
        </View>
        <Text
          style={{
            fontSize: responsive.fontSize.lg,
            fontWeight: '700',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          {goalName || 'Goal Name'}
        </Text>
        <Text
          style={{
            fontSize: responsive.fontSize.md,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[1],
          }}
        >
          ${currentAmount || '0'} / ${targetAmount || '0'}
        </Text>
        {targetAmount && parseFloat(targetAmount) > 0 && (
          <>
            <View
              style={{
                width: '100%',
                height: ms(8),
                backgroundColor: colors.neutralWhite,
                borderRadius: ms(4),
                marginTop: responsive.spacing[2],
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${getProgressPercentage()}%`,
                  height: '100%',
                  backgroundColor: colors.success,
                  borderRadius: ms(4),
                }}
              />
            </View>
            <Text
              style={{
                fontSize: responsive.fontSize.xs,
                color: colors.neutralDark,
                marginTop: responsive.spacing[1],
              }}
            >
              {getProgressPercentage().toFixed(0)}% complete
            </Text>
          </>
        )}
      </View>

      {/* Goal Name */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Goal Name
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.neutralWhite,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: responsive.spacing[4],
            height: ms(48),
            fontSize: responsive.fontSize.md,
            color: colors.neutralDarkest,
          }}
          placeholder="e.g., Europe Trip, New Car"
          placeholderTextColor={colors.neutralMedium}
          value={goalName}
          onChangeText={setGoalName}
          autoFocus
        />
      </View>

      {/* Select Icon */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[3],
          }}
        >
          Select Icon
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -responsive.spacing[1],
          }}
        >
          {availableIcons.map((icon) => (
            <Pressable
              key={icon}
              onPress={() => setSelectedIcon(icon)}
              style={({ pressed }) => ({
                width: '16.666%',
                paddingHorizontal: responsive.spacing[1],
                marginBottom: responsive.spacing[2],
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                style={{
                  aspectRatio: 1,
                  backgroundColor: selectedIcon === icon ? `${colors.success}20` : colors.neutralWhite,
                  borderRadius: theme.borderRadius.md,
                  borderWidth: 2,
                  borderColor: selectedIcon === icon ? colors.success : colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons
                  name={icon}
                  size={ms(24)}
                  color={selectedIcon === icon ? colors.success : colors.neutralDark}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Amount Fields */}
      <View
        style={{
          flexDirection: 'row',
          gap: responsive.spacing[3],
          marginBottom: responsive.spacing[4],
        }}
      >
        {/* Current Amount */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[2],
            }}
          >
            Current Amount
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.neutralWhite,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: responsive.spacing[4],
              height: ms(48),
            }}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.md,
                fontWeight: '600',
                color: colors.neutralDark,
                marginRight: responsive.spacing[1],
              }}
            >
              $
            </Text>
            <TextInput
              style={{
                flex: 1,
                fontSize: responsive.fontSize.md,
                color: colors.neutralDarkest,
                padding: 0,
              }}
              placeholder="0"
              placeholderTextColor={colors.neutralMedium}
              value={currentAmount}
              onChangeText={handleCurrentAmountChange}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Target Amount */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: responsive.fontSize.sm,
              fontWeight: '600',
              color: colors.neutralDarkest,
              marginBottom: responsive.spacing[2],
            }}
          >
            Target Amount *
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.neutralWhite,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: responsive.spacing[4],
              height: ms(48),
            }}
          >
            <Text
              style={{
                fontSize: responsive.fontSize.md,
                fontWeight: '600',
                color: colors.neutralDark,
                marginRight: responsive.spacing[1],
              }}
            >
              $
            </Text>
            <TextInput
              style={{
                flex: 1,
                fontSize: responsive.fontSize.md,
                color: colors.neutralDarkest,
                padding: 0,
              }}
              placeholder="0"
              placeholderTextColor={colors.neutralMedium}
              value={targetAmount}
              onChangeText={handleTargetAmountChange}
              keyboardType="decimal-pad"
            />
          </View>
        </View>
      </View>

      {/* Deadline */}
      <View style={{ marginBottom: responsive.spacing[4] }}>
        <Text
          style={{
            fontSize: responsive.fontSize.sm,
            fontWeight: '600',
            color: colors.neutralDarkest,
            marginBottom: responsive.spacing[2],
          }}
        >
          Deadline *
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.neutralWhite,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: responsive.spacing[4],
            height: ms(48),
            fontSize: responsive.fontSize.md,
            color: colors.neutralDarkest,
          }}
          placeholder="e.g., Dec 2025, Jun 2026"
          placeholderTextColor={colors.neutralMedium}
          value={deadline}
          onChangeText={setDeadline}
        />
        <Text
          style={{
            fontSize: responsive.fontSize.xs,
            color: colors.neutralMedium,
            marginTop: responsive.spacing[1],
            marginLeft: responsive.spacing[1],
          }}
        >
          Enter your target date in a readable format
        </Text>
      </View>
    </BottomSheetModal>
  );
}
