import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { formatCurrency } from '@/utils/currency';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  type: 'bank' | 'savings' | 'credit' | 'investment';
  accountNumber?: string;
  bankName?: string;
  change?: number;
}

interface BankAccountCardProps {
  account: BankAccount;
  isActive: boolean;
  isNext: boolean;
  colors: any;
  theme: any;
  onPress: () => void;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({
  account,
  isActive,
  isNext,
  colors,
  theme: appTheme,
  onPress,
}) => {
  // Use reanimated shared values for smooth animations
  const scale = useSharedValue(isActive ? 1 : 0.97);
  const translateY = useSharedValue(isActive ? 0 : -16);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1 : 0.97, {
      damping: 15,
      stiffness: 150,
    });
    translateY.value = withSpring(isActive ? 0 : -16, {
      damping: 15,
      stiffness: 150,
    });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  // Map account types to gradient colors using theme
  const getCardGradient = (type: BankAccount['type']) => {
    switch (type) {
      case 'savings':
        return [appTheme.colors.info.main, appTheme.colors.info.light];
      case 'bank':
        return [appTheme.colors.success.main, appTheme.colors.success.light];
      case 'credit':
        return [appTheme.colors.danger.main, appTheme.colors.danger.light];
      case 'investment':
        return [appTheme.colors.primary[600], appTheme.colors.primary[400]];
      default:
        return [appTheme.colors.primary[600], appTheme.colors.primary[400]];
    }
  };

  const cardWidth = width - responsive.spacing[5] * 2 - responsive.spacing[10];

