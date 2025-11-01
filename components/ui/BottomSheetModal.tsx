import React, { ReactNode, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { useTheme } from '@/contexts/ThemeContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
  showHeader?: boolean;
  showHandle?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
  footer?: ReactNode;
}

export function BottomSheetModal({
  visible,
  onClose,
  title,
  children,
  headerRight,
  showHeader = true,
  showHandle = true,
  scrollable = true,
  maxHeight = '85%',
  footer,
}: BottomSheetModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const insets = useSafeAreaInsets();

  const colors = {
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralMedium: theme.colors.text.tertiary,
  };

  // Animation values
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const dragOffset = useRef(0);

  // Gesture handling for handle only
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond if dragging vertically with significant movement
        return Math.abs(gestureState.dy) > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down
        if (gestureState.dy > 0) {
          dragOffset.current = gestureState.dy;
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const shouldClose = gestureState.dy > 150 || gestureState.vy > 0.5;

        if (shouldClose) {
          handleClose();
        } else {
          // Snap back to position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 300,
          }).start();
        }
        dragOffset.current = 0;
      },
    })
  ).current;

  // Open animation
  useEffect(() => {
    if (visible) {
      // Reset position
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);

      // Start animations
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 25,
          stiffness: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Close animation
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingTop: insets.top,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.neutralWhite,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      maxHeight,
      paddingBottom: insets.bottom,
    },
    handleBar: {
      width: '100%',
      paddingTop: responsive.spacing[3],
      paddingBottom: responsive.spacing[2],
      alignItems: 'center',
    },
    modalHandle: {
      width: ms(40),
      height: ms(4),
      backgroundColor: colors.neutralMedium,
      borderRadius: ms(2),
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.spacing[4],
      paddingBottom: responsive.spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    modalTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
    },
    scrollContainer: {
      maxHeight: '100%',
    },
    contentContainer: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[4],
      paddingBottom: responsive.spacing[4],
    },
    modalFooter: {
      paddingHorizontal: responsive.spacing[4],
      paddingTop: responsive.spacing[2],
      paddingBottom: responsive.spacing[2],
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
    },
  });

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay} pointerEvents="box-none">
        {/* Animated Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
          pointerEvents="auto"
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={handleClose}
          />
        </Animated.View>

        {/* Animated Modal Content */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY }],
            },
          ]}
          pointerEvents="box-none"
        >
          {/* Handle - Draggable Area */}
          {showHandle && (
            <View style={styles.handleBar} {...panResponder.panHandlers} pointerEvents="box-only">
              <View style={styles.modalHandle} />
            </View>
          )}

          {/* Header */}
          {showHeader && (
            <View style={styles.modalHeader} pointerEvents="auto">
              <Text style={styles.modalTitle}>{title}</Text>
              {headerRight}
            </View>
          )}

          {/* Body */}
          {scrollable ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}
              bounces={false}
              pointerEvents="auto"
              scrollEnabled={true}
              nestedScrollEnabled={true}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={styles.contentContainer} pointerEvents="auto">
              {children}
            </View>
          )}

          {/* Footer */}
          {footer && <View style={styles.modalFooter} pointerEvents="auto">{footer}</View>}
        </Animated.View>
      </View>
    </Modal>
  );
}