  const styles = StyleSheet.create({
    cardContainer: {
      width: cardWidth,
      height: ms(160),
      marginBottom: isNext ? -ms(140) : 0, // Overlap next card (show 30px peek)
    },
    card: {
      width: '100%',
      height: ms(160),
      borderRadius: appTheme.borderRadius.lg,
      backgroundColor: colors.cardBg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    topSection: {
      height: ms(50),
      borderTopLeftRadius: appTheme.borderRadius.lg,
      borderTopRightRadius: appTheme.borderRadius.lg,
      overflow: 'hidden',
    },
    gradient: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[4],
    },
    leftContent: {
      flex: 1,
    },
    accountName: {
      color: '#FFFFFF',
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
    },
    bankName: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: responsive.fontSize.xs,
      marginTop: responsive.spacing[1],
    },
    iconContainer: {
      width: ms(32),
      height: ms(32),
      borderRadius: ms(16),
      backgroundColor: 'rgba(255,255,255,0.25)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContent: {
      backgroundColor: colors.cardBg,
      padding: responsive.spacing[4],
      flex: 1,
      justifyContent: 'space-between',
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: responsive.spacing[2],
    },
    balanceLabel: {
      fontSize: responsive.fontSize.xs,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    balance: {
      fontSize: responsive.fontSize['2xl'],
      fontWeight: '700',
      color: colors.textPrimary,
    },
    accountInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: responsive.spacing[3],
    },
    accountNumber: {
      fontSize: responsive.fontSize.xs,
      color: colors.textTertiary,
    },
    changeText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '600',
      color: colors.textSecondary,
    },
  });

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        animatedStyle,
        {
          zIndex: isActive ? 10 : 5,
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1 }}>
        <View style={styles.card}>
          <View style={styles.topSection}>
            <LinearGradient
              colors={getCardGradient(account.type)}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.leftContent}>
                <Text style={styles.accountName} numberOfLines={1}>
                  {account.name}
                </Text>
                {account.bankName && (
                  <Text style={styles.bankName} numberOfLines={1}>
                    {account.bankName}
                  </Text>
                )}
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name={account.icon} size={ms(18)} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={styles.balance}>{formatCurrency(account.balance)}</Text>
            </View>

            <View style={styles.accountInfo}>
              <Text style={styles.accountNumber}>
                {account.accountNumber ||
                  account.type.charAt(0).toUpperCase() + account.type.slice(1)}
              </Text>
              {account.change !== undefined && (
                <Text
                  style={[
                    styles.changeText,
                    { color: account.change >= 0 ? colors.success : colors.danger },
                  ]}
                >
                  {account.change >= 0 ? '+' : ''}
                  {formatCurrency(account.change)}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export interface BankAccountsWidgetProps {
  accounts: BankAccount[];
  onViewAll?: () => void;
  onAccountPress?: (account: BankAccount) => void;
}

export const BankAccountsWidget: React.FC<BankAccountsWidgetProps> = ({
  accounts,
  onViewAll,
  onAccountPress,
}) => {
  const { theme: themeMode } = useTheme();
  const appTheme = getTheme(themeMode);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const colors = {
    cardBg: appTheme.colors.background.secondary,
    textPrimary: appTheme.colors.text.primary,
    textSecondary: appTheme.colors.text.secondary,
    textTertiary: appTheme.colors.text.tertiary,
    border: appTheme.colors.border.light,
    neutralWhite: appTheme.colors.background.primary,
    neutralDarkest: appTheme.colors.text.primary,
    primary: appTheme.colors.info.main,
    success: appTheme.colors.success.main,
    danger: appTheme.colors.danger.main,
  };

  // Gesture handling
  const translateY = useSharedValue(0);
  const contextY = useSharedValue(0);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const goToNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveCardIndex((prev) => (prev + 1) % accounts.length);
  };

  const goToPrevious = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveCardIndex((prev) => (prev - 1 + accounts.length) % accounts.length);
  };

  // Pan gesture for swipe with restricted movement
  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Clamp movement to max 3 pixels
      const maxMovement = 5;
      const clampedTranslation = Math.max(
        -maxMovement,
        Math.min(maxMovement, event.translationY)
      );
      translateY.value = contextY.value + clampedTranslation;
    })
    .onEnd((event) => {
      const swipeThreshold = 20; // Lower threshold for more sensitive swipe

      if (event.translationY < -swipeThreshold) {
        // Swiped up - go to previous
        runOnJS(goToPrevious)();
      } else if (event.translationY > swipeThreshold) {
        // Swiped down - go to next
        runOnJS(goToNext)();
      }

      // Reset position with spring animation
      translateY.value = withSpring(0, {
        damping: 50,
        stiffness: 200,
      });
    });

  // Animated style for swipe gesture with subtle movement
  const swipeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const styles = StyleSheet.create({
    widget: {
      backgroundColor: colors.neutralWhite,
      borderRadius: appTheme.borderRadius.xl,
      padding: responsive.spacing[5],
      ...appTheme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[4],
    },
    headerLeft: {
      flex: 1,
    },
    title: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    accountCount: {
      fontSize: responsive.fontSize.sm,
      color: colors.textTertiary,
      marginTop: responsive.spacing[1],
    },
    viewAllButton: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: colors.primary,
    },
    cardsContainer: {
      marginTop: responsive.spacing[2],
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: responsive.spacing[8],
    },
    emptyText: {
      fontSize: responsive.fontSize.sm,
      color: appTheme.colors.text.tertiary,
      marginTop: responsive.spacing[2],
    },
    tapHint: {
      alignItems: 'center',
      marginTop: responsive.spacing[3],
    },
    tapHintText: {
      fontSize: responsive.fontSize.xs,
      color: colors.textTertiary,
      fontStyle: 'italic',
    },
  });

  if (!accounts || accounts.length === 0) {
    return (
      <View style={styles.widget}>
        <View style={styles.header}>
          <Text style={styles.title}>Accounts</Text>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="wallet-outline" size={ms(48)} color={appTheme.colors.text.tertiary} />
          <Text style={styles.emptyText}>No accounts connected</Text>
        </View>
      </View>
    );
  }

  // Get active account and next account
  const activeAccount = accounts[activeCardIndex];
  const nextCardIndex = (activeCardIndex + 1) % accounts.length;
  const nextAccount = accounts.length > 1 ? accounts[nextCardIndex] : null;

  return (
    <View style={styles.widget}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Accounts</Text>
          <Text style={styles.accountCount}>
            {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'}
          </Text>
        </View>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardsContainer, swipeAnimatedStyle]}>
          {/* Show next card first (behind) */}
          {nextAccount && (
            <BankAccountCard
              key={`next-${nextAccount.id}`}
              account={nextAccount}
              isActive={false}
              isNext={true}
              colors={colors}
              theme={appTheme}
              onPress={goToNext}
            />
          )}

          {/* Show active card on top */}
          <BankAccountCard
            key={`active-${activeAccount.id}`}
            account={activeAccount}
            isActive={true}
            isNext={false}
            colors={colors}
            theme={appTheme}
            onPress={() => {
              if (onAccountPress) {
                onAccountPress(activeAccount);
              }
            }}
          />
        </Animated.View>
      </GestureDetector>

      {accounts.length > 1 && (
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>Swipe to switch accounts</Text>
        </View>
      )}
    </View>
  );
};
